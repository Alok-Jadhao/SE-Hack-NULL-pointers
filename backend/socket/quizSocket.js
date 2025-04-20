const WebSocket = require('ws');
const http = require('http');
const jwt = require('jsonwebtoken');
const Quiz = require('../models/Quiz');

let activeQuizzes = new Map(); // Map of quizId -> {quiz, participants, currentQuestion, results}

// Create WebSocket server
function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws, req) => {
    let userId = null;
    let role = null;
    let quizId = null;
    let participantName = null;

    // Extract query parameters (token, quizId)
    const url = new URL(req.url, 'http://localhost');
    const token = url.searchParams.get('token');
    quizId = url.searchParams.get('quizId');
    
    // Authenticate the user
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      role = decoded.role;
      participantName = decoded.name;
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', message: 'Authentication failed' }));
      ws.close();
      return;
    }

    // Handle different connection types (instructor vs student)
    if (role === 'instructor') {
      handleInstructorConnection(ws, userId, quizId);
    } else if (role === 'student') {
      handleStudentConnection(ws, userId, quizId, participantName);
    } else {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid role' }));
      ws.close();
    }

    // Handle incoming messages
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        
        if (role === 'instructor') {
          await handleInstructorMessage(ws, userId, quizId, data);
        } else if (role === 'student') {
          await handleStudentMessage(ws, userId, quizId, data);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Failed to process message' }));
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      handleDisconnection(userId, quizId, role);
    });
  });

  return wss;
}

// Handle instructor connection
async function handleInstructorConnection(ws, instructorId, quizId) {
  try {
    // Fetch quiz details from database
    const quiz = await Quiz.findById(quizId).lean();
    
    if (!quiz) {
      ws.send(JSON.stringify({ type: 'error', message: 'Quiz not found' }));
      ws.close();
      return;
    }

    // Check if instructor owns the quiz
    if (quiz.instructor.toString() !== instructorId) {
      ws.send(JSON.stringify({ type: 'error', message: 'Unauthorized access to quiz' }));
      ws.close();
      return;
    }

    // Store the quiz session
    activeQuizzes.set(quizId, {
      quiz,
      instructor: { id: instructorId, ws },
      participants: new Map(),
      currentQuestion: -1, // Not started yet
      results: new Map(),
      status: 'waiting' // waiting, active, completed
    });

    // Send confirmation to instructor
    ws.send(JSON.stringify({ 
      type: 'quiz_ready', 
      message: 'Quiz ready to start',
      quiz: {
        id: quiz._id,
        title: quiz.title,
        questionCount: quiz.questions.length
      }
    }));
  } catch (error) {
    console.error('Instructor connection error:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Failed to setup quiz session' }));
    ws.close();
  }
}

// Handle student connection
function handleStudentConnection(ws, studentId, quizId, name) {
  // Check if the quiz is active
  const quizSession = activeQuizzes.get(quizId);
  
  if (!quizSession) {
    ws.send(JSON.stringify({ type: 'error', message: 'Quiz session not found' }));
    ws.close();
    return;
  }

  // Add student to participants
  quizSession.participants.set(studentId, { 
    id: studentId, 
    name, 
    ws,
    joinedAt: new Date(),
    answers: []
  });

  // Initialize results for this student
  quizSession.results.set(studentId, {
    id: studentId,
    name,
    score: 0,
    answers: []
  });

  // Notify instructor about new participant
  const instructor = quizSession.instructor;
  if (instructor && instructor.ws.readyState === WebSocket.OPEN) {
    instructor.ws.send(JSON.stringify({
      type: 'student_joined',
      student: { id: studentId, name },
      participantCount: quizSession.participants.size
    }));
  }

  // Notify student about quiz state
  ws.send(JSON.stringify({ 
    type: 'joined_quiz',
    quizTitle: quizSession.quiz.title,
    status: quizSession.status,
    message: 'Successfully joined quiz session. Waiting for instructor to start.'
  }));

  // If quiz is already active, send the current question
  if (quizSession.status === 'active' && quizSession.currentQuestion >= 0) {
    const currentQuestionIndex = quizSession.currentQuestion;
    const question = quizSession.quiz.questions[currentQuestionIndex];
    
    // Don't send correct answer to students
    const sanitizedQuestion = {
      questionText: question.questionText,
      options: question.options.map(opt => ({ 
        text: opt.text,
        // Don't include isCorrect property
      })),
      timeLimit: 30, // seconds per question
      questionNumber: currentQuestionIndex + 1,
      totalQuestions: quizSession.quiz.questions.length
    };
    
    ws.send(JSON.stringify({
      type: 'question',
      question: sanitizedQuestion
    }));
  }
}

// Handle instructor messages
async function handleInstructorMessage(ws, instructorId, quizId, data) {
  const quizSession = activeQuizzes.get(quizId);
  
  if (!quizSession) {
    ws.send(JSON.stringify({ type: 'error', message: 'Quiz session not found' }));
    return;
  }

  switch (data.type) {
    case 'start_quiz':
      // Start quiz for all participants
      quizSession.status = 'active';
      quizSession.startTime = new Date();
      
      // Broadcast to all participants
      broadcastToParticipants(quizId, {
        type: 'quiz_started',
        message: 'Quiz has started',
        quizId
      });
      
      // Send confirmation to instructor
      ws.send(JSON.stringify({ 
        type: 'quiz_started', 
        participantCount: quizSession.participants.size 
      }));
      
      // If we should automatically send first question
      if (data.sendFirstQuestion) {
        await nextQuestion(quizId, ws);
      }
      break;

    case 'next_question':
      await nextQuestion(quizId, ws);
      break;

    case 'end_quiz':
      await endQuiz(quizId);
      break;

    default:
      ws.send(JSON.stringify({ type: 'error', message: 'Unknown command' }));
  }
}

// Handle student messages
async function handleStudentMessage(ws, studentId, quizId, data) {
  const quizSession = activeQuizzes.get(quizId);
  
  if (!quizSession) {
    ws.send(JSON.stringify({ type: 'error', message: 'Quiz session not found' }));
    return;
  }

  switch (data.type) {
    case 'answer':
      const { questionIndex, selectedOption } = data;
      const currentQuestionIndex = quizSession.currentQuestion;
      
      // Make sure student is answering current question
      if (questionIndex !== currentQuestionIndex) {
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Invalid question index' 
        }));
        return;
      }

      // Record student's answer
      const question = quizSession.quiz.questions[currentQuestionIndex];
      const isCorrect = question.options[selectedOption]?.isCorrect === true;
      const points = isCorrect ? (question.points || 1) : 0;
      
      // Store answer
      const studentData = quizSession.participants.get(studentId);
      if (studentData) {
        studentData.answers[currentQuestionIndex] = {
          questionIndex,
          selectedOption,
          isCorrect,
          points,
          answerTime: new Date()
        };
      }

      // Update results
      const studentResults = quizSession.results.get(studentId);
      if (studentResults) {
        studentResults.answers[currentQuestionIndex] = {
          selectedOption,
          isCorrect,
          points
        };
        // Update total score
        studentResults.score += points;
      }

      // Send confirmation to student
      ws.send(JSON.stringify({
        type: 'answer_received',
        message: 'Answer submitted successfully'
      }));

      // Update instructor
      const instructor = quizSession.instructor;
      if (instructor && instructor.ws.readyState === WebSocket.OPEN) {
        instructor.ws.send(JSON.stringify({
          type: 'student_answered',
          student: { 
            id: studentId, 
            name: studentData?.name 
          },
          questionIndex,
          answeredCount: countAnsweredStudents(quizSession, currentQuestionIndex)
        }));
      }
      break;

    default:
      ws.send(JSON.stringify({ type: 'error', message: 'Unknown command' }));
  }
}

// Handle disconnection
function handleDisconnection(userId, quizId, role) {
  const quizSession = activeQuizzes.get(quizId);
  if (!quizSession) return;

  if (role === 'instructor') {
    // Notify all participants that instructor left
    broadcastToParticipants(quizId, {
      type: 'instructor_left',
      message: 'Instructor has left the quiz session'
    });
    
    // End the quiz session
    activeQuizzes.delete(quizId);
  } else if (role === 'student') {
    // Remove student from participants
    const student = quizSession.participants.get(userId);
    quizSession.participants.delete(userId);
    
    // Notify instructor
    const instructor = quizSession.instructor;
    if (instructor && instructor.ws.readyState === WebSocket.OPEN) {
      instructor.ws.send(JSON.stringify({
        type: 'student_left',
        student: { id: userId, name: student?.name },
        participantCount: quizSession.participants.size
      }));
    }
  }
}

// Move to next question
async function nextQuestion(quizId, instructorWs) {
  const quizSession = activeQuizzes.get(quizId);
  if (!quizSession) return;

  // Move to next question
  quizSession.currentQuestion++;
  
  // Check if quiz is completed
  if (quizSession.currentQuestion >= quizSession.quiz.questions.length) {
    await endQuiz(quizId);
    return;
  }

  const currentQuestionIndex = quizSession.currentQuestion;
  const question = quizSession.quiz.questions[currentQuestionIndex];
  
  // Send question to instructor with correct answers
  instructorWs.send(JSON.stringify({
    type: 'question',
    question: {
      ...question,
      questionNumber: currentQuestionIndex + 1,
      totalQuestions: quizSession.quiz.questions.length
    },
    isInstructor: true
  }));
  
  // Send questions to all participants without correct answers
  const sanitizedQuestion = {
    questionText: question.questionText,
    options: question.options.map(opt => ({ 
      text: opt.text,
      // Don't include isCorrect property
    })),
    timeLimit: 30, // seconds per question
    questionNumber: currentQuestionIndex + 1,
    totalQuestions: quizSession.quiz.questions.length
  };
  
  broadcastToParticipants(quizId, {
    type: 'question',
    question: sanitizedQuestion
  });
}

// End the quiz and calculate final results
async function endQuiz(quizId) {
  const quizSession = activeQuizzes.get(quizId);
  if (!quizSession) return;

  quizSession.status = 'completed';
  quizSession.endTime = new Date();
  
  // Calculate final results
  const finalResults = Array.from(quizSession.results.values()).map(student => ({
    id: student.id,
    name: student.name,
    score: student.score,
    correctAnswers: student.answers.filter(a => a && a.isCorrect).length,
    totalQuestions: quizSession.quiz.questions.length
  }));

  // Sort by score
  finalResults.sort((a, b) => b.score - a.score);
  
  // Send results to instructor
  const instructor = quizSession.instructor;
  if (instructor && instructor.ws.readyState === WebSocket.OPEN) {
    instructor.ws.send(JSON.stringify({
      type: 'quiz_ended',
      results: finalResults,
      summary: {
        averageScore: calculateAverageScore(finalResults),
        highestScore: finalResults.length > 0 ? finalResults[0].score : 0,
        lowestScore: finalResults.length > 0 ? finalResults[finalResults.length - 1].score : 0,
        participantCount: quizSession.participants.size
      }
    }));
  }
  
  // Send results to each participant (only their own score + top performers)
  for (const [studentId, student] of quizSession.participants.entries()) {
    if (student.ws.readyState === WebSocket.OPEN) {
      const studentResult = quizSession.results.get(studentId);
      
      student.ws.send(JSON.stringify({
        type: 'quiz_ended',
        yourResult: {
          score: studentResult.score,
          correctAnswers: studentResult.answers.filter(a => a && a.isCorrect).length,
          totalQuestions: quizSession.quiz.questions.length,
          ranking: finalResults.findIndex(r => r.id === studentId) + 1,
          totalParticipants: finalResults.length
        },
        topPerformers: finalResults.slice(0, 3)
      }));
    }
  }
  
  // Store results in database (can be implemented later)
  
  // Clean up session after some time
  setTimeout(() => {
    activeQuizzes.delete(quizId);
  }, 30 * 60 * 1000); // Keep for 30 minutes
}

// Helper function to broadcast to all participants
function broadcastToParticipants(quizId, message) {
  const quizSession = activeQuizzes.get(quizId);
  if (!quizSession) return;

  for (const participant of quizSession.participants.values()) {
    if (participant.ws.readyState === WebSocket.OPEN) {
      participant.ws.send(JSON.stringify(message));
    }
  }
}

// Helper to count how many students answered current question
function countAnsweredStudents(quizSession, questionIndex) {
  let count = 0;
  for (const participant of quizSession.participants.values()) {
    if (participant.answers[questionIndex]) {
      count++;
    }
  }
  return count;
}

// Helper to calculate average score
function calculateAverageScore(results) {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, student) => sum + student.score, 0);
  return Math.round((total / results.length) * 10) / 10; // Round to 1 decimal place
}

module.exports = setupWebSocketServer; 
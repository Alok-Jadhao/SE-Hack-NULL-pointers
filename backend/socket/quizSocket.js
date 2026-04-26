import Quiz from '../models/Quiz.js';

export const setupQuizSocket = (io) => {
  // Store active quiz sessions
  const activeQuizzes = new Map();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join quiz room
    socket.on('join-quiz', async ({ quizCode, userId, userName }) => {
      try {
        const quiz = await Quiz.findOne({ quizCode, isLive: true });
        
        if (!quiz) {
          socket.emit('error', { message: 'Quiz not found or not live' });
          return;
        }

        socket.join(quizCode);
        
        // Initialize quiz session if not exists
        if (!activeQuizzes.has(quizCode)) {
          activeQuizzes.set(quizCode, {
            participants: [],
            currentQuestion: 0
          });
        }

        const session = activeQuizzes.get(quizCode);
        session.participants.push({ socketId: socket.id, userId, userName, score: 0 });

        // Notify all participants
        io.to(quizCode).emit('participant-joined', {
          userName,
          totalParticipants: session.participants.length
        });

        socket.emit('quiz-joined', { quiz, session });
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Next question
    socket.on('next-question', ({ quizCode }) => {
      const session = activeQuizzes.get(quizCode);
      if (session) {
        session.currentQuestion++;
        io.to(quizCode).emit('question-changed', {
          questionNumber: session.currentQuestion
        });
      }
    });

    // Submit answer
    socket.on('submit-answer', async ({ quizCode, questionId, answer, timeTaken }) => {
      try {
        const session = activeQuizzes.get(quizCode);
        if (!session) return;

        const participant = session.participants.find(p => p.socketId === socket.id);
        if (!participant) return;

        const quiz = await Quiz.findOne({ quizCode });
        const question = quiz.questions.id(questionId);
        
        const isCorrect = question.correctAnswer === answer;
        if (isCorrect) {
          participant.score += question.points;
        }

        // Emit updated leaderboard
        const leaderboard = session.participants
          .map(p => ({ userName: p.userName, score: p.score }))
          .sort((a, b) => b.score - a.score);

        io.to(quizCode).emit('leaderboard-update', leaderboard);

        socket.emit('answer-result', { isCorrect, score: participant.score });
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // End quiz
    socket.on('end-quiz', async ({ quizCode }) => {
      const session = activeQuizzes.get(quizCode);
      if (session) {
        const finalLeaderboard = session.participants
          .map(p => ({ userName: p.userName, score: p.score }))
          .sort((a, b) => b.score - a.score);

        io.to(quizCode).emit('quiz-ended', { leaderboard: finalLeaderboard });
        
        activeQuizzes.delete(quizCode);
      }
    });

    // Leave quiz
    socket.on('leave-quiz', ({ quizCode }) => {
      const session = activeQuizzes.get(quizCode);
      if (session) {
        session.participants = session.participants.filter(p => p.socketId !== socket.id);
        socket.leave(quizCode);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      // Remove from all active quizzes
      activeQuizzes.forEach((session, quizCode) => {
        const participant = session.participants.find(p => p.socketId === socket.id);
        if (participant) {
          session.participants = session.participants.filter(p => p.socketId !== socket.id);
          io.to(quizCode).emit('participant-left', {
            userName: participant.userName,
            totalParticipants: session.participants.length
          });
        }
      });
    });
  });
};

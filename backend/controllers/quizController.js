import Quiz from '../models/Quiz.js';

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('creator', 'name email')
      .populate('course', 'title')
      .select('-questions.correctAnswer'); // Hide answers

    res.json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('course', 'title');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Hide correct answers for students
    if (req.user.role === 'student') {
      quiz.questions = quiz.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        points: q.points,
        timeLimit: q.timeLimit
      }));
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private (Instructor only)
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions, course } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      course,
      creator: req.user.id
    });

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Instructor only)
export const updateQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Check authorization
    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quiz'
      });
    }

    quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Instructor only)
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Check authorization
    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this quiz'
      });
    }

    await quiz.deleteOne();

    res.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Start live quiz
// @route   POST /api/quizzes/:id/start
// @access  Private (Instructor only)
export const startQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    quiz.isLive = true;
    quiz.startTime = new Date();
    await quiz.save();

    // Emit socket event to notify students
    const io = req.app.get('io');
    io.emit('quiz-started', { quizId: quiz._id, quizCode: quiz.quizCode });

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private (Student)
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedAnswer, timeTaken }
    
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Calculate score
    let totalScore = 0;
    const processedAnswers = answers.map(answer => {
      const question = quiz.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      
      if (isCorrect) {
        totalScore += question.points;
      }

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        timeTaken: answer.timeTaken
      };
    });

    // Add participant result
    quiz.participants.push({
      user: req.user.id,
      score: totalScore,
      answers: processedAnswers,
      completedAt: new Date()
    });

    await quiz.save();

    res.json({
      success: true,
      data: {
        score: totalScore,
        totalPoints: quiz.questions.reduce((sum, q) => sum + q.points, 0),
        passed: totalScore >= quiz.passingScore
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get quiz by code
// @route   GET /api/quizzes/join/:code
// @access  Private
export const joinQuizByCode = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizCode: req.params.code })
      .populate('creator', 'name')
      .populate('course', 'title');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (!quiz.isLive) {
      return res.status(400).json({
        success: false,
        message: 'Quiz is not live'
      });
    }

    // Hide correct answers
    quiz.questions = quiz.questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      points: q.points,
      timeLimit: q.timeLimit
    }));

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

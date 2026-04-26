import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number, // index of correct option
    required: true
  },
  points: {
    type: Number,
    default: 10
  },
  timeLimit: {
    type: Number, // seconds per question
    default: 30
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  questions: [questionSchema],
  quizCode: {
    type: String,
    unique: true,
    sparse: true
  },
  isLive: {
    type: Boolean,
    default: false
  },
  startTime: Date,
  endTime: Date,
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    score: {
      type: Number,
      default: 0
    },
    answers: [{
      questionId: mongoose.Schema.Types.ObjectId,
      selectedAnswer: Number,
      isCorrect: Boolean,
      timeTaken: Number // seconds
    }],
    completedAt: Date
  }],
  maxParticipants: Number,
  passingScore: {
    type: Number,
    default: 60
  }
}, {
  timestamps: true
});

// Generate unique quiz code
quizSchema.pre('save', async function(next) {
  if (this.isNew && !this.quizCode) {
    this.quizCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

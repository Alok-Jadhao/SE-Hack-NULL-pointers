import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  content: {
    type: String, // URL or text content
    required: true
  },
  contentType: {
    type: String,
    enum: ['video', 'pdf', 'text', 'slides'],
    default: 'text'
  },
  duration: Number, // in minutes
  order: {
    type: Number,
    default: 0
  },
  isLocked: {
    type: Boolean,
    default: false
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: String,
  modules: [moduleSchema],
  prerequisites: [String],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  totalDuration: Number // in minutes
}, {
  timestamps: true
});

// Calculate total duration before saving
courseSchema.pre('save', function(next) {
  if (this.modules && this.modules.length > 0) {
    this.totalDuration = this.modules.reduce((total, module) => {
      return total + (module.duration || 0);
    }, 0);
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);

export default Course;

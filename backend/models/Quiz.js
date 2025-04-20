const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }],
        explanation: {
            type: String,
            default: ''
        },
        points: {
            type: Number,
            default: 1
        }
    }],
    timeLimit: {
        type: Number,  // in minutes
        default: 30
    },
    passingScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    attempts: {
        type: Number,
        default: 1  // number of attempts allowed
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    attachments: [{
        fileName: String,
        fileUrl: String,
        fileType: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    uploadedQuizData: {
        type: Object,
        default: null
    }
});

module.exports = mongoose.model('Quiz', quizSchema); 
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    prerequisites: {
        type: [String],
        default: []
    },
    content: [{
        title: String,
        description: String,
        resources: [String],
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    }],
    isPublished: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Course', courseSchema);
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const upload = require('../utils/fileUpload');
const auth = require('../middleware/auth');

// Create a new quiz (instructor only)
router.post('/', auth, quizController.createQuiz);

// Get all quizzes for a course
router.get('/course/:courseId', auth, quizController.getCourseQuizzes);

// Get a specific quiz
router.get('/:id', auth, quizController.getQuiz);

// Update a quiz (instructor only)
router.put('/:id', auth, quizController.updateQuiz);

// Delete a quiz (instructor only)
router.delete('/:id', auth, quizController.deleteQuiz);

// Submit quiz attempt (students)
router.post('/:id/submit', auth, quizController.submitQuiz);

// Add this new route for file upload
router.post('/upload', auth, upload.single('file'), quizController.uploadQuiz);

module.exports = router; 
const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);

// Protected routes
router.post('/', protect, createCourse);

module.exports = router;
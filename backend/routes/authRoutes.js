const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { handleGoogleAuth } = require('../controllers/googleAuthController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', handleGoogleAuth);

// Protected routes
router.get('/profile', protect, getUserProfile);

module.exports = router; 
import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
import authController from '../controllers/authController';

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('displayName', 'Display name is required').not().isEmpty()
    ],
    authController.register
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    authController.login
);

router.get('/me', authController.getUser);

module.exports = router;
// This code defines the routes for user authentication in an Express application.
// It includes routes for user registration, login, and fetching the current user's details.
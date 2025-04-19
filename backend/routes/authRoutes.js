import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
import { register, login, getUser } from '../controllers/authController.js';

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('displayName', 'Display name is required').not().isEmpty()
    ],
    register
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    login
);

router.get('/me', getUser);

export default router; // <--- CHANGED EXPORT
// This code defines the routes for user authentication in an Express application.
// It includes routes for user registration, login, and fetching the current user's details.
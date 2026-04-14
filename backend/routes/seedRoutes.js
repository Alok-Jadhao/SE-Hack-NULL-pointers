import express from 'express';
import { seedDatabase, getSeedingStatus } from '../controllers/seedController.js';

const router = express.Router();

// POST - Seed the database
router.post('/', seedDatabase);

// GET - Check seeding status
router.get('/status', getSeedingStatus);

export default router;

import express from 'express';
import {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  startQuiz,
  submitQuiz,
  joinQuizByCode
} from '../controllers/quizController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getQuizzes)
  .post(protect, authorize('instructor', 'admin'), createQuiz);

router.get('/join/:code', protect, joinQuizByCode);
    
router.route('/:id')
  .get(protect, getQuiz)
  .put(protect, authorize('instructor', 'admin'), updateQuiz)
  .delete(protect, authorize('instructor', 'admin'), deleteQuiz);

router.post('/:id/start', protect, authorize('instructor', 'admin'), startQuiz);
router.post('/:id/submit', protect, submitQuiz);

export default router;

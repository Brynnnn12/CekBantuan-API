import { Router } from 'express';
import {
  getAidPrograms,
  getActivePrograms,
  getAidProgram,
  createAidProgram,
  updateAidProgram,
  deleteAidProgram,
} from '../controllers/aidProgram.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/active', getActivePrograms);
router.get('/', getAidPrograms);
router.get('/:id', getAidProgram);

// Protected routes
router.post('/', protect, createAidProgram);
router.put('/:id', protect, updateAidProgram);
router.delete('/:id', protect, deleteAidProgram);

export default router;

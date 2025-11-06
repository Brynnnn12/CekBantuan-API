import { Router } from 'express';
import {
  assignRecipientToProgram,
  removeRecipientAssignment,
  getRecipientsByProgram,
  getProgramsByRecipient,
} from '../controllers/programRecipient.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Protected routes
router.post('/assign', protect, assignRecipientToProgram);
router.post('/remove', protect, removeRecipientAssignment);
router.get('/program/:programId', protect, getRecipientsByProgram);
router.get('/recipient/:recipientId', protect, getProgramsByRecipient);

export default router;

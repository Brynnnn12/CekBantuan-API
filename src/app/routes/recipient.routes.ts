import { Router } from 'express';
import {
  getRecipients,
  getRecipient,
  getRecipientByNIK,
  createRecipient,
  updateRecipient,
  deleteRecipient,
} from '../controllers/recipient.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/nik/:nik', getRecipientByNIK);
router.get('/', getRecipients);
router.get('/:id', getRecipient);

// Protected routes
router.post('/', protect, createRecipient);
router.put('/:id', protect, updateRecipient);
router.delete('/:id', protect, deleteRecipient);

export default router;

import { Router } from 'express';
import {
  getAnnouncements,
  getPublished,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcement.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/published', getPublished);
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncement);

// Protected routes
router.post('/', protect, createAnnouncement);
router.put('/:id', protect, updateAnnouncement);
router.delete('/:id', protect, deleteAnnouncement);

export default router;

import { Router } from 'express';
import authRoutes from './auth.routes';
import announcementRoutes from './announcement.routes';
import recipientRoutes from './recipient.routes';
import aidProgramRoutes from './aidProgram.routes';
import programRecipientRoutes from './programRecipient.routes';

const router = Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/announcements', announcementRoutes);
router.use('/recipients', recipientRoutes);
router.use('/aid-programs', aidProgramRoutes);
router.use('/program-recipients', programRecipientRoutes);

export default router;

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllAnnouncements,
  getPublishedAnnouncements,
  getAnnouncementById,
  createNewAnnouncement,
  updateExistingAnnouncement,
  deleteExistingAnnouncement,
} from '../services/announcement.service';
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from '../requests/announcement.requests';
import { ApiResponse } from '../../utils/apiResponse';

export const getAnnouncements = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

  const result = await getAllAnnouncements(page, limit);

  ApiResponse.success(
    res,
    result.data,
    'Berhasil mengambil daftar announcement',
    200,
    result.pagination,
  );
});

export const getPublished = asyncHandler(async (req: Request, res: Response) => {
  const announcements = await getPublishedAnnouncements();

  ApiResponse.success(res, announcements);
});

export const getAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const announcement = await getAnnouncementById(id);

  ApiResponse.success(res, announcement, 'Berhasil mengambil announcement', 200);
});

export const createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createAnnouncementSchema.parse(req.body);
  const authorId = req.user?.id;

  if (!authorId) {
    ApiResponse.error(res, 'Unauthorized', 401);
    return;
  }

  const announcement = await createNewAnnouncement(validatedData, authorId);

  ApiResponse.success(res, announcement, 'Announcement berhasil dibuat', 201);
});

export const updateAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateAnnouncementSchema.parse(req.body);

  const announcement = await updateExistingAnnouncement(id, validatedData);

  ApiResponse.success(res, announcement, 'Announcement berhasil diupdate');
});

export const deleteAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteExistingAnnouncement(id);

  ApiResponse.success(res, null, 'Announcement berhasil dihapus');
});

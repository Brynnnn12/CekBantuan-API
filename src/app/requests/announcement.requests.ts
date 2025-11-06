import { z } from 'zod';

// Schema untuk membuat announcement
export const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  content: z.string().min(1, 'Konten wajib diisi'),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
});

// Schema untuk update announcement
export const updateAnnouncementSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi').max(200, 'Judul maksimal 200 karakter').optional(),
  content: z.string().min(1, 'Konten wajib diisi').optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

// Types
export type CreateAnnouncementRequest = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementRequest = z.infer<typeof updateAnnouncementSchema>;

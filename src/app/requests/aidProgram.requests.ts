import { z } from 'zod';

// Schema untuk membuat aid program
export const createAidProgramSchema = z.object({
  name: z.string().min(1, 'Nama program wajib diisi').max(100, 'Nama maksimal 100 karakter'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  status: z.enum(['DRAFT', 'ACTIVE']).optional().default('DRAFT'),
});

// Schema untuk update aid program
export const updateAidProgramSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama program wajib diisi')
    .max(100, 'Nama maksimal 100 karakter')
    .optional(),
  description: z.string().min(1, 'Deskripsi wajib diisi').optional(),
  status: z.enum(['DRAFT', 'ACTIVE']).optional(),
});

// Types
export type CreateAidProgramRequest = z.infer<typeof createAidProgramSchema>;
export type UpdateAidProgramRequest = z.infer<typeof updateAidProgramSchema>;

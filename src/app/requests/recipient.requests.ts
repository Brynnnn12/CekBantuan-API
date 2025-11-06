import { z } from 'zod';

// Schema untuk membuat recipient
export const createRecipientSchema = z.object({
  nik: z.string().length(16, 'NIK harus 16 digit').regex(/^\d+$/, 'NIK hanya angka'),
  name: z.string().min(1, 'Nama wajib diisi').max(100, 'Nama maksimal 100 karakter'),
  address: z.string().min(1, 'Alamat wajib diisi'),
  notes: z.string().optional(),
});

// Schema untuk update recipient
export const updateRecipientSchema = z.object({
  nik: z.string().length(16, 'NIK harus 16 digit').regex(/^\d+$/, 'NIK hanya angka').optional(),
  name: z.string().min(1, 'Nama wajib diisi').max(100, 'Nama maksimal 100 karakter').optional(),
  address: z.string().min(1, 'Alamat wajib diisi').optional(),
  notes: z.string().optional(),
});

// Types
export type CreateRecipientRequest = z.infer<typeof createRecipientSchema>;
export type UpdateRecipientRequest = z.infer<typeof updateRecipientSchema>;

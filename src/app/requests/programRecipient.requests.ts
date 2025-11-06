import { z } from 'zod';

// Schema untuk assign recipient ke program (pivot)
export const assignRecipientSchema = z.object({
  programId: z.string().uuid('Program ID tidak valid'),
  recipientId: z.string().uuid('Recipient ID tidak valid'),
});

// Schema untuk remove assignment
export const removeAssignmentSchema = z.object({
  programId: z.string().uuid('Program ID tidak valid'),
  recipientId: z.string().uuid('Recipient ID tidak valid'),
});

// Types
export type AssignRecipientRequest = z.infer<typeof assignRecipientSchema>;
export type RemoveAssignmentRequest = z.infer<typeof removeAssignmentSchema>;

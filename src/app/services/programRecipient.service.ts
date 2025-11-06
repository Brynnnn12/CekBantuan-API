import {
  assignRecipientToProgram,
  removeRecipientFromProgram,
  findRecipientsByProgram,
  findProgramsByRecipient,
  checkRecipientAssignment,
} from '../repositories/programRecipient.repository';
import {
  AssignRecipientRequest,
  RemoveAssignmentRequest,
} from '../requests/programRecipient.requests';
import { ProgramRecipientWithDetails, RecipientByProgram, ProgramByRecipient } from '../types';

export async function assignRecipient(
  data: AssignRecipientRequest,
): Promise<ProgramRecipientWithDetails> {
  // Check if already assigned
  const existing = await checkRecipientAssignment(data.programId, data.recipientId);
  if (existing) {
    throw new Error('Recipient sudah di-assign ke program ini');
  }

  return assignRecipientToProgram(data.programId, data.recipientId);
}

export async function removeAssignment(
  data: RemoveAssignmentRequest,
): Promise<{ programId: string; recipientId: string; createdAt: Date; updatedAt: Date }> {
  const existing = await checkRecipientAssignment(data.programId, data.recipientId);
  if (!existing) {
    throw new Error('Assignment tidak ditemukan');
  }

  return removeRecipientFromProgram(data.programId, data.recipientId);
}

export async function getRecipientsByProgramId(programId: string): Promise<RecipientByProgram[]> {
  return findRecipientsByProgram(programId);
}

export async function getProgramsByRecipientId(recipientId: string): Promise<ProgramByRecipient[]> {
  return findProgramsByRecipient(recipientId);
}

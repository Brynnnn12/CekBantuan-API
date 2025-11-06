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

export async function assignRecipient(data: AssignRecipientRequest) {
  // Check if already assigned
  const existing = await checkRecipientAssignment(data.programId, data.recipientId);
  if (existing) {
    throw new Error('Recipient sudah di-assign ke program ini');
  }

  return assignRecipientToProgram(data.programId, data.recipientId);
}

export async function removeAssignment(data: RemoveAssignmentRequest) {
  const existing = await checkRecipientAssignment(data.programId, data.recipientId);
  if (!existing) {
    throw new Error('Assignment tidak ditemukan');
  }

  return removeRecipientFromProgram(data.programId, data.recipientId);
}

export async function getRecipientsByProgramId(programId: string) {
  return findRecipientsByProgram(programId);
}

export async function getProgramsByRecipientId(recipientId: string) {
  return findProgramsByRecipient(recipientId);
}

import {
  findRecipientById,
  findRecipientByNik,
  findAllRecipientsPaginated,
  createRecipient,
  updateRecipient,
  deleteRecipient,
} from '../repositories/recipient.repository';
import { CreateRecipientRequest, UpdateRecipientRequest } from '../requests/recipient.requests';

export async function getAllRecipients(page?: number, limit?: number) {
  return findAllRecipientsPaginated({ page, limit });
}

export async function getRecipientById(id: string) {
  const recipient = await findRecipientById(id);
  if (!recipient) {
    throw new Error('Recipient tidak ditemukan');
  }
  return recipient;
}

export async function getRecipientByNik(nik: string) {
  const recipient = await findRecipientByNik(nik);
  if (!recipient) {
    throw new Error('Recipient dengan NIK tersebut tidak ditemukan');
  }
  return recipient;
}

export async function createNewRecipient(data: CreateRecipientRequest) {
  // Check if NIK already exists
  const existing = await findRecipientByNik(data.nik);
  if (existing) {
    throw new Error('NIK sudah terdaftar');
  }

  return createRecipient(data);
}

export async function updateExistingRecipient(id: string, data: UpdateRecipientRequest) {
  const recipient = await findRecipientById(id);
  if (!recipient) {
    throw new Error('Recipient tidak ditemukan');
  }

  // Check NIK uniqueness if updating NIK
  if (data.nik) {
    const existing = await findRecipientByNik(data.nik);
    if (existing && existing.id !== id) {
      throw new Error('NIK sudah digunakan');
    }
  }

  return updateRecipient(id, data);
}

export async function deleteExistingRecipient(id: string) {
  const recipient = await findRecipientById(id);
  if (!recipient) {
    throw new Error('Recipient tidak ditemukan');
  }
  return deleteRecipient(id);
}

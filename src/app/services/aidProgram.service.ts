import {
  findAidProgramById,
  findAllAidProgramsPaginated,
  findActiveAidProgramsPaginated,
  createAidProgram,
  updateAidProgram,
  deleteAidProgram,
} from '../repositories/aidProgram.repository';
import { CreateAidProgramRequest, UpdateAidProgramRequest } from '../requests/aidProgram.requests';
import { AidProgramWithDetails } from '../types';

export async function getAllAidPrograms(page?: number, limit?: number) {
  return findAllAidProgramsPaginated({ page, limit });
}

export async function getActiveAidPrograms(page?: number, limit?: number) {
  return findActiveAidProgramsPaginated({ page, limit });
}

export async function getAidProgramById(id: string): Promise<AidProgramWithDetails | null> {
  const program = await findAidProgramById(id);
  if (!program) {
    throw new Error('Program bantuan tidak ditemukan');
  }
  return program;
}

export async function createNewAidProgram(
  data: CreateAidProgramRequest,
  adminId: string,
): Promise<AidProgramWithDetails> {
  return createAidProgram({
    ...data,
    adminId,
  });
}

export async function updateExistingAidProgram(
  id: string,
  data: UpdateAidProgramRequest,
): Promise<AidProgramWithDetails> {
  const program = await findAidProgramById(id);
  if (!program) {
    throw new Error('Program bantuan tidak ditemukan');
  }
  return updateAidProgram(id, data);
}

export async function deleteExistingAidProgram(id: string) {
  const program = await findAidProgramById(id);
  if (!program) {
    throw new Error('Program bantuan tidak ditemukan');
  }
  return deleteAidProgram(id);
}

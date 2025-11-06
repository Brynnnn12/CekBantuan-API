import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllAidPrograms,
  getActiveAidPrograms,
  getAidProgramById,
  createNewAidProgram,
  updateExistingAidProgram,
  deleteExistingAidProgram,
} from '../services/aidProgram.service';
import { createAidProgramSchema, updateAidProgramSchema } from '../requests/aidProgram.requests';
import { ApiResponse } from '../../utils/apiResponse';
import { AuthRequest } from '../types';

export const getAidPrograms = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

  const result = await getAllAidPrograms(page, limit);

  ApiResponse.success(
    res,
    result.data,
    'Berhasil mengambil daftar program bantuan',
    200,
    result.pagination,
  );
});

export const getActivePrograms = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

  const result = await getActiveAidPrograms(page, limit);

  ApiResponse.success(
    res,
    result.data,
    'Berhasil mengambil daftar program bantuan aktif',
    200,
    result.pagination,
  );
});

export const getAidProgram = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const program = await getAidProgramById(id);

  if (!program) {
    ApiResponse.error(res, 'Program bantuan tidak ditemukan', 404);
    return;
  }

  ApiResponse.success(res, program);
});

export const createAidProgram = asyncHandler(async (req: AuthRequest, res: Response) => {
  const validatedData = createAidProgramSchema.parse(req.body);
  const adminId = req.user?.id;

  if (!adminId) {
    ApiResponse.error(res, 'Unauthorized', 401);
    return;
  }

  const program = await createNewAidProgram(validatedData, adminId);

  ApiResponse.success(res, program, 'Program bantuan berhasil dibuat', 201);
});

export const updateAidProgram = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateAidProgramSchema.parse(req.body);

  const program = await updateExistingAidProgram(id, validatedData);

  if (!program) {
    ApiResponse.error(res, 'Program bantuan tidak ditemukan', 404);
    return;
  }

  ApiResponse.success(res, program, 'Program bantuan berhasil diupdate');
});

export const deleteAidProgram = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await deleteExistingAidProgram(id);

  if (!deleted) {
    ApiResponse.error(res, 'Program bantuan tidak ditemukan', 404);
    return;
  }

  ApiResponse.success(res, null, 'Program bantuan berhasil dihapus');
});

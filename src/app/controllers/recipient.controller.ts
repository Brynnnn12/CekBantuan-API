import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllRecipients,
  getRecipientById,
  getRecipientByNik,
  createNewRecipient,
  updateExistingRecipient,
  deleteExistingRecipient,
} from '../services/recipient.service';
import { createRecipientSchema, updateRecipientSchema } from '../requests/recipient.requests';
import { ApiResponse } from '../../utils/apiResponse';

export const getRecipients = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

  const result = await getAllRecipients(page, limit);

  ApiResponse.success(
    res,
    result.data,
    'Berhasil mengambil daftar recipient',
    200,
    result.pagination,
  );
});

export const getRecipient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipient = await getRecipientById(id);

  if (!recipient) {
    ApiResponse.error(res, 'Recipient not found', 404);
    return;
  }

  ApiResponse.success(res, recipient);
});

export const getRecipientByNIK = asyncHandler(async (req: Request, res: Response) => {
  const { nik } = req.params;
  const recipient = await getRecipientByNik(nik);

  if (!recipient) {
    ApiResponse.error(res, 'Recipient not found', 404);
    return;
  }

  ApiResponse.success(res, recipient);
});

export const createRecipient = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createRecipientSchema.parse(req.body);

  const recipient = await createNewRecipient(validatedData);

  ApiResponse.success(res, recipient, 'Recipient berhasil dibuat', 201);
});

export const updateRecipient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateRecipientSchema.parse(req.body);

  const recipient = await updateExistingRecipient(id, validatedData);

  if (!recipient) {
    ApiResponse.error(res, 'Recipient not found', 404);
    return;
  }

  ApiResponse.success(res, recipient, 'Recipient berhasil diupdate');
});

export const deleteRecipient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await deleteExistingRecipient(id);

  if (!deleted) {
    ApiResponse.error(res, 'Recipient not found', 404);
    return;
  }

  ApiResponse.success(res, null, 'Recipient berhasil dihapus');
});

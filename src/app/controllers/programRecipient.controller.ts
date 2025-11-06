import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  assignRecipient,
  removeAssignment,
  getRecipientsByProgramId,
  getProgramsByRecipientId,
} from '../services/programRecipient.service';
import {
  assignRecipientSchema,
  removeAssignmentSchema,
} from '../requests/programRecipient.requests';
import { ApiResponse } from '../../utils/apiResponse';

export const assignRecipientToProgram = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = assignRecipientSchema.parse(req.body);

  const assignment = await assignRecipient(validatedData);

  ApiResponse.success(res, assignment, 'Recipient berhasil di-assign ke program', 201);
});

export const removeRecipientAssignment = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = removeAssignmentSchema.parse(req.body);

  const removed = await removeAssignment(validatedData);

  if (!removed) {
    ApiResponse.error(res, 'Assignment tidak ditemukan', 404);
    return;
  }

  ApiResponse.success(res, null, 'Assignment berhasil dihapus');
});

export const getRecipientsByProgram = asyncHandler(async (req: Request, res: Response) => {
  const { programId } = req.params;

  const recipients = await getRecipientsByProgramId(programId);

  ApiResponse.success(res, recipients);
});

export const getProgramsByRecipient = asyncHandler(async (req: Request, res: Response) => {
  const { recipientId } = req.params;

  const programs = await getProgramsByRecipientId(recipientId);

  ApiResponse.success(res, programs);
});

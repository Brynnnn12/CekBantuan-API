import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { registerUser, loginUser, getCurrentUser } from '../services/auth.service';
import { registerSchema, loginSchema } from '../requests/auth.requests';
import { ApiResponse } from '../../utils/apiResponse';
import { AuthRequest } from '../types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);
  const result = await registerUser(validatedData);

  ApiResponse.success(res, result, 'User berhasil didaftarkan', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);
  const result = await loginUser(validatedData);

  ApiResponse.success(res, result, 'Login berhasil');
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    ApiResponse.error(res, 'Unauthorized', 401);
    return;
  }

  const user = await getCurrentUser(userId);

  ApiResponse.success(res, user, 'Berhasil mengambil data user');
});

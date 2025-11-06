import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { verifyToken } from '../../utils/jwt';
import { ApiError } from '../../utils/apiError';
import prisma from '../../config/database';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Tidak ada token, akses ditolak');
  }

  try {
    const decoded = verifyToken(token);
    if (typeof decoded === 'string' || !decoded.id) {
      throw new ApiError(401, 'Token tidak valid');
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, username: true },
    });

    if (!user) {
      throw new ApiError(401, 'User tidak ditemukan');
    }

    req.user = user;
    next();
  } catch {
    throw new ApiError(401, 'Tidak diizinkan, token gagal');
  }
});

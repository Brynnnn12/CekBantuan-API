import prisma from '../../config/database';
import { AidProgram } from '../types';
import { PaginationUtil, PaginationOptions } from '../../utils/pagination';

export async function findAidProgramById(id: string) {
  return prisma.aidProgram.findUnique({
    where: { id },
    include: { admin: true, recipients: { include: { recipient: true } } },
  });
}

export async function findAllAidProgramsPaginated(options: PaginationOptions = {}) {
  const { skip, limit } = PaginationUtil.getPaginationOptions(options);
  const [data, total] = await Promise.all([
    prisma.aidProgram.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        admin: { select: { username: true } },
        recipients: {
          include: {
            recipient: {
              select: { nik: true, name: true, address: true },
            },
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.aidProgram.count(),
  ]);
  return PaginationUtil.createPaginationResult(data, total, options);
}

export async function findActiveAidProgramsPaginated(options: PaginationOptions = {}) {
  const { skip, limit } = PaginationUtil.getPaginationOptions(options);
  const [data, total] = await Promise.all([
    prisma.aidProgram.findMany({
      where: { status: 'ACTIVE' },
      include: { admin: true, recipients: { include: { recipient: true } } },
      skip,
      take: limit,
    }),
    prisma.aidProgram.count({ where: { status: 'ACTIVE' } }),
  ]);
  return PaginationUtil.createPaginationResult(data, total, options);
}

export async function createAidProgram(data: {
  name: string;
  description: string;
  status?: 'DRAFT' | 'ACTIVE';
  adminId: string;
}) {
  return prisma.aidProgram.create({
    data,
    include: { admin: true, recipients: { include: { recipient: true } } },
  });
}

export async function updateAidProgram(
  id: string,
  data: Partial<Omit<AidProgram, 'id' | 'admin' | 'recipients'>>,
) {
  return prisma.aidProgram.update({
    where: { id },
    data,
    include: { admin: true, recipients: { include: { recipient: true } } },
  });
}

export async function deleteAidProgram(id: string) {
  return prisma.aidProgram.delete({
    where: { id },
  });
}

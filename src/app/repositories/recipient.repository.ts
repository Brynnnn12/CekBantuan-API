import prisma from '../../config/database';
import { Recipient } from '../types';
import { PaginationUtil, PaginationOptions } from '../../utils/pagination';

export async function findRecipientById(id: string) {
  return prisma.recipient.findUnique({
    where: { id },
    include: { programs: true },
  });
}

export async function findRecipientByNik(nik: string) {
  return prisma.recipient.findUnique({
    where: { nik },
    include: { programs: true },
  });
}

export async function findAllRecipientsPaginated(options: PaginationOptions = {}) {
  const { skip, limit } = PaginationUtil.getPaginationOptions(options);
  const [data, total] = await Promise.all([
    prisma.recipient.findMany({
      select: {
        nik: true,
        name: true,
        address: true,
        notes: true,
        programs: {
          select: {
            program: {
              select: { name: true },
            },
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.recipient.count(),
  ]);
  return PaginationUtil.createPaginationResult(data, total, options);
}

export async function createRecipient(data: {
  nik: string;
  name: string;
  address: string;
  notes?: string;
}) {
  return prisma.recipient.create({
    data,
    include: { programs: true },
  });
}

export async function updateRecipient(
  id: string,
  data: Partial<Omit<Recipient, 'id' | 'programs'>>,
) {
  return prisma.recipient.update({
    where: { id },
    data,
    include: { programs: true },
  });
}

export async function deleteRecipient(id: string) {
  return prisma.recipient.delete({
    where: { id },
  });
}

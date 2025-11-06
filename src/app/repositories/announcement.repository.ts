import prisma from '../../config/database';
import { Announcement } from '../types';
import { PaginationUtil, PaginationOptions } from '../../utils/pagination';

export async function findAnnouncementById(id: string) {
  return prisma.announcement.findUnique({
    where: { id },
    select: {
      title: true,
      content: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });
}

export async function findAllAnnouncements() {
  return prisma.announcement.findMany({
    select: {
      title: true,
      content: true,
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findAllAnnouncementsPaginated(options: PaginationOptions = {}) {
  const { skip, limit } = PaginationUtil.getPaginationOptions(options);
  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      select: {
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.announcement.count(),
  ]);
  return PaginationUtil.createPaginationResult(data, total, options);
}

export async function findAnnouncementsByAuthor(authorId: string) {
  return prisma.announcement.findMany({
    where: { authorId },
    select: {
      title: true,
      content: true,
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createAnnouncement(data: {
  title: string;
  content: string;
  status?: 'DRAFT' | 'PUBLISHED';
  authorId: string;
}) {
  return prisma.announcement.create({
    data,
    select: {
      title: true,
      content: true,
    },
  });
}

export async function updateAnnouncement(
  id: string,
  data: Partial<Omit<Announcement, 'id' | 'createdAt' | 'author'>>,
) {
  return prisma.announcement.update({
    where: { id },
    data,
    select: {
      title: true,
      content: true,
    },
  });
}

export async function deleteAnnouncement(id: string) {
  return prisma.announcement.delete({
    where: { id },
  });
}

export async function findPublishedAnnouncements() {
  return prisma.announcement.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      title: true,
      content: true,
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

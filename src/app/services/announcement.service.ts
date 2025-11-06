import {
  findAnnouncementById,
  findAllAnnouncementsPaginated,
  findAnnouncementsByAuthor,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  findPublishedAnnouncements,
} from '../repositories/announcement.repository';
import {
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from '../requests/announcement.requests';

export async function getAllAnnouncements(page?: number, limit?: number) {
  return findAllAnnouncementsPaginated({ page, limit });
}

export async function getPublishedAnnouncements() {
  return findPublishedAnnouncements();
}

export async function getAnnouncementsByAuthor(authorId: string) {
  return findAnnouncementsByAuthor(authorId);
}

export async function getAnnouncementById(
  id: string,
): Promise<{ title: string; content: string; author: { username: string } } | null> {
  const announcement = await findAnnouncementById(id);
  if (!announcement) {
    throw new Error('Announcement tidak ditemukan');
  }
  return announcement;
}

export async function createNewAnnouncement(data: CreateAnnouncementRequest, authorId: string) {
  return createAnnouncement({
    ...data,
    authorId,
  });
}

export async function updateExistingAnnouncement(id: string, data: UpdateAnnouncementRequest) {
  const announcement = await findAnnouncementById(id);
  if (!announcement) {
    throw new Error('Announcement tidak ditemukan');
  }
  return updateAnnouncement(id, data);
}

export async function deleteExistingAnnouncement(id: string) {
  const announcement = await findAnnouncementById(id);
  if (!announcement) {
    throw new Error('Announcement tidak ditemukan');
  }
  return deleteAnnouncement(id);
}

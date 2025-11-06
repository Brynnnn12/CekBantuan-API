import prisma from '../../config/database';
import { User } from '../types';

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function createUser(data: { username: string; email: string; password: string }) {
  return prisma.user.create({
    data,
  });
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'announcements' | 'aidPrograms'>>,
) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

export async function findAllUsers() {
  return prisma.user.findMany();
}

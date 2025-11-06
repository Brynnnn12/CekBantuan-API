import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt';
import {
  findUserById,
  findUserByEmail,
  findUserByUsername,
  createUser,
} from '../repositories/user.repository';
import { RegisterRequest, LoginRequest } from '../requests/auth.requests';

export async function registerUser(data: RegisterRequest) {
  // Check if user already exists
  const existingEmail = await findUserByEmail(data.email);
  if (existingEmail) {
    throw new Error('Email sudah terdaftar');
  }

  const existingUsername = await findUserByUsername(data.username);
  if (existingUsername) {
    throw new Error('Username sudah digunakan');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  });

  // Generate token
  const token = generateToken({ id: user.id });

  return { user: { id: user.id, username: user.username, email: user.email }, token };
}

export async function loginUser(data: LoginRequest) {
  // Find user by email
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new Error('Email atau password salah');
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Email atau password salah');
  }

  // Generate token
  const token = generateToken({ id: user.id });

  return { user: { id: user.id, username: user.username, email: user.email }, token };
}

export async function getCurrentUser(userId: string) {
  const currentUser = await findUserById(userId);
  if (!currentUser) {
    throw new Error('User tidak ditemukan');
  }

  return { id: currentUser.id, username: currentUser.username, email: currentUser.email };
}

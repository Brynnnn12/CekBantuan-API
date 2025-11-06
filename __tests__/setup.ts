import dotenv from 'dotenv';
import prisma from '../src/config/database';

// Load test environment
dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  // Setup before all tests
});

afterAll(async () => {
  // Cleanup after all tests
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Setup before each test - clean database in correct order
  await prisma.programRecipient.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.aidProgram.deleteMany();
  await prisma.recipient.deleteMany();
  await prisma.user.deleteMany();
});

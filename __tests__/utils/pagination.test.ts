import request from 'supertest';
import prisma from '../../src/config/database';
import app from '../../src/config/app';

describe('Pagination', () => {
  beforeAll(async () => {
    // Create test data
    await prisma.user.createMany({
      data: [
        {
          username: 'user1',
          email: 'user1@example.com',
          password: '$2b$10$hashedpassword1',
        },
        {
          username: 'user2',
          email: 'user2@example.com',
          password: '$2b$10$hashedpassword2',
        },
        {
          username: 'user3',
          email: 'user3@example.com',
          password: '$2b$10$hashedpassword3',
        },
      ],
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.user.deleteMany();
  });

  describe('GET /api/recipients with pagination', () => {
    it('should return paginated results', async () => {
      const response = await request(app).get('/api/recipients?page=1&limit=2').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toHaveProperty('page', 1);
      expect(response.body.pagination).toHaveProperty('limit', 2);
      expect(response.body.pagination).toHaveProperty('total');
      expect(response.body.pagination).toHaveProperty('totalPages');
    });

    it('should return correct page data', async () => {
      const response = await request(app).get('/api/recipients?page=2&limit=1').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeLessThanOrEqual(1);
      expect(response.body.pagination.page).toBe(2);
    });

    it('should handle invalid page numbers', async () => {
      const response = await request(app).get('/api/recipients?page=999&limit=10').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.pagination.page).toBe(999);
    });
  });

  describe('GET /api/programs with pagination', () => {
    it('should return paginated aid programs', async () => {
      const response = await request(app).get('/api/programs?page=1&limit=5').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
    });
  });
});

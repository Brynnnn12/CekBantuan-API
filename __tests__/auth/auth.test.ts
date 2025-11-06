import request from 'supertest';
import prisma from '../../src/config/database';
import app from '../../src/config/app';

describe('Auth API', () => {
  beforeAll(async () => {
    // Create test user
    await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: '$2b$10$hashedpassword', // Pre-hashed password
      },
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/auth/register').send(userData).expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.email).toBe(userData.email);
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com', // Same as testUser
        password: 'password123',
      };

      const response = await request(app).post('/api/auth/register').send(userData).expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/auth/login').send(loginData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user).toHaveProperty('id');
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app).post('/api/auth/login').send(loginData).expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/me', () => {
    let token: string;

    beforeAll(async () => {
      // Login to get token
      const loginResponse = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      token = loginResponse.body.data.token;
    });

    it('should get current user info', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('test@example.com');
    });

    it('should return error without token', async () => {
      const response = await request(app).get('/api/auth/me').expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});

import request from 'supertest';
import app from '../src/config/app';

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/v1/auth/register').send(userData).expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User berhasil didaftarkan');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.username).toBe(userData.username);
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      // Create first user
      await request(app).post('/api/v1/auth/register').send(userData).expect(201);

      // Try to create duplicate
      const response = await request(app).post('/api/v1/auth/register').send(userData).expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      await request(app).post('/api/v1/auth/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should login with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/v1/auth/login').send(loginData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login berhasil');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user).toHaveProperty('id');
    });

    it('should return error for wrong password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app).post('/api/v1/auth/login').send(loginData).expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});

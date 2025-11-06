# Backend Bansos Desa

Backend API untuk sistem manajemen bantuan sosial desa (Bansos Desa) yang dibangun dengan Node.js, TypeScript, Express.js, dan Prisma ORM.

## Features

- ✅ Autentikasi JWT dengan role-based access
- ✅ CRUD lengkap untuk Announcement, Recipient, Aid Program
- ✅ Pagination untuk semua list endpoints
- ✅ Validasi request dengan Zod
- ✅ Error handling terstruktur
- ✅ Logging dengan Winston
- ✅ Rate limiting
- ✅ File upload support
- ✅ Testing dengan Jest & Supertest
- ✅ Database migration dengan Prisma

## Tech Stack

### Runtime & Framework

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework untuk Node.js

### Database

- **MySQL** - Relational database
- **Prisma** - ORM untuk TypeScript & Node.js

### Authentication & Security

- **JWT (jsonwebtoken)** - JSON Web Tokens untuk autentikasi
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Protection dari abuse

### Validation & Error Handling

- **Zod** - Schema validation
- **express-async-handler** - Async error handling
- **Winston** - Logging library

### Development Tools

- **Nodemon** - Auto-restart development server
- **Jest** - Testing framework
- **Supertest** - HTTP endpoint testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### File Handling

- **Multer** - File upload middleware
- **Morgan** - HTTP request logger

## Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda memiliki:

- **Node.js** versi 18 atau lebih tinggi
- **npm** atau **yarn** package manager
- **MySQL** server versi 8.0 atau lebih tinggi
- **Git** untuk version control

## Installation

Ikuti langkah-langkah berikut untuk setup project:

### 1. Clone Repository

```bash
git clone <repository-url>
cd backend-bansosdesa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy file `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Edit file `.env` dan isi nilai yang diperlukan:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="mysql://username:password@localhost:3306/db_kamu"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Setup Database

#### Buat Database MySQL

```sql
CREATE DATABASE db_kamu;
```

#### Generate Prisma Client

```bash
npm run prisma:generate
```

#### Jalankan Migration

```bash
npm run prisma:migrate
```

Atau untuk development:

```bash
npm run prisma:reset
```

### 5. Setup Git Hooks (Opsional)

```bash
npm run prepare
```

## Environment Variables

| Variable                  | Description                      | Default       |
| ------------------------- | -------------------------------- | ------------- |
| `NODE_ENV`                | Environment mode                 | `development` |
| `PORT`                    | Server port                      | `5000`        |
| `DATABASE_URL`            | MySQL connection string          | Required      |
| `JWT_SECRET`              | Secret key untuk JWT             | Required      |
| `JWT_EXPIRES_IN`          | JWT expiration time              | `7d`          |
| `MAX_FILE_SIZE`           | Maximum file upload size (bytes) | `5242880`     |
| `UPLOAD_DIR`              | Directory untuk file uploads     | `uploads`     |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window (ms)           | `900000`      |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window          | `100`         |

## Running the Application

### Development Mode

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000` dengan auto-restart saat file berubah.

### Production Mode

```bash
npm run build
npm start
```

### Database Management

```bash
# Buka Prisma Studio (GUI database)
npm run prisma:studio

# Reset database (development only)
npm run prisma:reset

# Buat migration baru
npm run prisma:migrate
```

## API Documentation

Base URL: `http://localhost:5000/api/v1`

### Authentication

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

### Announcements

#### Get All Announcements

```http
GET /api/v1/announcements?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Announcement by ID

```http
GET /api/v1/announcements/:id
Authorization: Bearer <token>
```

#### Create Announcement

```http
POST /api/v1/announcements
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Pengumuman Bansos",
  "content": "Konten pengumuman...",
  "status": "DRAFT"
}
```

#### Update Announcement

```http
PUT /api/v1/announcements/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Announcement

```http
DELETE /api/v1/announcements/:id
Authorization: Bearer <token>
```

### Recipients

#### Get All Recipients

```http
GET /api/v1/recipients?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Recipient by ID

```http
GET /api/v1/recipients/:id
Authorization: Bearer <token>
```

#### Get Recipient by NIK

```http
GET /api/v1/recipients/nik/:nik
Authorization: Bearer <token>
```

#### Create Recipient

```http
POST /api/v1/recipients
Authorization: Bearer <token>
Content-Type: application/json

{
  "nik": "1234567890123456",
  "name": "John Doe",
  "address": "Jl. Example No. 123",
  "notes": "Catatan tambahan"
}
```

#### Update Recipient

```http
PUT /api/v1/recipients/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "address": "Updated Address"
}
```

#### Delete Recipient

```http
DELETE /api/v1/recipients/:id
Authorization: Bearer <token>
```

### Aid Programs

#### Get All Aid Programs

```http
GET /api/v1/aid-programs?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Active Aid Programs

```http
GET /api/v1/aid-programs/active?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Aid Program by ID

```http
GET /api/v1/aid-programs/:id
Authorization: Bearer <token>
```

#### Create Aid Program

```http
POST /api/v1/aid-programs
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Program Beras",
  "description": "Bantuan beras 10kg per bulan",
  "status": "DRAFT"
}
```

#### Update Aid Program

```http
PUT /api/v1/aid-programs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Program Name",
  "status": "ACTIVE"
}
```

#### Delete Aid Program

```http
DELETE /api/v1/aid-programs/:id
Authorization: Bearer <token>
```

### Program Recipients

#### Assign Recipient to Program

```http
POST /api/v1/program-recipients
Authorization: Bearer <token>
Content-Type: application/json

{
  "programId": "program-uuid",
  "recipientId": "recipient-uuid"
}
```

#### Remove Recipient Assignment

```http
DELETE /api/v1/program-recipients
Authorization: Bearer <token>
Content-Type: application/json

{
  "programId": "program-uuid",
  "recipientId": "recipient-uuid"
}
```

#### Get Recipients by Program

```http
GET /api/v1/program-recipients/program/:programId
Authorization: Bearer <token>
```

#### Get Programs by Recipient

```http
GET /api/v1/program-recipients/recipient/:recipientId
Authorization: Bearer <token>
```

### Response Format

Semua API responses menggunakan format standar:

#### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... } // hanya untuk list endpoints
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## Testing

### Unit Tests

Jalankan unit tests untuk utilities:

```bash
npm run test:unit
```

### Integration Tests

Jalankan semua tests termasuk database:

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## Project Structure

```
backend-bansosdesa/
├── src/
│   ├── app/
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── repositories/    # Database operations
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── requests/        # Zod validation schemas
│   │   └── types/           # TypeScript interfaces
│   ├── config/              # Configuration files
│   ├── utils/               # Utility functions
│   └── server.ts            # Server entry point
├── __tests__/               # Test files
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── .env                     # Environment variables
├── .env.test                # Test environment variables
├── jest.config.js           # Jest configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 brynnn12

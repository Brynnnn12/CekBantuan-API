import dotenv from 'dotenv';
import prisma from '../src/config/database';

// Memuat konfigurasi environment untuk testing
// Menggunakan file .env.test agar database test terpisah dari production
dotenv.config({ path: '.env.test' });

// Setup global sebelum semua test suite dijalankan
beforeAll(async () => {
  try {
    // Memastikan koneksi database tersedia untuk testing
    await prisma.$connect();
    console.log('Database test terhubung');
  } catch (error) {
    console.error('Gagal menghubungkan database test:', error);
    throw error; // Hentikan test jika koneksi gagal
  }
});

// Cleanup global setelah semua test suite selesai
afterAll(async () => {
  try {
    // Memutus koneksi database untuk membersihkan resource
    await prisma.$disconnect();
    console.log('Database test terputus');
  } catch (error) {
    console.error('Error saat memutus koneksi database:', error);
  }
});

// Setup sebelum setiap test case
// Membersihkan data untuk memastikan test independen dan tidak terpengaruh data sebelumnya
beforeEach(async () => {
  try {
    // Hapus data dalam urutan yang benar untuk menghindari foreign key constraint errors
    // Mulai dari tabel junction/relasi, lalu tabel utama

    // 1. Hapus relasi program-recipient terlebih dahulu
    await prisma.programRecipient.deleteMany();

    // 2. Hapus announcements (tidak bergantung pada tabel lain)
    await prisma.announcement.deleteMany();

    // 3. Hapus aid programs (tidak bergantung pada recipient langsung)
    await prisma.aidProgram.deleteMany();

    // 4. Hapus recipients (tidak bergantung pada user)
    await prisma.recipient.deleteMany();

    // 5. Hapus users terakhir (karena tabel lain mereferensi user)
    await prisma.user.deleteMany();

    console.log('Database dibersihkan untuk test baru');
  } catch (error) {
    console.error('Error saat membersihkan database:', error);
    throw error; // Hentikan test jika cleanup gagal
  }
});

// Opsional: Cleanup setelah setiap test jika diperlukan
// afterEach(async () => {
//   // Tambahkan cleanup spesifik per test jika diperlukan
// });

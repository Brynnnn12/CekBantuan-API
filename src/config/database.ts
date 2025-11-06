import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

prisma
  .$connect()
  .then(() => {
    logger.info('Database Berhasil Terhubung');
  })
  .catch((error: Error) => {
    logger.error('Database gagal terhubung:', error);
    process.exit(1);
  });

export default prisma;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Conexão bem-sucedida!');
  } catch (e) {
    console.error('Erro ao conectar:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();

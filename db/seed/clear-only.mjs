import { PrismaClient } from '@prisma/client';
import { clearDB } from './seed-helpers/cleardb.mjs';

const prisma = new PrismaClient();

async function main() {
  await clearDB(prisma)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

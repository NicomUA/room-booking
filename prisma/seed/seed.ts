import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.room.createMany({
    data: [{ name: 'Room A' }, { name: 'Room B' }],
  });

  await prisma.user.createMany({
    data: [
      { email: 'HfGpV@example.com', name: 'John Doe', password: 'password' },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

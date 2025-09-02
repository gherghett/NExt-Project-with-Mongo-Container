import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed users
  const users = await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
    ],
  });

  // Get created users
  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  const bob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } });

  // Seed posts
  if (alice && bob) {
    await prisma.post.createMany({
      data: [
        { title: 'Hello World', content: 'First post!', authorId: alice.id },
        { title: 'Another Post', content: 'Second post!', authorId: bob.id },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

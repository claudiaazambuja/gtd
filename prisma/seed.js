import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
  const user = await prisma.User.create({
      data: {
        Username: faker.internet.username(),
        Email: faker.internet.email(),
        PasswordHash: faker.internet.password(),
      },
    });

  await prisma.Inbox.create({
      data: {
        Content: faker.lorem.sentence(),
        IdUser: user.IdUser,
      },
    });

  const note = await prisma.Note.create({
      data: {
        Content: faker.lorem.paragraph(),
        ReviewDate: faker.date.future(),
        Tags: faker.word.words(3),
        IdUser: user.IdUser,
      },
    });

  const project = await prisma.Project.create({
      data: {
        Name: faker.commerce.productName(),
        Goal: faker.lorem.sentence()
      },
    });

  await prisma.Task.create({
      data: {
        Title: faker.lorem.words(3),
        Description: faker.lorem.sentences(2),
        DueDate: faker.date.future(),
        Status: 'pending',
        Context: faker.word.adjective(),
        IdProject: project.IdProject,
        IdNote: note.IdNote,
      },
    });
  }
}

main()
  .then(() => console.log('✅ Seed finalizado.'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

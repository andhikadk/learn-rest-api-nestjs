import { PrismaClient } from '@prisma/client';

import { majors } from './majors';
import { students } from './students';

const prisma = new PrismaClient();

async function main() {
  for (const major of majors) {
    await prisma.major.create({
      data: major,
    });
  }
  for (const student of students) {
    await prisma.student.create({
      data: student,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

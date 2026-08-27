import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.journalEntry.deleteMany();
  await prisma.artwork.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.session.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const admin = await prisma.user.create({
    data: { role: 'admin', name: 'Admin User', email: 'admin@deckoviz.com' }
  });
  
  const teacher = await prisma.user.create({
    data: { role: 'teacher', name: 'Mr. Smith', email: 'smith@school.edu' }
  });

  const student = await prisma.user.create({
    data: { role: 'student', name: 'Alex Rider', email: 'alex@school.edu' }
  });

  // Create Classes
  const class1 = await prisma.class.create({
    data: {
      name: 'Year 9 Science',
      subject: 'Science',
      gradeLevel: 'Year 9',
      teacherId: teacher.id
    }
  });

  const class2 = await prisma.class.create({
    data: {
      name: 'Year 9 English',
      subject: 'English',
      gradeLevel: 'Year 9',
      teacherId: teacher.id
    }
  });

  // Create Collections
  const collection1 = await prisma.collection.create({
    data: {
      title: 'Solar System Artworks',
      description: 'A collection of generated planetary textures and space environments for the science project.',
      color: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
      userId: student.id,
      artworks: {
        create: [
          { title: 'Mars Surface', type: 'image', color: 'linear-gradient(135deg, #ff7e5f, #feb47b)' },
          { title: 'Jupiter Storms', type: 'image', color: 'linear-gradient(135deg, #8e2de2, #4a00e0)' }
        ]
      }
    }
  });

  // Create a Journal Entry
  await prisma.journalEntry.create({
    data: {
      studentId: student.id,
      content: 'I felt really focused today during the quantum physics simulation. Vizzy explained quarks in a way that finally made sense.',
      sentiment: 'positive',
      tags: JSON.stringify(['physics', 'focus', 'breakthrough'])
    }
  });

  console.log('Database seeded successfully!');
  console.log({ admin: admin.id, teacher: teacher.id, student: student.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

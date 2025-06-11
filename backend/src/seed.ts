import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create sample users
    await prisma.user.createMany({
      data: [
        {
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        },
        {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user'
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'viewer'
        }
      ]
    });

    console.log('✅ Sample data created!');
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
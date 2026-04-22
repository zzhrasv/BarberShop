const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkGallery() {
  try {
    const gallery = await prisma.gallery.findMany();
    console.log('Gallery records:', gallery);
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkGallery();

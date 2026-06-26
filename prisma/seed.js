import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Clear existing services to prevent duplicates
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      { name: 'Reguler Haircut', price: 30000, category: 'Haircut', description: 'Haircut, Wash, Hairtonic, Styling tanpa produk' },
      { name: 'Premium Haircut', price: 40000, category: 'Haircut', description: 'Haircut, Wash, Hairtonic, Head massage, Vitamin rambut, Styling produk' },
      { name: 'Reborn Package', price: 55000, category: 'Package', description: 'Haircut, Wash, Hairtonic, Hot towel, Head massage, Vitamin, Styling produk' },
      { name: 'Colouring Basic', price: 80000, category: 'Colouring', description: 'Basic Hair Colouring' },
      { name: 'Colouring Fashion', price: 165000, category: 'Colouring', description: 'Fashion Hair Colouring (Start from)' },
      { name: 'Creambath', price: 40000, category: 'Treatment', description: 'Creambath Treatment' },
      { name: 'Shaving', price: 10000, category: 'Shaving', description: 'Beard / Mustache Shaving' },
      { name: 'Perming', price: 100000, category: 'Treatment', description: 'Hair Perming (Est. Price)' },
      { name: 'Kids Haircut', price: 25000, category: 'Haircut', description: 'Haircut, Wash, Hairtonic' },
    ],
  });

  // Create default admin
  const hashedPassword = await bcrypt.hash('adminpassword123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@egnin.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@egnin.com',
      password: hashedPassword,
    },
  });

  console.log('Seed data inserted, including admin@egnin.com');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

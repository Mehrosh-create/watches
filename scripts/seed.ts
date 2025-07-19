// scripts/seed.ts
import { connectToDB } from '@/lib/models/database';
import { Product } from '@/lib/models/product';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';

const sampleProducts = [
  {
    name: 'Classic Leather Watch',
    price: 199.99,
    description: 'Premium leather strap with stainless steel case',
    images: ['/products/watch1.jpg'],
    category: 'watches',
    featured: true,
    inStock: true,
  },
  {
    name: 'Minimalist Analog Watch',
    price: 149.99,
    description: 'Sleek design with Japanese movement',
    images: ['/products/watch2.jpg'],
    category: 'watches',
    inStock: true,
  },
  // Add more products as needed
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
};

async function seedDatabase() {
  try {
    await connectToDB();
    console.log('Connected to database');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Seed products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${createdProducts.length} products`);

    // Seed admin user
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({
      ...adminUser,
      password: hashedPassword,
    });
    console.log('Seeded admin user');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@presentation-site.local' },
    update: {},
    create: {
      email: 'admin@presentation-site.local',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', admin);

  // Create default site config
  const siteConfig = await prisma.siteConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Nail Art Presentation',
      siteTagline: 'Professional Nail Art Services',
      description: 'Showcase your nail art portfolio with our beautiful presentation site.',
      primaryColor: '#9333ea',
      secondaryColor: '#64748b',
      theme: 'light',
    },
  });
  console.log('Created site config:', siteConfig);

  // Create sample pages
  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      slug: 'about',
      title: 'About Us',
      content: 'Welcome to our nail art studio. We specialize in creating beautiful, unique nail designs tailored to your style and preferences.',
      metaTitle: 'About Our Nail Art Studio',
      metaDescription: 'Learn about our professional nail art services and team.',
      published: true,
    },
  });
  console.log('Created about page:', aboutPage);

  // Create sample gallery images
  const galleryImages = await Promise.all([
    prisma.galleryImage.upsert({
      where: { id: 'gallery-1' },
      update: {},
      create: {
        id: 'gallery-1',
        title: 'Classic Red Nails',
        description: 'Elegant classic red nail design',
        imageUrl: 'https://via.placeholder.com/400x400?text=Red+Nails',
        category: 'classic',
        order: 1,
        published: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'gallery-2' },
      update: {},
      create: {
        id: 'gallery-2',
        title: 'Glitter Design',
        description: 'Sparkling glitter nail art',
        imageUrl: 'https://via.placeholder.com/400x400?text=Glitter+Nails',
        category: 'glitter',
        order: 2,
        published: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'gallery-3' },
      update: {},
      create: {
        id: 'gallery-3',
        title: 'Floral Pattern',
        description: 'Beautiful floral nail design',
        imageUrl: 'https://via.placeholder.com/400x400?text=Floral+Nails',
        category: 'floral',
        order: 3,
        published: true,
      },
    }),
  ]);
  console.log('Created gallery images:', galleryImages);

  // Create sample services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service-1' },
      update: {},
      create: {
        id: 'service-1',
        name: 'Basic Manicure',
        description: 'Professional manicure with nail polish',
        price: 25,
        duration: '45 minutes',
        order: 1,
        published: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-2' },
      update: {},
      create: {
        id: 'service-2',
        name: 'Gel Manicure',
        description: 'Long-lasting gel manicure',
        price: 45,
        duration: '60 minutes',
        order: 2,
        published: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-3' },
      update: {},
      create: {
        id: 'service-3',
        name: 'Nail Art Design',
        description: 'Custom nail art design',
        price: 60,
        duration: '90 minutes',
        order: 3,
        published: true,
      },
    }),
  ]);
  console.log('Created services:', services);

  // Create sample testimonial
  const testimonial = await prisma.testimonial.upsert({
    where: { id: 'testimonial-1' },
    update: {},
    create: {
      id: 'testimonial-1',
      clientName: 'Sarah Johnson',
      clientRole: 'Happy Customer',
      content: 'The nail art work is absolutely stunning! I get compliments everywhere I go. Highly recommended!',
      rating: 5,
      published: true,
    },
  });
  console.log('Created testimonial:', testimonial);

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


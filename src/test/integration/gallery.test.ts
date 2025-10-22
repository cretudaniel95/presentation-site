import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/db';

describe('Gallery API Integration', () => {
  const testImageData = {
    title: 'Test Image',
    description: 'A test gallery image',
    imageUrl: 'https://example.com/image.jpg',
    imageAlt: 'Test Alt Text',
    category: 'test',
    order: 1,
    published: true,
  };

  let createdImageId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.galleryImage.deleteMany({
      where: { category: 'test' },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.galleryImage.deleteMany({
      where: { category: 'test' },
    });
  });

  it('should create a gallery image', async () => {
    const image = await prisma.galleryImage.create({
      data: testImageData,
    });

    createdImageId = image.id;
    expect(image).toBeDefined();
    expect(image.title).toBe(testImageData.title);
    expect(image.category).toBe('test');
  });

  it('should retrieve gallery images', async () => {
    const images = await prisma.galleryImage.findMany({
      where: { category: 'test' },
    });

    expect(images).toHaveLength(1);
    expect(images[0].title).toBe(testImageData.title);
  });

  it('should update a gallery image', async () => {
    const updatedImage = await prisma.galleryImage.update({
      where: { id: createdImageId },
      data: { title: 'Updated Title' },
    });

    expect(updatedImage.title).toBe('Updated Title');
  });

  it('should delete a gallery image', async () => {
    await prisma.galleryImage.delete({
      where: { id: createdImageId },
    });

    const image = await prisma.galleryImage.findUnique({
      where: { id: createdImageId },
    });

    expect(image).toBeNull();
  });

  it('should filter images by category', async () => {
    // Create test images
    await prisma.galleryImage.createMany({
      data: [
        { ...testImageData, title: 'Image 1', category: 'test' },
        { ...testImageData, title: 'Image 2', category: 'other' },
      ],
    });

    const testImages = await prisma.galleryImage.findMany({
      where: { category: 'test' },
    });

    expect(testImages.length).toBeGreaterThan(0);
    testImages.forEach((img) => {
      expect(img.category).toBe('test');
    });

    // Clean up
    await prisma.galleryImage.deleteMany({
      where: { category: 'test' },
    });
  });

  it('should filter images by published status', async () => {
    // Create test images
    await prisma.galleryImage.createMany({
      data: [
        { ...testImageData, title: 'Published', published: true },
        { ...testImageData, title: 'Draft', published: false },
      ],
    });

    const publishedImages = await prisma.galleryImage.findMany({
      where: { published: true, category: 'test' },
    });

    expect(publishedImages.length).toBeGreaterThan(0);
    publishedImages.forEach((img) => {
      expect(img.published).toBe(true);
    });

    // Clean up
    await prisma.galleryImage.deleteMany({
      where: { category: 'test' },
    });
  });
});


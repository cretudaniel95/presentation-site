import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { galleryImageSchema } from '@/lib/validations';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const published = searchParams.get('published') === 'true';

    const where: any = {};
    if (category) where.category = category;
    if (published) where.published = true;

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return successResponse(images, 'Gallery images fetched successfully');
  } catch (error) {
    console.error('Gallery GET error:', error);
    return errorResponse('Failed to fetch gallery images', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = galleryImageSchema.parse(body);

    const image = await prisma.galleryImage.create({
      data: validatedData,
    });

    return successResponse(image, 'Gallery image created successfully', 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    console.error('Gallery POST error:', error);
    return errorResponse('Failed to create gallery image', 500);
  }
}


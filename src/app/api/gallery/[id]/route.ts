import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { galleryImageSchema } from '@/lib/validations';
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/utils/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    });

    if (!image) {
      return notFoundResponse();
    }

    return successResponse(image, 'Gallery image fetched successfully');
  } catch (error) {
    console.error('Gallery GET error:', error);
    return errorResponse('Failed to fetch gallery image', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = galleryImageSchema.parse(body);

    const image = await prisma.galleryImage.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(image, 'Gallery image updated successfully');
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    if (error.code === 'P2025') {
      return notFoundResponse();
    }
    console.error('Gallery PUT error:', error);
    return errorResponse('Failed to update gallery image', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.galleryImage.delete({
      where: { id: params.id },
    });

    return successResponse(null, 'Gallery image deleted successfully');
  } catch (error: any) {
    if (error.code === 'P2025') {
      return notFoundResponse();
    }
    console.error('Gallery DELETE error:', error);
    return errorResponse('Failed to delete gallery image', 500);
  }
}


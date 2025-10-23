import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { pageSchema } from '@/lib/validations';
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/utils/api-response';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const page = await prisma.page.findUnique({
      where: { id: params.id },
    });

    if (!page) {
      return notFoundResponse();
    }

    return successResponse(page, 'Page fetched successfully');
  } catch (error) {
    console.error('Page GET error:', error);
    return errorResponse('Failed to fetch page', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = pageSchema.parse(body);

    const page = await prisma.page.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(page, 'Page updated successfully');
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    if (error.code === 'P2025') {
      return notFoundResponse();
    }
    console.error('Page PUT error:', error);
    return errorResponse('Failed to update page', 500);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.page.delete({
      where: { id: params.id },
    });

    return successResponse(null, 'Page deleted successfully');
  } catch (error: any) {
    if (error.code === 'P2025') {
      return notFoundResponse();
    }
    console.error('Page DELETE error:', error);
    return errorResponse('Failed to delete page', 500);
  }
}


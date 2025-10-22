import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, notFoundResponse } from '@/utils/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: params.id },
    });

    if (!message) {
      return notFoundResponse();
    }

    return successResponse(message, 'Message fetched successfully');
  } catch (error) {
    console.error('Contact GET error:', error);
    return errorResponse('Failed to fetch message', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { read } = body;

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { read: read ?? undefined },
    });

    return successResponse(message, 'Message updated successfully');
  } catch (error: any) {
    if (error.code === 'P2025') {
      return notFoundResponse();
    }
    console.error('Contact PUT error:', error);
    return errorResponse('Failed to update message', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contactMessage.delete({
      where: { id: params.id },
    });

    return successResponse(null, 'Message deleted successfully');
  } catch (error: any) {
    if (error.code === 'P2025') {
      return notFoundResponse();
    }
    console.error('Contact DELETE error:', error);
    return errorResponse('Failed to delete message', 500);
  }
}


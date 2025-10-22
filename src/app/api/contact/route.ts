import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { contactFormSchema } from '@/lib/validations';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: validatedData,
    });

    return successResponse(message, 'Message sent successfully', 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    console.error('Contact POST error:', error);
    return errorResponse('Failed to send message', 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(messages, 'Messages fetched successfully');
  } catch (error) {
    console.error('Contact GET error:', error);
    return errorResponse('Failed to fetch messages', 500);
  }
}


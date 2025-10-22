import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { pageSchema } from '@/lib/validations';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') === 'true';

    const where: any = {};
    if (published) where.published = true;

    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(pages, 'Pages fetched successfully');
  } catch (error) {
    console.error('Pages GET error:', error);
    return errorResponse('Failed to fetch pages', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = pageSchema.parse(body);

    const page = await prisma.page.create({
      data: validatedData,
    });

    return successResponse(page, 'Page created successfully', 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    console.error('Pages POST error:', error);
    return errorResponse('Failed to create page', 500);
  }
}


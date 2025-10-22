import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { siteConfigSchema } from '@/lib/validations';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/api-response';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    let config = await prisma.siteConfig.findFirst();

    if (!config) {
      // Create default config if it doesn't exist
      config = await prisma.siteConfig.create({
        data: {
          siteName: 'Presentation Site',
          siteTagline: 'Your professional presentation site',
          primaryColor: '#9333ea',
          secondaryColor: '#64748b',
          theme: 'light',
        },
      });
    }

    return successResponse(config, 'Site configuration fetched successfully');
  } catch (error) {
    logger.error('Config GET error', error as Error);
    return errorResponse('Failed to fetch site configuration', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = siteConfigSchema.parse(body);

    let config = await prisma.siteConfig.findFirst();

    if (!config) {
      config = await prisma.siteConfig.create({
        data: validatedData,
      });
    } else {
      config = await prisma.siteConfig.update({
        where: { id: config.id },
        data: validatedData,
      });
    }

    logger.info('Site configuration updated');
    return successResponse(config, 'Site configuration updated successfully');
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    logger.error('Config PUT error', error);
    return errorResponse('Failed to update site configuration', 500);
  }
}


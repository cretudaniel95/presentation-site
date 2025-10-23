import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { siteConfigSchema } from '@/lib/validations';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/api-response';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    let config = await prisma.siteConfig.findFirst();

    if (!config) {
      // Create default config if it doesn't exist with section-specific colors
      config = await prisma.siteConfig.create({
        data: {
          siteName: 'Presentation Site',
          siteTagline: 'Your professional presentation site',
          theme: 'light',

          // Header
          headerBgColor: '#ffffff',
          headerTextColor: '#1e293b',

          // Hero
          heroTitleColor: '#1e293b',
          heroTextColor: '#64748b',
          heroButtonBgColor: '#9333ea',
          heroButtonTextColor: '#ffffff',
          heroButtonStyle: 'filled',

          // About
          aboutBgColor: '#ffffff',
          aboutTitleColor: '#1e293b',
          aboutTextColor: '#64748b',

          // Gallery
          galleryBgColor: '#f8fafc',
          galleryTitleColor: '#1e293b',
          galleryTextColor: '#64748b',
          galleryCardBgColor: '#ffffff',

          // Contact
          contactBgColor: '#ffffff',
          contactTitleColor: '#1e293b',
          contactTextColor: '#64748b',
          contactButtonBgColor: '#9333ea',
          contactButtonTextColor: '#ffffff',

          // Footer
          footerBgColor: '#64748b',
          footerTextColor: '#ffffff',
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


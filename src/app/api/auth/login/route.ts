import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { loginSchema } from '@/lib/validations';
import { verifyPassword } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse, unauthorizedResponse } from '@/utils/api-response';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      logger.warn('Login attempt with non-existent email', { email: validatedData.email });
      return unauthorizedResponse();
    }

    const isPasswordValid = await verifyPassword(validatedData.password, user.password);

    if (!isPasswordValid) {
      logger.warn('Login attempt with invalid password', { email: validatedData.email });
      return unauthorizedResponse();
    }

    logger.info('User logged in successfully', { userId: user.id, email: user.email });

    // TODO: Create session/JWT token
    // For now, return user data
    const { password, ...userWithoutPassword } = user;

    return successResponse(
      {
        user: userWithoutPassword,
        // token: generateToken(user),
      },
      'Login successful'
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    logger.error('Login error', error);
    return errorResponse('Failed to login', 500);
  }
}


import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { registerSchema } from '@/lib/validations';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/utils/api-response';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      logger.warn('Registration attempt with existing email', { email: validatedData.email });
      return errorResponse('Email already in use', 400, 'Registration failed');
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        role: 'admin',
      },
    });

    logger.info('User registered successfully', { userId: user.id, email: user.email });

    const { password, ...userWithoutPassword } = user;

    return successResponse(
      {
        user: userWithoutPassword,
      },
      'Registration successful',
      201
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors[0].message);
    }
    logger.error('Registration error', error);
    return errorResponse('Failed to register', 500);
  }
}


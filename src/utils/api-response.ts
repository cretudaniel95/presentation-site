import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export function successResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  error: string,
  status: number = 400,
  message: string = 'Error'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status }
  );
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return errorResponse('Unauthorized', 401, 'Authentication required');
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return errorResponse('Forbidden', 403, 'Access denied');
}

export function notFoundResponse(): NextResponse<ApiResponse> {
  return errorResponse('Not found', 404, 'Resource not found');
}

export function validationErrorResponse(error: string): NextResponse<ApiResponse> {
  return errorResponse(error, 422, 'Validation error');
}

export function internalErrorResponse(): NextResponse<ApiResponse> {
  return errorResponse('Internal server error', 500, 'Something went wrong');
}

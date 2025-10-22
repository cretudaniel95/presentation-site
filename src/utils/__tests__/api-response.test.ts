import { describe, it, expect } from 'vitest';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  validationErrorResponse,
  internalErrorResponse,
} from '../api-response';

describe('API Response Handlers', () => {
  describe('successResponse', () => {
    it('should return success response with data', async () => {
      const data = { id: '1', name: 'Test' };
      const response = successResponse(data, 'Success', 200);
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.message).toBe('Success');
      expect(json.data).toEqual(data);
      expect(response.status).toBe(200);
    });

    it('should return success response with default message', async () => {
      const response = successResponse({ id: '1' });
      const json = await response.json();

      expect(json.message).toBe('Success');
    });
  });

  describe('errorResponse', () => {
    it('should return error response', async () => {
      const response = errorResponse('Something went wrong', 400, 'Error');
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(json.error).toBe('Something went wrong');
      expect(json.message).toBe('Error');
      expect(response.status).toBe(400);
    });
  });

  describe('unauthorizedResponse', () => {
    it('should return 401 unauthorized response', async () => {
      const response = unauthorizedResponse();
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(401);
    });
  });

  describe('forbiddenResponse', () => {
    it('should return 403 forbidden response', async () => {
      const response = forbiddenResponse();
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(403);
    });
  });

  describe('notFoundResponse', () => {
    it('should return 404 not found response', async () => {
      const response = notFoundResponse();
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('validationErrorResponse', () => {
    it('should return 422 validation error response', async () => {
      const response = validationErrorResponse('Invalid input');
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(422);
    });
  });

  describe('internalErrorResponse', () => {
    it('should return 500 internal error response', async () => {
      const response = internalErrorResponse();
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(500);
    });
  });
});


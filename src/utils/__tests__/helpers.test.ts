import { describe, it, expect } from 'vitest';
import { cn, slugify, truncate, isValidEmail, formatDate } from '../helpers';

describe('Helper Functions', () => {
  describe('cn', () => {
    it('should merge classnames correctly', () => {
      const result = cn('px-2', 'py-1', { 'bg-red-500': true });
      expect(result).toContain('px-2');
      expect(result).toContain('py-1');
      expect(result).toContain('bg-red-500');
    });

    it('should handle tailwind merge conflicts', () => {
      const result = cn('px-2 px-4');
      expect(result).toContain('px-4');
    });
  });

  describe('slugify', () => {
    it('should convert text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Hello  World')).toBe('hello-world');
    });

    it('should remove special characters', () => {
      expect(slugify('Hello@World!')).toBe('helloworld');
    });

    it('should handle empty strings', () => {
      expect(slugify('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('should truncate text longer than specified length', () => {
      const result = truncate('Hello World', 5);
      expect(result).toBe('Hello...');
    });

    it('should not truncate text shorter than specified length', () => {
      const result = truncate('Hi', 5);
      expect(result).toBe('Hi');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toContain('January');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });
  });
});


import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  contactFormSchema,
  pageSchema,
  galleryImageSchema,
  serviceSchema,
  testimonialSchema,
  siteConfigSchema,
} from '../validations';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const data = { email: 'user@example.com', password: 'password123' };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const data = { email: 'invalid', password: 'password123' };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const data = { email: 'user@example.com', password: 'short' };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const data = {
        email: 'user@example.com',
        name: 'John Doe',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const data = {
        email: 'user@example.com',
        name: 'John Doe',
        password: 'password123',
        confirmPassword: 'different',
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject short name', () => {
      const data = {
        email: 'user@example.com',
        name: 'J',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('contactFormSchema', () => {
    it('should validate correct contact form data', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'This is a test message',
      };
      const result = contactFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject short message', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Short',
      };
      const result = contactFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('pageSchema', () => {
    it('should validate correct page data', () => {
      const data = {
        slug: 'about',
        title: 'About Us',
        content: 'This is about page content',
        published: true,
      };
      const result = pageSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const data = {
        slug: 'about',
        title: 'About Us',
      };
      const result = pageSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('galleryImageSchema', () => {
    it('should validate correct gallery image data', () => {
      const data = {
        title: 'Gallery Image',
        imageUrl: 'https://example.com/image.jpg',
        published: true,
      };
      const result = galleryImageSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid image URL', () => {
      const data = {
        title: 'Gallery Image',
        imageUrl: 'not-a-url',
        published: true,
      };
      const result = galleryImageSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('serviceSchema', () => {
    it('should validate correct service data', () => {
      const data = {
        name: 'Service Name',
        description: 'Service description',
        price: 99.99,
        published: true,
      };
      const result = serviceSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject missing description', () => {
      const data = {
        name: 'Service Name',
        price: 99.99,
        published: true,
      };
      const result = serviceSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('testimonialSchema', () => {
    it('should validate correct testimonial data', () => {
      const data = {
        clientName: 'John Doe',
        content: 'Great service!',
        rating: 5,
        published: true,
      };
      const result = testimonialSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid rating', () => {
      const data = {
        clientName: 'John Doe',
        content: 'Great service!',
        rating: 10,
        published: true,
      };
      const result = testimonialSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('siteConfigSchema', () => {
    it('should validate correct site config data', () => {
      const data = {
        siteName: 'My Site',
        theme: 'light',
        headerBgColor: '#ffffff',
        heroButtonBgColor: '#9333ea',
      };
      const result = siteConfigSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid color format', () => {
      const data = {
        siteName: 'My Site',
        headerBgColor: 'red',
        theme: 'light',
      };
      const result = siteConfigSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject invalid theme', () => {
      const data = {
        siteName: 'My Site',
        headerBgColor: '#9333ea',
        theme: 'invalid',
      };
      const result = siteConfigSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});


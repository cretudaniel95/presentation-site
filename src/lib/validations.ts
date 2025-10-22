import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Page schema
export const pageSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  published: z.boolean().default(false),
});

// Gallery image schema
export const galleryImageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  imageUrl: z.string().url('Invalid image URL'),
  imageAlt: z.string().optional(),
  category: z.string().default('general'),
  order: z.number().default(0),
  published: z.boolean().default(false),
});

// Service schema
export const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  price: z.number().optional(),
  duration: z.string().optional(),
  order: z.number().default(0),
  published: z.boolean().default(false),
});

// Testimonial schema
export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientRole: z.string().optional(),
  clientImage: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  rating: z.number().min(1).max(5).default(5),
  published: z.boolean().default(false),
});

// Site config schema
export const siteConfigSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteTagline: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  theme: z.enum(['light', 'dark', 'auto']).default('light'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type PageInput = z.infer<typeof pageSchema>;
export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type SiteConfigInput = z.infer<typeof siteConfigSchema>;

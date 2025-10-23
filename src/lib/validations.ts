import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Register schema
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

// Helper for color validation - accepts valid hex color or empty string
const colorField = () => z.string().refine(
  (val) => val === '' || /^#[0-9A-F]{6}$/i.test(val),
  { message: 'Invalid color format. Use #RRGGBB format or leave empty' }
).optional();

// Site config schema
export const siteConfigSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteTagline: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  theme: z.enum(['light', 'dark', 'auto']).default('light'),

  // Header/Navigation Section
  headerBgColor: colorField(),
  headerTextColor: colorField(),
  headerLogoUrl: z.string().optional(),

  // Hero Section
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroBackgroundImage: z.string().optional(),
  heroBgColor: colorField(),
  heroTitleColor: colorField(),
  heroTextColor: colorField(),
  heroButtonBgColor: colorField(),
  heroButtonTextColor: colorField(),
  heroButtonStyle: z.string().optional(),

  // About Section
  aboutTitle: z.string().optional(),
  aboutContent: z.string().optional(),
  aboutBgColor: colorField(),
  aboutTitleColor: colorField(),
  aboutTextColor: colorField(),
  aboutBgImage: z.string().optional(),

  // Gallery Section
  galleryTitle: z.string().optional(),
  galleryBgColor: colorField(),
  galleryTitleColor: colorField(),
  galleryTextColor: colorField(),
  galleryCardBgColor: colorField(),

  // Contact Section
  contactTitle: z.string().optional(),
  contactContent: z.string().optional(),
  contactBgColor: colorField(),
  contactTitleColor: colorField(),
  contactTextColor: colorField(),
  contactBgImage: z.string().optional(),
  contactButtonBgColor: colorField(),
  contactButtonTextColor: colorField(),

  // Pages Section
  pagesBgColor: colorField(),
  pagesTitleColor: colorField(),
  pagesTextColor: colorField(),

  // Footer Section
  footerBgColor: colorField(),
  footerTextColor: colorField(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type PageInput = z.infer<typeof pageSchema>;
export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type SiteConfigInput = z.infer<typeof siteConfigSchema>;


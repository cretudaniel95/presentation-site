export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteConfig {
  id: string;
  siteName: string;
  siteTagline: string;
  description?: string;
  logo?: string;
  favicon?: string;
  theme: 'light' | 'dark' | 'auto';

  // Header/Navigation Section
  headerBgColor: string;
  headerTextColor: string;
  headerLogoUrl?: string;

  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: string;
  heroBgColor?: string;
  heroTitleColor: string;
  heroTextColor: string;
  heroButtonBgColor: string;
  heroButtonTextColor: string;
  heroButtonStyle: string;

  // About Section
  aboutTitle?: string;
  aboutContent?: string;
  aboutBgColor: string;
  aboutTitleColor: string;
  aboutTextColor: string;
  aboutBgImage?: string;

  // Gallery Section
  galleryTitle?: string;
  galleryBgColor: string;
  galleryTitleColor: string;
  galleryTextColor: string;
  galleryCardBgColor: string;

  // Contact Section
  contactTitle?: string;
  contactContent?: string;
  contactBgColor: string;
  contactTitleColor: string;
  contactTextColor: string;
  contactBgImage?: string;
  contactButtonBgColor: string;
  contactButtonTextColor: string;

  // Pages Section
  pagesBgColor: string;
  pagesTitleColor: string;
  pagesTextColor: string;

  // Footer Section
  footerBgColor: string;
  footerTextColor: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  price?: number;
  duration?: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole?: string;
  clientImage?: string;
  content: string;
  rating: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}


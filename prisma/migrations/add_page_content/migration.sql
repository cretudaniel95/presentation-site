-- AlterTable
ALTER TABLE "site_configs" ADD COLUMN "heroTitle" TEXT NOT NULL DEFAULT 'Welcome to Your Professional Presentation',
ADD COLUMN "heroSubtitle" TEXT NOT NULL DEFAULT 'Showcase your work, share your story, and connect with your audience in a beautiful, modern way.',
ADD COLUMN "heroBackgroundImage" TEXT,
ADD COLUMN "aboutTitle" TEXT NOT NULL DEFAULT 'About',
ADD COLUMN "aboutContent" TEXT NOT NULL DEFAULT 'Learn more about who we are and what we do.',
ADD COLUMN "galleryTitle" TEXT NOT NULL DEFAULT 'Gallery',
ADD COLUMN "contactTitle" TEXT NOT NULL DEFAULT 'Get in Touch',
ADD COLUMN "contactContent" TEXT NOT NULL DEFAULT 'We would love to hear from you. Send us a message!';


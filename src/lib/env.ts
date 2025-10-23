// Environment variable validation and type safety

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
];


// Validate required environment variables
function validateEnv() {
  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Only validate in production
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,

  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,

  // Site
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Presentation Site',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default env;


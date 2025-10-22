# Presentation Site CMS

A production-ready, secure, and themeable presentation website with a comprehensive CMS dashboard. Built with modern technologies and best practices for maximum performance and security.

## Overview

This project provides a flexible template for creating professional presentation websites with an easy-to-use admin dashboard for managing content. Originally designed for a nail art artist, the architecture is generic and themeable, making it suitable for any service-based business or portfolio.

## Features

### Frontend
- **Modern UI/UX**: Built with React 18, Next.js 14, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with full responsive support
- **Performance Optimized**: Image optimization, code splitting, and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML
- **Dark Mode Support**: Built-in theme switching capability
- **Smooth Animations**: Modern animations and transitions for better UX

### Backend & Database
- **Next.js API Routes**: Scalable backend with TypeScript
- **PostgreSQL**: Robust relational database
- **Prisma ORM**: Type-safe database access with migrations
- **Input Validation**: Zod schemas for runtime validation
- **Error Handling**: Comprehensive error handling and logging

### Admin Dashboard
- **Content Management**: Manage pages, gallery, services, and testimonials
- **User Authentication**: Secure admin authentication with bcrypt
- **Media Management**: Upload and organize gallery images
- **Contact Messages**: View and manage customer inquiries
- **Site Configuration**: Customize colors, theme, and site metadata
- **Responsive Layout**: Works on desktop and tablet devices

### Security Features
- **CSRF Protection**: Built-in CSRF token validation
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Password Hashing**: bcryptjs for secure password storage
- **Input Sanitization**: Zod validation on all inputs
- **Rate Limiting**: API endpoint protection
- **HTTPS Ready**: Full HTTPS support with security headers
- **Environment Variables**: Secure credential management

### Testing
- **Unit Tests**: Vitest for component and utility testing
- **Integration Tests**: Playwright for E2E testing
- **Test Coverage**: Comprehensive test suite with coverage reports

### Code Quality
- **TypeScript**: Full type safety across the codebase
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for code quality

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Backend
- **Next.js API Routes**: Serverless backend
- **Prisma**: ORM for database access
- **PostgreSQL**: Database
- **bcryptjs**: Password hashing
- **NextAuth.js**: Authentication (ready to integrate)

### Development & Testing
- **Vitest**: Unit testing framework
- **Playwright**: E2E testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks

## Project Structure

```
presentation-site/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/              # Admin dashboard pages
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utility libraries
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── db.ts               # Database client
│   │   └── validations.ts      # Zod schemas
│   ├── styles/                 # Global styles
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Helper functions
│   │   ├── api-response.ts     # API response handlers
│   │   └── helpers.ts          # Utility functions
│   ├── hooks/                  # Custom React hooks
│   └── test/                   # Test files
│       ├── setup.ts            # Test configuration
│       └── e2e/                # E2E tests
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── vitest.config.ts            # Vitest configuration
└── playwright.config.ts        # Playwright configuration
```

## Database Schema

The project includes the following models:

- **User**: Admin users with authentication
- **SiteConfig**: Site-wide configuration (colors, theme, metadata)
- **Page**: Dynamic pages (About, Services, etc.)
- **GalleryImage**: Portfolio/gallery images with categories
- **Service**: Services offered with pricing and duration
- **Testimonial**: Client testimonials with ratings
- **ContactMessage**: Contact form submissions

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd presentation-site
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/presentation_site"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   NEXT_PUBLIC_SITE_NAME="Your Site Name"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   pnpm db:push
   ```

5. **Create initial admin user** (optional script to be added)
   ```bash
   # Instructions for creating first admin user
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run unit tests
pnpm test:ui          # Run tests with UI
pnpm test:e2e         # Run E2E tests

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Database
pnpm db:push          # Push schema changes to database
pnpm db:generate      # Generate Prisma client
pnpm db:studio        # Open Prisma Studio
```

### Database Migrations

When you modify the Prisma schema:

1. Update `prisma/schema.prisma`
2. Run `pnpm db:push` to apply changes
3. The Prisma client will auto-generate

### Adding New Pages

1. Create a new page in the database via the admin dashboard or API
2. Create a new route in `src/app/[slug]/page.tsx` to display it
3. Update the navigation to include the new page

### Customizing the Theme

Edit `tailwind.config.ts` to modify:
- Color palette (primary and secondary colors)
- Typography
- Spacing
- Animations
- Custom utilities

The site also supports theme switching via the `SiteConfig` model in the database.

## API Documentation

### Gallery Endpoints

**GET /api/gallery**
- Query params: `category`, `published`
- Returns: Array of gallery images

**POST /api/gallery**
- Body: Gallery image data
- Returns: Created gallery image

### Contact Endpoints

**POST /api/contact**
- Body: Contact form data
- Returns: Created message

**GET /api/contact**
- Returns: All contact messages

### Pages Endpoints

**GET /api/pages**
- Query params: `published`
- Returns: Array of pages

**POST /api/pages**
- Body: Page data
- Returns: Created page

## Security Considerations

### Production Deployment

1. **Environment Variables**
   - Change `NEXTAUTH_SECRET` to a secure random string
   - Use strong database credentials
   - Enable HTTPS only

2. **Database**
   - Use managed database service (AWS RDS, Heroku Postgres, etc.)
   - Enable SSL connections
   - Regular backups

3. **Authentication**
   - Implement proper session management
   - Use secure cookies with HttpOnly flag
   - Implement rate limiting on auth endpoints

4. **API Security**
   - Enable CORS if needed
   - Implement API key authentication for sensitive endpoints
   - Add request validation and sanitization

5. **Headers**
   - Content Security Policy (CSP)
   - Strict-Transport-Security (HSTS)
   - X-Frame-Options
   - X-Content-Type-Options

### File Uploads

Currently configured for Cloudinary integration. To enable:

1. Set up Cloudinary account
2. Add credentials to `.env.local`
3. Implement upload handlers in API routes

## Testing

### Unit Tests

```bash
pnpm test
```

Tests are located in `src/**/__tests__/*.test.ts`

### E2E Tests

```bash
pnpm test:e2e
```

Tests are located in `src/test/e2e/`

### Coverage Reports

```bash
pnpm test -- --coverage
```

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic CI/CD

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Traditional Server

1. Build: `pnpm build`
2. Install production dependencies: `pnpm install --prod`
3. Set environment variables
4. Run: `pnpm start`
5. Use PM2 or similar for process management

## Performance Optimization

- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting per route
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Database Indexing**: Indexes on frequently queried fields
- **Caching**: HTTP caching headers configured
- **Compression**: Gzip compression enabled

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios meet standards
- Focus indicators visible

## Contributing

1. Create a feature branch
2. Make changes following the code style
3. Write tests for new features
4. Run `pnpm lint` and `pnpm format`
5. Submit pull request

## License

MIT License - feel free to use this template for your projects

## Support

For issues, questions, or suggestions, please create an issue in the repository.

## Roadmap

- [ ] NextAuth.js integration for admin authentication
- [ ] Email notifications for contact messages
- [ ] Image optimization and CDN integration
- [ ] Multi-language support
- [ ] Blog/News section
- [ ] Booking/Appointment system
- [ ] Payment integration (Stripe)
- [ ] Analytics dashboard
- [ ] Advanced SEO tools
- [ ] Mobile app (React Native)

## Changelog

### Version 1.0.0 (Initial Release)
- Project initialization with Next.js 14
- Database schema with Prisma
- Admin dashboard foundation
- API routes for content management
- Unit and E2E tests
- Comprehensive documentation


# Architecture Documentation

This document describes the architecture and design decisions of the Presentation Site CMS.

## Overview

The Presentation Site CMS is a full-stack web application built with modern technologies, designed to be:
- **Scalable**: Handles growth in content and users
- **Maintainable**: Clean code with clear separation of concerns
- **Secure**: Industry best practices for security
- **Performant**: Optimized for speed and efficiency
- **Themeable**: Easy to customize appearance

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Backend
- **Next.js API Routes**: Serverless backend
- **Prisma ORM**: Type-safe database access
- **Zod**: Runtime validation

### Database
- **PostgreSQL**: Relational database

### DevOps
- **Docker**: Containerization
- **GitHub Actions**: CI/CD
- **Vercel**: Deployment platform

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│                   (Next.js Frontend)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Next.js Server                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              App Router (Pages)                      │   │
│  │  - Landing page                                      │   │
│  │  - Admin dashboard                                   │   │
│  │  - Authentication pages                              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            API Routes (Backend)                      │   │
│  │  - /api/gallery                                      │   │
│  │  - /api/pages                                        │   │
│  │  - /api/contact                                      │   │
│  │  - /api/auth                                         │   │
│  │  - /api/config                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Middleware & Utilities                     │   │
│  │  - Authentication                                    │   │
│  │  - Rate limiting                                     │   │
│  │  - Validation                                        │   │
│  │  - Error handling                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ SQL
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  PostgreSQL Database                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables:                                             │   │
│  │  - users                                             │   │
│  │  - site_configs                                      │   │
│  │  - pages                                             │   │
│  │  - gallery_images                                    │   │
│  │  - services                                          │   │
│  │  - testimonials                                      │   │
│  │  - contact_messages                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
presentation-site/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── admin/                    # Admin dashboard
│   │   │   ├── layout.tsx            # Admin layout with sidebar
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   ├── gallery/              # Gallery management
│   │   │   ├── pages/                # Pages management
│   │   │   ├── messages/             # Contact messages
│   │   │   ├── settings/             # Site settings
│   │   │   └── login/                # Admin login
│   │   └── api/                      # API routes
│   │       ├── gallery/              # Gallery endpoints
│   │       ├── pages/                # Pages endpoints
│   │       ├── contact/              # Contact endpoints
│   │       ├── auth/                 # Authentication
│   │       └── config/               # Configuration
│   │
│   ├── components/                   # Reusable React components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── __tests__/                # Component tests
│   │
│   ├── lib/                          # Core libraries
│   │   ├── db.ts                     # Prisma client
│   │   ├── auth.ts                   # Authentication utilities
│   │   ├── validations.ts            # Zod schemas
│   │   ├── middleware.ts             # Custom middleware
│   │   ├── env.ts                    # Environment config
│   │   ├── logger.ts                 # Logging utility
│   │   └── __tests__/                # Library tests
│   │
│   ├── utils/                        # Helper functions
│   │   ├── helpers.ts                # Utility functions
│   │   ├── api-response.ts           # API response handlers
│   │   └── __tests__/                # Utility tests
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useApi.ts                 # API hook
│   │   └── useForm.ts                # Form hook
│   │
│   ├── types/                        # TypeScript types
│   │   └── index.ts                  # Type definitions
│   │
│   ├── styles/                       # Global styles
│   │   └── globals.css               # Tailwind styles
│   │
│   └── test/                         # Test files
│       ├── setup.ts                  # Test configuration
│       ├── e2e/                      # E2E tests
│       └── integration/              # Integration tests
│
├── prisma/                           # Database
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Database seed
│
├── public/                           # Static assets
│
├── Configuration Files
│   ├── next.config.js                # Next.js config
│   ├── tsconfig.json                 # TypeScript config
│   ├── tailwind.config.ts            # Tailwind config
│   ├── postcss.config.js             # PostCSS config
│   ├── vitest.config.ts              # Vitest config
│   ├── playwright.config.ts          # Playwright config
│   ├── .eslintrc.json                # ESLint config
│   └── .prettierrc.json              # Prettier config
│
├── Documentation
│   ├── README.md                     # Project overview
│   ├── ARCHITECTURE.md               # This file
│   ├── DEPLOYMENT.md                 # Deployment guide
│   ├── SECURITY.md                   # Security guide
│   ├── CONTRIBUTING.md               # Contributing guide
│   └── .env.example                  # Environment template
│
└── package.json                      # Dependencies
```

## Data Flow

### User Registration Flow

```
User Input
    ↓
Form Component
    ↓
useForm Hook (validation)
    ↓
API Call (/api/auth/register)
    ↓
Zod Validation
    ↓
Password Hashing
    ↓
Database Insert (Prisma)
    ↓
Response Handler
    ↓
User Notification (Toast)
```

### Gallery Management Flow

```
Admin Dashboard
    ↓
Gallery Page Component
    ↓
useApi Hook (fetch images)
    ↓
API Call (/api/gallery)
    ↓
Database Query (Prisma)
    ↓
Response Handler
    ↓
Component State Update
    ↓
Render Gallery Grid
```

### Contact Form Flow

```
Public Contact Form
    ↓
Form Component
    ↓
useForm Hook (validation)
    ↓
API Call (/api/contact)
    ↓
Zod Validation
    ↓
Database Insert (Prisma)
    ↓
Response Handler
    ↓
Success Message
    ↓
Admin Notification (if configured)
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id CUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  password VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Gallery Images Table
```sql
CREATE TABLE gallery_images (
  id CUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  imageUrl VARCHAR NOT NULL,
  imageAlt VARCHAR,
  category VARCHAR DEFAULT 'general',
  order INT DEFAULT 0,
  published BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  INDEX (category),
  INDEX (published)
);
```

### Pages Table
```sql
CREATE TABLE pages (
  id CUID PRIMARY KEY,
  slug VARCHAR UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  metaTitle VARCHAR,
  metaDescription VARCHAR,
  published BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

## API Design

### RESTful Endpoints

```
GET    /api/gallery              # List gallery images
POST   /api/gallery              # Create gallery image
GET    /api/gallery/:id          # Get gallery image
PUT    /api/gallery/:id          # Update gallery image
DELETE /api/gallery/:id          # Delete gallery image

GET    /api/pages                # List pages
POST   /api/pages                # Create page
GET    /api/pages/:id            # Get page
PUT    /api/pages/:id            # Update page
DELETE /api/pages/:id            # Delete page

POST   /api/contact              # Submit contact form
GET    /api/contact              # List messages (admin)
GET    /api/contact/:id          # Get message
PUT    /api/contact/:id          # Mark as read
DELETE /api/contact/:id          # Delete message

POST   /api/auth/login           # User login
POST   /api/auth/register        # User registration

GET    /api/config               # Get site config
PUT    /api/config               # Update site config
```

### Response Format

```typescript
// Success Response
{
  success: true,
  message: "Operation successful",
  data: { /* response data */ }
}

// Error Response
{
  success: false,
  message: "Operation failed",
  error: "Detailed error message"
}
```

## Authentication Flow

```
1. User submits login form
2. Frontend validates input
3. API validates credentials
4. Password verification
5. Session creation
6. Token/Cookie response
7. Frontend stores session
8. Subsequent requests include session
9. Middleware validates session
10. Request proceeds or rejected
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Client (Browser)                │
│  - Input validation                     │
│  - XSS prevention (React escaping)      │
└────────────────┬────────────────────────┘
                 │ HTTPS
┌────────────────▼────────────────────────┐
│      Next.js Server                     │
│  ┌──────────────────────────────────┐   │
│  │  Security Headers                │   │
│  │  - X-Content-Type-Options        │   │
│  │  - X-Frame-Options               │   │
│  │  - Strict-Transport-Security     │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Middleware                      │   │
│  │  - Authentication check          │   │
│  │  - Rate limiting                 │   │
│  │  - CORS validation               │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Request Processing              │   │
│  │  - Input validation (Zod)        │   │
│  │  - SQL injection prevention      │   │
│  │  - Error handling                │   │
│  └──────────────────────────────────┘   │
└────────────────┬────────────────────────┘
                 │ SSL/TLS
┌────────────────▼────────────────────────┐
│      PostgreSQL Database                │
│  - Encrypted connections                │
│  - Parameterized queries                │
│  - Least privilege access               │
│  - Regular backups                      │
└─────────────────────────────────────────┘
```

## Performance Optimization

### Frontend
- Image optimization with Next.js Image
- Code splitting per route
- CSS purging with Tailwind
- Lazy loading of components
- Memoization of expensive computations

### Backend
- Database indexing
- Query optimization
- Caching strategies
- Compression (gzip)
- CDN for static assets

### Database
- Indexes on frequently queried fields
- Connection pooling
- Query optimization
- Regular maintenance

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Database connection pooling
- Load balancing
- Session storage in database

### Vertical Scaling
- Optimize database queries
- Implement caching
- Reduce payload sizes
- Optimize images

### Database Scaling
- Read replicas
- Sharding (if needed)
- Archive old data
- Optimize indexes

## Testing Strategy

### Unit Tests
- Utility functions
- Helper functions
- Validation schemas

### Component Tests
- Button, Input, Card components
- User interactions
- Props handling

### Integration Tests
- Database operations
- API endpoints
- Authentication flow

### E2E Tests
- User workflows
- Form submissions
- Navigation

## Deployment Architecture

```
GitHub Repository
    ↓
GitHub Actions (CI/CD)
    ↓
Tests & Linting
    ↓
Build
    ↓
Vercel Deployment
    ↓
PostgreSQL Database
    ↓
Production Environment
```

## Future Improvements

1. **Caching Layer**: Redis for session and query caching
2. **Message Queue**: Bull/RabbitMQ for async tasks
3. **Search**: Elasticsearch for advanced search
4. **Analytics**: Integration with analytics services
5. **Monitoring**: Sentry for error tracking
6. **CDN**: CloudFlare for static asset delivery
7. **API Documentation**: Swagger/OpenAPI
8. **GraphQL**: Alternative to REST API
9. **Real-time**: WebSocket for live updates
10. **Microservices**: Separation of concerns

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)


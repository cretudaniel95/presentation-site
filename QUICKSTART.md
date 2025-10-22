# Quick Start Guide

Get your Presentation Site CMS up and running in minutes!

## Prerequisites

Before you begin, make sure you have:
- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm`
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

## 5-Minute Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/presentation-site.git
cd presentation-site
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will install all required packages including Next.js, React, Prisma, and testing libraries.

### Step 3: Configure Environment

Copy the example environment file and update it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:

```env
# Database connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/presentation_site"

# Authentication (generate a random string)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# Site configuration
NEXT_PUBLIC_SITE_NAME="My Nail Art Studio"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Step 4: Set Up Database

```bash
# Create database schema
pnpm db:push

# Seed with sample data
pnpm db:seed
```

### Step 5: Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Accessing the Application

### Public Site
- **URL**: http://localhost:3000
- **Features**: Landing page, about section, gallery, contact form

### Admin Dashboard
- **URL**: http://localhost:3000/admin
- **Login**: admin@presentation-site.local / admin123

## Common Tasks

### Managing Gallery Images

1. Go to Admin Dashboard → Gallery
2. Click "Add Image"
3. Fill in image details and URL
4. Click "Save"

Images appear on the public gallery immediately if published.

### Creating Pages

1. Go to Admin Dashboard → Pages
2. Click "Add Page"
3. Enter slug (URL-friendly name), title, and content
4. Click "Save"

### Viewing Contact Messages

1. Go to Admin Dashboard → Messages
2. View all contact form submissions
3. Click on a message to see full details
4. Mark as read or delete

### Customizing Site Settings

1. Go to Admin Dashboard → Settings
2. Update site name, tagline, and colors
3. Choose theme (light/dark)
4. Click "Save Settings"

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run unit tests
pnpm test:ui          # Run tests with UI
pnpm test:e2e         # Run E2E tests

# Code Quality
pnpm lint             # Check code style
pnpm format           # Auto-format code

# Database
pnpm db:push          # Apply schema changes
pnpm db:studio        # Open Prisma Studio (visual DB editor)
pnpm db:seed          # Seed sample data
```

## Troubleshooting

### Database Connection Error

**Error**: `Can't reach database server`

**Solution**:
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env.local`
3. Verify database exists: `createdb presentation_site`

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### Dependencies Installation Failed

**Error**: `ERR! code ERESOLVE`

**Solution**:
```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Module Not Found

**Error**: `Module not found: Can't resolve '@/components/Button'`

**Solution**:
1. Check file exists at `src/components/Button.tsx`
2. Restart dev server: `Ctrl+C` then `pnpm dev`

## Next Steps

### 1. Customize Branding
- Update site name in Settings
- Change primary and secondary colors
- Upload your logo (if image upload is enabled)

### 2. Add Your Content
- Create pages for About, Services, etc.
- Upload gallery images
- Add testimonials

### 3. Configure Contact Form
- Test contact form on public site
- Verify messages appear in admin dashboard
- Set up email notifications (optional)

### 4. Deploy to Production
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Recommended: Deploy to Vercel (free tier available)

### 5. Explore Advanced Features
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
- Check [API.md](./API.md) for API documentation
- Review [SECURITY.md](./SECURITY.md) for security best practices

## Project Structure Overview

```
presentation-site/
├── src/app/              # Pages and routes
├── src/components/       # Reusable UI components
├── src/lib/              # Core utilities
├── src/api/              # API endpoints
├── prisma/               # Database schema
├── public/               # Static files
└── Configuration files
```

## Key Features

✅ **Modern UI/UX** - Built with React 18 and Tailwind CSS  
✅ **Admin Dashboard** - Manage all content easily  
✅ **Responsive Design** - Works on all devices  
✅ **Type Safe** - Full TypeScript support  
✅ **Secure** - Password hashing, input validation  
✅ **Tested** - Unit and E2E tests included  
✅ **Production Ready** - Deploy with confidence  

## Getting Help

### Documentation
- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [API.md](./API.md) - API reference
- [SECURITY.md](./SECURITY.md) - Security guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

### Community
- GitHub Issues - Report bugs or request features
- GitHub Discussions - Ask questions
- GitHub Wiki - Community tips and tricks

## What's Next?

### For Beginners
1. Explore the admin dashboard
2. Add some gallery images
3. Customize the site settings
4. Try the contact form

### For Developers
1. Read the architecture documentation
2. Review the codebase
3. Run the tests
4. Try modifying components

### For Deployment
1. Follow the deployment guide
2. Set up environment variables
3. Configure your domain
4. Enable HTTPS

## Tips & Tricks

### Keyboard Shortcuts
- `Ctrl+K` - Open command palette (coming soon)
- `Ctrl+/` - Toggle dark mode (coming soon)

### Performance
- Images are automatically optimized
- CSS is purged of unused styles
- Code is split per route

### Development
- Hot reload enabled - changes appear instantly
- TypeScript catches errors before runtime
- ESLint helps maintain code quality

## Common Customizations

### Change Primary Color
Edit `tailwind.config.ts` and update the primary color:

```typescript
colors: {
  primary: {
    50: '#faf5ff',
    600: '#9333ea',  // Change this
    // ... other shades
  }
}
```

### Add New Admin Page
1. Create file: `src/app/admin/newpage/page.tsx`
2. Add navigation link in admin layout
3. Implement your page

### Add New API Endpoint
1. Create file: `src/app/api/endpoint/route.ts`
2. Export POST, GET, PUT, DELETE functions
3. Use Prisma for database access

## Feedback

We'd love to hear from you! Please share:
- Feature requests
- Bug reports
- Improvement suggestions
- Success stories

Create an issue on GitHub or reach out directly.

---

**Happy building! 🚀**

Need help? Check the [README.md](./README.md) or create an issue on GitHub.


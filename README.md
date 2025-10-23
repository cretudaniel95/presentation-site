# Presentation Site

A modern, customizable presentation/portfolio website built with Next.js 14, featuring a powerful admin dashboard for content management.

## Features

### Frontend
- **Fully Customizable Sections** - Header, Hero, About, Gallery, Contact, and Footer
- **Section-Specific Styling** - Each section has independent color and content controls
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Gallery with Pagination** - Image gallery with category support and lightbox viewer
- **Contact Form** - Integrated contact form with email validation
- **SEO Optimized** - Meta tags, descriptions, and semantic HTML

### Admin Dashboard
- **Content Management** - Manage gallery images, pages, and site content
- **Section-Based Settings** - Granular control over each page section:
  - Colors (background, title, text, buttons)
  - Content (titles, descriptions)
  - Images (backgrounds, logos)
- **Gallery Management** - Upload, edit, and organize images with pagination
- **Message Inbox** - View and manage contact form submissions
- **Authentication** - Secure admin access

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Custom JWT-based auth
- **UI Components**: Custom components with lucide-react icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd presentation-site
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/presentation_site"
JWT_SECRET="your-secret-key"
```

4. Initialize the database
```bash
npx prisma db push
npx prisma generate
```

5. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Create Admin User

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) and register the first admin account.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   │   ├── gallery/       # Gallery management
│   │   ├── messages/      # Contact messages
│   │   ├── pages/         # Page management
│   │   └── settings/      # Site settings
│   └── api/               # API routes
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configs
├── styles/                # Global styles
└── types/                 # TypeScript type definitions

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations
```

## Admin Settings

The admin settings are organized by section for precise control:

### General
- Site name, tagline, description
- Theme mode (light/dark/auto)

### Header
- Navigation bar colors
- Custom logo URL

### Hero Section
- Title and subtitle
- Background color or image
- Text colors
- Button styling and colors

### About Section
- Content and title
- Section colors
- Optional background image

### Gallery Section
- Section title
- Card and background colors
- Text colors

### Contact Section
- Form title and intro text
- Section colors
- Button styling
- Optional background image

### Footer
- Background and text colors

## Database Schema

Main models:
- **User** - Admin authentication
- **SiteConfig** - All site settings and customization
- **Page** - Custom pages
- **GalleryImage** - Gallery images with categories
- **ContactMessage** - Contact form submissions
- **Service** - Services/offerings
- **Testimonial** - Client testimonials

## Development

### Database Commands
```bash
# Push schema changes
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

### Code Quality
- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting

## Deployment

The site can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- Custom Node.js server

Ensure environment variables are set in your deployment platform.

## License

MIT

## Support

For issues or questions, please open an issue on the repository.


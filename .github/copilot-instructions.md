# GitHub Copilot Instructions for Presentation Site

## Project Context
This is a **NEW** Next.js 14+ presentation/portfolio website with admin dashboard. There is NO legacy code, NO backward compatibility concerns, and NO need for migration paths.

## Critical Technical Constraints

### Windows Command Line
- **NEVER use `&&` in Windows cmd.exe commands** - it doesn't work reliably
- Use `;` for command chaining OR run commands separately
- Use `if exist` and similar Windows-native commands
- Prefer PowerShell for complex operations

### Database & Schema
- PostgreSQL with Prisma ORM
- **NO backward compatibility** - this is a greenfield project
- Remove any "legacy" fields or comments about compatibility
- Always use latest Prisma features and best practices

### Technology Stack
- **Next.js 14+** with App Router (not Pages Router)
- **React Server Components** by default
- TypeScript (strict mode)
- Tailwind CSS for styling
- Prisma for database
- No unnecessary dependencies

## Code Quality Standards

### File Organization
- Use clear, descriptive file names
- Keep components focused and single-purpose
- Co-locate related files (components with their styles/tests)

### TypeScript
- Use proper types, avoid `any`
- Define interfaces for all data structures
- Export types from `src/types/index.ts`

### React Best Practices
- Server Components by default, Client Components only when needed
- Use `'use client'` directive only when necessary (forms, state, effects)
- Prefer composition over inheritance
- Keep components small and reusable

### Styling
- Use Tailwind CSS utility classes
- Avoid inline styles unless for dynamic colors from database
- Use consistent spacing and color scales

## Documentation Guidelines

### What NOT to Create
- ❌ No ARCHITECTURE.md, CONTRIBUTING.md, SECURITY.md
- ❌ No API documentation files
- ❌ No detailed deployment guides (yet)
- ❌ No changelog or version history files
- ❌ No "backward compatibility" notes

### What to Maintain
- ✅ README.md - Keep it concise and updated
- ✅ Inline code comments for complex logic only
- ✅ JSDoc for public APIs/functions
- ✅ Database schema comments in Prisma

### Documentation Principle
**Only create documentation when it's actually needed.** This is a new project in active development - extensive docs are premature and become outdated quickly.

## Development Workflow

### Database Changes
```bash
# Update schema
npx prisma db push

# Generate client
npx prisma generate

# View database
npx prisma studio
```

### Testing Approach
- Manual testing in development
- Add tests only for critical business logic
- Don't create empty test files "for later"

### Code Comments
- Explain WHY, not WHAT
- Remove TODO comments once resolved
- No "legacy" or "backward compatibility" comments
- No commented-out code - delete it

## Common Patterns

### API Routes (App Router)
```typescript
export async function GET(request: NextRequest) {
  // Implementation
}

export async function POST(request: NextRequest) {
  // Implementation
}
```

### Database Queries
- Use Prisma Client properly
- Handle errors appropriately
- Return structured responses via helper functions

### Admin Pages
- All admin pages are Client Components (forms, state)
- Use proper authentication/authorization
- Consistent UI with reusable components

### Site Configuration
- Section-based color customization (Header, Hero, About, Gallery, Contact, Footer)
- Each section has: background, title color, text color, etc.
- No generic "primary/secondary" colors - use section-specific colors

## Anti-Patterns to Avoid

### ❌ Don't Do This
- Creating extensive documentation upfront
- Adding "legacy" or "deprecated" fields
- Backward compatibility code for a new project
- Empty test files with TODOs
- Overly complex abstractions
- Premature optimization
- Using `&&` in Windows commands

### ✅ Do This
- Write clean, simple code
- Use descriptive variable names
- Keep functions focused
- Update README when features are complete
- Delete unused code immediately
- Test manually during development
- Use semicolons for command chaining on Windows

## Feature Development Process

1. **Understand the requirement** - Ask if unclear
2. **Check existing patterns** - Follow established conventions
3. **Implement cleanly** - Simple, readable code
4. **Test manually** - Verify it works
5. **Update README** - Only if adding major features
6. **Clean up** - Remove unused imports, comments, files

## Section-Specific Colors

The site uses **section-based customization**, not generic brand colors:

- **Header**: headerBgColor, headerTextColor
- **Hero**: heroBgColor, heroTitleColor, heroTextColor, heroButtonBgColor, heroButtonTextColor
- **About**: aboutBgColor, aboutTitleColor, aboutTextColor
- **Gallery**: galleryBgColor, galleryTitleColor, galleryTextColor, galleryCardBgColor
- **Contact**: contactBgColor, contactTitleColor, contactTextColor, contactButtonBgColor, contactButtonTextColor
- **Footer**: footerBgColor, footerTextColor

Each section is independently customizable with its own colors and content.

## Remember
- This is a **NEW** project - no legacy baggage
- Keep it **SIMPLE** - no over-engineering
- **Windows environment** - use compatible commands
- **Document later** - focus on working code first
- **Delete, don't comment out** - Git remembers everything


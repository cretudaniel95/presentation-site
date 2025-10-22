# Contributing Guide

Thank you for your interest in contributing to the Presentation Site CMS! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL 12+
- Git

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/presentation-site.git
   cd presentation-site
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Database**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   pnpm db:push
   pnpm db:seed
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## Development Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-blog-section`
- `fix/contact-form-validation`
- `docs/update-readme`
- `test/add-gallery-tests`

### Making Changes

1. **Write Code**
   - Follow the existing code style
   - Use TypeScript for type safety
   - Write clear, descriptive variable names

2. **Write Tests**
   - Add unit tests for new utilities
   - Add component tests for UI changes
   - Add integration tests for API changes
   - Aim for >80% code coverage

3. **Format and Lint**
   ```bash
   pnpm format
   pnpm lint
   ```

4. **Run Tests**
   ```bash
   pnpm test
   pnpm test:e2e
   ```

### Commit Guidelines

Use conventional commits for clear history:

```
feat: add new feature
fix: fix a bug
docs: update documentation
test: add tests
style: format code
refactor: restructure code
perf: improve performance
chore: update dependencies
```

Examples:
```bash
git commit -m "feat: add email notifications for contact messages"
git commit -m "fix: resolve gallery image loading issue"
git commit -m "docs: update deployment guide"
git commit -m "test: add validation schema tests"
```

### Pushing Changes

```bash
git push origin feature/your-feature-name
```

## Code Style Guide

### TypeScript

- Use strict mode
- Avoid `any` type
- Use interfaces for object types
- Export types explicitly

```typescript
// Good
export interface User {
  id: string;
  email: string;
  name: string;
}

export function getUser(id: string): Promise<User> {
  // implementation
}

// Avoid
export function getUser(id: any): any {
  // implementation
}
```

### React Components

- Use functional components
- Use hooks for state management
- Use TypeScript for prop types
- Memoize expensive computations

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
}) => {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
};

// Avoid
export const Button = ({ onClick, children, variant }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

### File Organization

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── lib/              # Utilities and helpers
├── styles/           # Global styles
├── types/            # TypeScript types
├── utils/            # Helper functions
├── hooks/            # Custom hooks
└── test/             # Tests
```

## Testing

### Unit Tests

Test individual functions and components:

```typescript
import { describe, it, expect } from 'vitest';
import { slugify } from '@/utils/helpers';

describe('slugify', () => {
  it('should convert text to slug format', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
});
```

### Component Tests

Test React components:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Integration Tests

Test database operations:

```typescript
import { prisma } from '@/lib/db';

describe('Gallery', () => {
  it('should create gallery image', async () => {
    const image = await prisma.galleryImage.create({
      data: { title: 'Test', imageUrl: 'https://...' },
    });
    expect(image.id).toBeDefined();
  });
});
```

### E2E Tests

Test user workflows:

```typescript
import { test, expect } from '@playwright/test';

test('should login successfully', async ({ page }) => {
  await page.goto('/admin/login');
  await page.fill('input[type="email"]', 'admin@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/admin');
});
```

## Documentation

### README

- Keep it up to date
- Include setup instructions
- Document API endpoints
- Add examples

### Code Comments

```typescript
// Good: Explains why, not what
// Retry failed requests up to 3 times to handle temporary network issues
async function fetchWithRetry(url: string, maxRetries = 3) {
  // implementation
}

// Avoid: Redundant comments
// Set x to 1
const x = 1;
```

### Commit Messages

Write clear, descriptive commit messages:

```
feat: add email notifications for contact form

- Send confirmation email to user
- Send notification email to admin
- Add email template configuration
- Include rate limiting to prevent spam

Fixes #123
```

## Pull Request Process

1. **Create Pull Request**
   - Use a descriptive title
   - Reference related issues
   - Provide context and motivation

2. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Related Issues
   Fixes #123

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests added
   - [ ] Integration tests added
   - [ ] E2E tests added

   ## Checklist
   - [ ] Code follows style guide
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No new warnings
   ```

3. **Review Process**
   - At least one approval required
   - All CI checks must pass
   - Discussions resolved
   - Commits squashed if needed

4. **Merge**
   - Use "Squash and merge" for feature branches
   - Use "Create a merge commit" for release branches

## Reporting Issues

### Bug Report

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Go to...
2. Click...
3. See error...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Node version: 18.x
- Database: PostgreSQL 12

## Screenshots
If applicable, add screenshots
```

### Feature Request

```markdown
## Description
Brief description of the feature

## Motivation
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Other approaches considered

## Additional Context
Any other relevant information
```

## Performance Optimization

- Profile before optimizing
- Use React DevTools Profiler
- Check bundle size with `pnpm build`
- Monitor database queries
- Use indexes for frequently queried fields

## Security Considerations

- Never commit secrets
- Validate all inputs
- Use parameterized queries
- Keep dependencies updated
- Follow OWASP guidelines

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run unit tests
pnpm test:ui          # Run tests with UI
pnpm test:e2e         # Run E2E tests

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code
pnpm format:check     # Check formatting

# Database
pnpm db:push          # Push schema changes
pnpm db:generate      # Generate Prisma client
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database
```

## Getting Help

- Check existing issues and discussions
- Read documentation
- Ask in GitHub discussions
- Create a new issue if needed

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README

Thank you for contributing! 🎉


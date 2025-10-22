# Deployment Guide

This guide covers deploying the Presentation Site CMS to various platforms.

## Pre-Deployment Checklist

- [ ] Update `NEXTAUTH_SECRET` with a secure random string
- [ ] Configure database credentials
- [ ] Set up environment variables for all services
- [ ] Run database migrations
- [ ] Test all functionality in staging environment
- [ ] Review security headers configuration
- [ ] Set up monitoring and logging
- [ ] Configure backups for database
- [ ] Test email notifications (if enabled)

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/presentation_site"

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secure-random-secret-here"

# Site Configuration
NEXT_PUBLIC_SITE_NAME="Your Site Name"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### Optional Variables

```env
# Cloudinary (for image storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## Vercel Deployment (Recommended)

Vercel is the optimal platform for Next.js applications with automatic optimizations and scaling.

### Steps:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project root directory

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all required environment variables
   - Ensure variables are available in all environments (Production, Preview, Development)

4. **Configure Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

5. **Deploy Database**
   - Use Vercel's PostgreSQL (Postgres) or connect external database
   - Run migrations: `pnpm db:push`
   - Seed database: `pnpm db:seed`

6. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main

### Post-Deployment

```bash
# Run migrations in production
vercel env pull
pnpm db:push

# Seed initial data
pnpm db:seed
```

## Docker Deployment

### Build Docker Image

```dockerfile
# Dockerfile
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY prisma ./prisma

EXPOSE 3000
CMD ["pnpm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t presentation-site:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_URL="https://yourdomain.com" \
  -e NEXTAUTH_SECRET="your-secret" \
  presentation-site:latest
```

### Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: presentation_site
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/presentation_site"
      NEXTAUTH_URL: "http://localhost:3000"
      NEXTAUTH_SECRET: "development-secret"
    depends_on:
      - postgres
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_data:
```

Run with: `docker-compose up`

## Traditional Server Deployment

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Nginx or Apache
- PM2 or similar process manager

### Steps:

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd presentation-site
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Build Application**
   ```bash
   pnpm build
   ```

4. **Set Environment Variables**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

5. **Run Database Migrations**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

6. **Start Application with PM2**
   ```bash
   npm install -g pm2
   pm2 start pnpm --name "presentation-site" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx**
   ```nginx
   upstream presentation_site {
     server localhost:3000;
   }

   server {
     listen 80;
     server_name yourdomain.com;
     
     # Redirect HTTP to HTTPS
     return 301 https://$server_name$request_uri;
   }

   server {
     listen 443 ssl http2;
     server_name yourdomain.com;

     ssl_certificate /path/to/certificate.crt;
     ssl_certificate_key /path/to/private.key;

     # Security headers
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
     add_header X-Content-Type-Options "nosniff" always;
     add_header X-Frame-Options "DENY" always;
     add_header X-XSS-Protection "1; mode=block" always;

     location / {
       proxy_pass http://presentation_site;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

8. **Set Up SSL Certificate**
   ```bash
   # Using Let's Encrypt with Certbot
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d yourdomain.com
   ```

## Database Setup

### PostgreSQL

1. **Create Database**
   ```bash
   createdb presentation_site
   ```

2. **Run Migrations**
   ```bash
   pnpm db:push
   ```

3. **Seed Initial Data**
   ```bash
   pnpm db:seed
   ```

4. **Backup Database**
   ```bash
   # Daily backup
   pg_dump presentation_site > backup_$(date +%Y%m%d).sql
   ```

### Managed Database Services

- **AWS RDS**: Fully managed PostgreSQL
- **Heroku Postgres**: Simple PostgreSQL hosting
- **DigitalOcean Managed Databases**: Cost-effective option
- **Supabase**: PostgreSQL with built-in features

## Monitoring and Logging

### Application Monitoring

```bash
# PM2 Monitoring
pm2 monit

# View logs
pm2 logs presentation-site
```

### Database Monitoring

```bash
# Check database size
psql -U postgres -d presentation_site -c "SELECT pg_size_pretty(pg_database_size('presentation_site'));"

# Check slow queries
psql -U postgres -d presentation_site -c "SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for infrastructure monitoring

## Backup and Recovery

### Automated Backups

```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups/presentation-site"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
pg_dump presentation_site | gzip > $BACKUP_DIR/db_$TIMESTAMP.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
```

Add to crontab:
```bash
0 2 * * * /path/to/backup.sh
```

### Recovery

```bash
# Restore from backup
gunzip < backup_20240101.sql.gz | psql presentation_site
```

## Performance Optimization

### Caching

- Enable browser caching in Nginx
- Use CDN for static assets
- Implement Redis for session caching

### Database Optimization

```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_gallery_published ON gallery_images(published);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_contact_read ON contact_messages(read);
```

### Image Optimization

- Use Cloudinary for image storage and optimization
- Enable WebP format support
- Implement lazy loading

## Security Hardening

1. **Update Dependencies**
   ```bash
   pnpm update
   pnpm audit fix
   ```

2. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Redirect HTTP to HTTPS
   - Enable HSTS headers

3. **Configure Firewall**
   ```bash
   # Allow only necessary ports
   ufw allow 22/tcp
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw enable
   ```

4. **Database Security**
   - Use strong passwords
   - Restrict database access
   - Enable SSL connections
   - Regular backups

5. **Application Security**
   - Keep dependencies updated
   - Use environment variables for secrets
   - Enable rate limiting
   - Implement CSRF protection

## Troubleshooting

### Common Issues

**Application won't start**
```bash
# Check logs
pm2 logs presentation-site

# Verify environment variables
env | grep DATABASE_URL
```

**Database connection errors**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

**Out of memory**
```bash
# Increase Node.js heap size
NODE_OPTIONS=--max_old_space_size=4096 pnpm start
```

**Slow queries**
```bash
# Enable query logging
# Add to .env
DATABASE_LOG=query
```

## Rollback Procedure

1. Keep previous deployment available
2. Update environment variables to point to previous version
3. Restart application
4. Verify functionality
5. Check logs for errors

## Support

For deployment issues:
1. Check application logs
2. Review environment variables
3. Test database connectivity
4. Verify file permissions
5. Check system resources

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)


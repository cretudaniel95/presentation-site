# Security Best Practices

This document outlines the security measures implemented in the Presentation Site CMS and best practices for maintaining security.

## Implemented Security Features

### 1. Authentication & Authorization

- **Password Hashing**: Passwords are hashed using bcryptjs with 10 salt rounds
- **Session Management**: NextAuth.js for secure session handling
- **Role-Based Access Control**: Admin role for content management
- **Secure Cookies**: HttpOnly and Secure flags for session cookies

### 2. Input Validation

- **Zod Schema Validation**: All inputs validated against defined schemas
- **Type Safety**: TypeScript for compile-time type checking
- **Sanitization**: XSS prevention through React's built-in escaping

### 3. API Security

- **CORS Configuration**: Configured to prevent unauthorized cross-origin requests
- **Rate Limiting**: Implemented middleware to prevent brute force attacks
- **Request Validation**: All API requests validated before processing
- **Error Handling**: Generic error messages to prevent information disclosure

### 4. Database Security

- **SQL Injection Prevention**: Using Prisma ORM with parameterized queries
- **Least Privilege**: Database users with minimal required permissions
- **Encryption**: Database connections use SSL/TLS
- **Backups**: Regular encrypted backups of database

### 5. HTTP Security Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

### 6. Environment Variables

- Sensitive data stored in environment variables
- `.env` files excluded from version control
- Different configurations for development and production

### 7. File Upload Security

- File type validation
- File size limits
- Virus scanning (recommended)
- Secure storage using Cloudinary

### 8. Dependency Management

- Regular dependency updates
- Security vulnerability scanning with `npm audit`
- Minimal dependencies to reduce attack surface

## Security Checklist

### Development

- [ ] Use HTTPS in development (localhost is exempt)
- [ ] Never commit `.env` files
- [ ] Use strong, unique passwords for test accounts
- [ ] Enable security linting in IDE
- [ ] Review code for security issues before commit
- [ ] Use environment variables for all secrets

### Deployment

- [ ] Change default admin credentials
- [ ] Generate new `NEXTAUTH_SECRET`
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable database encryption
- [ ] Configure logging and monitoring
- [ ] Disable debug mode
- [ ] Set secure headers in production
- [ ] Enable rate limiting
- [ ] Configure CORS properly

### Ongoing

- [ ] Monitor security advisories
- [ ] Update dependencies regularly
- [ ] Review access logs
- [ ] Audit database access
- [ ] Test security measures
- [ ] Conduct regular backups
- [ ] Review user permissions
- [ ] Monitor for suspicious activity
- [ ] Keep documentation updated

## Password Security

### Requirements

- Minimum 6 characters (configurable)
- Mix of uppercase, lowercase, numbers (recommended)
- No common passwords

### Hashing

```typescript
// Password hashing
const hashedPassword = await hashPassword(password);

// Password verification
const isValid = await verifyPassword(password, hashedPassword);
```

## API Security

### Rate Limiting

Implement rate limiting to prevent brute force attacks:

```typescript
import { withRateLimit } from '@/lib/middleware';

// Limit to 100 requests per 15 minutes per IP
export const POST = withRateLimit(100, 15 * 60 * 1000)(handler);
```

### CORS Configuration

```typescript
// Allow specific origins
const allowedOrigins = ['https://yourdomain.com'];

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

### Input Validation

```typescript
// Validate all inputs with Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const result = schema.safeParse(input);
if (!result.success) {
  return errorResponse('Validation failed', 422);
}
```

## Database Security

### Connection String

```
postgresql://user:password@host:port/database?sslmode=require
```

### Least Privilege Principle

```sql
-- Create restricted user
CREATE USER app_user WITH PASSWORD 'strong_password';

-- Grant only necessary permissions
GRANT CONNECT ON DATABASE presentation_site TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
```

### Backup Encryption

```bash
# Encrypt backup
pg_dump presentation_site | gzip | gpg --encrypt > backup.sql.gz.gpg

# Decrypt and restore
gpg --decrypt backup.sql.gz.gpg | gunzip | psql presentation_site
```

## File Upload Security

### Validation

```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

if (!ALLOWED_TYPES.includes(file.type)) {
  throw new Error('Invalid file type');
}

if (file.size > MAX_SIZE) {
  throw new Error('File too large');
}
```

### Cloudinary Configuration

```typescript
// Use Cloudinary for secure file storage
const uploadResult = await cloudinary.uploader.upload(file, {
  folder: 'presentation-site',
  resource_type: 'auto',
  quality: 'auto',
});
```

## Logging and Monitoring

### Application Logging

```typescript
import { logger } from '@/lib/logger';

// Log security events
logger.warn('Failed login attempt', { email, ip });
logger.info('Admin action', { userId, action, timestamp });
logger.error('Database error', error);
```

### Monitoring

Set up alerts for:
- Failed login attempts
- Database errors
- API rate limit violations
- Unusual traffic patterns
- File upload failures

## Incident Response

### Steps:

1. **Detect**: Monitor logs and alerts
2. **Respond**: Disable affected accounts, isolate systems
3. **Investigate**: Review logs, identify root cause
4. **Remediate**: Patch vulnerabilities, reset credentials
5. **Recover**: Restore from backups if needed
6. **Review**: Document incident, update procedures

## Security Testing

### OWASP Top 10

Test for:
1. Injection attacks
2. Broken authentication
3. Sensitive data exposure
4. XML external entities (XXE)
5. Broken access control
6. Security misconfiguration
7. Cross-site scripting (XSS)
8. Insecure deserialization
9. Using components with known vulnerabilities
10. Insufficient logging & monitoring

### Tools

- **OWASP ZAP**: Automated security scanning
- **Burp Suite**: Manual penetration testing
- **npm audit**: Dependency vulnerability scanning
- **Snyk**: Continuous vulnerability monitoring

## Third-Party Security

### Cloudinary

- Enable signed URLs for file access
- Set up access controls
- Monitor usage and costs

### NextAuth.js

- Keep updated to latest version
- Review security advisories
- Configure secure session settings

### PostgreSQL

- Enable SSL connections
- Use strong authentication
- Monitor access logs
- Regular security updates

## Compliance

### GDPR

- Implement data deletion
- Provide data export functionality
- Document data processing
- Implement privacy policy

### CCPA

- Provide privacy policy
- Implement opt-out mechanisms
- Document data collection

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Prisma Security](https://www.prisma.io/docs/guides/security)

## Reporting Security Issues

If you discover a security vulnerability, please email security@yourdomain.com with:

- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

Please do not publicly disclose the vulnerability until it has been patched.

## Version History

- **v1.0.0** (2024): Initial security documentation


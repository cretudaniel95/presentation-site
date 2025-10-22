# API Documentation

This document provides comprehensive documentation for all API endpoints in the Presentation Site CMS.

## Base URL

```
http://localhost:3000/api          # Development
https://yourdomain.com/api         # Production
```

## Authentication

Most admin endpoints require authentication. Include the authentication token in the request headers:

```
Authorization: Bearer <token>
```

## Response Format

All API responses follow a standard format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "message": "Operation failed"
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Gallery Endpoints

### List Gallery Images

**GET** `/api/gallery`

Retrieve all gallery images with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| published | boolean | Filter by published status |
| limit | number | Number of results (default: 50) |
| offset | number | Pagination offset (default: 0) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/gallery?category=classic&published=true"
```

**Example Response:**

```json
{
  "success": true,
  "message": "Gallery images fetched successfully",
  "data": [
    {
      "id": "clh1234567890",
      "title": "Classic Red Nails",
      "description": "Elegant classic red nail design",
      "imageUrl": "https://example.com/image.jpg",
      "imageAlt": "Red nail art",
      "category": "classic",
      "order": 1,
      "published": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Gallery Image

**POST** `/api/gallery`

Create a new gallery image. Requires authentication.

**Request Body:**

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "imageUrl": "string (required, valid URL)",
  "imageAlt": "string (optional)",
  "category": "string (optional)",
  "order": "number (optional)",
  "published": "boolean (optional, default: false)"
}
```

**Example Request:**

```bash
curl -X POST "http://localhost:3000/api/gallery" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Glitter Design",
    "description": "Sparkling glitter nail art",
    "imageUrl": "https://example.com/glitter.jpg",
    "category": "glitter",
    "published": true
  }'
```

**Example Response:**

```json
{
  "success": true,
  "message": "Gallery image created successfully",
  "data": {
    "id": "clh9876543210",
    "title": "Glitter Design",
    "description": "Sparkling glitter nail art",
    "imageUrl": "https://example.com/glitter.jpg",
    "imageAlt": null,
    "category": "glitter",
    "order": 0,
    "published": true,
    "createdAt": "2024-01-20T14:22:00Z",
    "updatedAt": "2024-01-20T14:22:00Z"
  }
}
```

### Get Gallery Image

**GET** `/api/gallery/:id`

Retrieve a specific gallery image by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Gallery image ID |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/gallery/clh1234567890"
```

### Update Gallery Image

**PUT** `/api/gallery/:id`

Update a gallery image. Requires authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Gallery image ID |

**Request Body:**

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "imageUrl": "string (optional)",
  "imageAlt": "string (optional)",
  "category": "string (optional)",
  "order": "number (optional)",
  "published": "boolean (optional)"
}
```

**Example Request:**

```bash
curl -X PUT "http://localhost:3000/api/gallery/clh1234567890" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Updated Title",
    "published": true
  }'
```

### Delete Gallery Image

**DELETE** `/api/gallery/:id`

Delete a gallery image. Requires authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Gallery image ID |

**Example Request:**

```bash
curl -X DELETE "http://localhost:3000/api/gallery/clh1234567890" \
  -H "Authorization: Bearer <token>"
```

## Pages Endpoints

### List Pages

**GET** `/api/pages`

Retrieve all pages with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| published | boolean | Filter by published status |
| limit | number | Number of results (default: 50) |
| offset | number | Pagination offset (default: 0) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/pages?published=true"
```

### Create Page

**POST** `/api/pages`

Create a new page. Requires authentication.

**Request Body:**

```json
{
  "slug": "string (required, unique)",
  "title": "string (required)",
  "content": "string (required)",
  "metaTitle": "string (optional)",
  "metaDescription": "string (optional)",
  "published": "boolean (optional, default: false)"
}
```

**Example Request:**

```bash
curl -X POST "http://localhost:3000/api/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "slug": "services",
    "title": "Our Services",
    "content": "We offer professional nail art services...",
    "metaTitle": "Professional Nail Art Services",
    "metaDescription": "Discover our range of nail art services",
    "published": true
  }'
```

### Get Page

**GET** `/api/pages/:id`

Retrieve a specific page by ID.

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/pages/clh1234567890"
```

### Update Page

**PUT** `/api/pages/:id`

Update a page. Requires authentication.

**Example Request:**

```bash
curl -X PUT "http://localhost:3000/api/pages/clh1234567890" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content..."
  }'
```

### Delete Page

**DELETE** `/api/pages/:id`

Delete a page. Requires authentication.

**Example Request:**

```bash
curl -X DELETE "http://localhost:3000/api/pages/clh1234567890" \
  -H "Authorization: Bearer <token>"
```

## Contact Endpoints

### Submit Contact Form

**POST** `/api/contact`

Submit a contact form message. No authentication required.

**Request Body:**

```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "subject": "string (required)",
  "message": "string (required, min 10 characters)"
}
```

**Example Request:**

```bash
curl -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Nail Art Inquiry",
    "message": "I am interested in your nail art services for my wedding..."
  }'
```

**Example Response:**

```json
{
  "success": true,
  "message": "Message submitted successfully",
  "data": {
    "id": "clh5555555555",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Nail Art Inquiry",
    "message": "I am interested in your nail art services for my wedding...",
    "read": false,
    "createdAt": "2024-01-20T15:45:00Z",
    "updatedAt": "2024-01-20T15:45:00Z"
  }
}
```

### List Contact Messages

**GET** `/api/contact`

Retrieve all contact messages. Requires authentication.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| read | boolean | Filter by read status |
| limit | number | Number of results (default: 50) |
| offset | number | Pagination offset (default: 0) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/contact?read=false" \
  -H "Authorization: Bearer <token>"
```

### Get Contact Message

**GET** `/api/contact/:id`

Retrieve a specific contact message. Requires authentication.

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/contact/clh5555555555" \
  -H "Authorization: Bearer <token>"
```

### Update Contact Message

**PUT** `/api/contact/:id`

Update a contact message (e.g., mark as read). Requires authentication.

**Request Body:**

```json
{
  "read": "boolean (optional)"
}
```

**Example Request:**

```bash
curl -X PUT "http://localhost:3000/api/contact/clh5555555555" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "read": true
  }'
```

### Delete Contact Message

**DELETE** `/api/contact/:id`

Delete a contact message. Requires authentication.

**Example Request:**

```bash
curl -X DELETE "http://localhost:3000/api/contact/clh5555555555" \
  -H "Authorization: Bearer <token>"
```

## Authentication Endpoints

### Login

**POST** `/api/auth/login`

Authenticate a user and receive a session token.

**Request Body:**

```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)"
}
```

**Example Request:**

```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure_password_123"
  }'
```

**Example Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clh1111111111",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### Register

**POST** `/api/auth/register`

Create a new admin user account.

**Request Body:**

```json
{
  "email": "string (required, valid email, unique)",
  "name": "string (required, min 2 characters)",
  "password": "string (required, min 6 characters)",
  "confirmPassword": "string (required, must match password)"
}
```

**Example Request:**

```bash
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newadmin@example.com",
    "name": "New Admin",
    "password": "secure_password_123",
    "confirmPassword": "secure_password_123"
  }'
```

## Configuration Endpoints

### Get Site Configuration

**GET** `/api/config`

Retrieve the current site configuration.

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/config"
```

**Example Response:**

```json
{
  "success": true,
  "message": "Site configuration fetched successfully",
  "data": {
    "id": "default",
    "siteName": "Nail Art Presentation",
    "siteTagline": "Professional Nail Art Services",
    "description": "Showcase your nail art portfolio",
    "primaryColor": "#9333ea",
    "secondaryColor": "#64748b",
    "theme": "light",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Site Configuration

**PUT** `/api/config`

Update the site configuration. Requires authentication.

**Request Body:**

```json
{
  "siteName": "string (optional)",
  "siteTagline": "string (optional)",
  "description": "string (optional)",
  "primaryColor": "string (optional, hex color)",
  "secondaryColor": "string (optional, hex color)",
  "theme": "string (optional, 'light' | 'dark' | 'auto')"
}
```

**Example Request:**

```bash
curl -X PUT "http://localhost:3000/api/config" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "siteName": "Updated Site Name",
    "primaryColor": "#ff6b9d",
    "theme": "dark"
  }'
```

## Error Handling

### Validation Errors

When validation fails, the API returns a 422 status with details:

```json
{
  "success": false,
  "error": "Invalid email format",
  "message": "Validation error"
}
```

### Authentication Errors

When authentication is required but not provided or invalid:

```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### Not Found Errors

When a resource is not found:

```json
{
  "success": false,
  "error": "Resource not found",
  "message": "Not found"
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Default**: 100 requests per 15 minutes per IP
- **Auth endpoints**: 5 requests per 15 minutes per IP

When rate limit is exceeded:

```json
{
  "success": false,
  "error": "Too many requests",
  "message": "Rate limit exceeded"
}
```

HTTP Status: 429

## Pagination

List endpoints support pagination with `limit` and `offset` parameters:

```bash
# Get 10 items starting from offset 20
curl -X GET "http://localhost:3000/api/gallery?limit=10&offset=20"
```

## Sorting

List endpoints support sorting with `sortBy` and `sortOrder` parameters:

```bash
# Sort by creation date in descending order
curl -X GET "http://localhost:3000/api/gallery?sortBy=createdAt&sortOrder=desc"
```

## Filtering

Use query parameters to filter results:

```bash
# Filter gallery by category
curl -X GET "http://localhost:3000/api/gallery?category=classic"

# Filter pages by published status
curl -X GET "http://localhost:3000/api/pages?published=true"

# Filter messages by read status
curl -X GET "http://localhost:3000/api/contact?read=false"
```

## CORS

CORS is configured to allow requests from:
- `http://localhost:3000` (development)
- `https://yourdomain.com` (production)

To add additional origins, update the CORS configuration in the API routes.

## Webhooks

Webhooks can be configured to receive notifications for certain events:
- New contact message submitted
- Gallery image uploaded
- Page published

Contact support to set up webhooks.

## SDKs and Libraries

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get gallery images
const gallery = await api.get('/gallery');

// Create page
const page = await api.post('/pages', {
  slug: 'about',
  title: 'About Us',
  content: 'Content here...'
});
```

### Python

```python
import requests

api_url = "http://localhost:3000/api"
headers = {"Authorization": f"Bearer {token}"}

# Get gallery images
response = requests.get(f"{api_url}/gallery", headers=headers)
images = response.json()['data']

# Submit contact form
contact_data = {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "I'm interested in your services..."
}
response = requests.post(f"{api_url}/contact", json=contact_data)
```

## Support

For API support and questions, please refer to the main README or create an issue in the repository.


import { NextRequest, NextResponse } from 'next/server';

// Middleware to protect admin routes
export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    // TODO: Implement proper authentication check
    // For now, this is a placeholder
    
    // Check if user is authenticated
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(req);
  };
}

// Middleware to validate request body
export function withValidation(schema: any) {
  return (handler: (req: NextRequest, data: any) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      try {
        const body = await req.json();
        const validatedData = schema.parse(body);
        return handler(req, validatedData);
      } catch (error: any) {
        return NextResponse.json(
          { success: false, error: error.errors?.[0]?.message || 'Validation error' },
          { status: 422 }
        );
      }
    };
  };
}

// Middleware for rate limiting
export function withRateLimit(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
  const requests = new Map<string, number[]>();

  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      const ip = req.ip || 'unknown';
      const now = Date.now();
      const windowStart = now - windowMs;

      if (!requests.has(ip)) {
        requests.set(ip, []);
      }

      const userRequests = requests.get(ip)!.filter((time) => time > windowStart);

      if (userRequests.length >= maxRequests) {
        return NextResponse.json(
          { success: false, error: 'Too many requests' },
          { status: 429 }
        );
      }

      userRequests.push(now);
      requests.set(ip, userRequests);

      return handler(req);
    };
  };
}


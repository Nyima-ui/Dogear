import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Clerk middleware for API and protected routes
    '/(api|trpc)(.*)',
    '/dashboard/:path*',
    '/reader/:path*',
  ],
};
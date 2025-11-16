import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'es',
  
  // Always show the locale prefix, even for default locale
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  // Exclude API routes, Next.js internals, static files, and Sanity Studio
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*|studio).*)']
};

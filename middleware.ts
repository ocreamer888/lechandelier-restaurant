import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es'
});

export default function middleware(request: NextRequest) {
  // Force redirect root to /es
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/es', request.url));
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(es|en)/:path*']
};

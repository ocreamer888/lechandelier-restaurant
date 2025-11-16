import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('[MIDDLEWARE TEST] Path:', pathname);
  
  if (pathname === '/') {
    console.log('[MIDDLEWARE TEST] Redirecting / to /es');
    return NextResponse.redirect(new URL('/es', request.url), 308);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/'
};

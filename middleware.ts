import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Defensive: serve the canonical "/" instead of a duplicate "/index.html" (T3).
  if (request.nextUrl.pathname === '/index.html') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }
  return intlMiddleware(request);
}

export const config = {
  // The dot-path exclusion protects static assets; "/index.html" is added back
  // explicitly (narrow exact match, never a broad `.*\.html` rule).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/index.html'],
};

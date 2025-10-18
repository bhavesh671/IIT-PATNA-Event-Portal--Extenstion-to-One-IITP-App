import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow auth routes and static files
  const publicPaths = [
    '/auth/login',
    '/auth/register',
    '/api/auth',
    '/_next',
    '/images',
    '/uploads',
    '/favicon.ico',
    '/api/register',
    '/api/upload',
    '/auth/forgot-password',
    '/api/otp',
    '/api/login',
    '/api/user',
    '/profile',
    '/registered-events',
    '/rules',
  ]
  const isPublic = publicPaths.some((p) => pathname.startsWith(p))

  // Require auth for everything else; check our local storage cookie fallback
  const isAuthenticatedCookie =
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token') ||
    request.cookies.get('app_session')

  if (!isPublic && !isAuthenticatedCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|images|favicon.ico|api/auth|auth/login|auth/register|api/login).*)',
  ],
}



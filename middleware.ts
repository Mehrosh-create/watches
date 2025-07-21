// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = [
    '/account',
    '/checkout',
    '/orders',
    '/admin'
  ]

  // Auth routes
  const authRoutes = [
    '/auth/login',
    '/auth/register'
  ]

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if route is auth route
  const isAuthRoute = authRoutes.includes(pathname)

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url)
    )
  }

  // Redirect to home if accessing auth route with auth
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Admin route protection
  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
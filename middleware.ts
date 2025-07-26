// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  prefix: 'middleware-ratelimit'
})

export async function middleware(request: NextRequest) {
  // ===== DEBUG LOGS (REMOVE IN PRODUCTION) =====
  console.log('\n===== MIDDLEWARE TRACE =====')
  console.log('Path:', request.nextUrl.pathname)
  
  // IP Header Debug
  const ipHeaders = {
    'x-real-ip': request.headers.get('x-real-ip'),
    'x-forwarded-for': request.headers.get('x-forwarded-for'),
    'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
    'user-ip': request.headers.get('user-ip')
  }
  console.log('IP Headers:', ipHeaders)

  // Safe geo location logging
  if (process.env.VERCEL === '1') {
    const geo = {
      city: request.headers.get('x-vercel-ip-city'),
      country: request.headers.get('x-vercel-ip-country'),
      region: request.headers.get('x-vercel-ip-country-region')
    }
    console.log('Vercel Geo:', geo)
  }
  // ===== END DEBUG =====

  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Route Definitions
  const protectedRoutes = ['/account', '/checkout', '/orders', '/admin']
  const authRoutes = ['/auth/login', '/auth/register']

  // Rate Limiting
  if (pathname.startsWith('/api') || pathname.startsWith('/auth')) {
    const ip = ipHeaders['x-real-ip'] || 
               ipHeaders['x-forwarded-for']?.split(',')[0]?.trim() || 
               '127.0.0.1'
    
    console.log('Applying rate limit to IP:', ip)
    
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      console.warn('⚠️ Rate limit exceeded for IP:', ip)
      return new NextResponse('Too many requests', { status: 429 })
    }
  }

  // Response Setup
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Route Protection Logic
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.includes(pathname)

  if (isProtectedRoute && !token) {
    console.log('🔒 Redirecting to login from protected route:', pathname)
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname))
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && token) {
    console.log('➡️ Redirecting authenticated user from auth route')
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    console.warn('⛔ Blocked non-admin access to admin route')
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log('✅ Request allowed for path:', pathname)
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
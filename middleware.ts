// middleware.ts
import { auth } from '@/app/api/auth/[...nextauth]/route';  
import { NextResponse } from 'next/server';

export default async function middleware(req: any) {
  const protectedRoutes = ['/dashboard', '/profile'];
  const isProtected = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  const authResult = await auth();

  if (isProtected && !authResult) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admin route protection
  if (req.nextUrl.pathname.startsWith('/admin') && authResult?.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
// /middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect based on role
  if (role === 'patient' && request.nextUrl.pathname === '/dashboard/doctor') {
    return NextResponse.redirect(new URL('/dashboard/patient', request.url));
  }

  return NextResponse.next();
}
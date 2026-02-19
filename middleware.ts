import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Admin credentials - in production, use environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PrefShares2026!'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check for auth cookie
    const authCookie = request.cookies.get('admin_auth')
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow access to login page and other routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

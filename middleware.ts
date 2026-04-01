import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'bg', 'ru']
const defaultLocale = 'bg'

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  
  // Public files to ignore
  const publicFiles = [
    '/favicon.ico',
    '/icon.svg',
    '/apple-icon.png',
    '/robots.txt',
    '/sitemap.xml',
    '/placeholder',
    '/images/',
    '/admin/'
  ]

  if (publicFiles.some(file => pathname.startsWith(file)) || pathname.includes('.')) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Matcher ignoring `/_next` and `/api`
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

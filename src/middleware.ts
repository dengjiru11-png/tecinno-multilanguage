import createMiddleware from 'next-intl/middleware'
import { routing } from './lib/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/((?!studio|_next|_vercel|.*\\..*).*)',
    '/(en|zh-Hant|zh-Hans|ja)/:path*',
  ],
}

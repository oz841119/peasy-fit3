import { NextRequest, NextResponse } from "next/server"
import { getPreferredLanguageByAcceptLanguage } from "./lib/utils";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const redirectURL = request.nextUrl
  const projectLocales = ['zh-TW', 'en-US']
  const hasLocaleOnPathname = projectLocales.some(locale => pathname.startsWith('/' + locale))
  if(hasLocaleOnPathname) return
  if(!hasLocaleOnPathname) {
    const acceptLanguage = request.headers.get('accept-language') || ''
    const preferredLanguage = getPreferredLanguageByAcceptLanguage(acceptLanguage)
    const defaultLanguage = projectLocales[0]
    redirectURL.pathname = (preferredLanguage || defaultLanguage) + `/${pathname}`
  }
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: ['/((?!_next).*)'],
}
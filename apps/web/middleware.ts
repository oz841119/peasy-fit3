import { NextRequest, NextResponse } from "next/server"
import { getPreferredLanguageByAcceptLanguage } from "./lib/utils";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  let redirectURL = request.nextUrl
  switch (pathname) {
    case '/': {
      const DEFAULT_LANGUAGE = 'zh-tw'
      const acceptLanguage = request.headers.get('accept-language')
      const preferredLanguage = acceptLanguage ? getPreferredLanguageByAcceptLanguage(acceptLanguage).toLowerCase() : DEFAULT_LANGUAGE
      redirectURL.pathname += preferredLanguage
      break
    }
  }
  return NextResponse.redirect(request.nextUrl)
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
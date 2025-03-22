import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import createMiddleware from "next-intl/middleware";

/**
 * Processes an incoming Next.js request using internationalization routing.
 *
 * This middleware function initializes an internationalization routing handler with a predefined configuration
 * and applies it to the incoming request, returning the modified response.
 *
 * @param request The incoming Next.js request to process.
 * @returns The response after applying internationalization routing.
 */
export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
  return response;
}
 
export const config = {
  matcher: ['/((?!_next|api|static).*)'],
}
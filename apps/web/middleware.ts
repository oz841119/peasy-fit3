import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export default async function middleware(request: NextRequest) {
	const handleI18nRouting = createMiddleware(routing);
	const response = handleI18nRouting(request);
	return response;
}

export const config = {
	matcher: ["/((?!_next|api|static).*)"],
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPreferredLocaleByAcceptLanguage(acceptLanguage: string) {
	const languages = acceptLanguage.split(",");
	const preferredLanguage = languages[0];
	return preferredLanguage;
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPreferredLanguageByAcceptLanguage(acceptLanguage: string) {
  const languages = acceptLanguage.split(',')
  const preferredLanguage = languages[0]
  return preferredLanguage
}
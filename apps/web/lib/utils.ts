import { COLOR_THEME } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getThemeClassName(theme?: string) {
  if(!theme) return ''
  const targetTheme = COLOR_THEME[theme]
  return ''
}
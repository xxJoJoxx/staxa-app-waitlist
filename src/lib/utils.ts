import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates an email address using a regex pattern
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generates a unique ID with a given prefix
 */
export function generateId(prefix: string = 'stx'): string {
  const randomStr = Math.random().toString(36).substring(2, 10)
  const timestamp = Date.now().toString(36)
  return `${prefix}_${timestamp}${randomStr}`
}

export const COOKIES = {
  return_uri: 'return_uri'
} as const

export type COOKIE = keyof typeof COOKIES

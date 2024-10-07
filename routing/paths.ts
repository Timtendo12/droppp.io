export const login = (redirectTo?: string) =>
  redirectTo ? `/auth/?return_uri=${encodeURIComponent(redirectTo)}` : `/auth`

export const emailVerification = '/email-verification' as const

export const inventory = '/inventory' as const

export const home = '/' as const

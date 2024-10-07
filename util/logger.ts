import * as Sentry from '@sentry/nextjs'
import * as cookies from '../contexts/auth/cookies'
import { isDev, isLocal } from '@/config'

export const logSessionEvent = (message: string) => {
  // This can be removed at some point, but I'd like to keep it in while my changes
  // marinate on dev to help verify that I haven't broken anything - Eric, Tue Mar 7 2023
  if (
    (isLocal && process.env.NEXT_PUBLIC_LOG_SESSION_EVENTS) ||
    (isDev && process.env.npm_lifecycle_event !== 'build')
  ) {
    const now = new Date(Date.now())
    const timestamp = now.toISOString().slice(11, 23)
    const authenticated = cookies.haveVerifiedAccessToken()
      ? 'authenticated'
      : 'anonymous'
    console.log(`[${timestamp}] [session] [${authenticated}] ${message}`)
  }
}

export const logMsg = msg => {
  Sentry.captureMessage(msg)
}

export const logError = err => {
  Sentry.captureException(err)
}

export const SENTRY_DSN =
  process.env.SENTRY_DSN ||
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  'https://ff5437995a5f4d0aa7bc8d7c34dde326@o1331173.ingest.sentry.io/6617263'

const env = process.env.NEXT_PUBLIC_ENV || ''
const sentryBlackList = ['local']
const sentryNetworkDetailBlacklist = ['local', 'prod']
export const isSentryEnabled = !sentryBlackList.includes(env)
export const isSentryNetworkDetailEnabled =
  !sentryNetworkDetailBlacklist.includes(env)

import { RequestConfig } from '../http/request'
import * as cookies from '@/contexts/auth/cookies'
import { logSessionEvent } from '@/util/logger'

const formatAuthToken = (token: string | null) =>
  token ? token.slice(0, 7) : '[n/a]'

export function logAuthTokens(request?: RequestConfig, tag: string = '') {
  const url = request?.url ?? 'n/a'
  const refreshToken = formatAuthToken(cookies.getRefreshToken())
  const accessToken = formatAuthToken(cookies.getAccessToken())
  const accessTokenScope = cookies.getAccessTokenScope() ?? '[n/a]'
  logSessionEvent(
    `[authTokens] ${tag} ${url} | access: ${accessToken} | scope: ${accessTokenScope} | refresh: ${refreshToken}`
  )
}

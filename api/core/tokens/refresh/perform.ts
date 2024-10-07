import * as cookies from '@/contexts/auth/cookies'
import { refreshTokens } from '@/api/resources/user/token/refresh'

export async function performRefreshAuthTokens() {
  const currentRefreshToken = cookies.getRefreshToken()
  const currentAccessToken = cookies.getAccessToken()

  if (currentRefreshToken && !currentAccessToken) {
    try {
      cookies.removeTokens()
      const { token } = await refreshTokens(currentRefreshToken)
      cookies.setTokens(token)
      return true
    } catch (_err) {
      return false
    }
  }

  return cookies.haveVerifiedAccessToken()
}

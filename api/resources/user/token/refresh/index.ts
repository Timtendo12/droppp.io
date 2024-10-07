import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TokenRefreshResponse } from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-usertokenrefresh
export const refreshTokensPath = '/user/token/refresh'

export const refreshTokens = async (
  refreshToken: string
): Promise<TokenRefreshResponse> =>
  post<TokenRefreshResponse>(
    buildApiUrl(refreshTokensPath, {
      refresh_token: refreshToken
    })
  )

import { AxiosError } from 'axios'
import { RequestConfig } from '@/api/core/http/request'
import { HttpStatusCode } from '@/api/core/http/status'
import { logSessionEvent } from '@/util/logger'
import { isBrowser } from '@/util/envHelpers'
import * as cookies from '@/contexts/auth/cookies'
import { refreshTokensPath } from '@/api/resources/user/token/refresh'
import { performRefreshAuthTokens } from './perform'

let pendingRefresh: Promise<boolean> | null = null

export async function attemptRefreshAuthTokens(
  error: any
): Promise<RequestConfig | null> {
  if (!isBrowser) return null
  if (!error?.isAxiosError) return null

  const axiosError = error satisfies AxiosError
  const status = axiosError.response?.status
  const request = axiosError.config satisfies RequestConfig
  const url = request.url
  const isForbiddenStatus = status === HttpStatusCode.Forbidden

  logSessionEvent(
    `[authTokens] [refresh] [ATTEMPTING] ${url} | pending refresh: ${!!pendingRefresh}`
  )

  if (request._isRetry) {
    isForbiddenStatus && cookies.removeTokens()
    request._isRetry = false
    return request
  }

  if (url === refreshTokensPath) return request
  if (!isForbiddenStatus) return request

  if (!pendingRefresh) pendingRefresh = performRefreshAuthTokens()
  const refreshResult = await pendingRefresh
  pendingRefresh = null

  request._isRetry = refreshResult

  logSessionEvent(
    `[authTokens] [refresh] [COMPLETE] ${request.url} | will retry: ${request._isRetry}`
  )

  return request
}

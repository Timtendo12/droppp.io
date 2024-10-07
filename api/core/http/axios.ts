import axios from 'axios'
import { apiUrl } from '@/config'
import { ApiError, ApiErrorRequest, isApiErrorResponse } from '../errors'
import { CookieKey, getCookieStoreForRequest } from './cookies'
import { buildDefaultHeaders, includeOutgoingHeaders } from './headers'
import { RequestConfig } from './request'
import { shouldIncludeAccessToken } from './auth'
import { logAuthTokens } from '../tokens/log'
import { attemptRefreshAuthTokens } from '../tokens/refresh/attempt'

export const prepareRequest = (request: RequestConfig): RequestConfig => {
  logAuthTokens(request, '[prepareRequest]')

  const cookieStore = getCookieStoreForRequest(request)
  const accessToken = cookieStore?.get(CookieKey.accessToken)

  if (accessToken && shouldIncludeAccessToken(request)) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  includeOutgoingHeaders(request)

  return request
}

const buildApiErrorRequest = (
  request: RequestConfig
): ApiErrorRequest | undefined =>
  request && {
    url: request.url,
    queryKey: request.queryKey
  }

export const handleResponseError = async error => {
  logAuthTokens(
    error?.config,
    `[handleResponseError] [${error?.request?.status}]`
  )

  const request = await attemptRefreshAuthTokens(error)
  if (request?._isRetry) return http.request(request)

  const errorData = error?.response?.data
  const errorRequest = buildApiErrorRequest(request)

  return Promise.reject(
    isApiErrorResponse(errorData)
      ? new ApiError(errorData, errorRequest)
      : error
  )
}

const http = axios.create({
  baseURL: apiUrl,
  headers: buildDefaultHeaders()
})

http.interceptors.request.use(prepareRequest, err => Promise.reject(err))
http.interceptors.response.use(response => response, handleResponseError)

export default http

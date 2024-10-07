import {
  CookieValueTypes,
  getCookie,
  setCookie,
  deleteCookie
} from 'cookies-next'
import { NextPageContext } from 'next'
import { getContextFromRequest, RequestConfig } from './request'
import { isServer } from '@/util/envHelpers'

export enum CookieKey {
  accessToken = 'token',
  refreshToken = 'refresh_token',
  oAuthData = 'oauth_data',
  returnUri = 'return_uri',
  redirectUri = 'redirect_uri',
  accessTokenScope = 'token_scope',
  geoIpContinent = '__dp-geo'
}

export interface CookieStore {
  get(key: CookieKey): CookieValueTypes
  set(key: CookieKey, value: string, expiresInSeconds?: number): void
  remove(key: CookieKey): void
}

// Expiration values in seconds from the API after login - Eric, Mon Jan 30 2023
// Access Token: 28800 seconds (8 hours)
// Refresh Token: 604800 seconds (1 week)
const calculateExpiration = (expiresInSeconds?: number): Date | undefined => {
  if (expiresInSeconds) {
    const now = new Date(Date.now())
    now.setSeconds(now.getSeconds() + expiresInSeconds)
    return now
  } else {
    return undefined
  }
}

export class ClientCookieStore implements CookieStore {
  get(key: CookieKey) {
    return getCookie(key)
  }

  set(key: CookieKey, value: string, expiresInSeconds?: number) {
    return setCookie(key, value, {
      expires: calculateExpiration(expiresInSeconds)
    })
  }

  remove(key: CookieKey) {
    return deleteCookie(key)
  }
}

export class ServerCookieStore implements CookieStore {
  private readonly options

  constructor({ req, res }: NextPageContext) {
    this.options = { req, res }
  }

  get(key: CookieKey) {
    return getCookie(key, this.options)
  }

  set(key: CookieKey, value: string, expiresInSeconds?: number) {
    const options = {
      ...this.options,
      ...{ expires: calculateExpiration(expiresInSeconds) }
    }
    return setCookie(key, value, options)
  }

  remove(key: CookieKey) {
    return deleteCookie(key, this.options)
  }
}

export const getServerCookieStore = (nextPageContext: NextPageContext) =>
  new ServerCookieStore(nextPageContext)

export const getClientCookieStore = () => new ClientCookieStore()

export const getCookieStoreForRequest = (
  request?: RequestConfig
): CookieStore | null => {
  if (isServer) {
    const nextPageContext = getContextFromRequest(request)
    return nextPageContext ? getServerCookieStore(nextPageContext) : null
  } else {
    return getClientCookieStore()
  }
}

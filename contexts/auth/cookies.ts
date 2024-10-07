import { CookieKey, getClientCookieStore } from '@/api/core/http/cookies'
import { Token } from '@/api/resources/shared/token'

const cookieStore = getClientCookieStore()

const TwoFaTokenScope = '2fa'

// tokens
export const haveVerifiedAccessToken = () =>
  !!getAccessToken() && getAccessTokenScope() !== TwoFaTokenScope

export const haveRefreshToken = () => !!getRefreshToken()

export const haveSession = () => haveVerifiedAccessToken() || haveRefreshToken()

export const getAccessToken = () =>
  cookieStore.get(CookieKey.accessToken)?.toString() ?? null

export const getRefreshToken = () =>
  cookieStore.get(CookieKey.refreshToken)?.toString() ?? null

export const getAccessTokenScope = () =>
  cookieStore.get(CookieKey.accessTokenScope)?.toString() ?? null

export const setTokens = (token: Token) => {
  const {
    access_token,
    expires_in,
    refresh_token,
    scope,
    refresh_token_expires_in
  } = token

  if (scope) {
    cookieStore.set(CookieKey.accessTokenScope, scope, expires_in)
  } else {
    cookieStore.remove(CookieKey.accessTokenScope)
  }

  cookieStore.set(CookieKey.accessToken, access_token, expires_in)
  cookieStore.set(
    CookieKey.refreshToken,
    refresh_token,
    refresh_token_expires_in
  )
}

export const removeTokens = () => {
  cookieStore.remove(CookieKey.accessToken)
  cookieStore.remove(CookieKey.refreshToken)
  cookieStore.remove(CookieKey.accessTokenScope)
}

// OAuth
export const setOauthData = data => cookieStore.set(CookieKey.oAuthData, data)
export const removeOauthData = () => cookieStore.remove(CookieKey.oAuthData)
export const getOauthData = () => {
  const value = cookieStore.get(CookieKey.oAuthData)?.toString()
  return value ? JSON.parse(decodeURIComponent(value)) : null
}

// returnUri
export const setReturnUri = uri => cookieStore.set(CookieKey.returnUri, uri)
export const removeReturnUri = () => cookieStore.remove(CookieKey.returnUri)
export const getReturnUri = () =>
  cookieStore.get(CookieKey.returnUri)?.toString()

// redirect_uri
export const setRedirectUri = uri => cookieStore.set(CookieKey.redirectUri, uri)
export const removeRedirectUri = () => cookieStore.remove(CookieKey.redirectUri)
export const getRedirectUri = () =>
  cookieStore.get(CookieKey.redirectUri)?.toString()

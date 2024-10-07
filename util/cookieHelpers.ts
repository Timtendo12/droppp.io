import { CookieKey, getClientCookieStore } from '@/api/core/http/cookies'
import { COOKIE, COOKIES } from '../constants/cookies'
import Cookies from 'js-cookie'

export const setCookie = (property: COOKIE, value: string) => {
  Cookies.set(property, value)
}

export const removeCookie = (property: COOKIE) => {
  Cookies.set(property)
}

export const setReturnUri = (uri: string) => {
  setCookie(COOKIES.return_uri, uri)
}

export const removeTokenScope = () => {
  const cookieStore = getClientCookieStore()
  cookieStore.remove(CookieKey.accessTokenScope)
}

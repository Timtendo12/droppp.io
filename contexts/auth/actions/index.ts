import {
  ApiResult,
  LoginRequiredResponse,
  tryApiAction
} from '@/api/core/compat'
import * as Sentry from '@sentry/browser'
import { AuthInput, LoginResponse } from '@/api/resources/shared/auth'
import { emailLogin } from '@/api/resources/user/login'
import { appleLogin } from '@/api/resources/apple/login'
import { googleLogin } from '@/api/resources/google/login'
import { userLogout } from '@/api/resources/user/logout'
import { userSignup } from '@/api/resources/user/add'
import { UserSignupResponse } from '@/api/resources/user/add/schema'
import * as paths from '@/routing/paths'
import * as cookies from '@/contexts/auth/cookies'
import { logSessionEvent } from '@/util/logger'
import { UserGetResponse } from '@/api/resources/user/get/schema'
import { getCurrentUser } from '@/api/resources/user/get'
import { SessionAction, UserFetchStatus, WalletOption } from '../types'

const login = (dispatch, loginFn) => async input => {
  const result = await tryApiAction<LoginResponse>(() => loginFn(input))
  const { success, data } = result

  if (success) {
    cookies.setTokens(data.token)
    dispatch({ type: SessionAction.Login, payload: data })
  }

  return result
}

export const loginEmail = dispatch => async (input: AuthInput) =>
  login(dispatch, emailLogin)(input)

export const loginApple = dispatch => async (input: AuthInput) =>
  login(dispatch, appleLogin)(input)

export const loginGoogle = dispatch => async (input: AuthInput) =>
  login(dispatch, googleLogin)(input)

export const signup = dispatch => async (input: AuthInput) => {
  const result = await tryApiAction<UserSignupResponse>(() => userSignup(input))
  const { success, data } = result

  if (success) {
    const { token, redirect_uri } = data

    cookies.setTokens(token)
    redirect_uri
      ? cookies.setRedirectUri(redirect_uri)
      : cookies.removeRedirectUri()

    dispatch({ type: SessionAction.Signup, payload: data })
  }

  return result
}

export const fetchUser =
  (dispatch, setUserFetchStatus) =>
  async (input?: AuthInput): Promise<ApiResult<UserGetResponse>> => {
    // IMPORTANT: This is necessary because the back-end relies on explicit fetch calls from
    // specific components at specific times throughout the app.
    // This would be undermined by caching the user in React Query.
    // We have some ideas on how to remediate this, but for now it is what it is.
    // Eric, Fri Mar 10 2023

    if (cookies.haveSession()) {
      logSessionEvent(`[fetchUser] fetching user`)
      setUserFetchStatus(UserFetchStatus.Fetching)
      const result = await tryApiAction<UserGetResponse>(() =>
        getCurrentUser(input)
      )
      const { success, data } = result
      if (success) {
        dispatch({ type: SessionAction.FetchedUser, payload: data })
      }
      setUserFetchStatus(UserFetchStatus.Complete)
      return result
    } else {
      logSessionEvent(`[fetchUser] skipping fetch - not authenticated`)
      setUserFetchStatus(UserFetchStatus.Skipped)
      return { success: false, data: LoginRequiredResponse }
    }
  }

export const setSelectedWallet = dispatch => async (wallet: WalletOption) =>
  dispatch({ type: SessionAction.SelectWallet, payload: { wallet } })

export const logout =
  (dispatch, router, queryClient) => async (goToPath?: string) => {
    tryApiAction<void>(() => userLogout()).then()
    cookies.removeTokens()
    dispatch({ type: SessionAction.Logout, payload: {} })
    Sentry.setUser(null)
    router.replace(goToPath ?? paths.home).then()
    cookies.removeReturnUri()
    queryClient.removeQueries()
  }

import { useRouter } from 'next/router'
import pDebounce from 'p-debounce'
import { useQueryClient } from '@tanstack/react-query'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { AuthContextType, UserFetchStatus } from './types'
import { logSessionEvent } from '@/util/logger'
import { defaultSessionUser, sessionReducer } from './reducer'
import * as actions from './actions'
import * as cookies from './cookies'
import { connectToRouter } from './routing'
import { isTest } from '@/config'
import * as Sentry from '@sentry/browser'

const pDebounceConfig = {
  wait: isTest ? 0 : 250,
  options: { before: !isTest }
}

const AuthContext = createContext<Partial<AuthContextType>>({})
export const useAuth = () => useContext(AuthContext)

const sessionAuthentication = {
  get isAuthenticated() {
    return cookies.haveSession()
  }
}

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [sessionUser, dispatch] = useReducer(
    sessionReducer,
    defaultSessionUser()
  )
  const [userFetchStatus, setUserFetchStatus] = useState<UserFetchStatus>(
    UserFetchStatus.Initial
  )

  logSessionEvent(`[context] fetch status: ${userFetchStatus}`)

  const isUserLoading = userFetchStatus === UserFetchStatus.Initial
  const isFetchingUser = userFetchStatus === UserFetchStatus.Fetching

  const signup = actions.signup(dispatch)
  const loginEmail = actions.loginEmail(dispatch)
  const loginApple = actions.loginApple(dispatch)
  const loginGoogle = actions.loginGoogle(dispatch)
  const logout = actions.logout(dispatch, router, queryClient)
  const setSelectedWallet = actions.setSelectedWallet(dispatch)
  const fetchUser = useCallback(
    pDebounce(
      actions.fetchUser(dispatch, setUserFetchStatus),
      pDebounceConfig.wait,
      pDebounceConfig.options
    ),
    [dispatch, setUserFetchStatus]
  )

  useEffect(connectToRouter(router, fetchUser), [router, fetchUser])

  useEffect(() => {
    if (sessionUser.user) {
      const { account_wax, account_wax_free } = sessionUser.user
      Sentry.setUser({
        username: account_wax || account_wax_free || 'no wax account'
      })
    }
  }, [sessionUser])

  useEffect(() => {
    fetchUser().then()
  }, [])

  // We should really think about splitting this up. Perhaps AuthProvider/useAuth, AccountProvider/useAccount,
  // WalletProvider/useWallet etc.? Or maybe something else entirely (e.g. jotai/zustand) for global dynamic state?
  //
  // I'm not sure, but we re-render the `children` every time the `value` prop changes b/c that's how React context works.
  // https://www.developerway.com/posts/react-re-renders-guide#part7.4
  //
  // For example, the cookie function definitions are static, but it doesn't really matter b/c the
  // `value` prop is re-initialized with each render of the context. There's definitely a fair number of components
  // that rely on useAuth (48 atm), but maybe we can start by carving off the dynamic attributes to start. Eric, Tue Mar 14 2023

  return (
    <AuthContext.Provider
      value={{
        ...sessionUser,
        ...sessionAuthentication,
        isUserLoading,
        isFetchingUser,
        signup,
        loginEmail,
        loginGoogle,
        loginApple,
        fetchUser,
        setSelectedWallet,
        logout,
        getOauthData: cookies.getOauthData,
        setOauthData: cookies.setOauthData,
        removeOauthData: cookies.removeOauthData,
        getRedirectUri: cookies.getRedirectUri,
        setRedirectUri: cookies.setRedirectUri,
        removeRedirectUri: cookies.removeRedirectUri,
        getReturnUri: cookies.getReturnUri,
        setReturnUri: cookies.setReturnUri,
        removeReturnUri: cookies.removeReturnUri
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

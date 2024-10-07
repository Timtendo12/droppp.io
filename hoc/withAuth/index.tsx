import { useRouter } from 'next/router'
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '@/contexts/auth'
import { logSessionEvent } from '@/util/logger'
import { buildRedirectRoute, RedirectRoute } from './redirect'
import { isBrowser } from '@/util/envHelpers'
import { User } from '@/api/resources/shared/user'

const logPage = (
  componentName: string,
  componentRenderedRef: MutableRefObject<boolean>,
  isUserLoading: boolean,
  user: User
) =>
  logSessionEvent(
    `[withAuth] ${componentName}, isBrowser: ${isBrowser}, user: ${
      user?.email ?? 'anonymous'
    },
      }, isUserLoading: ${isUserLoading}, componentRendered: ${
      componentRenderedRef.current
    }`
  )

const logRedirect = (
  enabled: boolean,
  user: User,
  pathname: string,
  pendingRedirectRef: MutableRefObject<RedirectRoute>
) => {
  logSessionEvent(
    `[withAuth] [redirect] enabled: ${Boolean(enabled)}, user: ${
      user?.email ?? 'anonymous'
    }, pathname: ${pathname}, emailVerified: ${
      user?.email_verified ?? 'n/a'
    }, pendingRedirect: ${!!pendingRedirectRef.current}`
  )
}

const withAuth = WrappedComponent => {
  const ResultComponent = props => {
    const router = useRouter()
    const { user, isUserLoading, isFetchingUser } = useAuth()
    const componentRenderedRef = useRef(false)
    const pendingRedirectRef = useRef<RedirectRoute>(null)

    const componentName = WrappedComponent.displayName ?? 'WrappedComponent'
    logPage(componentName, componentRenderedRef, isUserLoading, user)

    // Only run the redirect check when:
    // 1) The browser router is ready
    // 2) We haven't yet rendered the page component
    // 3) The user isn't being fetched *OR* the user has been fetched once AND their email is verified
    // Eric, Tue Apr 4 2023
    const routerIsReady = isBrowser && router.isReady
    const notYetRendered = !componentRenderedRef.current
    const sessionIsReady =
      (!isUserLoading && !isFetchingUser) || user?.email_verified

    const redirectEnabled = routerIsReady && notYetRendered && sessionIsReady

    logRedirect(redirectEnabled, user, router.pathname, pendingRedirectRef)

    pendingRedirectRef.current = useMemo(() => {
      if (!redirectEnabled) return null
      if (pendingRedirectRef.current) return pendingRedirectRef.current
      return buildRedirectRoute(router, user)
    }, [redirectEnabled, pendingRedirectRef.current, user])

    useEffect(() => {
      pendingRedirectRef.current?.redirect()
    }, [pendingRedirectRef.current])

    if (pendingRedirectRef.current) {
      logSessionEvent(
        `[withAuth] will not render ${componentName} - pending redirect to ${pendingRedirectRef.current?.path}`
      )
      return null
    }

    if (user) {
      componentRenderedRef.current = true
      logSessionEvent(`[withAuth] rendering ${componentName}`)
      return <WrappedComponent {...props} />
    } else {
      logSessionEvent(`[withAuth] will not render ${componentName} - no user`)
      return null
    }
  }

  ResultComponent.displayName = 'withAuth'
  return ResultComponent
}

export default withAuth

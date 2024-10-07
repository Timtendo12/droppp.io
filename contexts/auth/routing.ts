import { logSessionEvent } from '@/util/logger'

export const connectToRouter = (router, fetchUser) => {
  return () => {
    const handleRouteChangeStart = async path => {
      const oldPath = router.asPath.split('?')[0]
      const newPath = path.split('?')[0]

      logSessionEvent(`[routeChangeStart] from "${oldPath}" to "${newPath}"`)

      if (oldPath !== newPath) {
        logSessionEvent(
          `[routeChangeStart] path changed - attempting to fetch user`
        )
        await fetchUser()
      }
    }

    const handleRouteChangeComplete = path =>
      logSessionEvent(`[routeChangeComplete] "${path}"`)

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }
}

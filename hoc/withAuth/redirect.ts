import { NextRouter } from 'next/router'
import { User } from '@/api/resources/shared/user'
import * as paths from '@/routing/paths'

const redirectToLogin = (currentPath: string, user?: User) =>
  !user && !currentPath.startsWith(paths.login())

const redirectToVerifyEmail = (currentPath: string, user?: User) =>
  user && !user.email_verified && currentPath !== paths.emailVerification

const redirectToInventory = (currentPath: string, user?: User) =>
  user && user.email_verified && currentPath === paths.emailVerification

type RedirectFunction = () => void

export type RedirectRoute = {
  path: string
  redirect: RedirectFunction
} | null

export const buildRedirectRoute = (
  router: NextRouter,
  user?: User
): RedirectRoute => {
  if (redirectToLogin(router.pathname, user)) {
    const path = paths.login(router.asPath)
    return { path, redirect: () => router.replace(path).then() }
  }

  if (redirectToVerifyEmail(router.pathname, user)) {
    const path = paths.emailVerification
    return {
      path,
      redirect: () => router.replace(path).then()
    }
  }

  if (redirectToInventory(router.pathname, user)) {
    const path = paths.inventory
    return { path, redirect: () => router.replace(paths.inventory).then() }
  }

  return null
}

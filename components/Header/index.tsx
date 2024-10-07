import classnames from 'classnames'
import dynamic from 'next/dynamic'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import { Icon, Separator } from '..'
import NavLinks from './NavLinks'
import styles from './styles.module.scss'
import { useWindowWidth } from '@/contexts/windowDimensions'
import classNames from 'classnames'
import { useAuth } from '@/contexts/auth'
import useBreakpoints from '@/hooks/useBreakpoints'

// Combined with `isUserLoading || isFetchingUser` in the `NavMenu`, this should mitigate the brief flash of the "Sign In" link when the page first loads
// Instead we'll render a spinner during the interstitial period. Without disabling SSR, Next.js throws a hydration error.
// This can be removed if we get approval to preload the user during SSR from the BE team - Eric, Tue Mar 7 2003
const NavMenu = dynamic(() => import('./NavMenu'), {
  ssr: false
})

export interface Props {
  translucent?: boolean
  removeNavigationSpacing?: boolean
}

const Header = ({ translucent = false, removeNavigationSpacing }: Props) => {
  const { scrollY } = useScroll()
  const { user } = useAuth()
  const { isLarge } = useBreakpoints()
  const [headerHasScrolled, setHeaderHasScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > 0) {
      setHeaderHasScrolled(true)
    } else {
      setHeaderHasScrolled(false)
    }
  })

  const windowWidth = useWindowWidth()
  const containerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (containerRef?.current) {
      document.body.style.setProperty(
        '--headerHeight',
        `${containerRef?.current.offsetHeight}px`
      )
    }
  }, [containerRef, windowWidth])

  return (
    <div
      ref={containerRef}
      className={classnames(styles.container, {
        [styles.translucent]: translucent,
        [styles.headerScroll]: headerHasScrolled
      })}
    >
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Icon className={styles.logo} name="dpLogo" />
          </Link>
        </div>
        <NavLinks />
        {!!user && isLarge && (
          <Separator
            className={classNames('h-4 ml-4', {
              // If Nav is translucent the separator color should be white alpha 15% (.15)
              // https://app.asana.com/0/1201275918942143/1205411503125145
              '!border-white/15': removeNavigationSpacing && !headerHasScrolled
            })}
            vertical
          />
        )}
        <NavMenu />
      </div>
    </div>
  )
}

export default Header

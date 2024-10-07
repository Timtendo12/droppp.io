import classnames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '@/contexts/auth'
import { NAV_TOP_LINKS, NAV_DESKTOP_LINKS } from '@/constants'
import { Icon } from '@/components'
import HydratedLinks from '@/components/HydratedLinks'
import NotificationBadge from '@/components/NotificationBadge'
import NavLink from '@/components/NavLink'

export const containerClass = 'flex items-center gap-4'

const NavLinks = () => {
  const { user, notifications } = useAuth()

  const { pathname, query } = useRouter()

  const navLinks = NAV_TOP_LINKS
  const redeemCount = notifications['redeem_count']

  return (
    <>
      <div
        className={classnames(
          containerClass,
          'max-md:hidden flex-1 ml-[20px] utility-alt'
        )}
      >
        <HydratedLinks pathname={pathname} query={query} links={navLinks}>
          {({ label, href, active }) => (
            <NavLink key={href} active={active} href={href} title={label}>
              {label}
            </NavLink>
          )}
        </HydratedLinks>
      </div>
      {!!user && (
        <div className={classnames(containerClass, 'max-lg:hidden')}>
          <HydratedLinks
            pathname={pathname}
            query={query}
            links={NAV_DESKTOP_LINKS}
          >
            {({ label, href, active, icon, showRedemptions }) => {
              const hasRedemptions = showRedemptions && !!redeemCount
              return (
                <NavLink
                  key={href}
                  iconLink
                  active={active}
                  href={href}
                  title={label}
                >
                  <Icon name={icon} />
                  {hasRedemptions && (
                    <NotificationBadge
                      value={redeemCount}
                      theme="red"
                      className="absolute -top-0 translate-x-[10px]"
                    />
                  )}
                </NavLink>
              )
            }}
          </HydratedLinks>
        </div>
      )}
    </>
  )
}

export default NavLinks

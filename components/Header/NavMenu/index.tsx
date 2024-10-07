import classnames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { NAV_MENU_ITEMS, NAV_TOP_LINKS } from '@/constants'
import { useAuth } from '@/contexts/auth'
import { getUsersWaxAddressInfo } from '@/util/accountHelpers'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { Button, Icon, Separator } from '@/components'
import { ButtonLink } from '@/components/Button'
import styles from './styles.module.scss'
import { formatCurrency } from '@/util/currencyHelpers'
import Spinner from '@/components/Spinner'
import { supportsTouchEvents } from '@/util/browserHelpers'
import HydratedLinks from '@/components/HydratedLinks'
import ProfileNavLink from './ProfileNavLink'
import { containerClass } from '@/components/Header/NavLinks'
import NotificationBadge from '@/components/NotificationBadge'
import NavLink from '@/components/NavLink'
import { HrefLinkDefinition } from '@/types/links'

const NavMenu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef()
  const { pathname, query } = useRouter()
  const { isMobile } = useBreakpoints()
  const useTouch = supportsTouchEvents()
  const {
    user,
    notifications,
    isUserLoading,
    isFetchingUser,
    walletBalance,
    fetchUser,
    logout
  } = useAuth()
  const { waxAddress, addressType } = getUsersWaxAddressInfo(user)
  const redeemCount = notifications['redeem_count']
  const isLoading = isUserLoading || isFetchingUser

  let menuItems = NAV_MENU_ITEMS.reduce((links: HrefLinkDefinition[], item) => {
    let additionalLinks = [item]

    if (item.path == '/activity' && addressType != 'none') {
      additionalLinks.push({
        label: 'Profile',
        path: `/${waxAddress}`,
        matchingPath: {
          path: `/[profile]`,
          componentMatches: { profile: waxAddress }
        }
      })
    }

    return links.concat(additionalLinks)
  }, [])

  useOnClickOutside([menuRef], () => open && handleToggleMenu(false))

  // hide the menu on route change
  useEffect(() => {
    handleToggleMenu(false)
  }, [pathname, isMobile])

  const handleToggleMenu = (flag?: boolean) => {
    const bodyClasses = document.body.classList

    if (!open && flag) {
      fetchUser().then()
    }

    setOpen(flag)

    if (isMobile) {
      flag
        ? bodyClasses.add('blockBodyScrolling', 'mainMenuOpen')
        : bodyClasses.remove('blockBodyScrolling', 'mainMenuOpen')
    }
  }

  const handleOnTargetWrapperClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!isMobile) {
      // don't allow click to propagate to children link click
      e.stopPropagation()

      if (!open && useTouch) {
        handleToggleMenu(!open)
      }
    }
  }

  const handleMouseMoveEvent = (bool: boolean, enabled: boolean = true) => {
    // cancel mouse move events if not on a touch device
    if (!enabled || useTouch || isMobile) return

    if (bool && !open) {
      // open menu
      handleToggleMenu(true)
    } else if (!bool && open) {
      // close menu
      handleToggleMenu(false)
    }
  }

  const authenticationButton = !!user ? (
    <NavLink
      className="text-gray-300"
      dropdownItem
      title="Sign Out"
      onClick={() => {
        logout().then()
        handleToggleMenu(false)
      }}
    >
      Sign Out
    </NavLink>
  ) : (
    <NavLink dropdownItem title="Sign In" href="/auth">
      Sign In
    </NavLink>
  )

  return (
    <>
      <div
        className={classnames(containerClass, 'lg:hidden ml-auto', {
          hidden: !(redeemCount > 0 && (isMobile ? !open : true))
        })}
      >
        <HydratedLinks
          pathname={pathname}
          query={query}
          links={[
            {
              label: 'Redemptions',
              path: '/redemptions',
              icon: 'nav-item-redemption'
            }
          ]}
        >
          {({ label, href, active, icon }) => (
            <NavLink
              key={href}
              iconLink
              active={active}
              href={href}
              title={label}
            >
              <Icon name={icon} />
              <NotificationBadge
                value={redeemCount}
                theme="red"
                className="absolute -top-0 translate-x-[10px]"
              />
            </NavLink>
          )}
        </HydratedLinks>
      </div>
      <div
        ref={menuRef}
        className={styles.container}
        onClick={handleOnTargetWrapperClick}
        onMouseMove={() => handleMouseMoveEvent(true, !!user)}
        onMouseLeave={() => handleMouseMoveEvent(false)}
      >
        <div className={styles.trigger}>
          {!!user ? (
            <ProfileNavLink />
          ) : (
            !open &&
            (!isLoading ? (
              authenticationButton
            ) : (
              <div className="relative mr-2">
                <Spinner />
              </div>
            ))
          )}
          {(!!user || isMobile) && (
            <Button
              theme="clean"
              onMouseMove={() => handleMouseMoveEvent(true)}
              onClick={() => {
                handleToggleMenu(!open)
              }}
            >
              {isMobile ? (
                <Icon
                  className="ml-2"
                  name={open ? 'menu-close' : 'hamburger'}
                />
              ) : (
                <Icon
                  className={classnames(styles.iconArrow, {
                    [styles.open]: open
                  })}
                  name="new-arrow-down"
                />
              )}
            </Button>
          )}
        </div>
        <div className={classnames(styles.content, { [styles.open]: open })}>
          {!!user && (
            <>
              <ButtonLink
                className="!block px-[12px] py-[10px]"
                href="/wallet"
                theme="clean"
              >
                <div className="text-gray-300 utility-sm">DROPPP BALANCE</div>
                <div className="text-white md:h4 pricing-xl mt-[6px] whitespace-nowrap">
                  {formatCurrency(walletBalance, false)}{' '}
                  <span className="text-gray-300 text-xs font-normal">
                    USDC
                  </span>
                </div>
                <div className="text-success utility-sm mt-[6px]">
                  ADD FUNDS
                </div>
              </ButtonLink>
              <Separator className="border-gray-700 my-1" />
            </>
          )}
          <nav>
            <ul>
              {isMobile && (
                <HydratedLinks
                  pathname={pathname}
                  query={query}
                  links={NAV_TOP_LINKS}
                >
                  {({ label, href, active }) => (
                    <li
                      key={`MOBILE_${href}`}
                      className="flex items-center gap-3"
                    >
                      <NavLink
                        dropdownItem
                        title={label}
                        active={active}
                        href={href}
                      >
                        {label}
                      </NavLink>
                    </li>
                  )}
                </HydratedLinks>
              )}
              {!!user && isMobile && (
                <Separator className="border-gray-700 my-2" />
              )}
              {!!user && (
                <HydratedLinks
                  pathname={pathname}
                  query={query}
                  links={menuItems}
                >
                  {({ label, href, active }) => {
                    const hasNotification =
                      label === 'Redemptions' && !!redeemCount
                    return (
                      <li key={href}>
                        <NavLink
                          dropdownItem
                          title={label}
                          active={active}
                          href={href}
                          onClick={() => {
                            handleToggleMenu(false)
                          }}
                        >
                          {label}
                          {hasNotification && (
                            <NotificationBadge
                              className="absolute top-0 -right-[10px] translate-y-1/2 translate-x-full"
                              value={redeemCount}
                              theme="red"
                            />
                          )}
                        </NavLink>
                      </li>
                    )
                  }}
                </HydratedLinks>
              )}
            </ul>
          </nav>
          <Separator className="border-gray-700 my-1" />
          {authenticationButton}
        </div>
      </div>
    </>
  )
}

export default NavMenu

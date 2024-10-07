import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import useIsSticky from '@/hooks/useIsSticky'
import useHiddenHeader from '@/hooks/useHiddenHeader'

import classNames from 'classnames'
import NavigationTabs from './NavigationTabs'
import { ActionLinkDefinition, HrefLinkDefinition } from '@/types/links'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { Drop } from '@/types/drop'
import { hydrateItems } from '@/util/hydrateItems'
import Icon from './Icon'
import Button from './Button'
import { showModal } from './Modals/ModalV2'
import { isProdOrStaging } from '@/config'
import { useDropContext } from '@/features/drop/DropContextProvider'

interface Props {
  count?: number
  className?: string
  hasConsistentBottomBorder?: boolean
  style?: React.CSSProperties
  title?: string
  subTitle?: string
  drop: Drop
  isTransparent?: boolean
}

const DropNavigation = ({
  className,
  hasConsistentBottomBorder = false,
  title,
  subTitle,
  drop,
  count,
  style,
  isTransparent = false
}: Props) => {
  const context = useDropContext()
  const { query, pathname } = useRouter()
  const { show_only_listings } = query

  const navRef = useRef<HTMLDivElement>()
  const isSticky = useIsSticky(navRef, {
    threshold: 0.999,
    rootMargin: '-1px 0px -0px 0px'
  })
  useHiddenHeader(isSticky)

  const { exclusive, url } = drop

  const navLinks: Array<ActionLinkDefinition | HrefLinkDefinition> = [
    {
      label: 'Overview',
      path: `${url}/`,
      matchingPath: {
        path: '/drop/[id]/[name]'
      }
    }
  ]

  const isShopDisabled = drop.drop_marketplace_disabled_primary

  let label = 'Physical Collectibles'
  if (drop.hasPhysicals) {
    navLinks.push({
      label,
      path: `${url}/physicals/`,
      matchingPath: {
        path: '/drop/[id]/[name]/physicals'
      }
    })
  }

  label = 'Shop'
  if (isShopDisabled) {
    navLinks.push({
      label,
      onClick: () =>
        NiceModal.show(MODAL_ID.openingSoon, { opensAt: drop.time_launch })
    })
  } else {
    navLinks.push({
      label,
      path: `${url}/shop/`,
      matchingPath: {
        path: '/drop/[id]/[name]/shop'
      }
    })
  }

  // @TODO - don't love calling this again so that we can raise the active item to the parent -  Josh Dobson - 5/23/23
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, activeNavItem] = hydrateItems(navLinks, pathname, query, undefined)

  let activeTitle = activeNavItem?.label

  // We need to pass additional information to show if we are on listings or all catalog item - Josh Dobson - 5/9/23
  if (activeTitle === 'Shop') {
    let shopCategory = 'Listings'
    if (show_only_listings === 'false') {
      shopCategory = 'All'
    }
    activeTitle = `${activeNavItem?.label} / ${shopCategory}`
  }

  return (
    <div
      ref={navRef}
      style={style}
      className={classNames(
        className,
        { 'before:border-b': hasConsistentBottomBorder || isSticky },
        { 'bg-black': !isTransparent || isSticky },
        'sticky px-2 md:px-4 top-[-1px] -bottom-9 w-full flex z-[40] h-[var(--secondaryNavHeight)]',
        'before:content-[""] before:absolute before:inset-0  before:border-defaultBorder'
      )}
    >
      <NavigationTabs
        className="flex flex-1 items-center"
        count={count}
        title={title || activeTitle}
        subtitle={subTitle ? subTitle : drop.dropHeaderSubtitle}
        subtitleIconSlot={
          exclusive && (
            <Icon
              name="exclusiveBadge"
              color="white"
              className="w-[20px] h-[20px]"
            />
          )
        }
        links={navLinks}
      />
      {!isProdOrStaging && (
        <Button
          theme="clean"
          onClick={() =>
            showModal(MODAL_ID.devOnly.dropSettings, {
              drop,
              context
            })
          }
          className="relative z-10 ml-1 p-2"
        >
          <Icon name="settings1" className="w-3 h-3" />
        </Button>
      )}
    </div>
  )
}

export default DropNavigation

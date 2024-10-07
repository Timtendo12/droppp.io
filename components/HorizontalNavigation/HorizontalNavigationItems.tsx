import React, { PropsWithChildren } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import { NavigationActiveUnderline } from '@/components/NavigationActiveUnderline'
import {
  RealizedActionLink,
  RealizedHrefLink,
  isActionLinkDefinition,
  isHrefLinkDefinition
} from '@/types/links'
import classNames from 'classnames'
import { spacing } from '@/util/tailwindHelpers'

const DEFAULT_CONFIG = {
  align: 'right',
  gap: 4
}

export type HorizontalItemsConfig = {
  align?: 'left' | 'right' | 'center'
  gap?: number
}

type HorizontalNavigationItemsProps = {
  listClassName?: string
  items: (RealizedActionLink | RealizedHrefLink)[]
  mRef: React.RefObject<HTMLElement> | null
  config?: HorizontalItemsConfig
}

const itemClassName = 'text-base font-bold'
export function HorizontalNavigationItems({
  items,
  listClassName,
  mRef,
  config
}: HorizontalNavigationItemsProps) {
  const { align, gap } = { ...DEFAULT_CONFIG, ...config }

  const renderItems = () => {
    return items.map((item, i) => {
      if (isHrefLinkDefinition(item)) {
        const { label, active, href } = item
        return (
          <HorizontalNavigationItemWrapper key={label}>
            <Link
              href={href}
              title={label}
              className={classNames(itemClassName, 'whitespace-nowrap')}
            >
              {label}
            </Link>
            <NavigationActiveUnderline active={active} />
          </HorizontalNavigationItemWrapper>
        )
      } else if (isActionLinkDefinition(item)) {
        const { id, label, active, onClick } = item
        return (
          <HorizontalNavigationItemWrapper key={`${id} - ${i}`}>
            <>
              <Button
                theme="clean"
                onClick={() => onClick(item)}
                className={classNames(itemClassName, 'whitespace-nowrap')}
              >
                {label}
              </Button>
              <NavigationActiveUnderline active={active} />
            </>
          </HorizontalNavigationItemWrapper>
        )
      }
    })
  }

  return (
    <nav
      ref={mRef}
      className={classNames('flex items-center', {
        'justify-start': align === 'left',
        'justify-center': align === 'center',
        'justify-end': align === 'right'
      })}
    >
      <ul
        className={classNames('flex', listClassName)}
        style={{ gap: spacing(gap) }}
      >
        {renderItems()}
      </ul>
    </nav>
  )
}

const HorizontalNavigationItemWrapper = ({ children }: PropsWithChildren) => {
  return <li className="group flex-0">{children}</li>
}

// @TODO - Add back aria for tab-views - Josh Dobson - 5/23/23
// https://app.asana.com/0/1202254516899931/1204653043709687/f
// <Button
//   className={className}
//   theme="clean"
//   role="tab"
//   onClick={() => {
//     ;(link as RealizedActionLink).onClick?.(
//       link as ActionLinkDefinition
//     )
//   }}
//   aria-selected={isActive}
//   aria-controls={`panel-${link.id}`}
//   id={`tab-${link.id}`}
//   tabIndex={-index}
// >
//   {children}
// </Button>

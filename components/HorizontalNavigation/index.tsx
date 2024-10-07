import React, { useEffect, useRef, useState } from 'react'
import useElementWidth from '@/hooks/useElementWidth'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import {
  HorizontalItemsConfig,
  HorizontalNavigationItems
} from './HorizontalNavigationItems'
import { hydrateItems } from '@/util/hydrateItems'
import HorizontalNavigationDropdown, {
  DropDownConfig
} from './HorizontalNavigationDropdown'
import { TabViewItem } from '@/components/TabView'
import {
  ActionLinkDefinition,
  HrefLinkDefinition,
  LinkDefinition,
  RealizedActionLink
} from '@/types/links'
import { useWindowWidth } from '@/contexts/windowDimensions'

type Props<Item> = {
  className?: string
  horizontalListClassName?: string
  items: Item[]
  initialActiveItem?: Item
  hideDropdownLabel?: boolean
  forceCollapseAtViewportWidth?: number | undefined
  dropDownConfig?: DropDownConfig
  horizontalItemsConfig?: HorizontalItemsConfig
}

const resizeTriggerGap = 50

export default function HorizontalNavigation<
  Item extends (
    | ActionLinkDefinition
    | HrefLinkDefinition
    | TabViewItem
    | RealizedActionLink
  ) &
    LinkDefinition
>({
  className,
  items,
  initialActiveItem,
  horizontalListClassName,
  forceCollapseAtViewportWidth,
  dropDownConfig,
  horizontalItemsConfig
}: Props<Item>) {
  const { pathname, query } = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLElement>(null)
  const prevItemsWidth = useRef<number>(0)
  const viewportWidth = useWindowWidth()

  const { width: containerWidth } = useElementWidth(containerRef)
  const { width: itemsWidth } = useElementWidth(itemsRef)

  // STATE
  const [activeItem, setActiveItem] = useState<Item | undefined>(
    initialActiveItem
  )

  const [shouldCollapse, setShouldCollapse] = useState<boolean | undefined>()

  useEffect(() => {
    if (initialActiveItem && initialActiveItem.id !== activeItem.id)
      setActiveItem(initialActiveItem)
  }, [initialActiveItem])

  // CHECK WIDTHS TO DETERMINE IF WE SHOULD COLLAPSE
  useEffect(() => {
    if (viewportWidth === undefined || containerWidth === undefined) return

    const isShouldCollapseTrueOrUnset =
      shouldCollapse || shouldCollapse === undefined

    // use forceCollapseAtViewportWidth if provided
    if (forceCollapseAtViewportWidth !== undefined && viewportWidth) {
      if (viewportWidth < forceCollapseAtViewportWidth && !shouldCollapse) {
        return setShouldCollapse(true)
      } else if (
        viewportWidth >= forceCollapseAtViewportWidth &&
        isShouldCollapseTrueOrUnset
      ) {
        return setShouldCollapse(false)
      }
    } else {
      const renderedItemsWidth = itemsWidth || prevItemsWidth.current
      const isItemsWidthIsGreaterThanContainerWidth =
        renderedItemsWidth + resizeTriggerGap >= containerWidth

      if (isItemsWidthIsGreaterThanContainerWidth && !shouldCollapse) {
        if (itemsWidth) {
          prevItemsWidth.current = itemsWidth
        }
        setShouldCollapse(true)
      } else if (
        !isItemsWidthIsGreaterThanContainerWidth &&
        isShouldCollapseTrueOrUnset
      ) {
        setShouldCollapse(false)
      }
    }
  }, [containerWidth, viewportWidth])

  const [navItems, hydratedActiveItem] = hydrateItems(
    items,
    pathname,
    query,
    activeItem,
    setActiveItem
  )

  return (
    <div
      className={classNames('relative', className, {
        'opacity-0': shouldCollapse === undefined
      })}
      ref={containerRef}
    >
      {!shouldCollapse ? (
        <HorizontalNavigationItems
          mRef={itemsRef}
          items={navItems}
          listClassName={horizontalListClassName}
          config={horizontalItemsConfig}
        />
      ) : (
        <HorizontalNavigationDropdown
          items={navItems}
          activeItem={hydratedActiveItem}
          config={dropDownConfig}
        />
      )}
    </div>
  )
}

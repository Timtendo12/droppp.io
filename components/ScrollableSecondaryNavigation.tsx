import { useEffect, useMemo, useState } from 'react'
import { scrollIntoViewWithOffset } from '@/util/scrollHelpers'
import HorizontalNavigation from './HorizontalNavigation'
import { ActionLinkDefinition, LinkDefinition } from '@/types/links'
import classNames from 'classnames'
import { HorizontalItemsConfig } from './HorizontalNavigation/HorizontalNavigationItems'
import { DropDownConfig } from './HorizontalNavigation/HorizontalNavigationDropdown'

export interface ScrollableSection extends HTMLElement {
  id: string
}

interface Props {
  items: LinkDefinition[]
  sections: NodeListOf<ScrollableSection>
  className?: string
  horizontalListClassName?: string
  horizontalItemsConfig?: HorizontalItemsConfig
  dropDownConfig?: DropDownConfig
  scrollOffset: number
}

const ScrollableSecondaryNavigation = ({
  className,
  horizontalListClassName,
  items,
  sections,
  scrollOffset,
  horizontalItemsConfig,
  dropDownConfig,
  ...props
}: Props) => {
  const [activeItem, setActiveItem] = useState<string>(items[0].id)
  const actionableItems: ActionLinkDefinition[] = useMemo(
    () =>
      items.map(item => {
        return {
          ...item,
          active: item.id === activeItem,
          onClick: () => onItemSelect(item)
        }
      }),
    [items.length, activeItem]
  )

  scrollOffset = scrollOffset + 1

  const onItemSelect = (item: LinkDefinition) => {
    const target = document.getElementById(item.id)
    target && scrollIntoViewWithOffset(item.id, scrollOffset)
  }

  const onScroll = () => {
    const pageYOffset = window.pageYOffset + 1
    let currentItem: ActionLinkDefinition | undefined

    sections?.forEach(section => {
      const sectionYOffset = section.offsetTop - scrollOffset

      if (pageYOffset >= sectionYOffset) {
        const id = section.getAttribute('id')
        currentItem = actionableItems.find(item => item.id === id)
      }
    })

    if (currentItem) {
      setActiveItem(currentItem.id)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [sections])

  return (
    <HorizontalNavigation
      dropDownConfig={dropDownConfig}
      horizontalItemsConfig={horizontalItemsConfig}
      horizontalListClassName={classNames(horizontalListClassName)}
      className={className}
      items={actionableItems}
      initialActiveItem={actionableItems.find(item => item.id === activeItem)}
      {...props}
    />
  )
}

export default ScrollableSecondaryNavigation

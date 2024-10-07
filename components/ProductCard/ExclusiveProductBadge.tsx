import React from 'react'
import Icon from '@/components/Icon'
import { classNames } from '@/util/tailwindHelpers'

type Props = {
  className?: string
  isSmallLayout?: boolean
  isVisible?: boolean
}

export default function ExclusiveProductBadge({
  className,
  isVisible,
  isSmallLayout
}: Props) {
  if (!isVisible) return null
  return (
    <Icon
      name="exclusiveBadge"
      className={classNames(
        'h-full',
        // These are values to match the height of the  rarity badge
        { 'w-[3.5em]': !isSmallLayout, 'w-[2.7em]': isSmallLayout },
        className
      )}
    />
  )
}

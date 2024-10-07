import classNames from 'classnames'
import React from 'react'
import Badge, { BadgeProps } from '.'

interface Props {
  size?: BadgeProps['size']
}

const iconClass = (size: BadgeProps['size']) => {
  switch (size) {
    case 'lg':
      return '!mr-[4px] -ml-[2px]'
    case 'fluid-sm':
      return '!mr-0'
    default:
      return '-ml-[.5em]'
  }
}

export default function ForSaleBadge({ size = 'default' }: Props) {
  return (
    <Badge
      size={size}
      icon="forSale"
      hideLabel={size == 'fluid-sm'}
      label={size == 'fluid-sm' ? '' : 'For Sale'}
      iconClass={iconClass(size)}
      className={classNames('border-green', {
        '!px-[.4em]': size == 'fluid-sm'
      })}
    />
  )
}

import React from 'react'
import classNames from 'classnames'
import Button from '@/components/Button'
import Icon from '@/components/Icon'

export interface Props {
  size?: 'lg' | 'sm' | 'md'
  onClick: () => void
  isDisabled: boolean
}

export const RefreshButton = ({ onClick, isDisabled, size = 'lg' }: Props) => {
  let sizeClasses = ''

  switch (size) {
    case 'sm':
      sizeClasses = 'w-[40px] !h-[40px] !rounded-full'
      break
    case 'md':
      sizeClasses = 'w-[40px] !h-[40px] !rounded-[14px]'
      break
    default:
      sizeClasses = 'w-[52px]'
      break
  }

  return (
    <Button
      theme="white"
      className={classNames('!px-0', sizeClasses)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon name="refresh" />
    </Button>
  )
}

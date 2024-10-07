import classNames from 'classnames'
import React from 'react'

interface Props {
  className?: string
  value: number
  theme?: 'default' | 'rainbow' | 'red'
}

export default function NotificationBadge({
  className,
  value,
  theme = 'default'
}: Props) {
  let backgroundClassName = 'bg-blue'

  if (theme === 'rainbow') {
    backgroundClassName = 'bg-redeemable bg-gray-900 border-redeemable'
  } else if (theme === 'red') {
    backgroundClassName = 'bg-error'
  }

  return (
    <div
      className={classNames(
        'min-w-[20px] h-[20px] px-half rounded-[20px] text-white flex justify-center items-center utility-sm',
        backgroundClassName,
        className
      )}
    >
      {value}
    </div>
  )
}

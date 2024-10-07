import React from 'react'
import classNames from 'classnames'

export const NavigationActiveUnderline = ({
  className = '',
  active = false
}) => {
  return (
    <div
      className={classNames(
        className,
        'h-[3px] bg-no-repeat bg-left-bottom rounded-sm',
        'group-hover:bg-[rgba(255,255,255,0.25)]',
        {
          ['bg-rainbow--linear']: active
        }
      )}
    />
  )
}

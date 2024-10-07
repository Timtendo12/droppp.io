import classnames from 'classnames'
import React from 'react'
import { ReactNode } from 'react'

interface Props extends React.ComponentPropsWithRef<'div'> {
  className?: string
  size?: 'sm' | 'default'
  children: ReactNode
}

export default function RoundedBox({
  className,
  size = 'default',
  children
}: Props) {
  return (
    <div
      style={{ '--separatorColor': 'var(--color-gray-700)' }}
      className={classnames(
        className,
        'p-[var(--boxPadding)] bg-gray-850 rounded-3xl',
        {
          '!p-3 !rounded-2xl': size === 'sm'
        }
      )}
    >
      {children}
    </div>
  )
}

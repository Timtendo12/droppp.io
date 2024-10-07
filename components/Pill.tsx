import classNames from 'classnames'
import React from 'react'
import { CSSProperties, ReactNode } from 'react'

export type Size =
  | 'default'
  | 'lg'
  | 'fluid-lg'
  | 'fluid-sm'
  | 'fluid-xs'
  | 'fluid-default'

interface Props extends React.ComponentPropsWithRef<'div'> {
  size?: Size
  title?: string
  className?: string
  children: ReactNode
  style?: CSSProperties
}

const defaultStylesForSize = (size: Size) => {
  switch (size) {
    case 'default':
      return {}
    case 'fluid-lg':
      return {
        height: '3.5em',
        padding: '1.375em'
      }
    case 'fluid-sm':
      return {
        height: '2.75em',
        paddingLeft: '1em',
        paddingRight: '1em'
      }
  }
}

export const Pill = ({
  size = 'default',
  title = '',
  className = '',
  children,
  style = {},
  ...rest
}: Props) => {
  const defaultClasses =
    size == 'default'
      ? 'text-xxs uppercase font-extrabold px-[11px] py-[6px]'
      : ''

  switch (size) {
    case 'default':
      break
  }
  const defaultStyles = defaultStylesForSize(size)

  return (
    <div
      title={title}
      className={classNames(
        'inline-flex items-center rounded-full border-1 border-defaultBorder',
        defaultClasses,
        className
      )}
      style={{ ...defaultStyles, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

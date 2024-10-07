import { ReactNode } from 'react'
import classNames from 'classnames'

const DEFAULT_CSS = `px-[var(--containerXPadding)] relative
    [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:left-0
    [&:not(:first-child)]:before:top-0 [&:not(:first-child)]:before:bottom-0
    [&:not(:first-child)]:before:border-l [&:not(:first-child)]:before:border-gray-700
    [&:not(:first-child)]:before:contents-['']` // adds left border to second item

type Props = { children: ReactNode; className?: string }

export const Column = ({ children, className }: Props) => {
  return <div className={classNames(DEFAULT_CSS, className)}>{children}</div>
}

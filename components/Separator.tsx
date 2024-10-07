import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string
  text?: string
  vertical?: boolean
}

const color = `border-[var(--separatorColor,var(--color-defaultBorder))]`

export default function Separator({ className = '', text, vertical }: Props) {
  if (text)
    return (
      <div className={classNames('relative flex items-center', className)}>
        <div className={classNames('flex-grow border-t', color)}></div>
        <span className="flex-shrink mx-1 body-sm text-gray-300">{text}</span>
        <div className={classNames('flex-grow border-t', color)}></div>
      </div>
    )
  if (vertical)
    return <span className={classNames('border-l', color, className)} />

  return <hr className={classNames(color, className)} />
}

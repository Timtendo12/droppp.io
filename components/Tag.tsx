import React from 'react'
import Button from './Button'
import Icon from './Icon'
import classNames from 'classnames'

interface Props {
  className?: string
  label: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function Tag({ className, label, onClick, style }: Props) {
  return (
    <div
      style={{
        '--tagPadding': '12px',
        ...style
      }}
      className={classNames(
        'inline-flex items-center px-[var(--tagPadding)] rounded-xl body-xs font-bold bg-gray-700',
        className
      )}
    >
      {label}
      {!!onClick && (
        <Button
          theme="clean"
          className="-mr-[var(--tagPadding)] p-[var(--tagPadding)] pl-[calc(var(--tagPadding)/1.5)] h-full group"
          onClick={onClick}
          title={`Remove ${label}`}
        >
          <Icon
            className="group-hover:scale-125 transition-transform transform"
            name="close-toast"
          />
        </Button>
      )}
    </div>
  )
}

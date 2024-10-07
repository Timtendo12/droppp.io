import classNames from 'classnames'
import React from 'react'
import { Pill } from './Pill'

type Props = {
  className?: string
  value: string | number
}

export default function QuantityBadge({ value, className }: Props) {
  return (
    <Pill
      className={classNames(
        '!leading-none !px-[7px] !pt-[3px] !pb-[3px] !text-xs border-white',
        className
      )}
    >
      {value}
    </Pill>
  )
}

import React, { ReactNode } from 'react'
import classNames from 'classnames'

interface OrderSummaryListItemProps {
  className?: string
  valueClassName?: string
  title: ReactNode
  value?: string | number
  valueSuffix?: ReactNode
  valueWhenUndefined?: string
}

export const OrderSummaryListItem = ({
  className,
  valueClassName,
  title,
  value,
  valueSuffix,
  valueWhenUndefined
}: OrderSummaryListItemProps) => {
  const valueIsUndefined = value === undefined
  const transformedValue =
    !valueIsUndefined || !valueWhenUndefined ? value : valueWhenUndefined

  return (
    <div className={classNames(className, 'flex justify-between')}>
      <div className="body text-gray-300">{title}</div>
      <div className="flex items-baseline">
        <div
          className={classNames(valueClassName, {
            'text-gray-300 body': valueIsUndefined,
            'pricing-lg': !valueIsUndefined
          })}
        >
          {transformedValue}
        </div>
        <div>&nbsp;{valueSuffix}</div>
      </div>
    </div>
  )
}

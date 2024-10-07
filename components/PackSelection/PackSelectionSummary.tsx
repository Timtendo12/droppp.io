import React from 'react'
import { OrderSummaryListItem } from '@/components/OrderSummary/OrderSummaryListItem'
import classNames from 'classnames'
import { getPriceStringFromCents } from '@/util/currencyHelpers'

type Props = {
  hasMaxLimitError: boolean
  numberOfItems: number
  subtotal: number
  fee: number
}

export default function PackSelectionSummary({
  hasMaxLimitError,
  numberOfItems,
  subtotal,
  fee
}: Props) {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <OrderSummaryListItem title="Number of items" value={numberOfItems} />
      </li>
      <li>
        <OrderSummaryListItem
          valueClassName={classNames({
            'text-error': hasMaxLimitError
          })}
          title="Subtotal"
          value={getPriceStringFromCents(subtotal)}
        />
      </li>
      <li>
        <OrderSummaryListItem
          title="Fee (3%)"
          value={getPriceStringFromCents(fee)}
        />
      </li>
      <li>
        <OrderSummaryListItem
          title="Tax"
          value={undefined}
          valueWhenUndefined="Calculated Later"
        />
      </li>
    </ul>
  )
}

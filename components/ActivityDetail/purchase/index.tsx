import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import {
  formatCurrency,
  getPriceStringFromCents
} from '@/util/currencyHelpers'
import { numberWithCommas } from '@/util/numberHelpers'
import { Separator } from '@/components'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import PurchaseItems from '@/components/ActivityDetail/PurchaseItems'
import { ActionDetailProps } from '..'

const Purchase = ({ activity }: ActionDetailProps) => {
  const { item_id, info_count, assets, charge } = activity
  const { amount, time_created, card_brand, card_last4, subtotal, fee, tax } =
    charge
  const details = [
    {
      label: 'Date',
      value: dateToLocal({ date: time_created })
    },
    {
      label: 'Transaction ID',
      value: `DP${item_id}`
    },
    {
      label: 'Payment Method',
      value: `${card_brand.toUpperCase()} **** ${card_last4}`
    },
    {
      label: 'Merchant',
      value: 'Droppp'
    }
  ]
  const items = assets.map(({ drop_name, media, mint_num, count, price }) => ({
    name: `${drop_name} (${count} Pack)`,
    detail: `#${numberWithCommas(mint_num)}`,
    media,
    price: `${formatCurrency(price / 100)}`
  }))

  const shippingDetail = [
    {
      label: 'Number of Items',
      value: info_count
    },
    {
      label: 'Subtotal',
      value: getPriceStringFromCents(subtotal)
    },
    {
      label: 'Fee (3%)',
      value: getPriceStringFromCents(fee)
    },
    {
      label: 'Tax',
      value: getPriceStringFromCents(tax)
    }
  ]

  return (
    <>
      <DetailHeader details={details} />
      <Separator className="my-3" />
      <PurchaseItems
        items={items}
        shippingDetail={shippingDetail}
        total={`${formatCurrency(amount / 100)} USD`}
      />
    </>
  )
}

export default Purchase

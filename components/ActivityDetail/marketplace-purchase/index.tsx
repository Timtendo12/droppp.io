import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { formatCurrency } from '@/util/currencyHelpers'
import { Separator } from '@/components'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import PurchaseItems from '@/components/ActivityDetail/PurchaseItems'
import { ActionDetailProps } from '..'

const MarketplacePurchase = ({ activity }: ActionDetailProps) => {
  const { item_id, listing, time_created, info } = activity
  const { seller_account, asset, listing_price } = listing
  const { mint_num, media } = asset
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
      value: 'Droppp Balance'
    },
    {
      label: 'Purchased From',
      value: seller_account
    }
  ]
  const items = [
    {
      name: info,
      detail: `#${mint_num}`,
      media,
      price: `${formatCurrency(listing_price, false)} USDC`
    }
  ]

  return (
    <>
      <DetailHeader details={details} />
      <Separator className="my-3" />
      <PurchaseItems
        items={items}
        total={`${formatCurrency(listing_price, false)} USDC`}
      />
    </>
  )
}

export default MarketplacePurchase

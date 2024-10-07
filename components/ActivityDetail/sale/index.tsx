import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { formatUSDC } from '@/util/currencyHelpers'
import { Separator } from '@/components'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import PurchaseItems from '@/components/ActivityDetail/PurchaseItems'
import { ActionDetailProps } from '..'

const Sale = ({ id, activity }: ActionDetailProps) => {
  const { time_created, info, listing } = activity
  const { asset, net_amount, listing_price, net_fee } = listing
  const { mint_num, media } = asset
  const details = [
    {
      label: 'Date',
      value: dateToLocal({ date: time_created })
    },
    {
      label: 'Transaction ID',
      value: `#${id}`
    }
  ]
  const items = [
    {
      name: info,
      detail: `#${mint_num}`,
      media
    }
  ]

  return (
    <>
      <DetailHeader details={details} />
      <Separator className="my-3" />
      <PurchaseItems
        items={items}
        subTotal={`${formatUSDC(listing_price)} USDC`}
        fee={`${formatUSDC(net_fee)} USDC`}
        total={`${formatUSDC(net_amount)} USDC`}
      />
    </>
  )
}

export default Sale

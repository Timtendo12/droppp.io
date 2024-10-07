import React from 'react'
import { numberWithCommas } from '@/util/numberHelpers'
import { dateToLocal } from '@/util/timeHelpers'
import { Separator } from '@/components'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import PurchaseItems from '@/components/ActivityDetail/PurchaseItems'
import { ActionDetailProps } from '..'

const PromoClaim = ({ id, activity }: ActionDetailProps) => {
  const { assets, time_created } = activity
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
  const items = assets.map(({ name, media, mint_num }) => ({
    name,
    detail: `#${numberWithCommas(mint_num)}`,
    media,
    price: 'Free'
  }))

  return (
    <>
      <DetailHeader details={details} />
      <Separator className="my-3" />
      <PurchaseItems items={items} />
    </>
  )
}

export default PromoClaim

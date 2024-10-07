import React from 'react'
import { useAuth } from '@/contexts/auth'
import { formatCurrency } from '@/util/currencyHelpers'
import { dateToLocal } from '@/util/timeHelpers'
import { Separator } from '@/components'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import PurchaseItems from '@/components/ActivityDetail/PurchaseItems'
import { ActionDetailProps } from '..'

const AccountPurchase = ({ id, activity }: ActionDetailProps) => {
  const { user } = useAuth()
  const { amount, time_created, card_brand, card_last4 } = activity.charge
  const details = [
    {
      label: 'Date',
      value: dateToLocal({ date: time_created })
    },
    {
      label: 'Transaction ID',
      value: `#${id}`
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
  const items = [
    {
      name: 'Custom Droppp Address',
      detail: user.account_wax,
      media: [
        {
          size1_type: 'p',
          size1_url: '/images/icon-custom-dp-address.svg'
        }
      ],
      price: formatCurrency(amount / 100)
    }
  ]

  return (
    <>
      <DetailHeader details={details} />
      <Separator className="my-3" />
      <PurchaseItems items={items} total={formatCurrency(amount / 100)} />
    </>
  )
}

export default AccountPurchase

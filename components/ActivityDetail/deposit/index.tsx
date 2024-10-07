import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { formatCurrency } from '@/util/currencyHelpers'
import { Pill } from '@/components/Pill'
import CircleIconLink from '@/components/CircleIconLink'
import Separator from '@/components/Separator'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import { useAuth } from '@/contexts/auth'
import { getUsersWaxAddressInfo } from '@/util/accountHelpers'
import { depositTypeEnum } from '@/api/resources/shared/action'
import { ActionDetailProps } from '..'

const Deposit = ({ id, activity }: ActionDetailProps) => {
  const { user } = useAuth()
  const { waxAddress } = getUsersWaxAddressInfo(user)
  const { time_created, detail } = activity
  const {
    method,
    transaction_id,
    payment_method,
    merchant,
    network,
    token,
    status,
    amount,
    total_amount,
    to_address,
    tx_url
  } = detail

  const details = [
    {
      label: 'Status',
      value: <Pill className="!border-blue">{status}</Pill>
    },
    { label: 'Date', value: dateToLocal({ date: time_created }) }
  ]

  if (method === depositTypeEnum.Values.crypto_transfer) {
    details.push({ label: 'Transaction ID', value: `#${transaction_id}` })
    details.push({ label: 'From', value: to_address })
    details.push({ label: 'To', value: waxAddress })
    details.push({ label: 'Token', value: token })
    details.push({ label: 'Amount', value: formatCurrency(amount, false) })
    details.push({ label: 'Network', value: network })
  } else {
    details.push({ label: 'Transaction ID', value: `#${id}` })
    details.push({ label: 'Payment Method', value: payment_method })
    details.push({ label: 'Merchant', value: merchant })
    details.push({ label: 'Network', value: network })
    details.push({ label: 'Token', value: token })
    details.push({
      label: 'Amount Purchased',
      value: formatCurrency(amount, false)
    })
    details.push({
      label: 'Total Paid',
      value: formatCurrency(total_amount, false)
    })
  }

  return (
    <>
      <DetailHeader details={details} />
      {method === 'crypto_transfer' && !!tx_url && (
        <>
          <Separator className="my-3" />
          <div className="flex justify-between items-center">
            <div className="h7">View on Blockchain</div>
            <CircleIconLink
              className="!w-4 !h-4"
              iconClassName="!w-2 !h-2"
              name="blockchain"
              url={tx_url}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Deposit

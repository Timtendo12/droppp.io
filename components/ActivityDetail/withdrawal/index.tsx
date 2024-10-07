import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { formatCurrency } from '@/util/currencyHelpers'
import { Pill } from '@/components/Pill'
import CircleIconLink from '@/components/CircleIconLink'
import Separator from '@/components/Separator'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import { useAuth } from '@/contexts/auth'
import { getUsersWaxAddressInfo } from '@/util/accountHelpers'
import { ActionDetailProps } from '..'

const Withdrawal = ({ activity }: ActionDetailProps) => {
  const { user } = useAuth()
  const { waxAddress } = getUsersWaxAddressInfo(user)
  const { time_created, detail } = activity
  const {
    transaction_id,
    total_amount,
    network,
    token,
    status,
    amount,
    fees,
    to_address,
    tx_url
  } = detail

  const shouldShowBlockChainLink = status === 'completed'
  const details = [
    {
      label: 'Status',
      value: <Pill className="!border-blue">{status}</Pill>
    },
    { label: 'Date', value: dateToLocal({ date: time_created }) },
    { label: 'Method', value: 'Crypto' },
    { label: 'Transaction ID', value: `#${transaction_id}` },
    { label: 'From', value: waxAddress },
    { label: 'To', value: to_address },
    { label: 'Token', value: token },
    { label: 'Amount', value: formatCurrency(amount, false) },
    { label: 'Withdraw Fee', value: formatCurrency(fees, false) },
    { label: 'Net Amount', value: formatCurrency(total_amount, false) },
    { label: 'Network', value: network }
  ]

  return (
    <>
      <DetailHeader details={details} />
      {shouldShowBlockChainLink && (
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

export default Withdrawal

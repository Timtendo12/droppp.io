import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { formatWAXP } from '@/util/currencyHelpers'
import { getTransferStatus } from '@/util/activityHelpers'
import { Pill } from '@/components/Pill'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import { ActionDetailProps } from '..'
import Batch from './batch'

const WaxTransfer = ({ id, activity }: ActionDetailProps) => {
  const { batches, time_created, info_count } = activity
  const details = [
    {
      label: 'Status',
      value: <Pill className="!border-blue">{getTransferStatus(batches)}</Pill>
    },
    { label: 'Date', value: dateToLocal({ date: time_created }) },
    { label: 'Method', value: 'Crypto' },
    { label: 'Transaction ID', value: `#${id}` },
    { label: 'From', value: batches[0]?.from_account },
    { label: 'To', value: batches[0]?.to_account },
    { label: 'Token', value: 'WAXP' },
    { label: 'Amount', value: formatWAXP(info_count) }
  ]

  return (
    <>
      <DetailHeader details={details} />
      {batches.map(batch => (
        <Batch key={batch.batch_id} batch={batch} />
      ))}
    </>
  )
}

export default WaxTransfer

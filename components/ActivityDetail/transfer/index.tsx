import React from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { getTransferStatus } from '@/util/activityHelpers'
import { Pill } from '@/components/Pill'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import { ActionDetailProps } from '..'
import Batch from './batch'

const Transfer = ({ id, activity }: ActionDetailProps) => {
  const { batches, time_created, info_count, info } = activity
  const addresses = info.split('to')
  const details = [
    {
      label: 'Status',
      value: <Pill className="!border-blue">{getTransferStatus(batches)}</Pill>
    },
    { label: 'Date', value: dateToLocal({ date: time_created }) },
    { label: 'Transaction ID', value: `#${id}` },
    { label: 'Number of Items', value: info_count },
    { label: 'From', value: addresses[0] },
    { label: 'To', value: addresses[1] }
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

export default Transfer

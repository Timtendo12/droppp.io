import React from 'react'
import { Icon } from '@/components'
import { BatchItem } from '@/api/resources/shared/batch'
import { ButtonLink } from '@/components/Button'
import RoundedBox from '@/components/RoundedBox'
import TransferStatus from '@/components/ActivityDetail/TransferStatus'

interface Props {
  batch: BatchItem
}

const Batch = ({ batch }: Props) => {
  const { tx_url, chain_status } = batch

  return (
    <RoundedBox className="!px-[20px] !py-2 mt-3 max-md:bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="h7">Status</div>
        {!!tx_url && (
          <ButtonLink className="body-xs" theme="clean" href={tx_url} newTab>
            <Icon className="mr-[4px]" size={24} name="blockchain" />
            View on Blockchain
          </ButtonLink>
        )}
      </div>
      <TransferStatus chainStatus={chain_status} />
    </RoundedBox>
  )
}

export default Batch

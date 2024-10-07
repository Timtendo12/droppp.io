import React from 'react'
import { MEDIA_SIZES } from '@/constants'
import { numberWithCommas } from '@/util/numberHelpers'
import { Icon, Loading, PreviewMedia, Separator } from '@/components'
import Collapsible from '@/components/Collapsible'
import RoundedBox from '@/components/RoundedBox'
import { ButtonLink } from '@/components/Button'
import TransferStatus from '@/components/ActivityDetail/TransferStatus'
import { BatchItem } from '@/api/resources/shared/batch'
import { useBatchItems } from '@/api/resources/user/chain/action/batch/items/get'

interface Props {
  batch: BatchItem
}

const Batch = ({ batch }: Props) => {
  const { batch_id, tx_url, chain_status, count } = batch
  const { isLoading, data } = useBatchItems(batch_id)

  return (
    <RoundedBox className="!px-[20px] !py-2 mt-3 max-md:bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="h7">Batch {batch_id}</div>
        {!!tx_url && (
          <ButtonLink className="body-xs" theme="clean" href={tx_url} newTab>
            <Icon className="mr-[4px]" size={24} name="blockchain" />
            View on Blockchain
          </ButtonLink>
        )}
      </div>
      <TransferStatus chainStatus={chain_status} />
      <Separator className="-mx-[20px] my-2 border-gray-900" />
      <Collapsible
        labelClassName="flex justify-between items-center w-full cursor-pointer"
        contentClassName="min-h-[40px]"
        label={isOpen => (
          <>
            <div className="h8">Items ({count})</div>
            <Icon name={`arrow-${isOpen ? 'up' : 'down'}`} />
          </>
        )}
      >
        {isLoading && <Loading size="small" />}
        {data?.items.map(({ name, mint_num, media }, index) => (
          <div key={index} className="flex items-center mt-[12px]">
            <PreviewMedia
              className="w-4 h-4 m-0 object-contain"
              size={MEDIA_SIZES.TINY}
              media={media[0]}
            />
            <div className="ml-1 body-xs">
              <div className="">{name}</div>
              <div className="text-gray-300">#{numberWithCommas(mint_num)}</div>
            </div>
          </div>
        ))}
      </Collapsible>
    </RoundedBox>
  )
}

export default Batch

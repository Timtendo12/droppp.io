import { Button, Icon, Loading } from '@/components'
import { pluralize } from '@/util/stringHelpers'
import React from 'react'
import { NonTransferableItemsToast } from './NonTransferableItemsToast'
import { useTransferContext } from '../TransferProvider'

type Props = {
  className?: string
  onClick: () => void
}

export default function MobileListModalTrigger({ className, onClick }: Props) {
  const {
    isLoading,
    preview: {
      transferable_assets: { count: transferableAssetsLength }
    }
  } = useTransferContext()

  return (
    <div className={className}>
      <Button
        theme="clean"
        onClick={onClick}
        disabled={isLoading || !transferableAssetsLength}
        className="flex py-3 justify-between h5 w-full border-b border-defaultBorder relative items-center"
      >
        {transferableAssetsLength}&nbsp;
        {pluralize('item', transferableAssetsLength)} to transfer
        <div className="ml-2">
          {isLoading ? (
            <div className="relative w-2">
              <Loading size="small" />
            </div>
          ) : (
            !!transferableAssetsLength && <Icon name="arrow-right" />
          )}
        </div>
      </Button>
      {!isLoading && <NonTransferableItemsToast />}
    </div>
  )
}

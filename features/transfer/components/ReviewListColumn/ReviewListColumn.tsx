import ListLoading from '@/components/Loading/List'
import { pluralize } from '@/util/stringHelpers'
import React from 'react'
import { NonTransferableItemsToast } from '../NonTransferableItemsToast'
import classNames from 'classnames'
import styles from './styles.module.scss'
import TransferList from '../TransferList'
import { useTransferContext } from '../../TransferProvider'

type Props = {
  className?: string
}

export default function ReviewListColumn({ className }: Props) {
  const {
    isFetching,
    isLoading,
    preview: {
      transferable_assets: {
        items: transferableAssets,
        count: transferableAssetsLength
      }
    }
  } = useTransferContext()

  const shouldShowListLoading = isFetching || isLoading

  return (
    <div className={classNames('flex-1 flex flex-col min-h-0', className)}>
      <h2 className="p-3 h5">
        Transfer {transferableAssetsLength}{' '}
        {pluralize('Item', transferableAssetsLength)}
      </h2>
      {shouldShowListLoading ? (
        <ListLoading message="Loading Items" className="flex-1" />
      ) : (
        <div className="px-3 flex-1 flex flex-col">
          <NonTransferableItemsToast />

          <div className="flex-1 relative">
            <div
              className={classNames(
                'absolute inset-0 pr-1 overflow-y-scroll pb-3',
                styles.transferItems
              )}
            >
              <TransferList items={transferableAssets} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

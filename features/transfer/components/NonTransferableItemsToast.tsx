import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import { showModal } from '@/components/Modals/ModalV2'
import { useTransferContext } from '../TransferProvider'
import { pluralize } from '@/util/stringHelpers'

export const NonTransferableItemsToast = () => {
  const {
    preview: {
      non_transferable_assets: { categories, count }
    }
  } = useTransferContext()

  if (!count) {
    return null
  }
  return (
    <Toast inline type="attention" className="-mt-1 mb-3">
      <Button
        theme="clean"
        className="w-full flex flex-wrap gap-1 justify-between items-center"
        onClick={() =>
          showModal(MODAL_ID.transfer.nonTransferableAssets, { categories })
        }
      >
        {count} {pluralize('Item', count)} Won't Transfer
        <span className="utility uppercase">Review</span>
      </Button>
    </Toast>
  )
}

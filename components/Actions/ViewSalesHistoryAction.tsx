import React from 'react'
import Button from '@/components/Button'
import { showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'

export interface Props {
  data_id: number
  subTitle?: string
  className?: string
}

export default function ViewSalesHistoryAction({
  data_id,
  className,
  subTitle
}: Props) {
  const handleClick = async () => {
    showModal(MODAL_ID.marketplace.salesHistory, { data_id, subTitle })
  }
  return (
    <Button theme="clean" className={className} onClick={handleClick}>
      View All History
    </Button>
  )
}

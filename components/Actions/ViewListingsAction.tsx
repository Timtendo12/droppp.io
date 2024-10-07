import React from 'react'
import Button from '@/components/Button'
import { showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { isUniqueProduct } from '@/util/assetHelpers'
import { Rarity } from '@/api/resources/shared/rarity'

export interface ViewListingsProps {
  product: {
    chain_template_id: number
    rarity?: Rarity
    drop_type?: number
  }
  className?: string
}

export default function ViewListingsAction({
  product: { chain_template_id, ...restProduct },
  className
}: ViewListingsProps) {
  const handleViewListingsClick = async () =>
    showModal(MODAL_ID.marketplace.mintListings, { chain_template_id })

  if (isUniqueProduct(restProduct)) return null

  return (
    <Button
      theme="secondary"
      className={className}
      onClick={handleViewListingsClick}
    >
      View All Listings
    </Button>
  )
}

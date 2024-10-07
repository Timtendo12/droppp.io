import NiceModal from '@ebay/nice-modal-react'
import React from 'react'
import { AssetType } from '@/api/resources/shared/asset'
import { useListingPreviewQuery } from '@/api/resources/user/listing/preview'
import { MODAL_ID } from '@/constants/modalId'
import ProductTransactionLayout from '@/layouts/Product/ProductTransactionLayout'
import ProductListingForm from '@/components/ListProductForm'
import Spinner from '@/components/Spinner'
import ViewModal from './ViewModal'
import { formatCurrency } from '@/util/currencyHelpers'
import { sendGTMEvent } from '@next/third-parties/google'
import Toast from '@/components/Toast'
import { hideModal } from '.'

type Props = {
  asset: AssetType
}

const ProductListModal = NiceModal.create<Props>(({ asset }) => {
  const {
    id,
    marketplace: { status, listing_price, listing_id }
  } = asset

  const { isLoading, data } = useListingPreviewQuery(id, listing_price)

  if (!data) return null

  const isProductListed = status !== null
  const item = data.preview_listings[id]

  const title = isProductListed ? 'Edit Listing' : 'List on Market'
  const gtmEventType = isProductListed
    ? 'marketplace_listing_edit'
    : 'marketplace_listing_create'
  const successDescription = isProductListed
    ? 'Listing Updated'
    : 'Listing Created'

  return (
    <ViewModal id={MODAL_ID.marketplace.listItem}>
      <ProductTransactionLayout title={title} asset={item.asset}>
        {isLoading ? (
          <Spinner />
        ) : (
          <ProductListingForm
            update={isProductListed}
            onDismiss={() => hideModal(MODAL_ID.marketplace.listItem)}
            onDelete={() => {
              hideModal(MODAL_ID.marketplace.listItem)
              Toast({
                type: 'success',
                title: 'Your Listing Was Removed',
                autoClose: 5000
              })
            }}
            onUpdate={price => {
              hideModal(MODAL_ID.marketplace.listItem)
              Toast({
                type: 'success',
                title: successDescription,
                description: `Your listing price is ${formatCurrency(
                  price,
                  false
                )} USDC`,
                autoClose: 5000
              })
              sendGTMEvent({
                event: gtmEventType
              })
            }}
            listing_id={listing_id}
            listing_preview={item}
            asset={asset}
          />
        )}
      </ProductTransactionLayout>
    </ViewModal>
  )
})

export default ProductListModal

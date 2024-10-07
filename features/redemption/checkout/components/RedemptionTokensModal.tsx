import { SummaryLineType } from '@/api/resources/shared/order'
import Modal from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import TransferListItem from '@/features/transfer/components/TransferListItem'
import NiceModal from '@ebay/nice-modal-react'
import React from 'react'

type Props = {
  templates: SummaryLineType[]
}

const RedemptionTokensModal = NiceModal.create(({ templates }: Props) => {
  return (
    <Modal
      title={`Mint Number Summary`}
      id={MODAL_ID.redemption.redemptionTokens}
    >
      <p className="-mt-1 mb-4 text-gray-300 body">
        Review your redemption token mint numbers below. Once redeemed, these
        tokens will permanently removed from your Inventory.
      </p>
      <div className="flex flex-col gap-3 pb-1">
        {templates.map(template => {
          return (
            <TransferListItem
              item={{
                id: template.redeem_template_id,
                media: template.media,
                label: template.name,
                items: template.assets.map(asset => ({
                  id: asset.redeem_asset_id,
                  mint_num: asset.mint_num
                }))
              }}
              key={template.redeem_template_id}
              rightColumnChildren={
                <span className="pricing normal-case">x{template.qty}</span>
              }
            />
          )
        })}
      </div>
    </Modal>
  )
})

export default RedemptionTokensModal

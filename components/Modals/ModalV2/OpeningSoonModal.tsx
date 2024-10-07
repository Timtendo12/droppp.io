import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import BooleanModal from './BooleanModal'
import { formattedPacificDate } from '@/util/time/pt'
import { DateFormatter } from '@/util/time'

interface OpeningSoonModalProps {
  opensAt: string
}

const OpeningSoonModal = NiceModal.create(
  ({ opensAt }: OpeningSoonModalProps) => {
    const hideModal = () => NiceModal.hide(MODAL_ID.openingSoon)
    const openingAt = formattedPacificDate(
      opensAt,
      DateFormatter.LongHours,
      true
    )

    return (
      <BooleanModal
        id={MODAL_ID.openingSoon}
        title="Opening Soon"
        primaryButton={{
          onClick: hideModal,
          theme: 'blue',
          label: 'OK'
        }}
      >
        <div className="body-sm text-gray-400">
          This collection's drop will begin {openingAt}. Check back once the
          drop concludes to shop the Droppp Marketplace.
        </div>
      </BooleanModal>
    )
  }
)

export default OpeningSoonModal

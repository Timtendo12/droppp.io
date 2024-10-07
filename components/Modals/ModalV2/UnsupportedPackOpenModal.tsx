import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { Content as GetUnsupportedPackOpenContent } from './content/unsupportedPackOpen'
import InfoModal from './InfoModal'
import { MODAL_ID } from '@/constants/modalId'

interface UnsupportedPackOpenModalProps {
  onRequestOpenLegacy: () => void
}

const UnsupportedPackOpenModal = NiceModal.create(
  ({ onRequestOpenLegacy }: UnsupportedPackOpenModalProps) => {
    const handleRequestOpenLegacy = () => {
      if (onRequestOpenLegacy) return onRequestOpenLegacy()
    }

    return (
      <InfoModal
        id={MODAL_ID.unsupportedPackOpen}
        title={GetUnsupportedPackOpenContent.title}
        header={{ image: GetUnsupportedPackOpenContent.image }}
        primaryButton={{
          onClick: handleRequestOpenLegacy,
          theme: 'blue',
          label: 'Visit Legacy Pack Drop Site'
        }}
      >
        {GetUnsupportedPackOpenContent.body}
      </InfoModal>
    )
  }
)

export default UnsupportedPackOpenModal

import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import ModalSequence from '@/components/Modals/ModalV2/ModalSequence'
import { TransferProvider } from './TransferProvider'
import { TransferSequence } from './types'
import TransferableAssetsView from './steps/TransferableAssetsView'
import ConfirmStep from './steps/ConfirmStep'
import ReviewStep from './steps/ReviewStep'
import useBreakpoints from '@/hooks/useBreakpoints'

export default function TransferAssetSequence() {
  return (
    <TransferProvider>
      <ModalSequence
        id={MODAL_ID.transfer.review}
        modalId={MODAL_ID.transfer.review}
        init={InitializeSequence}
      />
    </TransferProvider>
  )
}

const InitializeSequence = (sequence: TransferSequence) => {
  const { isMobile } = useBreakpoints(['mobile'])

  return [
    ReviewStep.configure(sequence, isMobile),
    ConfirmStep.configure(sequence),
    TransferableAssetsView.configure(sequence)
  ]
}

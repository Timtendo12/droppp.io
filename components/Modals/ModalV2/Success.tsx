import ModalStateGraphic from '@/components/Modals/ModalV2/ModalStateGraphic'
import { ReactNode } from 'react'
import { ModalButtonProps } from './BaseModal'
import NiceModal from '@ebay/nice-modal-react'
import ConfirmModal from './ConfirmModal'

export interface SuccessModalProps {
  description: ReactNode
  primaryButton: ModalButtonProps
  secondaryButton: ModalButtonProps
}

export const Success = NiceModal.create(
  ({ description, primaryButton, secondaryButton }: SuccessModalProps) => {
    return (
      <ConfirmModal
        id={'success'}
        header={{
          component: (
            <ModalStateGraphic icon="tick" className="mb-2 mt-2 mx-auto" />
          )
        }}
        title="Success!"
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
        description={description}
      />
    )
  }
)

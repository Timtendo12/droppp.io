import { hideModal } from '@/components/Modals/ModalV2'
import { SuccessModalProps } from '@/components/Modals/ModalV2/Success'

import { MODAL_ID } from '@/constants/modalId'
import { NextRouter } from 'next/router'

export const Success = ({
  to,
  router,
  id
}: {
  to: string
  router: NextRouter
  id: number
}): SuccessModalProps => {
  return {
    description: (
      <>
        Your items are being transferred to <b className="text-white">{to}</b>.
        You may view the details of this transfer in your Activity.
      </>
    ),
    primaryButton: {
      onClick: () => {
        hideModal(MODAL_ID.confirm)
      },
      label: 'Done'
    },
    secondaryButton: {
      theme: 'secondary',
      onClick: () => router.push(`/activity/?action_id=${id}`).then(),
      label: 'View Details'
    }
  }
}

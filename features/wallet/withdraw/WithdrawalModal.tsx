import NiceModal from '@ebay/nice-modal-react'
import ModalSequence from '@/components/Modals/ModalV2/ModalSequence'
import { MODAL_ID } from '@/constants/modalId'
import { ChooseNetworkStep } from '@/features/wallet/withdraw/steps/ChooseNetworkStep'
import { EnterAmountStep } from '@/features/wallet/withdraw/steps/EnterAmountStep'
import { FinalizeStep } from '@/features/wallet/withdraw/steps/FinalizeStep'
import { WithdrawalProvider } from '@/features/wallet/withdraw/WithdrawalProvider'
import { WithdrawalSequence } from '@/features/wallet/withdraw/types'

export const WithdrawalModal = NiceModal.create(() => {
  const initializeSequence = (sequence: WithdrawalSequence) => {
    return [
      ChooseNetworkStep.configure(sequence),
      EnterAmountStep.configure(sequence),
      FinalizeStep.configure(sequence)
    ]
  }

  return (
    <WithdrawalProvider>
      <ModalSequence
        id={MODAL_ID.wallet.withdrawFunds}
        modalId={MODAL_ID.wallet.withdrawFunds}
        init={initializeSequence}
      />
    </WithdrawalProvider>
  )
})

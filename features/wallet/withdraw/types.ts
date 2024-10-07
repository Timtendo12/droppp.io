import {
  IModalSequenceControllerProps,
  IModalSequenceViewProps
} from '@/components/Modals/ModalV2/ModalSequence'
import { ModalChildrenWrappers } from '@/components/Modals/ModalV2/BaseModal'
import { NetworkType } from '@/api/resources/shared/crypto'
import { CryptoFees } from '@/api/resources/crypto/withdraw/fees/schema'
import { NetworkDetail } from '@/constants/cryptoNetworks'

export const WithdrawalSteps = {
  chooseNetwork: 'chooseNetworkStep',
  enterAmount: 'enterAmountStep',
  finalize: 'finalizeStep'
} as const

export type WithdrawalStep =
  (typeof WithdrawalSteps)[keyof typeof WithdrawalSteps]

export type WithdrawalSequence = IModalSequenceControllerProps

export type WithdrawalTransition = {
  step: WithdrawalStep
  sequence: WithdrawalSequence
  payload: unknown
}

export type AddressPayload = { network: NetworkType; address: string }
export type AmountPayload = { amount: number }

export type EnterAmountTransition = WithdrawalTransition & {
  step: 'enterAmountStep'
  payload: AddressPayload
}

export type FinalizeTransition = WithdrawalTransition & {
  step: 'finalizeStep'
  payload: AmountPayload
}

export const isEnterAmountStep = (
  transition: WithdrawalTransition
): transition is EnterAmountTransition => transition.step === 'enterAmountStep'

export const isFinalizeStep = (
  transition: WithdrawalTransition
): transition is FinalizeTransition => transition.step === 'finalizeStep'

export type WithdrawalStepProps = {
  sequence: WithdrawalSequence
} & ModalChildrenWrappers

export type WithdrawalStepConfiguration = IModalSequenceViewProps

export type Withdrawal = Partial<{
  network: NetworkType
  address: string
  amount: number
}>

export type SelectedNetwork = NetworkDetail & { fee: number }

export type WithdrawalContextType = {
  withdrawal: Withdrawal
  networkFees: CryptoFees
  balance?: number
  selectedNetwork?: SelectedNetwork
  transitionTo: <T extends WithdrawalTransition>(transition: T) => void
}

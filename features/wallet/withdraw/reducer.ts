import {
  AddressPayload,
  AmountPayload,
  isEnterAmountStep,
  isFinalizeStep,
  Withdrawal,
  WithdrawalTransition
} from '@/features/wallet/withdraw/types'

export type SetAddressAction = { type: 'SET_ADDRESS'; payload: AddressPayload }
export type SetAmountAction = { type: 'SET_AMOUNT'; payload: AmountPayload }
export type WithdrawalAction = SetAddressAction | SetAmountAction

export const defaultWithdrawal = (): Withdrawal => ({})

export const resolveAction = <T extends WithdrawalTransition>(
  transition: T
): WithdrawalAction => {
  if (isEnterAmountStep(transition))
    return { type: 'SET_ADDRESS', payload: transition.payload }

  if (isFinalizeStep(transition))
    return { type: 'SET_AMOUNT', payload: transition.payload }
}

export const withdrawalReducer = (
  state: Withdrawal,
  action: WithdrawalAction
): Withdrawal => {
  switch (action.type) {
    case 'SET_ADDRESS': {
      const { network, address } = action.payload
      return { ...state, network, address }
    }
    case 'SET_AMOUNT': {
      const { amount } = action.payload
      return {
        ...state,
        amount
      }
    }
    default: {
      throw new Error('Invalid action type')
    }
  }
}

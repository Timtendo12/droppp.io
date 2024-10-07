import { NetworkType } from '@/api/resources/shared/crypto'
import { WalletAddressGetResponse } from '@/api/resources/user/wallet/address/get/schema'
import { DepositViewType } from '../types'

export type DepositValues = {
  confirm: boolean
  network: NetworkType
  address: WalletAddressGetResponse
  depositViewType: DepositViewType
}

export type DepositAction =
  | {
      type: 'confirm'
      payload: boolean
    }
  | { type: 'network'; payload: NetworkType }
  | { type: 'address'; payload: WalletAddressGetResponse }
  | { type: 'depositViewType'; payload: DepositViewType }

export const depositReducer = (
  state: DepositValues,
  action: DepositAction
): DepositValues => {
  switch (action.type) {
    case 'confirm': {
      return { ...state, confirm: action.payload }
    }
    case 'network': {
      return { ...state, network: action.payload }
    }
    case 'address': {
      return { ...state, address: action.payload }
    }
    case 'depositViewType': {
      return { ...state, depositViewType: action.payload }
    }
    default:
      return state
  }
}

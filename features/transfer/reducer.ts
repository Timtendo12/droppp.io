import { TransferPreviewResponse } from '@/api/resources/user/assets/transfer/preview/schema'
import {
  CaptchaTokenPayload,
  MemoPayload,
  ToPayload,
  TransferContextType,
  TransferTransition,
  isReviewStep
} from './types'
import { getNonTransferableAssetsCount } from './util'

export type PreviewAction = {
  type: 'PREVIEW'
  payload: TransferPreviewResponse & { isLoading: boolean; isFetching: boolean }
}

export type SetToAddressAction = {
  type: 'SET_TO_ADDRESS'
  payload: ToPayload
}

export type SetMemoAction = {
  type: 'SET_MEMO'
  payload: MemoPayload
}

export type SetCaptchaToken = {
  type: 'SET_CAPTCHA_TOKEN'
  payload: CaptchaTokenPayload
}

export type LoadingAction = {
  type: 'LOADING'
  payload: { isLoading: boolean; isFetching: boolean }
}

export type TransferAction =
  | SetToAddressAction
  | SetMemoAction
  | PreviewAction
  | SetCaptchaToken
  | LoadingAction

export const defaultTransfer = (): TransferContextType => ({
  isFetching: false,
  isLoading: false,
  preview: {
    non_transferable_assets: { categories: [], count: 0 },
    transferable_assets: { items: [], count: 0 }
  },
  transfer: {
    to: ''
  }
})

export const resolveAction = <T extends TransferTransition>(
  transition: T
): TransferAction => {
  if (isReviewStep(transition))
    return { type: 'SET_MEMO', payload: transition.payload }
}

export const transferReducer = (
  state: TransferContextType,
  action: TransferAction
): TransferContextType => {
  switch (action.type) {
    case 'PREVIEW': {
      const { non_transferable_assets, transferable_assets } = action.payload

      const preview = {
        transferable_assets: {
          items: transferable_assets,
          count: transferable_assets.length
        },
        non_transferable_assets: {
          categories: non_transferable_assets,
          count: getNonTransferableAssetsCount(non_transferable_assets)
        }
      }
      const transfer = {
        ...state.transfer,
        assets: transferable_assets.map(asset => asset.id)
      }
      return { ...state, transfer, preview }
    }
    case 'SET_TO_ADDRESS': {
      const { to, captcha_enabled } = action.payload
      const transfer = { ...state.transfer, to }
      return { ...state, isCaptchaEnabled: captcha_enabled, transfer }
    }
    case 'SET_CAPTCHA_TOKEN': {
      const { captcha_token } = action.payload
      const transfer = { ...state.transfer, captcha_token }
      return { ...state, transfer }
    }
    case 'LOADING': {
      return { ...state, ...action.payload }
    }
    case 'SET_MEMO': {
      const { memo } = action.payload
      const transfer = { ...state.transfer, memo }
      return { ...state, transfer }
    }
    default: {
      throw new Error('Invalid action type')
    }
  }
}

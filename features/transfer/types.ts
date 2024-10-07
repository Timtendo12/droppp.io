import {
  NonTransferableAssets,
  TransferableAssets
} from '@/api/resources/user/assets/transfer/preview/schema'
import { ModalChildrenWrappers } from '@/components/Modals/ModalV2/BaseModal'
import {
  IModalSequenceControllerProps,
  IModalSequenceViewProps
} from '@/components/Modals/ModalV2/ModalSequence'

export const TransferSteps = {
  review: 'review',
  confirm: 'confirm',
  transferableAssets: 'transferableAssets'
} as const

export type TransferStep = (typeof TransferSteps)[keyof typeof TransferSteps]

export type TransferSequence = IModalSequenceControllerProps

export type ReviewPayload = { to: string; memo?: string }
export type ToPayload = { to: string; captcha_enabled: boolean }
export type MemoPayload = { memo: string }
export type CaptchaTokenPayload = { captcha_token: string }

export type TransferTransition = {
  step: TransferStep
  sequence: TransferSequence
  payload: unknown
}

export type ConfirmTransition = TransferTransition & {
  step: 'confirm'
  payload: MemoPayload
}

export const isReviewStep = (
  transition: TransferTransition
): transition is ConfirmTransition => transition.step === 'confirm'

export type TransferStepProps = {
  sequence: TransferSequence
} & ModalChildrenWrappers

export type TransferStepConfiguration = IModalSequenceViewProps & {
  isMobile?: boolean
}

export type Transfer = {
  to?: string
  assets?: number[]
  memo?: string
  captchaToken?: string
}

export type TransferContextType = {
  isFetching: boolean
  isLoading: boolean
  transfer?: Transfer
  preview?: {
    transferable_assets: {
      items: TransferableAssets
      count: number
    }
    non_transferable_assets: {
      categories: NonTransferableAssets
      count: number
    }
  }
  isCaptchaEnabled?: boolean
  transitionTo?: <T extends TransferTransition>(transition: T) => void
}

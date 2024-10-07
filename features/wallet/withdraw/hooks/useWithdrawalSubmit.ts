import { useQueryClient } from '@tanstack/react-query'
import { useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { useWalletWithdrawalMutation } from '@/api/resources/user/wallet/crypto/withdraw'
import { WalletWithdrawalInput } from '@/api/resources/user/wallet/crypto/withdraw/schema'
import { walletQueryKey } from '@/api/resources/user/wallet/get'
import TwoFAModal from '@/components/Modals/ModalV2/TwoFAModal'
import { isApiError } from '@/api/core/errors'
import { notifyGenericError } from '@/components/QueryErrorNotifier/notifiers/Generic'

export const useWithdrawalSubmit = ({
  input,
  onWithdrawalSuccess
}: {
  input: WalletWithdrawalInput
  onWithdrawalSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  const ModalTwoFA = useModal(TwoFAModal)
  const [code, setCode] = useState<string | null>(null)

  const handle2FAError = async () => {
    const twoFaCode = await new Promise(resolve =>
      ModalTwoFA.show({ onAuthorized: resolve as any })
    )
    setCode(twoFaCode as string)
  }

  const {
    mutate,
    reset,
    isLoading: isSubmitting
  } = useWalletWithdrawalMutation(
    { ...input, code },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(walletQueryKey).then()
        onWithdrawalSuccess()
      },
      onError: (err: unknown) => {
        if (isApiError(err) && err.is2FAAuthCodeRequest) {
          reset()
          if (!ModalTwoFA.visible) handle2FAError().then()
        } else {
          notifyGenericError({ error: err })
        }
      }
    }
  )

  return { submitWithdrawal: mutate, isSubmitting }
}

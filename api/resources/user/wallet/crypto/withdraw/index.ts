import { ApiError } from '@/api/core/errors'
import {
  MutationObserverOptions,
  MutationOptions,
  useMutation
} from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  WalletWithdrawalInput,
  WalletWithdrawalResponse,
  walletWithdrawalResponseSchema
} from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userwalletcryptowithdraw
const path = '/user/wallet/crypto/withdraw'

export const withdrawUserCrypto = async (
  input: WalletWithdrawalInput,
  mutationOptions?: MutationOptions
): Promise<WalletWithdrawalResponse> =>
  post<WalletWithdrawalResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    walletWithdrawalResponseSchema
  )

export const useWalletWithdrawalMutation = (
  input: WalletWithdrawalInput,
  mutationOptions?: MutationObserverOptions
) => {
  return useMutation<WalletWithdrawalResponse, ApiError>(
    () => withdrawUserCrypto(input, mutationOptions),
    mutationOptions
  )
}

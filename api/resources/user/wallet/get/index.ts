import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { WalletGetResponse, walletGetResponseSchema } from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'
import identityVerificationStateTransformer, {
  IdentityVerificationStateResponse
} from '@/api/resources/shared/transformers/identityVerificationState'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userwalletget
const path = `/user/wallet/get`

export const getWallet = async (
  queryContext?: QueryFunctionContext
): Promise<WalletGetResponse> =>
  post<WalletGetResponse>(
    buildApiUrl(path),
    queryContext,
    walletGetResponseSchema
  )

export const walletQueryKey = [path, 'wallet']

export type WalletQueryResponse =
  IdentityVerificationStateResponse<WalletGetResponse>

const defaultOptions = {
  select: (response: WalletGetResponse): WalletQueryResponse =>
    identityVerificationStateTransformer(response)
}

export const useWalletQuery = (
  queryOptions?: TypedQueryOptions<WalletGetResponse, WalletQueryResponse>
) =>
  useQuery<WalletGetResponse, ApiError, WalletQueryResponse>(
    walletQueryKey,
    queryContext => getWallet(queryContext),
    { ...defaultOptions, ...queryOptions }
  )

import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import {
  WalletAddressGetInput,
  WalletAddressGetResponse,
  walletAddressGetResponseSchema
} from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userwalletaddressget
const path = `/user/wallet/address/get`

export const getWalletAddress = async (
  input: WalletAddressGetInput,
  queryContext?: QueryFunctionContext
): Promise<WalletAddressGetResponse> =>
  post<WalletAddressGetResponse>(
    buildApiUrl(path, input),
    queryContext,
    walletAddressGetResponseSchema
  )

export const walletAddressQueryKey = [path, 'walletAddress']

export const useWalletAddressQuery = (
  input: WalletAddressGetInput,
  queryOptions?: TypedQueryOptions<WalletAddressGetResponse>
) =>
  useQuery<WalletAddressGetResponse, ApiError>(
    walletAddressQueryKey,
    queryContext => getWalletAddress(input, queryContext),
    queryOptions
  )

import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { CryptoFeesResponse, cryptoFeesResponseSchema } from './schema'
import { ApiError } from '@/api/core/errors'
import { TypedQueryOptions } from '@/api/core/query/options'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-cryptowithdrawfees
const path = '/crypto/withdraw/fees'

export const getCryptoFees = async (
  queryContext?: QueryFunctionContext
): Promise<CryptoFeesResponse> =>
  post<CryptoFeesResponse>(
    buildApiUrl(path),
    queryContext,
    cryptoFeesResponseSchema
  )

export const cryptoFeesQueryKey = [path]

export const useCryptoFeesQuery = (
  queryOptions?: TypedQueryOptions<CryptoFeesResponse>
) =>
  useQuery<CryptoFeesResponse, ApiError>(
    cryptoFeesQueryKey,
    queryContext => getCryptoFees(queryContext),
    queryOptions
  )

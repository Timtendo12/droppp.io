import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { KycResponse } from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userkyc
const path = '/user/kyc'

export const getKyc = async (
  queryContext?: QueryFunctionContext
): Promise<KycResponse> => post<KycResponse>(buildApiUrl(path), queryContext)

export const kycQueryKey = [path, 'kyc']

export const useKycQuery = (queryOptions?: TypedQueryOptions<KycResponse>) =>
  useQuery<KycResponse, ApiError>(
    kycQueryKey,
    queryContext => getKyc(queryContext),
    queryOptions
  )

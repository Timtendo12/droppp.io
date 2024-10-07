import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import post from '@/api/core/http/post'
import { TypedQueryOptions } from '@/api/core/query/options'
import { buildApiUrl } from '@/api/core/url'
import { AssetsValueResponse, assetsValueResponseSchema } from './schema'

const path = `/assets/value/get`

export const getAssetsValue = async (
  account: string,
  queryContext?: QueryFunctionContext
): Promise<AssetsValueResponse> =>
  post<AssetsValueResponse>(
    buildApiUrl(path, { account }),
    queryContext,
    assetsValueResponseSchema
  )

export const assetsValueQueryKey = (account: string) =>
  [path, 'account', account] as const

export const useAssetsValue = (
  account: string,
  queryOptions?: TypedQueryOptions<AssetsValueResponse>
) =>
  useQuery<AssetsValueResponse, ApiError>(
    assetsValueQueryKey(account),
    queryContext => getAssetsValue(account, queryContext),
    queryOptions
  )

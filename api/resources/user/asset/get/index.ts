import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { UserAssetResponse, userAssetResponseSchema } from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'
import { parseNumber } from '@/util/numberHelpers'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userassetget
export const path = `/user/asset/get`

export const getUserAsset = async (
  id: string,
  queryContext?: QueryFunctionContext
): Promise<UserAssetResponse> =>
  post<UserAssetResponse>(
    buildApiUrl(path, {
      id
    }),
    queryContext,
    userAssetResponseSchema
  )

export const assetQueryKey = (id: string) => [path, 'id', id] as const

export const assetIdFromQueryKey = (queryKey: unknown[]): number | null => {
  const [, , id] = queryKey
  return parseNumber(id)
}

export const useGetUserAsset = (
  id: string,
  queryOptions?: TypedQueryOptions<UserAssetResponse>
) => {
  return useQuery<UserAssetResponse, ApiError>(
    assetQueryKey(id),
    queryContext => getUserAsset(id, queryContext),
    queryOptions
  )
}

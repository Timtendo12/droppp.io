import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import post from '@/api/core/http/post'
import { TypedQueryOptions } from '@/api/core/query/options'
import { buildApiUrl } from '@/api/core/url'
import { AssetGetResponse, assetGetResponseSchema } from './schema'

const path = `/asset/get`

export const getAsset = async (
  id: string,
  queryContext?: QueryFunctionContext
): Promise<AssetGetResponse> =>
  post<AssetGetResponse>(
    buildApiUrl(path, { id }),
    queryContext,
    assetGetResponseSchema
  )

export const assetQueryKey = (id: string) => [path, 'id', id] as const

export const useGetAsset = (
  id: string,
  queryOptions?: TypedQueryOptions<AssetGetResponse>
) =>
  useQuery<AssetGetResponse, ApiError>(
    assetQueryKey(id),
    queryContext => getAsset(id, queryContext),
    queryOptions
  )

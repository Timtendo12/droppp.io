import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { TypedQueryOptions } from '@/api/core/query/options'
import { buildApiUrl } from '@/api/core/url'
import {
  CollectionAssetGetResponse,
  collectionAssetGetResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'

export const path = `user/tracker/drop/asset/get`

export const getCollectionAsset = async (
  asset_id: string,
  account: string,
  queryContext?: QueryFunctionContext
): Promise<CollectionAssetGetResponse> =>
  post<CollectionAssetGetResponse>(
    buildApiUrl(path, { id: asset_id, account }),
    queryContext,
    collectionAssetGetResponseSchema
  )

export const collectionAssetQueryKey = (asset_id: string) =>
  [path, 'asset_id', asset_id] as const

export const useGetCollectionAsset = (
  asset_id: string,
  account: string,
  queryOptions: TypedQueryOptions<CollectionAssetGetResponse> = {}
) =>
  useQuery<CollectionAssetGetResponse, ApiError>(
    collectionAssetQueryKey(asset_id),
    queryContext => getCollectionAsset(asset_id, account, queryContext),
    queryOptions
  )

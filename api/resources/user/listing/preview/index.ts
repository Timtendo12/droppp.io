import { QueryFunctionContext } from '@tanstack/query-core'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { ListingPreviewResponse, listingPreviewResponseSchema } from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingpreview
const path = `/user/listing/preview`

export const getListingPreview = async (
  assetId: number,
  price?: number,
  queryContext?: QueryFunctionContext
): Promise<ListingPreviewResponse> =>
  post<ListingPreviewResponse>(
    buildApiUrl(path, {
      asset_ids: [assetId.toString()],
      prices: price?.toString() ?? ''
    }),
    queryContext,
    listingPreviewResponseSchema
  )

export const listingPreviewQueryKey = (assetId: number, price?: number) =>
  [path, 'assetId', assetId, 'price', price] as const

export const useListingPreviewQuery = (
  assetId: number,
  price?: number,
  queryOptions?: TypedQueryOptions<ListingPreviewResponse>
) =>
  useQuery<ListingPreviewResponse, ApiError>(
    listingPreviewQueryKey(assetId, price),
    queryContext => getListingPreview(assetId, price, queryContext),
    queryOptions
  )

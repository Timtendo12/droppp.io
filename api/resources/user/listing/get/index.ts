import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ListingGetResponse, listingGetResponseSchema } from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingget
const path = `user/listing/get`

export const getListing = async (
  listingId: number,
  queryContext?: QueryFunctionContext
): Promise<ListingGetResponse> =>
  post<ListingGetResponse>(
    buildApiUrl(path, {
      listing_ids: listingId.toString()
    }),
    queryContext,
    listingGetResponseSchema
  )

export const listingGetQueryKey = (listingId: number) =>
  [path, 'listingId', listingId] as const

export const useListingGetQuery = (
  listingId: number,
  queryOptions?: TypedQueryOptions<ListingGetResponse>
) =>
  useQuery<ListingGetResponse, ApiError>(
    listingGetQueryKey(listingId),
    queryContext => getListing(listingId, queryContext),
    queryOptions
  )

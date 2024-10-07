import { useQuery } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { TypedQueryOptions } from '@/api/core/query/options'
import { buildApiUrl } from '@/api/core/url'
import {
  CollectionGetResponseSchema,
  collectionGetResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'
import { ParsedUrlQuery } from 'querystring'

const path = `user/tracker/drop/progress/get`

export const getCollection = async ({
  queryKey
}): Promise<CollectionGetResponseSchema> => {
  const [
    ,
    drop_id,
    account,
    set,
    show_only_missing_items,
    exclude_listings,
    hide_lowest_prices
  ] = queryKey
  return post<CollectionGetResponseSchema>(
    buildApiUrl(path, {
      drop_id,
      account,
      set,
      show_only_missing_items,
      exclude_listings,
      show_lowest_prices: !hide_lowest_prices
    }),
    {},
    collectionGetResponseSchema
  )
}

export const trackerDropProgressQueryKey = (
  query: ParsedUrlQuery,
  set: string,
  drop_id: string,
  account: string
) => {
  const { show_only_missing_items, exclude_listings, hide_lowest_prices } =
    query
  const result = [
    path,
    drop_id,
    account,
    set,
    show_only_missing_items,
    exclude_listings,
    hide_lowest_prices
  ]
  return result
}

export const useGetCollection = (
  query: ParsedUrlQuery,
  set: string,
  drop_id: string,
  account: string,
  queryOptions: TypedQueryOptions<CollectionGetResponseSchema> = {}
) =>
  useQuery<CollectionGetResponseSchema, ApiError>(
    trackerDropProgressQueryKey(query, set, drop_id, account),
    getCollection,
    queryOptions
  )

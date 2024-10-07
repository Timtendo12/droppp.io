import { useInfiniteQuery } from '@tanstack/react-query'
import { QueryFunctionContext } from '@tanstack/query-core'
import {
  CatalogItemListingsGetInput,
  CatalogItemListingsGetResponse,
  catalogItemListingsGetResponseSchema,
  ListedCatalogItem,
  MintListing
} from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedInfiniteQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'
import { transformObjectToArray } from '@/util/objectHelpers'
import {
  QueryData,
  MintListingItem,
  InfiniteQueryData,
  QueryInput
} from './types'
import { getNextPageParam } from '@/api/resources/shared/infinite'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-catalogitemlistingsget
export const path = `/catalog/item/listings/get`

export const getCatalogItemListings = async (
  input: CatalogItemListingsGetInput,
  queryContext?: QueryFunctionContext
): Promise<CatalogItemListingsGetResponse> =>
  post<CatalogItemListingsGetResponse>(
    buildApiUrl(path, input),
    queryContext,
    catalogItemListingsGetResponseSchema
  )

export const catalogItemListingsQueryKey = (input: QueryInput) =>
  [path, transformObjectToArray(input)] as const

const buildListingItem = (
  product: ListedCatalogItem,
  mintListing: MintListing
): MintListingItem => ({
  ...mintListing,
  mint_count: product.mint_count,
  is_lowest: product.listing_price === mintListing.listing_price
})

const select = ({ pages, pageParams }): InfiniteQueryData => {
  const product = pages[0].card
  const count = pages[0].count
  return {
    pages,
    pageParams,
    product,
    total: count,
    items: pages.flatMap((queryData: CatalogItemListingsGetResponse) =>
      queryData.data.map(mintListing => buildListingItem(product, mintListing))
    )
  } as InfiniteQueryData
}

type QueryOptions = TypedInfiniteQueryOptions<
  CatalogItemListingsGetResponse,
  QueryData
>

export const useCatalogItemListingsQuery = (
  input: QueryInput,
  options?: QueryOptions
) => {
  const { ...restOptions } = options ?? {}

  const defaultOptions: QueryOptions = {
    getNextPageParam,
    select: select,
    keepPreviousData: true
  }

  const queryOptions = {
    ...defaultOptions,
    ...restOptions
  }

  return useInfiniteQuery<CatalogItemListingsGetResponse, ApiError, QueryData>(
    catalogItemListingsQueryKey(input),
    async ({ pageParam, ...restQueryContext }) =>
      getCatalogItemListings({ ...input, page: pageParam }, restQueryContext),
    queryOptions
  )
}

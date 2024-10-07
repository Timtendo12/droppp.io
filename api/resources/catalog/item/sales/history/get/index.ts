import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  CatalogItemSalesHistoryGetResponse,
  catalogItemSalesHistoryGetResponseSchema,
  CatalogItemSalesHistoryGetInput,
  CatalogItemPagedSalesHistoryGetResponse,
  catalogItemPagedSalesHistoryGetResponseSchema
} from './schema'
import {
  TypedInfiniteQueryOptions,
  TypedQueryOptions
} from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'
import { InfiniteQueryData, QueryData, QueryInput } from './types'
import { getNextPageParam } from '@/api/resources/shared/infinite'
import { transformObjectToArray } from '@/util/objectHelpers'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-marketplacesummaryget
export const path = `/catalog/item/sales/history/get`

// Non-paged history

export const getCatalogItemSalesHistory = async (
  input: CatalogItemSalesHistoryGetInput,
  queryContext?: QueryFunctionContext
): Promise<CatalogItemSalesHistoryGetResponse> =>
  post<CatalogItemSalesHistoryGetResponse>(
    buildApiUrl(path, input),
    queryContext,
    catalogItemSalesHistoryGetResponseSchema
  )

export const catalogItemSalesHistoryQueryKey = [path, 'history']

export const catalogItemSalesHistoryKey = (input: QueryInput) =>
  [path, transformObjectToArray(input)] as const

export const useCatalogItemSalesHistoryQuery = (
  input: QueryInput,
  queryOptions?: TypedQueryOptions<CatalogItemSalesHistoryGetResponse>
) =>
  useQuery<CatalogItemSalesHistoryGetResponse, ApiError>(
    catalogItemSalesHistoryKey(input),
    queryContext => getCatalogItemSalesHistory(input, queryContext),
    queryOptions
  )

// Paged history (infinite query)

export const getCatalogItemPagedSalesHistory = async (
  input: CatalogItemSalesHistoryGetInput,
  queryContext?: QueryFunctionContext
): Promise<CatalogItemPagedSalesHistoryGetResponse> =>
  post<CatalogItemPagedSalesHistoryGetResponse>(
    buildApiUrl(path, input),
    queryContext,
    catalogItemPagedSalesHistoryGetResponseSchema
  )

export const catalogItemPagedSalesHistoryQueryKey = (input: QueryInput) =>
  [path, transformObjectToArray(input)] as const

const select = ({ pages, pageParams }): InfiniteQueryData => {
  const count = pages[0].count
  return {
    pages,
    pageParams,
    total: count,
    items: pages.flatMap(
      (queryData: CatalogItemPagedSalesHistoryGetResponse) => queryData.data
    )
  } as InfiniteQueryData
}

type QueryOptions = TypedInfiniteQueryOptions<
  CatalogItemPagedSalesHistoryGetResponse,
  QueryData
>

export const useInfiniteCatalogItemSalesHistoryQuery = (
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

  // Set the limit to 20, as that aligns with the limit set by MintListings in its API responses. This ensures consistency in user experience between MintListings and SalesHistory when scrolling through large lists of records by ensuring the UI loads the same amount of data.
  input = { limit: 20, ...input }

  return useInfiniteQuery<
    CatalogItemPagedSalesHistoryGetResponse,
    ApiError,
    QueryData
  >(
    catalogItemPagedSalesHistoryQueryKey(input),
    async ({ pageParam, ...restQueryContext }) =>
      getCatalogItemPagedSalesHistory(
        { ...input, page: pageParam },
        restQueryContext
      ),
    queryOptions
  )
}

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ListedCatalogItem } from '@/api/resources/catalog/item/listings/get/schema'
import {
  path as catalogItemListingsPath,
  useCatalogItemListingsQuery
} from '@/api/resources/catalog/item/listings/get'
import {
  PagedQueryActions,
  PagedQueryData,
  QueryData,
  QuerySort
} from '@/api/resources/catalog/item/listings/get/types'
import { MINT_LISTING_SORT_OPTIONS } from '@/constants'
import useSessionStorage from '@/storage/useSessionStorage'
import { StorageKey } from '@/storage/keys'

type UseMintListingsInput = {
  chainTemplateId: string
}

type UseMintListingsResult = {
  isInitializing: boolean
  isLoading: boolean
  product?: ListedCatalogItem
  data?: PagedQueryData
  actions: PagedQueryActions
}

export const DEFAULT_MINT_LISTING_SORT_OPTION = MINT_LISTING_SORT_OPTIONS[2]

export const useMintListingsQuery = ({
  chainTemplateId
}: UseMintListingsInput): UseMintListingsResult => {
  const queryClient = useQueryClient()

  useEffect(
    () => () => queryClient.removeQueries([catalogItemListingsPath]),
    []
  )

  const [sort, setSort] = useSessionStorage<QuerySort>(
    StorageKey.MintListingsSort,
    DEFAULT_MINT_LISTING_SORT_OPTION.value
  )

  const {
    isInitialLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    data: anyQueryData,
    ...queryRest
  } = useCatalogItemListingsQuery({
    chain_template_id: chainTemplateId,
    sort
  })

  // Hack for typing with useInfiniteQuery - Eric, Mon Nov 6 2023
  const queryData = anyQueryData as unknown as QueryData

  const isLoading =
    queryRest.isLoading ||
    queryRest.isRefetching ||
    (queryRest.isFetching &&
      !queryRest.isFetchingNextPage &&
      !queryRest.isFetchingPreviousPage)

  // Create a PagedQueryData object from a QueryData.
  const pagedQueryData = queryData && {
    ...queryData,
    sort,
    hasMore: hasNextPage
  }

  const refresh = () => refetch().then()

  const updateSort = (val: QuerySort) =>
    setSort(val ?? DEFAULT_MINT_LISTING_SORT_OPTION.value)

  const fetchMore = () => {
    if (!queryRest.isFetchingNextPage) {
      return fetchNextPage()
    }
  }

  return {
    isInitializing: isInitialLoading,
    isLoading,
    product: queryData?.product,
    data: pagedQueryData,
    actions: {
      refresh,
      fetchMore,
      updateSort
    }
  }
}

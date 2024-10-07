import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  path as catalogItemSalesHistoryPath,
  useInfiniteCatalogItemSalesHistoryQuery
} from '@/api/resources/catalog/item/sales/history/get'
import { SALES_HISTORY_SORT_OPTIONS } from '@/constants'
import useSessionStorage from '@/storage/useSessionStorage'
import { StorageKey } from '@/storage/keys'
import {
  PagedQueryActions,
  PagedQueryData,
  QueryData,
  QuerySort
} from '@/api/resources/catalog/item/sales/history/get/types'

type UseSalesHistoryInput = {
  dataId: string
}

type UseSalesHistoryResult = {
  isInitializing: boolean
  isLoading: boolean
  data?: PagedQueryData
  actions: PagedQueryActions
}

export const DEFAULT_SALES_HISTORY_SORT_OPTION = SALES_HISTORY_SORT_OPTIONS[0]

export const useSalesHistoryQuery = ({
  dataId
}: UseSalesHistoryInput): UseSalesHistoryResult => {
  const queryClient = useQueryClient()

  useEffect(
    () => () => queryClient.removeQueries([catalogItemSalesHistoryPath]),
    []
  )

  const [sort, setSort] = useSessionStorage<QuerySort>(
    StorageKey.SalesHistorySort,
    DEFAULT_SALES_HISTORY_SORT_OPTION.value
  )

  const {
    isInitialLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    data: anyQueryData,
    ...queryRest
  } = useInfiniteCatalogItemSalesHistoryQuery({
    data_id: dataId,
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
    setSort(val ?? DEFAULT_SALES_HISTORY_SORT_OPTION.value)

  const fetchMore = () => {
    if (!queryRest.isFetchingNextPage) {
      return fetchNextPage()
    }
  }

  return {
    isInitializing: isInitialLoading,
    isLoading,
    data: pagedQueryData,
    actions: {
      refresh,
      fetchMore,
      updateSort
    }
  }
}

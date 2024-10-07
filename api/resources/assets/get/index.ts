import { useInfiniteQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { AssetsRequest, AssetsResponse, assetsResponseSchema } from './schema'
import { NFT_TYPES } from '@/enum'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-assetsget
const path = `/assets/get`

export const getAssets = async ({
  queryKey,
  pageParam = 1
}): Promise<AssetsResponse> => {
  const [
    path,
    account,
    drop_id,
    type,
    search,
    owners,
    collections,
    rarities,
    variants,
    sort,
    showDuplicates,
    excludeLowest,
    show_only_listings
  ] = queryKey
  const params = {
    account,
    drop_id,
    search,
    page: pageParam,
    owners: owners,
    drop_ids: collections,
    rarities: rarities,
    variants: variants,
    sort,
    show_duplicates: !!showDuplicates,
    exclude_lowest_mint: !!excludeLowest,
    show_only_listings
  }
  if (type === NFT_TYPES.UNOPENED) {
    params['openable'] = true
  } else if (type === NFT_TYPES.ITEMS) {
    params['openable'] = false
  }
  return post<AssetsResponse>(
    buildApiUrl(path, params),
    {},
    assetsResponseSchema
  )
}

export const assetsQueryKey = (props: AssetsRequest) => {
  const {
    account,
    dropId,
    type,
    search,
    owners,
    collections,
    rarities,
    variants,
    sort,
    showDuplicates,
    excludeLowest,
    show_only_listings
  } = props
  return [
    path,
    account,
    dropId,
    type,
    search,
    owners,
    collections,
    rarities,
    variants,
    sort,
    showDuplicates,
    excludeLowest,
    show_only_listings
  ] as const
}

export const useGetAssets = (props: AssetsRequest, enabled: boolean) =>
  useInfiniteQuery<AssetsResponse, ApiError>(assetsQueryKey(props), getAssets, {
    enabled,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.more ? allPages.length + 1 : undefined,
    select: ({ pages, pageParams }) => ({
      pages,
      pageParams,
      items: pages.flatMap(x => x.data),
      collections: pages[0].collections,
      owners: pages[0].owners,
      filtered_count: pages[0].filtered_count,
      filtered_openable_count: pages[0].filtered_openable_count,
      filtered_unopenable_count: pages[0].filtered_unopenable_count,
      total_count: pages[0].total_count,
      total_openable_count: pages[0].total_openable_count,
      total_unopenable_count: pages[0].total_unopenable_count
    }),
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false
  })

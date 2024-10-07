import { useInfiniteQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  UserAssetsRequest,
  UserAssetsResponse,
  userAssetsResponseSchema
} from './schema'
import { NFT_TYPES } from '@/enum'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userassetsget
export const path = `/user/assets/get`

export const getUserAssets = async ({
  queryKey,
  pageParam = 1
}): Promise<UserAssetsResponse> => {
  const [
    path,
    drop_id,
    type,
    search,
    owners,
    collections,
    rarities,
    variants,
    cardids,
    sort,
    show_duplicates,
    exclude_lowest_mint,
    show_only_listings,
    show_only_not_listings
  ] = queryKey
  const params = {
    drop_id,
    search,
    page: pageParam,
    owners: owners,
    drop_ids: collections,
    rarities,
    variants,
    cardids,
    sort,
    show_duplicates: !!show_duplicates,
    exclude_lowest_mint: !!exclude_lowest_mint,
    show_only_listings,
    show_only_not_listings
  }
  if (type === NFT_TYPES.UNOPENED) {
    params['openable'] = true
  } else if (type === NFT_TYPES.ITEMS) {
    params['openable'] = false
  }
  return post<UserAssetsResponse>(
    buildApiUrl(path, params),
    {},
    userAssetsResponseSchema
  )
}

export const assetsQueryKey = (props: UserAssetsRequest) => {
  const {
    dropId,
    type,
    search,
    owners,
    collections,
    rarities,
    variants,
    cardids,
    sort,
    show_duplicates,
    exclude_lowest_mint,
    show_only_listings,
    show_only_not_listings
  } = props
  const result = [
    path,
    dropId,
    type,
    search,
    owners,
    collections,
    rarities,
    variants,
    cardids,
    sort,
    show_duplicates,
    exclude_lowest_mint,
    show_only_listings,
    show_only_not_listings
  ]
  // @TODO - some ugliness in the filtering...collections filter are pushed to drop_ids, should be cleaned up - Josh Dobson
  // https://app.asana.com/0/1202254516899931/1204849196957887/f
  // console.log([path, ...Object.values(props).filter(value => value !== null)])

  return result
}

export const useGetUserAssets = props =>
  useInfiniteQuery<UserAssetsResponse, ApiError>(
    assetsQueryKey(props),
    getUserAssets,
    {
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
      retryOnMount: false
    }
  )

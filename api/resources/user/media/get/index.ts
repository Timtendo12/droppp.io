import { useInfiniteQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { UserMediaResponse, userMediaResponseSchema } from './schema'
import { ApiError } from 'next/dist/server/api-utils'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-usermediaget
const path = `/user/media/get`

export const getUserMedia = async ({
  queryKey,
  pageParam = 1
}): Promise<UserMediaResponse> => {
  const [path, media_type] = queryKey
  return post<UserMediaResponse>(
    buildApiUrl(path, { media_type, page: pageParam }),
    {},
    userMediaResponseSchema
  )
}

export const actionsQueryKey = (props: any) => {
  const { media_type = 'avatar' } = props
  return [path, media_type] as const
}

export const useGetUserMedia = props =>
  useInfiniteQuery<UserMediaResponse, ApiError>(
    actionsQueryKey(props),
    getUserMedia,
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.more ? allPages.length + 1 : undefined,
      select: ({ pages, pageParams }) => ({
        pages,
        pageParams,
        items: pages.flatMap(x => x.data)
      }),
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false
    }
  )

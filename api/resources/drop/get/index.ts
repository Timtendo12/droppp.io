import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import post from '@/api/core/http/post'
import { TypedQueryOptions } from '@/api/core/query/options'
import { buildApiUrl } from '@/api/core/url'
import { DropGetResponse, dropGetResponseSchema } from './schema'

const path = `/drop/get`

export const getDrop = async (
  drop_id: number,
  queryContext?: QueryFunctionContext
): Promise<DropGetResponse> =>
  post<DropGetResponse>(
    buildApiUrl(path, { drop_id }),
    queryContext,
    dropGetResponseSchema
  )

export const dropQueryKey = (drop_id: number) =>
  [path, 'drop_id', drop_id] as const

export const useGetDrop = (
  drop_id: number,
  queryOptions?: TypedQueryOptions<DropGetResponse>
) =>
  useQuery<DropGetResponse, ApiError>(
    dropQueryKey(drop_id),
    queryContext => getDrop(drop_id, queryContext),
    queryOptions
  )

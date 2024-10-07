import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { UserActionResponse, userActionResponseSchema } from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-useractionget
const path = `/user/action/get`

export const getUserAction = async (
  action_id: string,
  queryContext?: QueryFunctionContext
): Promise<UserActionResponse> =>
  post<UserActionResponse>(
    buildApiUrl(path, {
      action_id
    }),
    queryContext,
    userActionResponseSchema
  )

export const actionQueryKey = (id: string) => [path, 'action_id', id] as const

export const useGetUserAction = (
  id: string,
  queryOptions?: TypedQueryOptions<UserActionResponse>
) =>
  useQuery<UserActionResponse, ApiError>(
    actionQueryKey(id),
    queryContext => getUserAction(id, queryContext),
    queryOptions
  )

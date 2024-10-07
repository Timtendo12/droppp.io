import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ProfileGetResponse, profileGetResponseSchema } from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-profileget
const path = `profile/get`

export const getProfile = async (
  account: string,
  queryContext?: QueryFunctionContext
): Promise<ProfileGetResponse> =>
  post<ProfileGetResponse>(
    buildApiUrl(path, {
      account: account.toString()
    }),
    queryContext,
    profileGetResponseSchema
  )

export const profileGetQueryKey = (account: string) =>
  [path, 'account', account] as const

export const useProfileGetQuery = (
  account: string,
  queryOptions?: TypedQueryOptions<ProfileGetResponse>
) =>
  useQuery<ProfileGetResponse, ApiError>(
    profileGetQueryKey(account),
    queryContext => getProfile(account, queryContext),
    queryOptions
  )

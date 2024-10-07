import { QueryFunctionContext } from '@tanstack/query-core'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  DropOrderAssetsGetInput,
  DropOrderAssetsGetResponse,
  dropOrderAssetsGetResponseSchema
} from './schema'
import { getCSRF } from '@/util'
import { User } from '@/api/resources/shared/user'
import { transformObjectToArray } from '@/util/objectHelpers'
import { TypedQueryOptions } from '@/api/core/query/options'
import { useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-droporderassetsget
const path = 'drop/order/assets/get'

export const getDropOrderAssets = async (
  user: User,
  input: DropOrderAssetsGetInput,
  queryContext?: QueryFunctionContext
): Promise<DropOrderAssetsGetResponse> => {
  const apiUrl = buildApiUrl(path, input)

  getCSRF(user, apiUrl.params)

  return post<DropOrderAssetsGetResponse>(
    apiUrl,
    queryContext,
    dropOrderAssetsGetResponseSchema
  )
}

export const dropOrderAssetsQueryKey = (
  user: User,
  input: DropOrderAssetsGetInput
) => {
  return [path, user, ...transformObjectToArray(input)] as const
}

export const useDropOrderAssetsQuery = (
  user: User,
  input: DropOrderAssetsGetInput,
  queryOptions?: TypedQueryOptions<DropOrderAssetsGetResponse>
) =>
  useQuery<DropOrderAssetsGetResponse, ApiError>(
    dropOrderAssetsQueryKey(user, input),
    queryContext => getDropOrderAssets(user, input, queryContext),
    queryOptions
  )

import { useQuery } from '@tanstack/react-query'
import { QueryFunctionContext } from '@tanstack/query-core'
import {
  CheckAssetStatusResponse,
  checkAssetStatusResponseSchema
} from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userassetopencheck
const path = '/user/asset/open/check'

export const checkAssetStatus = async (
  id: string,
  queryContext?: QueryFunctionContext
): Promise<CheckAssetStatusResponse> =>
  post<CheckAssetStatusResponse>(
    buildApiUrl(path, { id }),
    queryContext,
    checkAssetStatusResponseSchema
  )

export const checkAssetStatusQueryKey = (id: string) =>
  [path, 'id', id] as const

export const useCheckAssetStatusQuery = (
  id: string,
  queryOptions?: TypedQueryOptions<CheckAssetStatusResponse>
) =>
  useQuery<CheckAssetStatusResponse, ApiError>(
    checkAssetStatusQueryKey(id),
    queryContext => checkAssetStatus(id, queryContext),
    queryOptions
  )

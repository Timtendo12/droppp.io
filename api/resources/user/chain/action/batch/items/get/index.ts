import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import post from '@/api/core/http/post'
import { TypedQueryOptions } from '@/api/core/query/options'
import { buildApiUrl } from '@/api/core/url'
import { BatchGetResponse, batchGetResponseSchema } from './schema'

const path = `user/chain/action/batch/items/get`

export const getBatchItems = async (
  id: number,
  queryContext?: QueryFunctionContext
): Promise<BatchGetResponse> =>
  post<BatchGetResponse>(
    buildApiUrl(path, { batch_id: id }),
    queryContext,
    batchGetResponseSchema
  )

export const batchQueryKey = (id: number) => [path, 'batch_id', id] as const

export const useBatchItems = (
  id: number,
  queryOptions?: TypedQueryOptions<BatchGetResponse>
) =>
  useQuery<BatchGetResponse, ApiError>(
    batchQueryKey(id),
    queryContext => getBatchItems(id, queryContext),
    queryOptions
  )

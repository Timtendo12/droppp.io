import { QueryFunctionContext } from '@tanstack/query-core'
import { useQuery } from '@tanstack/react-query'
import {
  TransferPreviewResponse,
  transferPreviewResponseSchema,
  TransferPreviewInput
} from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

export const path = '/user/assets/transfer/preview'

export const previewTransfer = async (
  input: TransferPreviewInput,
  queryContext?: QueryFunctionContext
): Promise<TransferPreviewResponse> =>
  post<TransferPreviewResponse>(
    buildApiUrl(path, input),
    queryContext,
    transferPreviewResponseSchema
  )

export const transferPreviewQueryKey = (input: TransferPreviewInput) =>
  [path, 'assets', input.assets, 'to', input.to] as const

export const useTransferPreviewQuery = (
  input: TransferPreviewInput,
  queryOptions?: TypedQueryOptions<TransferPreviewResponse>
) =>
  useQuery<TransferPreviewResponse, ApiError>(
    transferPreviewQueryKey(input),
    queryContext => previewTransfer(input, queryContext),
    queryOptions
  )

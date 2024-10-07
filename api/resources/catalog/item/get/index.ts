import { QueryFunctionContext } from '@tanstack/query-core'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  CatalogItemDetailGetResponse,
  catalogItemDetailGetResponseSchema
} from './schema'
import { TypedQueryOptions } from '@/api/core/query/options'
import { useQuery } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-catalogitemget
export const path = `/catalog/item/get`

export const getCatalogItemDetail = async (
  chain_template_id: string,
  queryContext?: QueryFunctionContext
): Promise<CatalogItemDetailGetResponse> =>
  post<CatalogItemDetailGetResponse>(
    buildApiUrl(path, { chain_template_id }),
    queryContext,
    catalogItemDetailGetResponseSchema
  )

export const catalogItemDetailQueryKey = (chain_template_id: string) =>
  [path, 'chain_template_id', chain_template_id] as const

export const useCatalogItemDetailQuery = (
  chain_template_id: string,
  queryOptions?: TypedQueryOptions<CatalogItemDetailGetResponse>
) =>
  useQuery<CatalogItemDetailGetResponse, ApiError>(
    catalogItemDetailQueryKey(chain_template_id),
    queryContext => getCatalogItemDetail(chain_template_id, queryContext),
    queryOptions
  )

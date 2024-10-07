import { QueryFunctionContext } from '@tanstack/query-core'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { CatalogGetResponse, CatalogGetResponseSchema } from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-catalogget
const path = `/catalog/get`

export const getCatalog = async (
  dropId: string,
  queryContext?: QueryFunctionContext
): Promise<CatalogGetResponse> =>
  post<CatalogGetResponse>(
    buildApiUrl(path, { drop_id: dropId }),
    queryContext,
    CatalogGetResponseSchema
  )

export const catalogQueryKey = (dropId: string) =>
  [path, 'drop_id', dropId] as const

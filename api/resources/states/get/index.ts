import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { StatesResponse, statesResponseSchema } from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

const path = `/states/get`

export const getStates = async (
  countryId: number,
  queryContext?: QueryFunctionContext
): Promise<StatesResponse> =>
  post<StatesResponse>(
    buildApiUrl(path, { country_id: countryId.toString() }),
    queryContext,
    statesResponseSchema
  )

export const statesQueryKey = [path, 'states']

export const useStatesQuery = <U>(
  countryId: number,
  queryOptions?: TypedQueryOptions<StatesResponse, U>
) =>
  useQuery<StatesResponse, ApiError, U>(
    statesQueryKey,
    queryContext => getStates(countryId, queryContext),
    queryOptions
  )

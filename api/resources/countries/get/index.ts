import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { CountriesResponse, countriesResponseSchema } from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TypedQueryOptions } from '@/api/core/query/options'
import { ApiError } from '@/api/core/errors'

const path = `/countries/get`

export const getCountries = async (
  queryContext?: QueryFunctionContext
): Promise<CountriesResponse> =>
  post<CountriesResponse>(
    buildApiUrl(path),
    queryContext,
    countriesResponseSchema
  )

export const countriesQueryKey = [path, 'countries']

export const useCountriesQuery = <U>(
  queryOptions?: TypedQueryOptions<CountriesResponse, U>
) =>
  useQuery<CountriesResponse, ApiError, U>(
    countriesQueryKey,
    queryContext => getCountries(queryContext),
    queryOptions
  )

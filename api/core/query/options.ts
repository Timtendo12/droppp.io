import { UseQueryOptions } from '@tanstack/react-query/src/types'
import { QueryMeta } from '@tanstack/query-core'
import { ApiError, isApiError } from '../errors'
import { NextPageContext } from 'next'
import { HttpStatusCode } from '../http/status'
import { UseInfiniteQueryOptions } from '@tanstack/react-query'

export type TypedQueryOptions<T, U = T> = Omit<
  UseQueryOptions<T, ApiError, U>,
  'queryKey' | 'queryFn'
>

export type TypedInfiniteQueryOptions<T, U = T> = Omit<
  UseInfiniteQueryOptions<T, ApiError, U>,
  'queryKey' | 'queryFn'
>

export interface ServerQueryMeta extends QueryMeta {
  nextPageContext: NextPageContext
}

export const shouldRetryQuery = (
  failureCount: number,
  error: unknown
): boolean => {
  if (!isApiError(error)) return false
  if (error.statusCode === HttpStatusCode.TooManyRequests) return false
  if (error.statusCode === HttpStatusCode.Forbidden) return false
  return failureCount < 2
}

export const serverQueryContext = (
  queryContext,
  nextPageContext: NextPageContext
) => ({
  ...queryContext,
  ...{
    meta: {
      nextPageContext: nextPageContext
    }
  }
})

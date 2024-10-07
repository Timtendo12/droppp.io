import { AxiosRequestConfig } from 'axios'
import { ServerQueryMeta } from '../query/options'
import { QueryMeta } from '@tanstack/query-core'
import { NextPageContext } from 'next'

export interface RequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean
  meta?: ServerQueryMeta | QueryMeta
  queryKey?: unknown[]
}

export const getContextFromRequest = (
  request: RequestConfig
): NextPageContext => {
  const serverQueryMeta = request?.meta as ServerQueryMeta
  return serverQueryMeta?.nextPageContext
}

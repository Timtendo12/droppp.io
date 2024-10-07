import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  UserNewsletterGetResponse,
  userNewsletterResponseSchema
} from './schema'
import { ApiError } from 'next/dist/server/api-utils'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-usernewsletterget
const path = `/user/newsletter/get`

export const getNewsletter = async (
  queryContext?: QueryFunctionContext
): Promise<UserNewsletterGetResponse> =>
  post<UserNewsletterGetResponse>(
    buildApiUrl(path),
    queryContext,
    userNewsletterResponseSchema
  )

export const newsletterKey = () => [path, 'newsletter'] as const

export const useGetNewsletter = () =>
  useQuery<UserNewsletterGetResponse, ApiError>(newsletterKey(), queryContext =>
    getNewsletter(queryContext)
  )

import { MutationOptions, useMutation } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  NewsletterInput,
  UserNewsletterSubscribeResponse,
  userNewsletterResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-usernewslettersubscribe
const path = `/user/newsletter/subscribe`

export const subscribeNewsletter = async (
  input: NewsletterInput,
  mutationOptions?: MutationOptions
): Promise<UserNewsletterSubscribeResponse> =>
  post<UserNewsletterSubscribeResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    userNewsletterResponseSchema
  )

export const useSubscribeNewsletterMutation = (
  mutationOptions?: TypedMutationsOptions<
    UserNewsletterSubscribeResponse,
    NewsletterInput
  >
) =>
  useMutation<UserNewsletterSubscribeResponse, ApiError, NewsletterInput>(
    input => subscribeNewsletter(input),
    mutationOptions
  )

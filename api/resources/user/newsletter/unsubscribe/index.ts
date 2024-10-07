import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  UserNewsletterUnsubscribeResponse,
  userNewsletterResponseSchema
} from './schema'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-usernewsletterunsubscribe
const path = `/user/newsletter/unsubscribe`

export const unsubscribeNewsletter = async (
  mutationOptions?: MutationOptions
): Promise<UserNewsletterUnsubscribeResponse> =>
  post<UserNewsletterUnsubscribeResponse>(
    buildApiUrl(path),
    mutationOptions,
    userNewsletterResponseSchema
  )

export const useUnsubscribeNewsletterMutation = (
  mutationOptions?: TypedMutationsOptions<UserNewsletterUnsubscribeResponse>
) =>
  useMutation<UserNewsletterUnsubscribeResponse, ApiError>(
    () => unsubscribeNewsletter(),
    mutationOptions
  )

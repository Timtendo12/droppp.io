import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  SubscriptionSubscribeInput,
  SubscriptionSubscribeResponse,
  subscriptionSubscribeResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

const path = 'subscription/subscribe'

export const subscriptionSubscribe = async (
  input: SubscriptionSubscribeInput,
  mutationOptions?: MutationOptions
): Promise<SubscriptionSubscribeResponse> =>
  post<SubscriptionSubscribeResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    subscriptionSubscribeResponseSchema
  )

export const useSubscriptionSubscribeMutation = (
  mutationOptions?: TypedMutationsOptions<
    SubscriptionSubscribeResponse,
    SubscriptionSubscribeInput
  >
) =>
  useMutation<
    SubscriptionSubscribeResponse,
    ApiError,
    SubscriptionSubscribeInput
  >(params => subscriptionSubscribe(params), mutationOptions)

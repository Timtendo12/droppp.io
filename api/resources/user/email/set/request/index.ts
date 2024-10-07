import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  UserEmailSetRequestInput,
  UserEmailSetRequestResponse,
  userEmailSetRequestResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

const path = 'user/email/set/request'

export const userEmailSetRequest = async (
  input: UserEmailSetRequestInput,
  mutationOptions?: MutationOptions
): Promise<UserEmailSetRequestResponse> =>
  post<UserEmailSetRequestResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    userEmailSetRequestResponseSchema
  )

export const useUserEmailSetRequestMutation = (
  mutationOptions?: TypedMutationsOptions<
    UserEmailSetRequestResponse,
    UserEmailSetRequestInput
  >
) =>
  useMutation<UserEmailSetRequestResponse, ApiError, UserEmailSetRequestInput>(
    params => userEmailSetRequest(params),
    mutationOptions
  )

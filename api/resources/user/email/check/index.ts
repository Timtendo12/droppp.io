import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  UserEmailCheckInput,
  UserEmailCheckResponse,
  userEmailCheckResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

const path = 'user/email/check'

export const userEmailCheck = async (
  input: UserEmailCheckInput,
  mutationOptions?: MutationOptions
): Promise<UserEmailCheckResponse> =>
  post<UserEmailCheckResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    userEmailCheckResponseSchema
  )

export const useUserEmailCheckMutation = (
  mutationOptions?: TypedMutationsOptions<
    UserEmailCheckResponse,
    UserEmailCheckInput
  >
) =>
  useMutation<UserEmailCheckResponse, ApiError, UserEmailCheckInput>(
    params => userEmailCheck(params),
    mutationOptions
  )

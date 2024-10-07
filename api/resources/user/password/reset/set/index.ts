import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  UserPasswordResetInput,
  UserPasswordResetResponse,
  userPasswordResetResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

const path = 'user/password/reset/set'

export const userPasswordReset = async (
  input: UserPasswordResetInput,
  mutationOptions?: MutationOptions
): Promise<UserPasswordResetResponse> =>
  post<UserPasswordResetResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    userPasswordResetResponseSchema
  )

export const useUserPasswordResetMutation = (
  mutationOptions?: TypedMutationsOptions<
    UserPasswordResetResponse,
    UserPasswordResetInput
  >
) =>
  useMutation<UserPasswordResetResponse, ApiError, UserPasswordResetInput>(
    params => userPasswordReset(params),
    mutationOptions
  )

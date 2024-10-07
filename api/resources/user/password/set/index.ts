import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  UserPasswordSetInput,
  UserPasswordSetResponse,
  userPasswordSetResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

const path = 'user/password/set'

export const userPasswordSet = async (
  input: UserPasswordSetInput,
  mutationOptions?: MutationOptions
): Promise<UserPasswordSetResponse> =>
  post<UserPasswordSetResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    userPasswordSetResponseSchema
  )

export const useUserPasswordSetMutation = (
  mutationOptions?: TypedMutationsOptions<
    UserPasswordSetResponse,
    UserPasswordSetInput
  >
) =>
  useMutation<UserPasswordSetResponse, ApiError, UserPasswordSetInput>(
    params => userPasswordSet(params),
    mutationOptions
  )

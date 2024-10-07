import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  UserPasswordSendInput,
  UserPasswordSendResponse,
  userPasswordSendResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

const path = 'user/password/reset/send'

export const userPasswordSend = async (
  input: UserPasswordSendInput,
  mutationOptions?: MutationOptions
): Promise<UserPasswordSendResponse> =>
  post<UserPasswordSendResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    userPasswordSendResponseSchema
  )

export const useUserPasswordSendMutation = (
  mutationOptions?: TypedMutationsOptions<
    UserPasswordSendResponse,
    UserPasswordSendInput
  >
) =>
  useMutation<UserPasswordSendResponse, ApiError, UserPasswordSendInput>(
    params => userPasswordSend(params),
    mutationOptions
  )

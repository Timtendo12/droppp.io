import { MutationOptions, useMutation } from '@tanstack/react-query'
import {
  UserSupportAuthInput,
  UserSupportAuthResponse,
  userSupportAuthResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-usersupportauth
const path = 'user/support/auth'

export const userSupportAuth = async (
  token: string,
  { code }: UserSupportAuthInput,
  mutationOptions?: MutationOptions
): Promise<UserSupportAuthResponse> => {
  const apiUrl = buildApiUrl(path, { token, code })

  return post<UserSupportAuthResponse>(
    apiUrl,
    mutationOptions,
    userSupportAuthResponseSchema
  )
}

export const useUserSupportAuthMutation = (
  token: string,
  mutationOptions?: TypedMutationsOptions<
    UserSupportAuthResponse,
    UserSupportAuthInput
  >
) =>
  useMutation<UserSupportAuthResponse, ApiError, UserSupportAuthInput>(
    params => userSupportAuth(token, params),
    mutationOptions
  )

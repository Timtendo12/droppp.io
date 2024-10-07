import { MutationOptions, useMutation } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  EmailVerifySendResponse,
  emailVerifySendResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-useremailverifysend
const path = 'user/email/verify/send'

export const emailVerifySend = async (
  mutationOptions?: MutationOptions
): Promise<EmailVerifySendResponse> =>
  post<EmailVerifySendResponse>(
    buildApiUrl(path),
    mutationOptions,
    emailVerifySendResponseSchema
  )

export const useEmailVerifySendMutation = (
  mutationOptions?: TypedMutationsOptions<EmailVerifySendResponse>
) =>
  useMutation<EmailVerifySendResponse, ApiError>(
    () => emailVerifySend(),
    mutationOptions
  )

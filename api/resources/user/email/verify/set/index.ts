import { MutationOptions, useMutation } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  EmailVerifySetInput,
  EmailVerifySetResponse,
  emailVerifySetResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-useremailverifyset
const path = 'user/email/verify/set'

export const emailVerifySet = async (
  input: EmailVerifySetInput,
  mutationOptions?: MutationOptions
): Promise<EmailVerifySetResponse> =>
  post<EmailVerifySetResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    emailVerifySetResponseSchema
  )

export const useEmailVerifySetMutation = (
  mutationOptions?: TypedMutationsOptions<
    EmailVerifySetResponse,
    EmailVerifySetInput
  >
) =>
  useMutation<EmailVerifySetResponse, ApiError, EmailVerifySetInput>(
    params => emailVerifySet(params),
    mutationOptions
  )

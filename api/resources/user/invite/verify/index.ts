import {
  InviteInput,
  InviteVerifyResponse,
  inviteVerifyResponseSchema
} from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userinviteverify
const path = '/user/invite/verify'

export const inviteVerify = async (
  input: InviteInput,
  mutationOptions?: MutationOptions
): Promise<InviteVerifyResponse> =>
  post<InviteVerifyResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    inviteVerifyResponseSchema
  )

export const useInviteVerifyMutation = (
  mutationOptions?: TypedMutationsOptions<InviteVerifyResponse, InviteInput>
) =>
  useMutation<InviteVerifyResponse, ApiError, InviteInput>(
    input => inviteVerify(input),
    mutationOptions
  )

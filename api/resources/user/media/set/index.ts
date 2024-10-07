import {
  MutationObserverOptions,
  QueryFunctionContext,
  useMutation
} from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  UserMedia,
  UserMediaSetResponse,
  userMediaSetResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-usermediaset
const path = `/user/media/set`

export const setUserMedia = async (
  input: UserMedia,
  queryContext?: QueryFunctionContext
): Promise<UserMediaSetResponse> =>
  post<UserMediaSetResponse>(
    buildApiUrl(path, input),
    queryContext,
    userMediaSetResponseSchema
  )

export const useSetUserMediaMutation = (
  input: UserMedia,
  mutationOptions?: MutationObserverOptions
) =>
  useMutation<UserMediaSetResponse, ApiError>(
    () => setUserMedia(input),
    mutationOptions
  )

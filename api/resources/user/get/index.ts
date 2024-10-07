import { QueryFunctionContext } from '@tanstack/query-core'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { UserGetResponse, userGetResponseSchema } from './schema'
import { AuthInput } from '@/api/resources/shared/auth'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userget
const path = '/user/get'

export const getCurrentUser = async (
  input?: AuthInput,
  queryContext?: QueryFunctionContext
): Promise<UserGetResponse> =>
  post<UserGetResponse>(
    buildApiUrl(path, input),
    queryContext,
    userGetResponseSchema
  )

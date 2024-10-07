import { QueryFunctionContext } from '@tanstack/query-core'
import post from '../../../../core/http/post'
import { buildApiUrl } from '../../../../core/url'
import { User2FAConfigResponse, user2FAConfigResponseSchema } from './schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-user2faconfig-wip
const path = 'user/2fa/config'

export const user2FAConfig = async (
  queryContext?: QueryFunctionContext
): Promise<User2FAConfigResponse> => {
  const apiUrl = buildApiUrl(path)

  return post<User2FAConfigResponse>(
    apiUrl,
    queryContext,
    user2FAConfigResponseSchema
  )
}

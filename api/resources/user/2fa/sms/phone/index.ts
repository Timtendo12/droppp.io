import { QueryFunctionContext } from '@tanstack/query-core'
import post from '../../../../../core/http/post'
import { buildApiUrl } from '../../../../../core/url'
import { Setup2faSMSResponse, setup2faSMSResponseSchema } from './schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-user2fasmsphone-wip
const path = 'user/2fa/sms/phone'

export const setup2faSMS = async (
  phone: string,
  queryContext?: QueryFunctionContext
): Promise<Setup2faSMSResponse> => {
  const apiUrl = buildApiUrl(path, { phone })

  return post<Setup2faSMSResponse>(
    apiUrl,
    queryContext,
    setup2faSMSResponseSchema
  )
}

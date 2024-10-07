import { QueryFunctionContext } from '@tanstack/query-core'
import post from '../../../../../core/http/post'
import { buildApiUrl } from '../../../../../core/url'
import {
  Setup2faSMSSendResponse,
  setup2faSMSSendResponseSchema
} from './schema'
import { TwoFAAction } from '@/api/resources/shared/twoFA'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-user2fasmssend-wip
const path = 'user/2fa/sms/send'

export const setup2faSMSSend = async (
  action: TwoFAAction,
  queryContext?: QueryFunctionContext
): Promise<Setup2faSMSSendResponse> => {
  const apiUrl = buildApiUrl(path, { action })

  return post<Setup2faSMSSendResponse>(
    apiUrl,
    queryContext,
    setup2faSMSSendResponseSchema
  )
}

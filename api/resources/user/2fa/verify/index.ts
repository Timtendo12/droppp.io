import { QueryFunctionContext } from '@tanstack/query-core'
import post from '../../../../core/http/post'
import { buildApiUrl } from '../../../../core/url'
import {
  Setup2faVerifyCodeResponse,
  setup2faVerifyCodeResponseSchema
} from './schema'
import { TwoFAAction } from '@/api/resources/shared/twoFA'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-user2faverify-wip
const path = 'user/2fa/verify'

export const setup2faVerifyCode = async (
  code: string,
  action: TwoFAAction,
  queryContext?: QueryFunctionContext
): Promise<Setup2faVerifyCodeResponse> => {
  const apiUrl = buildApiUrl(path, { code, action })

  return post<Setup2faVerifyCodeResponse>(
    apiUrl,
    queryContext,
    setup2faVerifyCodeResponseSchema
  )
}

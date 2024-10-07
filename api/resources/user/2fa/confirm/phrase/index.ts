import { QueryFunctionContext } from '@tanstack/query-core'
import post from '../../../../../core/http/post'
import { buildApiUrl } from '../../../../../core/url'
import {
  Setup2faConfirmPhraseResponse,
  setup2faConfirmPhraseResponseSchema
} from './schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-user2faconfirmphrase-wip
const path = 'user/2fa/confirm/phrase'

export const setup2faConfirmPhrase = async (
  phrase: string,
  queryContext?: QueryFunctionContext
): Promise<Setup2faConfirmPhraseResponse> => {
  const apiUrl = buildApiUrl(path, { phrase })

  return post<Setup2faConfirmPhraseResponse>(
    apiUrl,
    queryContext,
    setup2faConfirmPhraseResponseSchema
  )
}

import { TransferCheckResponse, transferCheckResponseSchema } from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userassetstransfercheck
const path = '/user/assets/transfer/check'

export const checkTransfer = async (
  to: string
): Promise<TransferCheckResponse> =>
  post<TransferCheckResponse>(
    buildApiUrl(path, { to }),
    {},
    transferCheckResponseSchema
  )

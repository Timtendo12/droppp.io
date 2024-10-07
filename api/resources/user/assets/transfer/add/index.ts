import {
  TransferAddResponse,
  transferAddResponseSchema,
  TransferInput
} from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userassetstransferadd
const path = '/user/assets/transfer/add'

export const addTransfer = async (
  input: TransferInput
): Promise<TransferAddResponse> =>
  post<TransferAddResponse>(
    buildApiUrl(path, input),
    {},
    transferAddResponseSchema
  )

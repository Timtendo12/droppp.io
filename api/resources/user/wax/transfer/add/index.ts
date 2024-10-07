import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { TransferWaxInput, TransferWaxResponse } from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userwaxtransferadd
const path = '/user/wax/transfer/add'

export const transferWax = async (
  input: TransferWaxInput
): Promise<TransferWaxResponse> =>
  post<TransferWaxResponse>(buildApiUrl(path, input))

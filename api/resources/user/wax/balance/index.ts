import { WaxBalanceGetResponse } from './schema'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userwaxbalance
const path = '/user/wax/balance'

export const getWaxBalance = async (
  account: string
): Promise<WaxBalanceGetResponse> =>
  post<WaxBalanceGetResponse>(
    buildApiUrl(path, {
      account
    })
  )

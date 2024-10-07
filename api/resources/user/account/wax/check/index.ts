import { MutationOptions } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  CheckWaxAddressResponse,
  checkWaxAddressResponseSchema
} from './schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-useraccountwaxcheck
const path = '/user/account/wax/check'

export const checkWaxAddress = async (
  account: string,
  mutationOptions?: MutationOptions
): Promise<CheckWaxAddressResponse> =>
  post<CheckWaxAddressResponse>(
    buildApiUrl(path, { account }),
    mutationOptions,
    checkWaxAddressResponseSchema
  )

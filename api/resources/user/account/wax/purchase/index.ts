import { MutationOptions } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { PurchaseWaxAddressInput } from './schema'
import {
  PurchaseResponse,
  purchaseResponseSchema
} from '@/api/resources/shared/purchase'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-useraccountwaxpurchase
const path = '/user/account/wax/purchase'

export const purchaseWaxAddress = async (
  input: PurchaseWaxAddressInput,
  mutationOptions?: MutationOptions
): Promise<PurchaseResponse> =>
  post<PurchaseResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    purchaseResponseSchema
  )

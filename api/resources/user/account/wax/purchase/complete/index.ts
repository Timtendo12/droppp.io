import { MutationOptions } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { CompleteWaxAddressPurchaseInput } from './schema'
import {
  completedPurchaseResponseSchema,
  CompletedPurchaseResponse
} from '@/api/resources/shared/purchase'

const path = '/user/account/wax/purchase/complete'

export const completeWaxAddressPurchase = async (
  input: CompleteWaxAddressPurchaseInput,
  mutationOptions?: MutationOptions
): Promise<CompletedPurchaseResponse> =>
  post<CompletedPurchaseResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    completedPurchaseResponseSchema
  )

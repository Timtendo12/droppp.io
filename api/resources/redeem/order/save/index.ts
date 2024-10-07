import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  RedeemOrderGetRequest,
  RedeemOrderGetResponse,
  redeemOrderGetResponseSchema
} from './schema'
import { MutationObserverOptions, useMutation } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-redeemordersave
export const path = `/redeem/order/save`

export const saveRedeemOrder = async (
  input: RedeemOrderGetRequest,
  mutationOptions?: MutationObserverOptions
): Promise<RedeemOrderGetResponse> => {
  return post<RedeemOrderGetResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    redeemOrderGetResponseSchema
  )
}

export const useSaveRedeemOrderMutation = (
  mutationOptions?: TypedMutationsOptions<
    RedeemOrderGetResponse,
    RedeemOrderGetRequest
  >
) => {
  return useMutation<RedeemOrderGetResponse, ApiError, RedeemOrderGetRequest>(
    params => saveRedeemOrder(params),
    mutationOptions
  )
}

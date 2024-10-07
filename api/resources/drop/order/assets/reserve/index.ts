import { MutationOptions, useMutation } from '@tanstack/react-query'
import { User } from '@/api/resources/shared/user'
import {
  ReserveDropOrderAssetsInput,
  ReserveDropOrderAssetsResponse,
  reserveDropOrderAssetsResponseSchema
} from './schema'
import { buildApiUrl } from '@/api/core/url'
import { getCSRF } from '@/util'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-droporderassetsreserve
const path = 'drop/order/assets/reserve'

export const reserveDropOrderAssets = async (
  user: User,
  input: ReserveDropOrderAssetsInput,
  mutationOptions?: MutationOptions
): Promise<ReserveDropOrderAssetsResponse> => {
  const apiUrl = buildApiUrl(path, input)

  getCSRF(user, apiUrl.params)

  return post<ReserveDropOrderAssetsResponse>(
    apiUrl,
    mutationOptions,
    reserveDropOrderAssetsResponseSchema
  )
}

export const useReserveDropOrderAssetsMutation = (
  user: User,
  mutationOptions?: TypedMutationsOptions<
    ReserveDropOrderAssetsResponse,
    ReserveDropOrderAssetsInput
  >
) =>
  useMutation<
    ReserveDropOrderAssetsResponse,
    ApiError,
    ReserveDropOrderAssetsInput
  >(params => reserveDropOrderAssets(user, params), mutationOptions)

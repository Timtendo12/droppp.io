import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  ListingAddInput,
  ListingAddResponse,
  listingAddResponseSchema
} from './schema'
import { TypedMutationsOptions } from '@/api/core/mutation/options'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingadd
const path = `/user/listing/add`

export const addListing = async (
  assetId: number,
  { price }: ListingAddInput
): Promise<ListingAddResponse> =>
  post<ListingAddResponse>(
    buildApiUrl(path, {
      chain_asset_ids: assetId.toString(),
      prices: price.toString()
    }),
    {},
    listingAddResponseSchema
  )

export const useAddListingMutation = (
  assetId: number,
  mutationOptions?: TypedMutationsOptions<ListingAddResponse, ListingAddInput>
) => {
  return useMutation<ListingAddResponse, ApiError, ListingAddInput>(
    params => addListing(assetId, params),
    mutationOptions
  )
}

import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { ListingEditResponse, listingEditResponseSchema } from './schema'
import { TypedMutationsOptions } from '@/api/core/mutation/options'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import { ListingAddInput } from '../add/schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingedit
const path = `/user/listing/edit`

export const editListing = async (
  listing_id: number,
  { price }: ListingAddInput
): Promise<ListingEditResponse> =>
  post<ListingEditResponse>(
    buildApiUrl(path, {
      listing_ids: listing_id.toString(),
      prices: price.toString()
    }),
    {},
    listingEditResponseSchema
  )

export const useEditListingMutation = (
  listing_id: number,
  mutationOptions?: TypedMutationsOptions<ListingEditResponse, ListingAddInput>
) => {
  return useMutation<ListingEditResponse, ApiError, ListingAddInput>(
    params => editListing(listing_id, params),
    mutationOptions
  )
}

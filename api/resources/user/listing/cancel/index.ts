import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { ListingCancelResponse, listingCancelResponseSchema } from './schema'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingedit
const path = `/user/listing/cancel`

export const cancelListing = async (
  listing_id: number
): Promise<ListingCancelResponse> =>
  post<ListingCancelResponse>(
    buildApiUrl(path, {
      listing_ids: listing_id.toString()
    }),
    {},
    listingCancelResponseSchema
  )

export const useCancelListingMutation = (
  listing_id: number,
  mutationOptions: {}
) => {
  return useMutation<ListingCancelResponse, ApiError>(
    () => cancelListing(listing_id),
    mutationOptions
  )
}

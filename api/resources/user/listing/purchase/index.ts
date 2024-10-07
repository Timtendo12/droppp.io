import { ApiError } from '@/api/core/errors'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  ListingPurchaseResponse,
  listingPurchaseResponseSchema
} from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingpurchase
const path = `/user/listing/purchase`

export const purchaseListing = async (
  reservation_id: string
): Promise<ListingPurchaseResponse> =>
  post<ListingPurchaseResponse>(
    buildApiUrl(path, { reservation_id }),
    {},
    listingPurchaseResponseSchema
  )

export const usePurchaseListingMutation = (
  reservation_id: string,
  mutationOptions?: MutationOptions
) => {
  return useMutation<ListingPurchaseResponse, ApiError>(
    () => purchaseListing(reservation_id),
    mutationOptions
  )
}

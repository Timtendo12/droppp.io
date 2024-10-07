import { useMutation } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import {
  ReservedListingResponse,
  reservedListingResponseSchema
} from '@/api/resources/shared/listingReserve/response'
import { ReserveLowestListingInput } from './schema'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingreservelowest
const path = `user/listing/reserve/lowest`

export const reserveLowestListing = async (
  input: ReserveLowestListingInput,
  mutationOptions?: TypedMutationsOptions<
    ReservedListingResponse,
    ReserveLowestListingInput
  >
): Promise<ReservedListingResponse> =>
  post<ReservedListingResponse>(
    buildApiUrl(path, input),
    mutationOptions,
    reservedListingResponseSchema
  )

export const useReserveLowestListingMutation = (
  mutationOptions?: TypedMutationsOptions<
    ReservedListingResponse,
    ReserveLowestListingInput
  >
) =>
  useMutation<ReservedListingResponse, ApiError, ReserveLowestListingInput>(
    input => reserveLowestListing(input, mutationOptions),
    mutationOptions
  )

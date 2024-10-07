import { useMutation } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import {
  ReservedListingResponse,
  reservedListingResponseSchema
} from '@/api/resources/shared/listingReserve/response'
import { TypedMutationsOptions } from '@/api/core/mutation/options'
import { ReserveListingInput } from './schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingreserve
const path = `user/listing/reserve`

export const reserveListing = async (
  input: ReserveListingInput,
  mutationOptions?: TypedMutationsOptions<
    ReservedListingResponse,
    ReserveListingInput
  >
): Promise<ReservedListingResponse> =>
  post(buildApiUrl(path, input), mutationOptions, reservedListingResponseSchema)

export const useReserveListingMutation = (
  mutationOptions?: TypedMutationsOptions<
    ReservedListingResponse,
    ReserveListingInput
  >
) =>
  useMutation<ReservedListingResponse, ApiError, ReserveListingInput>(
    input => reserveListing(input, mutationOptions),
    mutationOptions
  )

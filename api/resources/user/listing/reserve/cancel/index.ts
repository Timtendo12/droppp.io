import { MutationOptions, useMutation } from '@tanstack/react-query'
import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import { ApiError } from '@/api/core/errors'
import {
  CancelReservationResponse,
  cancelReservationResponseSchema
} from './schema'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlistingreservecancel
const path = `user/listing/reserve/cancel`

export const cancelReservation = async (
  reservationId: string,
  mutationOptions?: MutationOptions
): Promise<CancelReservationResponse> =>
  post<CancelReservationResponse>(
    buildApiUrl(path, {
      reservation_id: reservationId
    }),
    mutationOptions,
    cancelReservationResponseSchema
  )

export const useCancelReservationMutation = (
  reservationId: string,
  mutationOptions?: MutationOptions
) => {
  return useMutation<CancelReservationResponse, ApiError>(
    () => cancelReservation(reservationId),
    mutationOptions
  )
}

import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const checkWaxAddressResponseSchema = successResponseSchema

export type CheckWaxAddressResponse = z.infer<
  typeof checkWaxAddressResponseSchema
>

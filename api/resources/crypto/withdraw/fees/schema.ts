import { z } from 'zod'
import { networkTypeSchema } from '@/api/resources/shared/crypto'

const cryptoFeesSchema = z.record(
  z
    .string()
    .transform(s => s.toUpperCase())
    .refine(
      val => {
        try {
          networkTypeSchema.parse(val)
          return true
        } catch {
          return false
        }
      },
      { message: 'Invalid network type' }
    ),
  z.number()
)

export const cryptoFeesResponseSchema = cryptoFeesSchema

export type CryptoFees = z.infer<typeof cryptoFeesSchema>
export type CryptoFeesResponse = z.infer<typeof cryptoFeesResponseSchema>

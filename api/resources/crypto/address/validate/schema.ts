import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { networkTypeSchema } from '@/api/resources/shared/crypto'

export const validateCryptoAddressInputSchema = z.object({
  address: z.string(),
  chain: z.string()
})

export const cryptoAddressSchema = z.object({
  address: z.string(),
  chain: networkTypeSchema,
  valid: z.boolean(),
  error: z.string().optional()
})

export const validateCryptoAddressResponseSchema =
  successResponseSchema.merge(cryptoAddressSchema)

export type CryptoAddress = z.infer<typeof cryptoAddressSchema>

export type ValidateCryptoAddressResponse = z.infer<
  typeof validateCryptoAddressResponseSchema
>

export type ValidateCryptoAddressInput = z.infer<
  typeof validateCryptoAddressInputSchema
>

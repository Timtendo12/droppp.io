import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { networkTypeSchema } from '@/api/resources/shared/crypto'

export const walletAddressGetInputSchema = z.object({
  chain: networkTypeSchema
})

export const walletAddressSchema = z.object({
  chain: z.string(),
  address: z.string(),
  currency: z.string()
})

export const walletAddressGetResponseSchema = successResponseSchema.extend({
  details: walletAddressSchema,
  image: z.string()
})

export type WalletAddress = z.infer<typeof walletAddressSchema>

export type WalletAddressGetInput = z.infer<typeof walletAddressGetInputSchema>
export type WalletAddressGetResponse = z.infer<
  typeof walletAddressGetResponseSchema
>

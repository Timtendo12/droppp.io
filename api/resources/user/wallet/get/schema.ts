import { z } from 'zod'
import { kycFlagsSchema } from '@/api/resources/shared/account'
// turn on once BE pushed up a fix
// import { successResponseSchema } from '@/api/resources/shared/success'

export const walletSchema = z
  .object({
    balance: z.number(),
    has_deposited: z.boolean(),
    minimum_met: z.boolean(),
    verify_id_prompted: z.boolean(),
    withdraw_fee: z.number()
  })
  .merge(kycFlagsSchema)

export const walletGetResponseSchema = walletSchema

// turn on once BE pushed up a fix
// export const walletGetResponseSchema = successResponseSchema.extend({
//   wallet: walletSchema
// })

export type Wallet = z.infer<typeof walletSchema>
export type WalletGetResponse = z.infer<typeof walletGetResponseSchema>

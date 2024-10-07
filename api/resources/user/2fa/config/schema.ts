import { z } from 'zod'
import { successResponseSchema } from '../../../shared/success'

const twofaConfigSchema = z.object({
  token: z.string(),
  image: z.string()
})

export const user2FAConfigResponseSchema =
  successResponseSchema.merge(twofaConfigSchema)

export type User2FAConfigResponse = z.infer<typeof user2FAConfigResponseSchema>

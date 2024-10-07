import { z } from 'zod'

export const tokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.literal('bearer'),
  expires_in: z.number(),
  refresh_token_expires_in: z.number(),
  scope: z.string().nullable()
})

export type Token = z.infer<typeof tokenSchema>

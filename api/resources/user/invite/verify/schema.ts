import { z } from 'zod'

const inviteInputSchema = z.object({
  code: z.string()
})

export const inviteVerifyResponseSchema = z.object({
  code: z.string(),
  status: z.number()
})

export type InviteInput = z.infer<typeof inviteInputSchema>

export type InviteVerifyResponse = z.infer<typeof inviteVerifyResponseSchema>

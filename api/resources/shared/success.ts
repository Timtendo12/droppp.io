import { z } from 'zod'

export const successResponseSchema = z.object({
  status: z.literal('ok')
})

import { z } from 'zod'

export const userMediaSchema = z.object({
  id: z.number(),
  type: z.string(),
  size0_url: z.string(),
  size1_url: z.string(),
  size2_url: z.string(),
  size3_url: z.string(),
  size4_url: z.string()
})

export type UserMediaItem = z.infer<typeof userMediaSchema>

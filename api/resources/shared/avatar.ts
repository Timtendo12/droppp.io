import { z } from 'zod'

export const avatarMediaSchema = z.object({
  id: z.number(),
  size0_url: z.string(),
  size1_url: z.string(),
  size2_url: z.string(),
  size3_url: z.string(),
  size4_url: z.string()
})

export type AvatarMedia = z.infer<typeof avatarMediaSchema>

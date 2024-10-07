import { z } from 'zod'

export const profileMediaSchema = z.object({
  id: z.number(),
  size0_url: z.string(),
  size1_url: z.string(),
  size2_url: z.string(),
  size3_url: z.string(),
  size4_url: z.string()
})

export const profileGetResponseSchema = z.object({
  account: z.string(),
  join_date: z.string(),
  chain_url: z.string(),
  is_owner: z.boolean(),
  kyc_completed: z.boolean(),
  media: z.object({
    avatar_media: profileMediaSchema,
    sticker_media: profileMediaSchema.nullable()
    // banner_media: ???
  }),

  stat: z.object({
    user: z.object({
      mythic: z.number().optional(),
      grail: z.number().optional(),
      legendary: z.number().optional(),
      ultra: z.number().optional(),
      redeemed: z.number().optional(),
      royalty_set: z.number().optional()
    })
  })
})

export type ProfileGetResponse = z.infer<typeof profileGetResponseSchema>

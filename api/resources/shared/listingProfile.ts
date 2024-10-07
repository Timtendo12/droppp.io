import { z } from 'zod'
import { avatarMediaSchema } from '@/api/resources/shared/avatar'

export const listingProfileSchema = z.object({
  name: z.string(),
  media: z.object({
    avatar_media: avatarMediaSchema
  })
})

export type ListingProfile = z.infer<typeof listingProfileSchema>

import { z } from 'zod'
import { listingSchema } from '../listing'
import { avatarMediaSchema } from '../avatar'

export const reserveListingSellerMediaSchema = z.object({
  avatar_media: avatarMediaSchema,
  banner_media: z.string().nullable()
})

export const reserveListingSellerSchema = z.object({
  media: reserveListingSellerMediaSchema,
  seller_account_wax: z.string()
})

export const reserveListingSchema = z.object({
  reservation_id: z.string(),
  listing_id: z.number(),
  timeout: z.number(),
  max_timeout: z.number(),
  physical_redemption_eligible: z.boolean().optional(),
  listing: listingSchema,
  seller_user_id: z.number().optional(),
  seller: reserveListingSellerSchema
})

export type ReservedListingSellerMedia = z.infer<
  typeof reserveListingSellerMediaSchema
>
export type ReservedListingSeller = z.infer<typeof reserveListingSellerSchema>
export type ReservedListing = z.infer<typeof reserveListingSchema>

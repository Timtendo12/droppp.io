import { z } from 'zod'
import { avatarMediaSchema } from './avatar'

// @fix - https://app.asana.com/0/1202989033368709/1204919255420342/f - Josh Dobson - 6/27/23

export const userSchema = z.object({
  email: z.string(),
  email_verified: z.boolean(),
  phone_verified: z.boolean(),
  verified: z.boolean(),
  oauth_provider: z.string().nullable(),
  account_wax: z.string().nullable(),
  account_wax_created: z.string().nullable(),
  account_wax_chain_url: z.string().optional().nullable(),
  account_wax_free: z.string().nullable(),
  account_wax_free_created: z.string().nullable(),
  account_wax_free_chain_url: z.string().optional().nullable(),
  email_relay: z.boolean(),
  mfa_type: z.string().optional().nullable(),
  avatar_media: z.optional(avatarMediaSchema),
  banner_media: z.string().optional().nullable(),
  csrf: z.string().optional(),
  challenge: z.string().optional(),
  credit: z.number().optional(),
  mfa_phone_last4: z.string().optional(),
  is_new_user: z.boolean().optional(),
  uid: z.string()
})

export type User = z.infer<typeof userSchema>

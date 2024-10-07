import { z } from 'zod'
import { tokenSchema } from '../shared/token'
import { userSchema } from '../shared/user'

export const notifySchema = z.object({
  redeem_count: z.number(),
  prompt_subscribe: z.boolean()
})

export const kycFlagsSchema = z.object({
  // This has been removed from the codebase because the backend has deprecated this flag
  // and suggest that we only use the four flags below to derive kyc status.
  // kyc_required: z.boolean(),
  kyc_started: z.boolean(),
  kyc_pending: z.boolean(),
  kyc_completed: z.boolean(),
  kyc_failed: z.boolean()
})

export const accountSchema = z
  .object({
    token: tokenSchema,
    user: userSchema,
    wallet_balance: z.number(),
    redirect_uri: z.string().optional().nullable(),
    mfa_required: z.boolean().optional(),
    email_code_required: z.boolean().optional(),
    captcha_enabled: z.boolean(),
    notify: notifySchema,
    prefs: z.unknown(),
    promo_start: z.string().optional(),
    promo_end: z.string().optional()
  })
  .merge(kycFlagsSchema)

export type Notifications = z.infer<typeof notifySchema>
export type KycFlags = z.infer<typeof kycFlagsSchema>
export type Account = z.infer<typeof accountSchema>

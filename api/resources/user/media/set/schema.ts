import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const userMediaSchema = z.object({
  media_type: z.string(),
  media_id: z.number()
})

export const userMediaSetResponseSchema = successResponseSchema

export type UserMedia = z.infer<typeof userMediaSchema>
export type UserMediaSetResponse = z.infer<typeof userMediaSetResponseSchema>

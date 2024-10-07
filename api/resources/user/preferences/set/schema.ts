import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const userPreferencesSchema = z.object({
  animation: z.boolean().optional(),
  subscribe_prompted: z.boolean().optional(),
  verify_id_prompted: z.boolean().optional()
})

export const userPreferencesSetResponseSchema = successResponseSchema

export type UserPreferences = z.infer<typeof userPreferencesSchema>
export type UserPreferencesSetResponse = z.infer<
  typeof userPreferencesSetResponseSchema
>

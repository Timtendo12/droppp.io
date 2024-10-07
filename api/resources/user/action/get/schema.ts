import { z } from 'zod'
import { actionDetailSchema } from '@/api/resources/shared/action'
import { successResponseSchema } from '@/api/resources/shared/success'

export const userActionSchema = actionDetailSchema

export const userActionResponseSchema = successResponseSchema.extend({
  action: userActionSchema
})

export type UserActionResponse = z.infer<typeof userActionResponseSchema>
export type UserAction = z.infer<typeof userActionSchema>

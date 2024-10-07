import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const stateSchema = z.object({
  id: z.number(),
  country_id: z.number(),
  name: z.string(),
  marketplace_restriction: z.boolean(),
  marketplace_restriction_reason: z.string().nullable()
})

export const statesResponseSchema = successResponseSchema.extend({
  states: z.array(stateSchema)
})

export type State = z.infer<typeof stateSchema>
export type StatesResponse = z.infer<typeof statesResponseSchema>

import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const legalConsumerRightsInputSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
  country: z.string(),
  state: z.string(),
  wax_account: z.string(),
  request_type: z.string(),
  request_affiliation: z.string(),
  agent_first_name: z.string().optional(),
  agent_last_name: z.string().optional(),
  agent_email: z.string().optional()
})

export const legalConsumerRightsSchema = successResponseSchema.extend({
  id: z.number(),
  msg: z.string()
})

export type LegalConsumerRightsInput = z.infer<
  typeof legalConsumerRightsInputSchema
>

export type LegalConsumerRightsResponse = z.infer<
  typeof legalConsumerRightsSchema
>

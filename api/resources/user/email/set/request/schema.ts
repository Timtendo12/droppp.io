import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const userEmailSetRequestInputSchema = z.object({
  email: z.string(),
  password: z.string()
})

export const userEmailSetRequestResponseSchema = successResponseSchema

export type UserEmailSetRequestInput = z.infer<
  typeof userEmailSetRequestInputSchema
>

export type UserEmailSetRequestResponse = z.infer<
  typeof userEmailSetRequestResponseSchema
>

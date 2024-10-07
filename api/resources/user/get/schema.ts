import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { accountSchema } from '@/api/resources/shared/account'

export const userGetResponseSchema = successResponseSchema.merge(accountSchema)

export type UserGetResponse = z.infer<typeof userGetResponseSchema>

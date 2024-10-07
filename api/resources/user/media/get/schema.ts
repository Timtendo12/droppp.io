import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { userMediaSchema } from '@/api/resources/shared/userMedia'

export const userMediaResponseSchema = successResponseSchema.extend({
  data: z.array(userMediaSchema),
  more: z.boolean()
})

export type UserMediaResponse = z.infer<typeof userMediaResponseSchema>

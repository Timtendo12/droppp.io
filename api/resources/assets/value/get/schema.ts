import { successResponseSchema } from '@/api/resources/shared/success'
import { z } from 'zod'

export const assetsValueResponseSchema = successResponseSchema.extend({
  inventory_value: z.number()
})

export type AssetsValueResponse = z.infer<typeof assetsValueResponseSchema>

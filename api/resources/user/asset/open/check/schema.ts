import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const checkAssetStatusResponseSchema = successResponseSchema.extend({
  opened: z.boolean()
})

export type CheckAssetStatusResponse = z.infer<
  typeof checkAssetStatusResponseSchema
>

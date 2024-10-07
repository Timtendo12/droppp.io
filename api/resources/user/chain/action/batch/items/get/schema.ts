import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { mediaItemSchema } from '@/api/resources/shared/media'

export const batchSchema = z.object({
  media: z.array(mediaItemSchema),
  mint_num: z.number(),
  name: z.string(),
  redeemable: z.boolean()
})

export const batchGetResponseSchema = successResponseSchema.extend({
  items: z.array(batchSchema)
})

export type BatchGetResponse = z.infer<typeof batchGetResponseSchema>

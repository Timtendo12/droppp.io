import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { orderReservationsDropSchema } from '../../shared/drop'

export const dropGetResponseSchema = successResponseSchema.extend({
  drop: z.object({
    assets: z.array(
      z.object({
        chain_template_id: z.number()
      })
    )
  })
})

export type DropGetResponse = z.infer<typeof dropGetResponseSchema>
export type Drop = z.infer<typeof orderReservationsDropSchema>

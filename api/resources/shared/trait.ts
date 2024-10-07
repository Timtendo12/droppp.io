import { z } from 'zod'

export const traitSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  percent: z.number(),
  value: z.string()
})

export type TraitItem = z.infer<typeof traitSchema>

import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
  supported: z.coerce.boolean(),
  marketplace_restriction: z.boolean(),
  marketplace_restriction_reason: z.string().nullable()
})

export const countriesResponseSchema = successResponseSchema.extend({
  countries: z.array(countrySchema)
})

export type Country = z.infer<typeof countrySchema>
export type CountriesResponse = z.infer<typeof countriesResponseSchema>

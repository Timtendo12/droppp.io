import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const AffiliationDisplayTypes = z.enum(['self', 'agent'])
const StatusDisplayTypes = z.enum(['inactive', 'active', 'completed'])

export const RequestTypes = z.record(z.string(), z.string())
export const RequesterTypes = z.record(AffiliationDisplayTypes, z.string())

export const legalConsumerRightsInfoGetResponseSchema =
  successResponseSchema.merge(
    z.object({
      request_type_display: RequestTypes,
      request_affiliation_display: RequesterTypes,
      status_display: z.record(StatusDisplayTypes, z.number())
    })
  )

export type RequestTypesSchema = z.infer<typeof RequestTypes>
export type RequesterTypesSchema = z.infer<typeof RequesterTypes>

export type LegalConsumerRightsInfoGetResponse = z.infer<
  typeof legalConsumerRightsInfoGetResponseSchema
>

import { z } from 'zod'
import { successResponseSchema } from '../../../../shared/success'

export const setup2faSMSResponseSchema = successResponseSchema

export type Setup2faSMSResponse = z.infer<typeof setup2faSMSResponseSchema>

import { z } from 'zod'
import { successResponseSchema } from '../../../../shared/success'

export const setup2faSMSSendResponseSchema = successResponseSchema

export type Setup2faSMSSendResponse = z.infer<
  typeof setup2faSMSSendResponseSchema
>

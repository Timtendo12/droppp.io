import { z } from 'zod'
import { successResponseSchema } from '../../../../shared/success'

export const setup2faConfirmPhraseResponseSchema = successResponseSchema

export type Setup2faConfirmPhraseResponse = z.infer<
  typeof setup2faConfirmPhraseResponseSchema
>

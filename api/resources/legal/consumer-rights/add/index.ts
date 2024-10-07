import { useMutation } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  LegalConsumerRightsInput,
  LegalConsumerRightsResponse,
  legalConsumerRightsSchema
} from './schema'
import { ApiError } from '@/api/core/errors'
import { TypedMutationsOptions } from '@/api/core/mutation/options'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-legalconsumer-rightsadd
const path = '/legal/consumer-rights/add'

export const addLegalConsumerRights = async (
  input: LegalConsumerRightsInput
): Promise<LegalConsumerRightsResponse> =>
  post<LegalConsumerRightsResponse>(
    buildApiUrl(path, input),
    {},
    legalConsumerRightsSchema
  )

export const useAddLegalConsumerRightsMutation = (
  mutationOptions?: TypedMutationsOptions<
    LegalConsumerRightsResponse,
    LegalConsumerRightsInput
  >
) =>
  useMutation<LegalConsumerRightsResponse, ApiError, LegalConsumerRightsInput>(
    input => addLegalConsumerRights(input),
    mutationOptions
  )

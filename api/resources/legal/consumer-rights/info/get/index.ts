import { useQuery } from '@tanstack/react-query'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  LegalConsumerRightsInfoGetResponse,
  legalConsumerRightsInfoGetResponseSchema
} from './schema'
import { ApiError } from '@/api/core/errors'

// https://github.com/TokenWave/dpdocs/blob/main/API.md#-legalconsumer-rightsinfoget
const path = 'legal/consumer-rights/info/get'

export const getLegalConsumerRightsInfo =
  async (): Promise<LegalConsumerRightsInfoGetResponse> => {
    return post<LegalConsumerRightsInfoGetResponse>(
      buildApiUrl(path),
      '',
      legalConsumerRightsInfoGetResponseSchema
    )
  }

export const queryKey = [path, 'info']

export const useLegalConsumerRightsInfo = () =>
  useQuery<LegalConsumerRightsInfoGetResponse, ApiError>(
    queryKey,
    getLegalConsumerRightsInfo,
    {}
  )

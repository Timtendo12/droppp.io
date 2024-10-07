import { buildApiUrl } from '@/api/core/url'
import post from '@/api/core/http/post'
import {
  ValidateCryptoAddressInput,
  ValidateCryptoAddressResponse,
  validateCryptoAddressResponseSchema
} from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-cryptoaddressvalidate
const path = '/crypto/address/validate'

export const validateCryptoAddress = async (
  input: ValidateCryptoAddressInput
): Promise<ValidateCryptoAddressResponse> =>
  post<ValidateCryptoAddressResponse>(
    buildApiUrl(path, input),
    {},
    validateCryptoAddressResponseSchema
  )

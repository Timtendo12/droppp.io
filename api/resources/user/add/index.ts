import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import { AuthInput } from '@/api/resources/shared/auth'
import { UserSignupResponse, userSignupResponseSchema } from './schema'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-useradd
const path = '/user/add'

export const userSignup = async (
  input: AuthInput,
  options?: {}
): Promise<UserSignupResponse> =>
  post<UserSignupResponse>(
    buildApiUrl(path, input),
    options,
    userSignupResponseSchema
  )

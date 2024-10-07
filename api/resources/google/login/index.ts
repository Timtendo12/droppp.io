import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  AuthInput,
  LoginResponse,
  loginResponseSchema
} from '@/api/resources/shared/auth'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-googlelogin
const path = '/google/login'

export const googleLogin = async (
  input: AuthInput,
  options?: {}
): Promise<LoginResponse> =>
  post<LoginResponse>(buildApiUrl(path, input), options, loginResponseSchema)

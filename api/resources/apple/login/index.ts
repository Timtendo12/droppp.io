import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  AuthInput,
  LoginResponse,
  loginResponseSchema
} from '@/api/resources/shared/auth'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-applelogin
const path = '/apple/login'

export const appleLogin = async (
  input: AuthInput,
  options?: {}
): Promise<LoginResponse> =>
  post<LoginResponse>(buildApiUrl(path, input), options, loginResponseSchema)

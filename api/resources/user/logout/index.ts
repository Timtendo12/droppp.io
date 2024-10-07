import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'

//https://github.com/TokenWave/dpdocs/blob/main/API.md#-userlogout
const path = '/user/logout'

export const userLogout = async (options?: {}): Promise<void> =>
  post<void>(buildApiUrl(path), options)

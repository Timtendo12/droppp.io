import { User } from '@/api/resources/shared/user'
import { ApiAction } from '@/api/core/compat'
import { LoginResponse } from '@/api/resources/shared/auth'
import { UserSignupResponse } from '@/api/resources/user/add/schema'
import { Notifications, KycFlags } from '@/api/resources/shared/account'
import { Moment } from 'moment'
import { UserGetResponse } from '@/api/resources/user/get/schema'
import IdentityVerificationState from '@/types/identityVerificationState'

export type WalletOption = {
  type: number
  address: string
  chain_url: string
  date: string | null
}

export type Promotion = {
  start: Moment
  end: Moment
  active: boolean
  pending: boolean
  expired: boolean
  marketplaceFee: string
  startDisplayDate: string
  startDisplayYear: string
  endDisplayDate: string
  endDisplayYear: string
}

export enum UserFetchStatus {
  Initial = 'initial',
  Fetching = 'fetching',
  Complete = 'complete',
  Skipped = 'skipped'
}

export enum SessionAction {
  Signup = 'signup',
  Login = 'login',
  FetchedUser = 'fetchedUser',
  SelectWallet = 'selectWallet',
  Logout = 'logout'
}

export type UserPayload = {
  user?: User
  wallet_balance?: number
  notify?: Notifications
  promo_start?: string
  promo_end?: string
} & KycFlags

export type SessionUserSource = 'none' | 'login' | 'signup' | 'fetchedUser'

export type SessionUser = {
  user?: User
  userSource: SessionUserSource
  identityVerificationState: IdentityVerificationState
  creditBalance: number
  walletBalance: number
  notifications: Partial<Notifications>
  wallets: WalletOption[]
  selectedWallet: WalletOption | null
  promotion?: Promotion
}

type SessionContext = SessionUser & {
  get isAuthenticated(): boolean
  isUserLoading: boolean
  isFetchingUser: boolean
}

type SessionActions = {
  signup: ApiAction<UserSignupResponse>
  loginApple: ApiAction<LoginResponse>
  loginEmail: ApiAction<LoginResponse>
  loginGoogle: ApiAction<LoginResponse>
  fetchUser: ApiAction<UserGetResponse>
  setSelectedWallet: (WalletOption) => void
  logout: (goToPath?: string) => Promise<void>
}

type CookieActions = {
  getOauthData: () => {
    redirect_uri: string
    client_id?: string
    scope?: string
    state?: string
  }
  setOauthData: (data: any) => void
  removeOauthData: () => void | string
  getRedirectUri: () => string | undefined
  setRedirectUri: (string) => void
  removeRedirectUri?: () => void
  getReturnUri: () => string | undefined
  setReturnUri: (string) => void
  removeReturnUri: () => void
}

export type AuthContextType = SessionContext & SessionActions & CookieActions

import { User } from '@/api/resources/shared/user'

const profileRegex = new RegExp('.+.dp$')

export type DropppAddress = {
  waxAddress: string
  addressType: 'none' | 'free' | 'custom'
}

export const getUsersWaxAddressInfo = (user: User): DropppAddress => {
  const result: DropppAddress = {
    waxAddress: 'Profile',
    addressType: 'none'
  }
  if (!user) return result
  const { account_wax_free, account_wax } = user

  if (account_wax_free) {
    result.waxAddress = account_wax_free
    result.addressType = 'free'
  }
  if (account_wax !== account_wax_free) {
    result.waxAddress = account_wax
    result.addressType = 'custom'
  }
  return result
}

export const isValidAddress = (address: string | string[]) =>
  profileRegex.test(address?.toString())

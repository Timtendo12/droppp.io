import Cookies from 'js-cookie'

const KEY_FAVORITE_ADDRESS = 'favorite-address'

export const getFavoriteAddress = () => {
  return JSON.parse(Cookies.get(KEY_FAVORITE_ADDRESS) || null) || []
}

export const addFavoriteAddress = (address: string) => {
  const favorites = getFavoriteAddress()
  const newList = favorites.filter(favorite => favorite !== address)
  newList.unshift(address)
  Cookies.set(KEY_FAVORITE_ADDRESS, newList.slice(0, 4))
}

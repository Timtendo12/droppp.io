import { StorageKey } from './keys'
import useStorage from './useStorage'

// Modeled after https://usehooks.com/useLocalStorage/
const useLocalStorage = <T>(key: StorageKey, initialValue?: T) =>
  useStorage('local', key, initialValue)

export default useLocalStorage

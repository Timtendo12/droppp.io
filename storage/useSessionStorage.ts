import { StorageKey } from './keys'
import useStorage from './useStorage'

const useSessionStorage = <T>(key: StorageKey, initialValue?: T) =>
  useStorage('session', key, initialValue)

export default useSessionStorage

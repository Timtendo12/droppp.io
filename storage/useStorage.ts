import { useState, useEffect } from 'react'
import { Store, StorageKey } from './keys'
import { isBrowser, isServer } from '@/util/envHelpers'

declare global {
  interface WindowEventMap {
    'session-storage': CustomEvent
  }
}

const STORES = {
  local: {
    storage: isBrowser && window.localStorage,
    handlerName: 'storage' as keyof WindowEventMap
  },
  session: {
    storage: isBrowser && window.sessionStorage,
    handlerName: 'session-storage' as keyof WindowEventMap
  }
}

const useStorage = <T>(store: Store, key: StorageKey, initialValue?: T) => {
  const { storage, handlerName } = STORES[store]

  const getStorageItem = (key: StorageKey): any => {
    try {
      const item = storage.getItem(key) || undefined
      return item ? JSON.parse(item) : item
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error getting storage item ${key}`, error)
      return undefined
    }
  }

  const setStorageItem = (key: StorageKey, value: unknown): any => {
    try {
      const item = JSON.stringify(value)
      storage.setItem(key, item)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error setting storage item ${key}`, error)
    }
  }

  const initialVal = initialValue || undefined

  const [storedValue, setStoredValue] = useState(() => {
    if (isServer) return initialVal
    try {
      const item = getStorageItem(key)
      return item ? item : initialVal
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error getting storage item ${key}`, error)
      return initialVal
    }
  })

  const handleChange = (e: StorageEvent) => {
    if (e.key === key) {
      const newVal = JSON.parse(e.newValue)
      // eslint-disable-next-line no-console
      console.info(`Storage Event: ${key}`, newVal)
      setStoredValue(newVal)
    }
  }

  useEffect(() => {
    if (isServer) return

    const eventListener: EventListener = event =>
      handleChange(event as StorageEvent)

    window.addEventListener(handlerName, eventListener)

    return () => {
      window.removeEventListener(handlerName, eventListener)
    }
  }, [])

  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valToStore)
      if (isBrowser) setStorageItem(key, valToStore)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error setting storage item ${key}`, error)
    }
  }

  return [storedValue, setValue]
}

export default useStorage

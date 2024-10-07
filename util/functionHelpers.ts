import pDebounce from 'p-debounce'

const isPromise = p => {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true
  }

  return false
}

export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const returnsPromise = f => {
  if (
    f.constructor.name === 'AsyncFunction' ||
    (typeof f === 'function' && isPromise(f))
  ) {
    return true
  }
  return false
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeout: NodeJS.Timeout | null = null
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  } as T
}

export const debouncePromise = pDebounce

export const withDelay =
  <T>(
    fn: (...args: any[]) => Promise<T>,
    ms: number
  ): ((...args: Parameters<typeof fn>) => Promise<T>) =>
  (...args: Parameters<typeof fn>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      fn(...args)
        .then(result => {
          setTimeout(() => resolve(result), ms)
        })
        .catch(error => {
          setTimeout(() => reject(error), ms)
        })
    })

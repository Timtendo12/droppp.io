import { RefObject, useEffect } from 'react'

export function useOnClickOutside(
  refs: Array<RefObject<HTMLElement>>,
  handler
) {
  useEffect(() => {
    const listener = event => {
      if (
        !refs.some(ref => !ref?.current || ref.current.contains(event.target))
      ) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}

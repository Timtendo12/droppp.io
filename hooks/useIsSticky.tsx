import { MutableRefObject, useEffect, useState } from 'react'

export default function useIsSticky(
  ref: MutableRefObject<HTMLElement | null>,
  options: IntersectionObserverInit = { threshold: [1] }
) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const cachedRef = ref.current
      const observer = new IntersectionObserver(([e]) => {
        const { boundingClientRect, isIntersecting, rootBounds } = e

        // Chrome will have a null value on first fired event - Josh Dobson
        if (!rootBounds) return

        if (
          boundingClientRect.bottom < rootBounds.bottom &&
          isIntersecting &&
          isSticky
        ) {
          setIsSticky(false)
        }
        if (
          boundingClientRect.top <= rootBounds.top &&
          !isIntersecting &&
          !isSticky
        ) {
          setIsSticky(true)
        }
      }, options)
      observer.observe(cachedRef)
      return () => observer.unobserve(cachedRef)
    }
  }, [ref, options, isSticky])

  return isSticky
}

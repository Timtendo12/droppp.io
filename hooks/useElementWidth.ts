import { useEffect, useState } from 'react'

export default function useElementWidth(
  ref: React.MutableRefObject<HTMLElement> | null
) {
  const [width, setWidth] = useState<number | undefined>()

  useEffect(() => {
    if (!ref?.current) return
    const cachedRef = ref.current
    const observer = new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
        const container = entries[0]
        if (container) {
          const containerWidth = container.contentRect.width
          if (width !== containerWidth) {
            setWidth(containerWidth)
          }
        }
      })
    })
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [ref])
  return { width }
}

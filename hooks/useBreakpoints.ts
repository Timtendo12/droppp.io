import { useEffect, useState } from 'react'
import { BREAKPOINTS } from '@/constants'
import { debounce } from '@/util/functionHelpers'

export type Breakpoints = {
  isMobile: boolean
  isTablet: boolean
  isSmall: boolean
  isMedium: boolean
  isLarge: boolean
  isXl: boolean
  breakpoint: MututallyExclusiveBreakpointOption
}

const mutuallyExclusiveBreakpointOptions = ['sm', 'md', 'lg', 'xl'] as const

export type MututallyExclusiveBreakpointOption =
  (typeof mutuallyExclusiveBreakpointOptions)[number]

export type BreakpointOption =
  | MututallyExclusiveBreakpointOption
  | 'tablet'
  | 'mobile'

export type BreakpointOptions = BreakpointOption[]

export default function useBreakpoints(
  breakpoints?: BreakpointOptions,
  delay: number = 20
): Breakpoints {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isSmall, setIsSmall] = useState(false)
  const [isMedium, setIsMedium] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const [isXl, setIsXl] = useState(false)
  const [breakpoint, setBreakpoint] =
    useState<MututallyExclusiveBreakpointOption>(undefined)

  const handleResize = () => {
    const width = window.innerWidth
    // If breakpoint options are passed in, only trigger set state on those breakpoints
    if (breakpoints?.length) {
      breakpoints.forEach(breakpoint => {
        switch (breakpoint) {
          case 'mobile':
            setIsMobile(width < BREAKPOINTS.md)
            break
          case 'tablet':
            setIsTablet(width < BREAKPOINTS.lg)
            break
          case 'sm':
            setIsSmall(width >= BREAKPOINTS.sm)
            break
          case 'md':
            setIsMedium(width >= BREAKPOINTS.md)
            break
          case 'lg':
            setIsLarge(width >= BREAKPOINTS.lg)
            break
          case 'xl':
            setIsXl(width >= BREAKPOINTS.xl)
            break
          default:
            break
        }
      })
    } else {
      setIsMobile(width < BREAKPOINTS.md)
      setIsTablet(width < BREAKPOINTS.lg)
      setIsSmall(width >= BREAKPOINTS.sm)
      setIsMedium(width >= BREAKPOINTS.md)
      setIsLarge(width >= BREAKPOINTS.lg)
      setIsXl(width >= BREAKPOINTS.xl)

      let candidate =
        mutuallyExclusiveBreakpointOptions[
          mutuallyExclusiveBreakpointOptions.length - 1
        ]

      for (const option of mutuallyExclusiveBreakpointOptions) {
        if (width < BREAKPOINTS[option]) {
          candidate = option
          break
        }
      }

      setBreakpoint(candidate)
    }
  }

  const debouncedHandleResize = debounce(handleResize, delay)

  useEffect(() => {
    async function init() {
      handleResize()
      window.addEventListener('resize', debouncedHandleResize)
    }

    init()

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isSmall,
    isMedium,
    isLarge,
    isXl,
    breakpoint
  }
}

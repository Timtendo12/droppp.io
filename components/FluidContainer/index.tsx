import React, { ElementType, useEffect, useRef, useState } from 'react'
import { clampNumber, transformRange } from '@/util/numberHelpers'

export type containerInfoType = {
  containerBreakpoint: number | undefined
  containerWidth: number
  fontSize: number
}

interface Props {
  minWidth?: number
  maxWidth?: number
  targetWidth?: number
  className?: string
  style?: any
  isResponsiveDisabled?: boolean
  children:
    | JSX.Element
    | JSX.Element[]
    | ((containerInfo: containerInfoType) => JSX.Element)
  responsive?: {
    [key: number]: string
  }
  shouldSetClassesOnce?: boolean
  tag?: ElementType
}

const MAX_WIDTH = 1440
export const BASE_FLUID_FONT_SIZE = 8

const FluidContainer = ({
  children,
  minWidth = 0,
  maxWidth,
  isResponsiveDisabled = false,
  responsive = {},
  targetWidth = MAX_WIDTH,
  style,
  tag = 'div',
  shouldSetClassesOnce = false,
  ...rest
}: Props) => {
  const hasSetInitialClasses = useRef(false)
  const previousClasses = useRef<string[]>([])
  const [baseFontSize, setBaseFontSize] = useState()
  const containerData = useRef<containerInfoType>({
    containerBreakpoint: undefined,
    containerWidth: undefined,
    fontSize: undefined
  })

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const cachedRef = ref.current
    const observer = new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
        const container = entries[0]
        if (container) {
          const containerWidth = container.contentRect.width
          const adjustedWidth = maxWidth
            ? clampNumber(containerWidth, minWidth, maxWidth)
            : containerWidth

          const delta = transformRange(
            adjustedWidth,
            { max: targetWidth, min: minWidth },
            { max: BASE_FLUID_FONT_SIZE, min: 0 }
          )

          const containerInfoResult: containerInfoType = {
            containerBreakpoint: undefined,
            containerWidth: containerWidth,
            fontSize: delta
          }

          if (
            (responsive && !isResponsiveDisabled) ||
            !hasSetInitialClasses?.current
          ) {
            Object.entries(responsive).forEach((entry, i) => {
              const classes = entry[1].split(' ')
              if (Number(entry[0]) <= containerWidth) {
                containerInfoResult.containerBreakpoint = i
                if (!hasSetInitialClasses?.current || !shouldSetClassesOnce) {
                  const updatedClasses = [
                    ...[...cachedRef.classList].filter(
                      item => previousClasses.current.indexOf(item) == -1
                    ),
                    ...classes
                  ]
                  cachedRef.setAttribute('class', updatedClasses.join(' '))
                  previousClasses.current = classes
                }
              }
            })
          }
          hasSetInitialClasses.current = true
          containerData.current = containerInfoResult
          setBaseFontSize(delta)
        }
      })
    })
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
    // I left the responsive var off since it's an object..
  }, [ref, minWidth, targetWidth, isResponsiveDisabled])

  return React.createElement(
    tag,
    {
      style: {
        '--baseFontSize': baseFontSize,
        '--fluidUnit': '1em', // @todo: Remove --fluidUnit and replace all calcs in the code that use it with `em` values. Trevor - 05/03/2023
        fontSize: `${baseFontSize}px`,
        ...style
      },
      ref: ref,
      ...rest
    },
    typeof children === 'object'
      ? children
      : children({ ...containerData.current, fontSize: baseFontSize })
  )
}

export default FluidContainer

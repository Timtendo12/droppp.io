import { createContext, useContext, useEffect, useState } from 'react'
import { debounce } from '@/util/functionHelpers'
import { isFirefox, isMobile } from 'react-device-detect'

type WindowDimension = number | undefined

export const WindowDimensionsHeightContext =
  createContext<WindowDimension>(undefined)
export const WindowDimensionsWidthContext =
  createContext<WindowDimension>(undefined)

const WindowDimensionsProvider = ({ children }) => {
  const [height, setHeight] = useState<WindowDimension>(undefined)
  const [width, setWidth] = useState<WindowDimension>(undefined)
  const supressResizeEvents = isMobile && isFirefox

  const handleResize = () => {
    const { innerWidth: width, innerHeight: height } = window
    document.body.style.setProperty('--width', `${width}px`)
    document.body.style.setProperty('--height', `${height}px`)
    setHeight(height)
    setWidth(width)
  }

  const debouncedHandleResize = debounce(handleResize, 20)

  useEffect(() => {
    async function init() {
      handleResize()
      if (supressResizeEvents) return
      window.addEventListener('resize', debouncedHandleResize)
    }
    init()

    return () => {
      if (supressResizeEvents) return
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return (
    <WindowDimensionsWidthContext.Provider value={width}>
      <WindowDimensionsHeightContext.Provider value={height}>
        {children}
      </WindowDimensionsHeightContext.Provider>
    </WindowDimensionsWidthContext.Provider>
  )
}

export default WindowDimensionsProvider

export function useWindowHeight() {
  return useContext(WindowDimensionsHeightContext)
}

export function useWindowWidth() {
  return useContext(WindowDimensionsWidthContext)
}

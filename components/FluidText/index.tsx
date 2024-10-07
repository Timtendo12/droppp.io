import React, { ReactNode } from 'react'
import { BASE_FLUID_FONT_SIZE } from '@/components/FluidContainer'

const TEXT_TAGS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  div: 'div',
  li: 'li'
} as const

interface IProps {
  children: ReactNode
  className?: string
  min?: number
  max?: number
  tag?: keyof typeof TEXT_TAGS
  targetSize: number
  baseFontSize?: number
  style?: any
}

export const FluidText = ({
  baseFontSize = BASE_FLUID_FONT_SIZE,
  children,
  className = '',
  min = 0,
  max = 9999,
  tag = TEXT_TAGS.p,
  targetSize,
  style
}: IProps) => {
  // 0's left for reference that you could add a min size if needed
  const scale = (targetSize - 0) / (baseFontSize - 0)
  const fontSize = `calc(var(--baseFontSize) * ${scale}px)`
  const fluidUnit = baseFontSize / targetSize

  return React.createElement(
    tag,
    {
      style: {
        '--fluidUnit': `${fluidUnit}em`,
        fontSize: `clamp(${min}px, ${fontSize}, ${max}px)`,
        ...style
      },
      className
    },
    children
  )
}

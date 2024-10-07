import { useState } from 'react'
import { BASE_FLUID_FONT_SIZE } from '@/components/FluidContainer'

const targetItemWidth = 288

export type DynamicFontMetrics = {
  fontSize: number
  fluidUnit: number
  scale: number
}

export const calculateDynamicFontMetrics = (
  width: number,
  targetWidth: number
): DynamicFontMetrics => {
  const scale = width / targetWidth
  const fontSize = Number((scale * BASE_FLUID_FONT_SIZE).toFixed(2))
  const fluidUnit = fontSize / BASE_FLUID_FONT_SIZE
  return { fontSize, fluidUnit, scale }
}

export default function useDynamicFont(targetWidth = targetItemWidth) {
  const [fontSize, setFontSize] = useState(BASE_FLUID_FONT_SIZE)
  const [fluidUnit, setFluidUnit] = useState(1)

  const handleUpdateFont = width => {
    const { fontSize, fluidUnit } = calculateDynamicFontMetrics(
      width,
      targetWidth
    )
    setFontSize(fontSize)
    setFluidUnit(fluidUnit)
  }

  return {
    fontSize,
    fluidUnit,
    handleUpdateFont
  }
}

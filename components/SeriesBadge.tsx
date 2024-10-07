import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { FluidText } from './FluidText'

type SeriesBadgeSize = 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  size?: SeriesBadgeSize
  className?: string
  fluid?: boolean
  label: ReactNode
}

const BASE_CLASSES = 'uppercase font-extrabold font-primary leading-none'

export default function SeriesBadge({
  label,
  size = 'md',
  fluid = false,
  className
}: Props) {
  if (fluid) {
    return (
      <FluidText
        tag="div"
        targetSize={14}
        min={12}
        max={14}
        className={classNames(BASE_CLASSES, 'px-f2 border', className)}
        style={{
          paddingTop: 'calc(var(--fluidUnit) * 1.5)',
          paddingBottom: 'calc(var(--fluidUnit) * 1.5)',
          borderRadius: '1.5em'
        }}
      >
        {label}
      </FluidText>
    )
  } else {
    return (
      <div
        className={classNames(
          BASE_CLASSES,
          getSeriesBadgeSizeClassName(size),
          className
        )}
      >
        {label}
      </div>
    )
  }
}

const getSeriesBadgeSizeClassName = (size: SeriesBadgeSize): string => {
  switch (size) {
    case 'sm':
      return 'text-[11px]'
    case 'md':
      return 'py-[5.5px] px-[11px] text-[9px] rounded-[100px] border'
    case 'lg':
      return 'py-[7.5px] px-[11px] text-[11px] rounded-[100px] border'
    case 'xl':
      return 'py-[11px] px-[14px] text-sm rounded-[100px] border'
  }
}

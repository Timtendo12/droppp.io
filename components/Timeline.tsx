import { classNames } from '@/util/tailwindHelpers'
import React, { ReactNode } from 'react'
import Button from './Button'

export type config = {
  vertical: {
    isActive: boolean
    textAlign?: 'left' | 'center'
  }
}
interface TimelineProps {
  className?: string
  isVertical?: boolean
  textAlign?: 'left' | 'center'
  isCompleted: boolean
  markers: Omit<TimelineMarker, 'hasPast' | 'onClick'>[]
  markerAction: (index: number) => void
}

export default function Timeline({
  className,
  isVertical,
  isCompleted,
  textAlign,
  markers,
  markerAction
}: TimelineProps) {
  const gridItems = markers.length
  const activeIndex =
    markers.findIndex(
      marker => marker.isActive !== undefined && !marker.isActive
    ) - 1

  const gridStyle = !isVertical && {
    gridTemplateColumns: `repeat(${gridItems}, 1fr)`
  }
  const rowStyle = isVertical && {
    // first 3 rows share the same height of the tallest row
    // last row fits to content
    gridTemplateRows: `repeat(${gridItems - 1}, 1fr)`
  }

  const isLeftAligned = textAlign === 'left'

  return (
    <div
      style={{ ...gridStyle, ...rowStyle, '--timelineMarkerSize': '16px' }}
      className={classNames(
        'relative grid @container',
        {
          'pl-[calc(var(--timelineMarkerSize)/2)]': isLeftAligned
        },
        className
      )}
    >
      {markers.map((marker, index) => (
        <TimelineMarker
          key={index}
          {...marker}
          hasPast={isCompleted || index < activeIndex}
          isVertical={isVertical}
          textAlign={textAlign}
          onClick={() => markerAction(index)}
        />
      ))}
    </div>
  )
}

interface TimelineMarker {
  title: string
  description: ReactNode
  hasPast: boolean
  isActive: boolean
  isVertical?: boolean
  textAlign?: 'left' | 'center'
  onClick: () => void
}

const TimelineMarker = ({
  title,
  description,
  hasPast,
  onClick,
  isVertical,
  textAlign,
  isActive
}: TimelineMarker) => {
  const isVerticalTextAlignLeft = textAlign === 'left'

  const isNodeActive = isActive && !hasPast

  return (
    <Button
      theme="clean"
      onClick={onClick}
      className={classNames(
        'group text-gray-400 hover:text-white text-left transition-colors',
        {
          'text-white': isNodeActive,
          flex: isVertical && isVerticalTextAlignLeft,
          'grid odd:text-right grid-cols-2':
            isVertical && !isVerticalTextAlignLeft,
          'flex flex-col items-center text-center gap-2': !isVertical
        }
      )}
    >
      <div
        className={classNames({
          'pb-3 group-last:pb-0 -translate-y-[10px] space-y-1': isVertical,
          'pb-4 order-1 pl-1 w-full': isVertical && isVerticalTextAlignLeft,
          'group-even:order-1 group-even:pl-3 group-odd:pr-3 group-odd:flex group-odd:items-end group-odd:flex-col':
            isVertical && !isVerticalTextAlignLeft
        })}
      >
        <p className="h6 @[570px]:h5 @[685px]:h6 @[960px]:h5">{title}</p>

        {/* duplicated description below for ease of layout */}
        {isVertical && <Description>{description}</Description>}
      </div>

      <div
        className={classNames('relative flex self-stretch', {
          'group-even:justify-end ': isVertical && !isVerticalTextAlignLeft,
          'justify-center w-full': !isVertical
        })}
      >
        <div
          className={classNames(
            'group-hover:scale-125 transition-transform rounded-full border-2 bg-[var(--bgColor,var(--color-black,#000))] border-[currentColor] w-[var(--timelineMarkerSize)] h-[var(--timelineMarkerSize)] relative',

            // active pulse animation
            {
              'border-success bg-success': isNodeActive || hasPast,
              'after:content-[""] after:absolute after:w-[calc(var(--timelineMarkerSize)*1.75)] after:h-[calc(var(--timelineMarkerSize)*1.75)] after:rounded-full after:bg-success/30 after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:z-[-1] after:animate-pulse':
                isNodeActive,
              '-translate-y-1/2 -translate-x-1/2 ': isVertical,
              'group-odd:-translate-x-1/2 group-even:translate-x-1/2':
                isVertical && !isVerticalTextAlignLeft
            }
          )}
        />

        {/* Dashed/Solid Progress line */}

        <div
          className={classNames(
            'group-last:hidden border-dashed border-gray-300 absolute z-[-1]',
            {
              'border-b-4 border-success border-solid': hasPast,
              'border-l-2 top-0 bottom-0 -translate-x-1/2': isVertical,
              'group-even:translate-x-1/2 border-l-0 group-odd:border-l-2 group-even:border-r-2':
                isVertical && !isVerticalTextAlignLeft,
              'border-b-2 w-full left-1/2 top-1/2 -translate-y-1/2': !isVertical
            }
          )}
        />
      </div>

      {/* duplicated description above for ease of layout */}
      {!isVertical && <Description>{description}</Description>}
    </Button>
  )
}

const Description = ({ children }: { children: ReactNode }) => (
  <p className="whitespace-pre-wrap text-[currentColor] body-sm @[570px]:body-md @[685px]:body-sm @[960px]:body-md max-w-[200px]">
    {children}
  </p>
)

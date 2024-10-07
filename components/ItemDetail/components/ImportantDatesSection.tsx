import React from 'react'
import { ImportantDatesTimeline } from '../../DropContent/ImportantDatesTimeline'
import {
  isDropLaunched,
  isDropPostRedemption,
  isDropPostShipping,
  isDropPostSnapshot,
  isDropShipping
} from '@/util/dropHelpers'
import { MergedDrop } from '@/config/drops/schema'

type Props = {
  drop: MergedDrop
  eventLocation: string
}

export default function ImportantDatesSection({ drop, eventLocation }: Props) {
  return (
    <ImportantDatesTimeline
      drop={drop}
      config={{
        isVertical: true,
        textAlign: 'left',
        headerClasses: 'h5',
        descriptionClasses: 'body-sm text-gray-300',
        buttonTheme: 'secondary',
        eventLocation,
        states: {
          isLaunched: isDropLaunched(drop),
          isPostSnapshot: isDropPostSnapshot(drop),
          isPostRedemption: isDropPostRedemption(drop),
          isShipping: isDropShipping(drop),
          isPostShipping: isDropPostShipping(drop)
        }
      }}
    />
  )
}

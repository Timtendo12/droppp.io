import React from 'react'
import { EMPTY_LIST_MAP, EMPTY_LIST_OPTION } from '@/constants'
import CloudinaryImage from './CloudinaryImage'

interface Props {
  type: EMPTY_LIST_OPTION
}

const EmptyList = ({ type }: Props) => {
  const EMPTY_IMAGE_HEIGHT = type === 'activity' ? 106 : 174
  const { label, description, image } = EMPTY_LIST_MAP[type]

  return (
    <div className="flex flex-1 self-stretch justify-center items-center px-2 py-[208px]">
      <div className="flex flex-col items-center max-w-[444px] w-full text-center">
        <div
          className={`relative w-full`}
          style={{ height: `${EMPTY_IMAGE_HEIGHT}px` }}
        >
          <CloudinaryImage
            path="global/emptyState/"
            imageId={`bg-empty-${image}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="h5 mt-4">{label}</div>
        <div className="body mt-2">{description}</div>
      </div>
    </div>
  )
}

export default EmptyList

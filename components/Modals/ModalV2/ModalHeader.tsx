import classNames from 'classnames'
import { ReactElement, ReactNode } from 'react'
import CloudinaryImage from '@/components/CloudinaryImage'

import CloudinaryAnimatedVideo from '@/components/CloudinaryAnimatedVideo'
import React from 'react'

export interface ImageProps {
  id: string
  path: string
  alt: string
  width: number
  height: number
  className?: string
}

export interface VideoProps {
  id: string
  path: string
  className?: string
}

export type ModalHeaderContent =
  | {
      video: VideoProps
      image?: never
      component?: never
    }
  | {
      video?: never
      component?: never
      image: ImageProps
    }
  | {
      video?: never
      image?: never
      component: ReactElement
    }
  | { [K in any]: never }

export interface ModalHeaderProps {
  className?: string
  content: ModalHeaderContent
  indicator?: ReactNode
  overlayComponent?: ReactNode
  insetTitle?: boolean
}

export const modalImageHeaderProps = {
  shouldHideHeader: false
}

const ModalHeader = React.memo(function ModalMediaHeader({
  className,
  content,
  indicator,
  overlayComponent
}: ModalHeaderProps) {
  const { image: mediaImage, video } = content
  const mediaItem = mediaImage || video

  return (
    <>
      <div
        className={classNames(
          '-mx-[var(--modalPadding)] mb-3 overflow-hidden flex items-center justify-center rounded-t-[var(--borderRadius-init)] relative z-0 border-1 border-b-0 border-[var(--bgColor)]',
          className,
          mediaItem?.className
        )}
      >
        <MediaHeader content={content} />
        {overlayComponent && (
          <div className="absolute inset-0 flex">{overlayComponent}</div>
        )}
      </div>
      {indicator && <div>{indicator}</div>}
    </>
  )
})

interface MediaHeaderProps {
  content: ModalHeaderContent
}

const MediaHeader = ({ content }: MediaHeaderProps) => {
  const { image, video, component } = content

  if (!content) return null

  if (component) {
    return component
  }

  if (image) {
    return (
      <CloudinaryImage
        path={image.path}
        className="object-cover w-full h-full"
        imageId={image.id}
        alt={image.alt}
        width={image.width}
        height={image.height}
        objectFit="contain"
      />
    )
  }

  if (video) {
    return <CloudinaryAnimatedVideo videoId={video.id} path={video.path} />
  }
}

export default ModalHeader

import Image from 'next/legacy/image'
import React from 'react'
import { MediaItem } from '@/api/resources/shared/media'

type Props = {
  className?: string
  onLoad?: () => void
  media: MediaItem
  alt: string
  objectFit?: 'cover' | 'contain'
  src?: string
  width?: number
  height?: number
}

export const MediaItemImage = ({
  alt,
  className,
  onLoad,
  media,
  objectFit,
  src,
  height,
  width
}: Props) => {
  const imgSrc = src ?? media.size4_url
  const layout = !(height && width) ? 'fill' : undefined
  return (
    <Image
      onLoad={e => {
        ;(e.target as HTMLImageElement).src.indexOf('data:image/gif;base64') <
          0 && onLoad()
      }}
      src={imgSrc}
      alt={alt}
      layout={layout}
      height={height}
      width={width}
      objectFit={objectFit}
      className={className}
    />
  )
}

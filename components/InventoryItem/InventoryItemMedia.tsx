import React, { useRef, useState } from 'react'
import { MediaLoadingSkeleton } from '@/components/MediaLoadingSkeleton'
import classnames from 'classnames'
import { MediaItem, mediaNameEnum } from '@/api/resources/shared/media'
import { MediaItemImage } from '@/components/MediaItem/Image'
import { MediaItemVideo } from '@/components/MediaItem/Video'
import useBreakpoints from '@/hooks/useBreakpoints'

export const InventoryItemMedia = ({
  alt = '',
  objectFit = 'contain',
  media,
  mediaQuality = 'default',
  muted,
  className = ''
}: {
  media: MediaItem
  alt?: string
  muted?: boolean
  mediaQuality?: 'default' | 'high'
  objectFit?: 'cover' | 'contain'
  className?: string
}) => {
  const { isMedium } = useBreakpoints(['md'])
  const src = mediaQuality === 'high' && isMedium ? media.size0_url : undefined
  const mediaRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const isVideo = media.name === mediaNameEnum.enum.video

  const handleOnLoad = () => {
    setIsLoading(false)
  }

  const mediaClasses = `h-full w-full absolute inset-0 object-${objectFit}`

  return (
    <div ref={mediaRef} className={classnames('flex-1 flex', className)}>
      <div className="relative flex-1 flex">
        {isVideo ? (
          <MediaItemVideo
            src={src}
            media={media}
            muted={muted}
            onLoad={handleOnLoad}
            className={mediaClasses}
          />
        ) : (
          <MediaItemImage
            media={media}
            src={src}
            onLoad={handleOnLoad}
            alt={alt}
            objectFit={objectFit}
            className={mediaClasses}
          />
        )}
      </div>
      {isLoading && <MediaLoadingSkeleton className="absolute inset-0" />}
    </div>
  )
}

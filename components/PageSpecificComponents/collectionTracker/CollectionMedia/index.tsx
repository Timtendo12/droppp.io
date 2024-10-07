import Image from 'next/image'
import React from 'react'
import { MediaItem } from '@/api/resources/shared/media'
import { MEDIA_TYPES } from '@/enum'
import { MEDIA_SIZES } from '@/constants'
import styles from './styles.module.scss'

interface Props {
  size: keyof typeof MEDIA_SIZES
  onReady?: () => void
  alt: string
  media: MediaItem
}

const CollectionMedia = ({ size, media, onReady, alt }: Props) => {
  const mediaSize = MEDIA_SIZES[size]
  const type = media[mediaSize.type]
  const src = media[mediaSize.url]

  const handleOnLoad = () => {
    onReady?.()
  }

  return (
    <div className={styles.container}>
      {type === MEDIA_TYPES.VIDEO ? (
        <video
          autoPlay
          loop
          playsInline
          controls={false}
          muted
          src={src}
          onLoadedData={handleOnLoad}
        />
      ) : (
        <Image
          className="w-full h-full object-contain"
          src={src}
          alt={alt}
          width={85}
          height={120}
          onLoad={handleOnLoad}
        />
      )}
    </div>
  )
}

export default CollectionMedia

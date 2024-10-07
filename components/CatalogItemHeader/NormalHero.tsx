import NiceModal from '@ebay/nice-modal-react'
import React, { useMemo, useRef, useState } from 'react'
import { MediaItem, mediaNameEnum } from '@/api/resources/shared/media'
import { MODAL_ID } from '@/constants/modalId'
import { MediaItemVideo } from '@/components/MediaItem/Video'
import { MediaItemImage } from '@/components/MediaItem/Image'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { useHeaderContext } from './index'

const findFrontMediaItem = (mediaItems: MediaItem[]) =>
  mediaItems.find(
    mi =>
      mi.name == mediaNameEnum.enum.video || mi.name === mediaNameEnum.enum.img
  )

const findBackMediaItem = (mediaItems: MediaItem[]) =>
  mediaItems.find(mi => mi.name === mediaNameEnum.enum.backimg)

const Height = 360

const calculateDimensions = (mediaItem?: MediaItem) => {
  if (mediaItem) {
    const ratio = mediaItem.size4_width / mediaItem.size4_height
    return { height: `${Height}px`, width: `${Height * ratio}px` }
  } else {
    return {}
  }
}

export function NormalHero({ onLoadComplete }) {
  const [showFront, setShowFront] = useState(true)
  const mediaRef = useRef(null)
  const { catalogItem } = useHeaderContext()
  const { name, media: mediaItems, collection, series } = catalogItem

  const activeMediaItem = showFront
    ? findFrontMediaItem(mediaItems)
    : findBackMediaItem(mediaItems)

  const activeMediaIndex = showFront ? 0 : 1

  const hasBackMediaItem = useMemo(
    () => !!findBackMediaItem(mediaItems),
    [mediaItems]
  )

  const dimensions = useMemo(
    () => calculateDimensions(activeMediaItem),
    [activeMediaItem]
  )

  const handleFlipperClick = () => setShowFront(!showFront)

  const handlePreviewClick = () => {
    const assets = mediaItems.map(m => ({
      name: `${collection.display_name} - Series ${series}`,
      media: m
    }))
    NiceModal.show(MODAL_ID.inventoryPreview, {
      assets,
      defaultIndex: activeMediaIndex
    })
  }

  if (!activeMediaItem) {
    onLoadComplete()
    return null
  }

  return (
    <>
      <div
        ref={mediaRef}
        style={dimensions}
        className="drop-shadow-2xl relative cursor-pointer"
        onClick={handlePreviewClick}
      >
        {activeMediaItem.name === mediaNameEnum.enum.video ? (
          <MediaItemVideo media={activeMediaItem} onLoad={onLoadComplete} />
        ) : (
          <MediaItemImage
            media={activeMediaItem}
            src={activeMediaItem.size4_url}
            objectFit={'cover'}
            alt={name}
            onLoad={onLoadComplete}
          />
        )}
      </div>
      {!!hasBackMediaItem && (
        <Button theme="clean" onClick={handleFlipperClick}>
          <Icon name="flipCard" />
        </Button>
      )}
    </>
  )
}

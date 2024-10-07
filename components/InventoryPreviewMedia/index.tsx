import NiceModal from '@ebay/nice-modal-react'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { MEDIA_SIZES } from '@/constants'
import { MODAL_ID } from '@/constants/modalId'
import { PreviewMedia } from '..'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import { MediaLoadingSkeleton } from '@/components/MediaLoadingSkeleton'
import styles from './styles.module.scss'
import { useWindowWidth } from '@/contexts/windowDimensions'

const InventoryPreviewMedia = ({ inventory, className = '' }) => {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [previewHeight, setPreviewHeight] = useState(260)
  const [ratio, setRatio] = useState(1)
  const windowWidth = useWindowWidth()

  const { media, attributes, traits } = inventory

  useEffect(() => {
    setActivePreviewIndex(0)
  }, [inventory])

  useEffect(() => {
    setPreviewHeight(windowWidth > 1728 ? 300 : 260)
    const ratio =
      media[activePreviewIndex][MEDIA_SIZES.DEFAULT.width] /
      media[activePreviewIndex][MEDIA_SIZES.DEFAULT.height]
    setRatio(ratio)
  }, [media, activePreviewIndex, windowWidth])

  useEffect(() => {
    setMediaLoaded(false)
  }, [activePreviewIndex])

  const isSquare =
    media[activePreviewIndex][MEDIA_SIZES.DEFAULT.width] ===
    media[activePreviewIndex][MEDIA_SIZES.DEFAULT.height]

  const handleOpenMedia = () => {
    const assets = media.map(m => ({
      name: `${inventory.name} - ${inventory.attributes?.variant}`,
      media: m
    }))
    NiceModal.show(MODAL_ID.inventoryPreview, {
      assets,
      defaultIndex: activePreviewIndex
    })
  }

  const renderToggleButton = () => {
    return (
      <Button
        theme="clean"
        className="block m-auto mt-2"
        onClick={() => setActivePreviewIndex(activePreviewIndex ? 0 : 1)}
      >
        <Icon name="flipCard" />
      </Button>
    )
  }

  return (
    <div className={className}>
      <div className={styles.thumbnails}>
        <PreviewMedia
          className={classnames(styles.thumbnail, {
            [styles.round]:
              attributes?.rarity === 'Unique Webbian' || traits?.length > 0,
            [styles.square]: isSquare
          })}
          style={{ height: previewHeight, width: previewHeight * ratio }}
          size={MEDIA_SIZES.LARGE}
          media={media[activePreviewIndex]}
          onClick={handleOpenMedia}
          onLoaded={() => setMediaLoaded(true)}
        />
        {!mediaLoaded && <MediaLoadingSkeleton className="absolute inset-0" />}
      </div>
      {media.length > 1 && renderToggleButton()}
    </div>
  )
}

export default InventoryPreviewMedia

import NiceModal from '@ebay/nice-modal-react'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { MediaItem } from '@/api/resources/shared/media'
import { MEDIA_SIZES } from '@/constants'
import { MODAL_ID } from '@/constants/modalId'
import useBreakpoints from '@/hooks/useBreakpoints'
import { InventoryItemMedia } from '@/components/InventoryItem/InventoryItemMedia'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import ViewModal from './ViewModal'

type IAsset = {
  name: string
  media: MediaItem
}

type Props = {
  assets: IAsset[]
  defaultIndex: number
}

const InventoryPreviewModal = NiceModal.create<Props>(
  ({ assets, defaultIndex }) => {
    const { isMobile } = useBreakpoints()
    const [activeIndex, setActiveIndex] = useState(defaultIndex)
    const [previewSize, setPreviewSize] = useState(100)
    const [ratio, setRatio] = useState(1)

    const { name, media } = assets[activeIndex]

    useEffect(() => {
      setPreviewSize(isMobile ? 90 : 70)
      const ratio =
        media[MEDIA_SIZES.DEFAULT.width] / media[MEDIA_SIZES.DEFAULT.height]
      setRatio(ratio)
    }, [assets, activeIndex, isMobile])

    const handleNext = direction => () => {
      if (
        (direction < 0 && activeIndex < 1) ||
        (direction > 0 && activeIndex >= assets.length - 1)
      )
        return
      setActiveIndex(activeIndex + direction)
    }

    const PreviewMediaPlayer = () => (
      <div
        className="relative mx-10"
        style={{
          height: isMobile ? `${previewSize / ratio}vw` : `${previewSize}vh`,
          width: isMobile ? `${previewSize}vw` : `${previewSize * ratio}vh`,
          maxWidth: '80vw',
          maxHeight: '60vh'
        }}
      >
        <InventoryItemMedia
          mediaQuality="high"
          muted={false}
          media={media}
          className="h-full"
          alt={name}
        />
      </div>
    )

    const renderContent = () => {
      if (isMobile) {
        return (
          <div className="h-full flex flex-col">
            <div className="utility-alt px-2 min-h-[64px] py-2 flex items-center justify-center border-b border-defaultBorder bg-gray-900">
              {name}
            </div>
            <div className="flex flex-1 flex-col justify-center items-center">
              <PreviewMediaPlayer />
              <div className="flex mt-4 w-full justify-evenly">
                <ArrowButton
                  icon="revealLeft"
                  hidden={assets.length < 2}
                  disabled={activeIndex < 1}
                  onClick={handleNext(-1)}
                />
                <ArrowButton
                  icon="revealRight"
                  hidden={assets.length < 2}
                  disabled={activeIndex >= assets.length - 1}
                  onClick={handleNext(1)}
                />
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="h-full flex justify-center items-center">
          <ArrowButton
            icon="revealLeft"
            hidden={assets.length < 2}
            disabled={activeIndex < 1}
            onClick={handleNext(-1)}
          />
          <PreviewMediaPlayer />
          <ArrowButton
            icon="revealRight"
            hidden={assets.length < 2}
            disabled={activeIndex >= assets.length - 1}
            onClick={handleNext(1)}
          />
        </div>
      )
    }

    return (
      <ViewModal
        id={MODAL_ID.inventoryPreview}
        headerChildren={isMobile ? null : name}
        cancelButtonConfig={{ label: 'Close' }}
      >
        {renderContent()}
      </ViewModal>
    )
  }
)

export default InventoryPreviewModal

const ArrowButton = ({ icon, hidden, ...props }) => (
  <Button
    className={classNames(
      'bg-transparent !border-none !p-0 disabled:opacity-50 disabled:shadow-none',
      { hidden }
    )}
    {...props}
  >
    <Icon name={icon} />
  </Button>
)

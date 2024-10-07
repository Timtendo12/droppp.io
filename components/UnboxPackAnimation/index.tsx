import React from 'react'
import classnames from 'classnames'
import { MEDIA_SIZES } from '@/constants'
import { useLayoutData } from '@/contexts/layout'
import styles from './styles.module.scss'
import { MediaItem } from '@/api/resources/shared/media'
import { useWindowHeight, useWindowWidth } from '@/contexts/windowDimensions'

interface IProps {
  media: MediaItem
  className: string
  hasError: boolean
  setHasError: (hasError: boolean) => void
  aspectRatio: number
  forwardRef: React.MutableRefObject<HTMLVideoElement>
  onComplete: React.ReactEventHandler
}

const UnboxPackAnimation = ({
  media,
  className = '',
  hasError,
  setHasError,
  aspectRatio,
  forwardRef,
  onComplete
}: IProps) => {
  const { mutePackReveal } = useLayoutData()
  const windowWidth = useWindowWidth()
  const windowHeight = useWindowHeight()

  const isFullScreen = aspectRatio !== 1 // @todo:  remove check when all videos are 16x9 https://app.asana.com/0/1201257980051440/1202808619064467
  let size = MEDIA_SIZES.ORIGINAL
  const windowSize = Math.min(windowWidth, windowHeight)

  if (isFullScreen) {
    // @todo: remove check when all videos are 16x9 https://app.asana.com/0/1201257980051440/1202808619064467
    if (windowSize < 768) {
      size = MEDIA_SIZES.DEFAULT
    } else {
      size = MEDIA_SIZES.LARGE
    }
  } else {
    if (windowSize < 576) {
      size = MEDIA_SIZES.SMALL
    } else if (windowSize < 768) {
      size = MEDIA_SIZES.DEFAULT
    } else if (windowSize < 992) {
      size = MEDIA_SIZES.LARGE
    } else if (windowSize < 1400) {
      size = MEDIA_SIZES.ORIGINAL
    }
  }

  const url = media[size.url]

  const handlePlay = () => {
    forwardRef.current.play()
    setHasError(false)
  }

  return (
    // @todo: remove extra class when all videos are 16x9 https://app.asana.com/0/1201257980051440/1202808619064467
    <div
      className={classnames(styles.videoContainer, className, {
        [styles.isFullScreen]: isFullScreen
      })}
    >
      <video
        src={encodeURI(url)}
        muted={!!mutePackReveal}
        playsInline
        onEnded={onComplete}
        ref={forwardRef}
      />
      {hasError && (
        <div className={styles.btnPlay} onClick={handlePlay}>
          Play
        </div>
      )}
    </div>
  )
}

export default UnboxPackAnimation

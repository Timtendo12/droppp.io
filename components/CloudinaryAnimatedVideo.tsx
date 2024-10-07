import { isSafari } from 'react-device-detect'
import { AdvancedVideo } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_ENVIRONMENT } from '@/config'
import { CSSProperties } from 'react'
import { scale } from '@cloudinary/url-gen/actions/resize'

interface ICloudinaryVideo {
  style?: CSSProperties
  videoId: string
  resizeByWidth?: number
  alt?: string
  path: string
  muted?: boolean
  controls?: boolean
  forwardedRef?: string
  className?: string
  onClick?: any
  onLoaded?: any
}

const CloudinaryAnimatedVideo = ({
  alt,
  videoId,
  forwardedRef,
  path,
  muted = true,
  controls = false,
  className = '',
  onClick,
  onLoaded,
  resizeByWidth,
  style
}: ICloudinaryVideo) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME
    }
  })
  const video = cld.video(`${CLOUDINARY_ENVIRONMENT}/${path}${videoId}`)

  // compress video
  video.quality('auto')

  if (resizeByWidth) {
    video.resize(scale().width(resizeByWidth))
  }

  const handleLoaded = () => {
    !!onLoaded && onLoaded()
  }

  const handleClick = () => {
    !!onClick && onClick()
  }

  if (isSafari) {
    return (
      <div
        style={style}
        ref={forwardedRef}
        className={className}
        onClick={handleClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.toURL()} alt={alt || 'animated droppp video'} />
      </div>
    )
  } else {
    return (
      <div className={className} onClick={handleClick} style={style}>
        <AdvancedVideo
          onLoadStart={handleLoaded}
          cldVid={video}
          autoPlay
          loop
          playsInline
          controls={controls}
          muted={muted}
          ref={forwardedRef}
        />
      </div>
    )
  }
}

export default CloudinaryAnimatedVideo

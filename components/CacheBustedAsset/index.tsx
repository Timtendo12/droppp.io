import { MEDIA_TYPES } from '@/enum'
import { getBuildId } from '@/util/buildHelpers'

interface CacheBustedAsset {
  className?: string
  disableBust?: boolean
  controls?: boolean
  alt?: string
  src: string
  type?: string
  muted?: boolean
  title?: string
  onClick?: () => void
  onLoaded?: () => void
}

const CacheBustedAsset = ({
  disableBust,
  className,
  src,
  alt,
  type = MEDIA_TYPES.IMAGE,
  muted = true,
  controls = false,
  title,
  onClick,
  onLoaded,
  ...props
}: CacheBustedAsset) => {
  const buildId = getBuildId()
  if (!disableBust && !buildId) {
    return null
  }

  const assetSrc = disableBust ? src : `${src}?build=${buildId}`

  const handleLoaded = () => {
    !!onLoaded && onLoaded()
  }

  const handleClick = () => {
    !!onClick && onClick()
  }

  if (type === MEDIA_TYPES.VIDEO) {
    return (
      <video
        autoPlay
        loop
        playsInline
        controls={controls}
        muted={muted}
        src={assetSrc}
        onClick={handleClick}
        onLoadedData={handleLoaded}
        className={className}
        title={title}
        {...props}
      />
    )
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element*/
    <img
      alt={alt}
      title={title}
      src={assetSrc}
      onClick={handleClick}
      onLoad={handleLoaded}
      className={className}
      {...props}
    />
  )
}

export default CacheBustedAsset

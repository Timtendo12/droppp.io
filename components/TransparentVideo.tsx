import React from 'react'

interface Props extends Partial<HTMLVideoElement> {
  className?: string
  sources: {
    mp4: {
      src: string
    }
    webm: {
      src: string
    }
    fallback?: {
      src: string
    }
  }
}

function TransparentVideo({
  className,
  sources,
  autoplay = true,
  loop = true,
  playsInline = true,
  muted = true,
  ...rest
}: Props) {
  const props = { loop, playsInline, muted, rest }

  return (
    <video
      {...props}
      autoPlay={autoplay}
      className={className}
      poster={sources.fallback && sources.fallback.src}
    >
      <source src={sources.mp4.src} type='video/mp4; codecs="hvc1"' />
      <source src={sources.webm.src} type="video/webm" />
    </video>
  )
}

export default React.memo(TransparentVideo)

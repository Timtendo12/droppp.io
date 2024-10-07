import React, { useEffect, useRef } from 'react'
import { MediaItem } from '@/api/resources/shared/media'
import { isSafari } from 'react-device-detect'
import { useInView } from 'framer-motion'

type Props = {
  className?: string
  media: MediaItem
  src?: string
} & React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>

export const MediaItemVideo = ({
  className = '',
  media,
  muted = true,
  loop = true,
  autoPlay = false,
  playsInline = true,
  onLoad,
  src
}: Props) => {
  const videoSrc = src ?? media.size4_url

  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(videoRef, { margin: '200px 0px 200px 0px' })
  const hasLoaded = useRef(false)

  const handleOnLoad = e => {
    hasLoaded.current = true
    videoRef.current?.play().then()
    onLoad?.(e)
  }

  useEffect(() => {
    if (!videoRef) return

    if (!hasLoaded.current) {
      if (isInView) {
        videoRef.current?.load()
      }
    } else {
      // pause video when not in view
      if (isInView && videoRef.current?.paused) {
        videoRef.current?.play().then()
      } else {
        videoRef.current?.pause()
      }
    }
  }, [isInView, videoRef])

  // THIS IS A SAFARI HACK and meant to be temporary until a virtual list can be solved to handle video performance - Josh Dobson - 7/14/23
  if (isSafari && !src) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element*/
      <img
        onLoad={handleOnLoad}
        src={media.size3_url}
        alt="product media"
        className={className}
      />
    )
  }

  return (
    <video
      tabIndex={-1}
      preload="none"
      onCanPlay={handleOnLoad}
      src={videoSrc}
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
    />
  )
}

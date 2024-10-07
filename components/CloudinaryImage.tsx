import Image, { ImageProps } from 'next/legacy/image'
import { buildUrl } from 'cloudinary-build-url'
import { TransformerOption } from '@cld-apis/types'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_ENVIRONMENT } from '@/config'
import { CSSProperties } from 'react'

export const defaultBackground = {
  background: 'rgb:090909'
}

interface ICloudinaryImage extends Omit<ImageProps, 'src'> {
  imageId: string
  path: string
  memo?: boolean
  style?: CSSProperties
  transformations?: TransformerOption
}

const CloudinaryImage = ({
  alt,
  className = '',
  imageId,
  width,
  height,
  layout,
  objectPosition,
  objectFit,
  path,
  priority,
  transformations
}: ICloudinaryImage) => {
  const src = buildUrl(`${CLOUDINARY_ENVIRONMENT}/${path}${imageId}`, {
    cloud: { cloudName: CLOUDINARY_CLOUD_NAME },
    transformations: transformations
  })

  return (
    <Image
      priority={priority}
      className={className}
      src={src}
      width={width}
      height={height}
      layout={layout}
      objectFit={objectFit}
      objectPosition={objectPosition}
      alt={alt}
    />
  )
}

export default CloudinaryImage

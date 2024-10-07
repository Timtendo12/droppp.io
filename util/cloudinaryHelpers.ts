import { buildImageUrl, buildUrl } from 'cloudinary-build-url'
import { CLOUDINARY_ENVIRONMENT, CLOUDINARY_CLOUD_NAME } from '@/config'
import { Cloudinary } from '@cloudinary/url-gen'
import { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

export const buildOgImageUrl = path =>
  buildImageUrl(`${CLOUDINARY_ENVIRONMENT}/${path}`, {
    cloud: { cloudName: CLOUDINARY_CLOUD_NAME },
    transformations: {
      format: 'jpg'
    }
  })

export const buildCloudinaryUrl = (
  cloudinaryFolder: string,
  imageId: string,
  transformations?: TransformerOption | TransformerVideoOption
) => {
  return buildUrl(`${CLOUDINARY_ENVIRONMENT}/${cloudinaryFolder}/${imageId}`, {
    cloud: { cloudName: CLOUDINARY_CLOUD_NAME },
    transformations: transformations
  })
}

export const buildCloudinaryVideoUrl = (
  cloudinaryFolder: string,
  videoId: string
) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME
    }
  })

  const video = cld.video(
    `${CLOUDINARY_ENVIRONMENT}/${cloudinaryFolder}/${videoId}`
  )

  return video.toURL()
}

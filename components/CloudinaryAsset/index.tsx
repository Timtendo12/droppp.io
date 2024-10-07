import {
  buildCloudinaryUrl,
  buildCloudinaryVideoUrl
} from '@/util/cloudinaryHelpers'
import TransparentVideo from '@/components/TransparentVideo'
import { CloudinaryAssetDefinition } from './schema'
import { TransformerOption, TransformerVideoOption } from '@cld-apis/types'
import useBreakpoints from '@/hooks/useBreakpoints'

interface Props {
  cloudinaryFolder: string
  style?: React.CSSProperties
  asset: CloudinaryAssetDefinition
  className?: string
  transformations?: TransformerOption | TransformerVideoOption
}

const CloudinaryAsset = ({
  cloudinaryFolder,
  style,
  asset,
  className,
  transformations
}: Props) => {
  const sharedProps = { className, style }

  const { isMedium } = useBreakpoints(['md'])

  let imgSrc: string

  // should this be done outside of the component? - Josh Dobson
  if (asset.type === 'image') {
    if (typeof asset.source === 'string') {
      imgSrc = asset.source
    } else {
      imgSrc = isMedium ? asset.source.lg : asset.source.sm
    }
  }

  if (asset.type === 'transparent-video') {
    if (asset.fallbackImage) {
      if (typeof asset.fallbackImage === 'string') {
        imgSrc = asset.fallbackImage
      } else {
        imgSrc = isMedium ? asset.fallbackImage.lg : asset.fallbackImage.sm
      }
    }
  }

  switch (asset.type) {
    case 'image':
      const source = buildCloudinaryUrl(
        cloudinaryFolder,
        imgSrc,
        transformations
      )
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={source} {...sharedProps} alt={asset.alt} />
    case 'transparent-video':
      let sources = {
        mp4: {
          src: buildCloudinaryVideoUrl(cloudinaryFolder, asset.safari)
        },
        webm: {
          src: buildCloudinaryVideoUrl(cloudinaryFolder, asset.webm)
        }
      }

      if (!!asset.fallbackImage) {
        sources['fallback'] = {
          src: buildCloudinaryUrl(cloudinaryFolder, imgSrc, transformations)
        }
      }

      // @ts-ignore - not sure on this one yet...css styles are not jiving - Josh Dobson
      return <TransparentVideo sources={sources} {...sharedProps} />
  }
}

export default CloudinaryAsset

import { MediaItemImage } from '@/components/MediaItem/Image'
import { mediaNameEnum } from '@/api/resources/shared/media'
import { useHeaderContext } from './index'

export function PfpHero({ onLoadComplete }) {
  const { catalogItem } = useHeaderContext()
  const { name, media: mediaItems } = catalogItem

  const mediaItem = mediaItems.find(mi => mi.name === mediaNameEnum.enum.img)

  if (!mediaItem) {
    onLoadComplete()
    return null
  }

  return (
    <MediaItemImage
      className="rounded-[48px]"
      media={mediaItem}
      src={mediaItem.size4_url}
      objectFit={'cover'}
      alt={name}
      onLoad={onLoadComplete}
    />
  )
}

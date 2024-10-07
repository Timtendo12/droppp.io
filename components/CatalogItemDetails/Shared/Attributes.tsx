import React, { useMemo } from 'react'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { yesNo } from '@/util/booleanHelper'
import PropertyPanel from '@/components/PropertyPanel'
import { MediaItem } from '@/api/resources/shared/media'
import { MediaItemImage } from '@/components/MediaItem/Image'
import TabView, { TabViewItem } from '@/components/TabView'

type Props = {
  catalogItem: CatalogItemDetail
}

function AttributesTabContent({ catalogItem }: Props) {
  const attributes = [
    { label: 'Author', value: catalogItem.author },
    { label: 'Name', value: catalogItem.name },
    { label: 'Schema', value: catalogItem.schema_name },
    { label: 'Rarity', value: catalogItem.rarity },
    { label: 'Variant', value: catalogItem.variant },
    { label: 'Cardid', value: catalogItem.cardid },
    {
      label: 'Release Date',
      value: catalogItem.immutables['release date']
    },
    { label: 'Tid', value: catalogItem.immutables.tid },
    { label: 'Transferable', value: yesNo(catalogItem.transferable) },
    { label: 'Burnable', value: yesNo(catalogItem.burnable) }
  ]

  return <PropertyPanel items={attributes} />
}

const AttributesTab = React.memo(AttributesTabContent)

function MediaTabContent({ media }: { media: MediaItem[] }) {
  return (
    <div className="w-full flex gap-2 md:gap-2">
      {media.map((mediaItem, index) => (
        <div key={index} className="aspect-[3/4] w-14 relative">
          <MediaItemImage
            media={mediaItem}
            objectFit="contain"
            src={mediaItem.size2_url}
            alt={mediaItem.name}
          />
        </div>
      ))}
    </div>
  )
}

const MediaTab = React.memo(MediaTabContent)

export function Attributes({ catalogItem }: Props) {
  const tabs: TabViewItem[] = useMemo(
    () => [
      {
        label: 'Attributes',
        content: <AttributesTab catalogItem={catalogItem} />
      },
      { label: 'Media', content: <MediaTab media={catalogItem.media} /> }
    ],
    [catalogItem.data_id]
  )

  return (
    <TabView
      name="details"
      title={'Details'}
      items={tabs}
      navClassName="justify-end"
    />
  )
}

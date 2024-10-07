import IconLink from '@/components/IconLink'
import { ReactNode } from 'react'
import { MediaItem } from '@/api/resources/shared/media'

export type InventoryAction = {
  action: 'inventory'
  hasInventory: boolean
  drop_id: number
  card_id: number
}

export type CollectionAction = {
  action: 'collection'
  url: string
}

export type DownloadAction = {
  action: 'download'
  url: string
}

export type Action = InventoryAction | CollectionAction | DownloadAction

const iconLink = (action: Action): ReactNode => {
  switch (action.action) {
    case 'inventory':
      return action.hasInventory && action.drop_id && action.card_id ? (
        <IconLink
          icon={{ name: 'inventory' }}
          href={`/inventory?collections=${action.drop_id}&cardids=${action.card_id}`}
          subLabel="Inventory"
          ariaLabel="inventory"
        />
      ) : undefined
    case 'collection':
      return action.url ? (
        <IconLink
          icon={{ name: 'collection' }}
          href={action.url}
          subLabel="Collection"
          ariaLabel="collection"
        />
      ) : undefined
    case 'download':
      return (
        <IconLink
          icon={{ name: 'download' }}
          href={action.url}
          subLabel="Download"
          ariaLabel={'download'}
        />
      )
  }
}

interface Item {
  card_id: number
  media?: MediaItem[]
  drop_id?: number
  owned_count?: number
}

interface Drop {
  id?: number
  url?: string
}

interface Props {
  actions?: Action[]
  item: Item
  drop: Drop
}

const TertiaryActions = ({ actions, item, drop }: Props) => {
  actions = actions || [
    // It's safest to pull the drop_id from the item because drop could be undefined.
    {
      action: 'inventory',
      hasInventory: item?.owned_count > 0,
      drop_id: item?.drop_id,
      card_id: item?.card_id
    },
    { action: 'collection', url: drop?.url },
    { action: 'download', url: item.media[0]['size0_url'] }
  ]

  return (
    <>
      {actions?.length > 0 && (
        <div className="flex [&>*]:flex-1 gap-2">
          {actions.map(action => iconLink(action))}
        </div>
      )}
    </>
  )
}

export default TertiaryActions

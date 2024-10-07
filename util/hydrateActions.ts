import { LinkDefinition, ActionLinkDefinition } from '@/types/links'

type HydratedActionLink<T extends ActionLinkDefinition> = {
  active: boolean
} & T

interface HydrateActionsResult<Item extends ActionLinkDefinition> {
  items: HydratedActionLink<Item>[]
  activeItem: Item | undefined
}

const hydrateActions = <
  Item extends ActionLinkDefinition,
  ActiveItem extends LinkDefinition
>(
  items: Item[],
  activeItem: ActiveItem,
  onItemSelect: (item: Item) => void
): HydrateActionsResult<Item> => {
  const result: HydrateActionsResult<Item> = {
    items: [],
    activeItem: undefined
  }

  items.forEach(item => {
    const active = item.id !== undefined && item.id === activeItem?.id
    if (active) {
      result.activeItem = item
    }
    result.items.push({
      ...item,
      active,
      onClick: () => {
        item.onClick(item)
        onItemSelect(item)
      }
    })
  })
  return result
}

export default hydrateActions

import { ParsedUrlQuery } from 'querystring'
import { hydrateLinks } from '@/components/HydratedLinks'
import {
  ActionLinkDefinition,
  HrefLinkDefinition,
  LinkDefinition,
  RealizedActionLink,
  RealizedHrefLink,
  isActionLinkDefinition,
  isHrefLinkDefinition
} from '@/types/links'
import hydrateActions from './hydrateActions'

type OrderedItem<T extends LinkDefinition> = {
  order: number
} & T

type OrderedHrefItem<T extends LinkDefinition> = OrderedItem<T> &
  HrefLinkDefinition
type OrderedActionItem<T extends LinkDefinition> = OrderedItem<T> &
  ActionLinkDefinition

export function hydrateItems<Item extends LinkDefinition>(
  items: Item[],
  pathname: string,
  query: ParsedUrlQuery,
  activeItem?: Item,
  setActiveItem?: (activeItem: Item) => void
): [
  (RealizedActionLink | RealizedHrefLink)[],
  RealizedActionLink | RealizedHrefLink
] {
  // split into links and actions
  const [itemsToHydrate, actionsToHydrate] = items.reduce(
    ([pass, fail], item, i) => {
      const orderedItem = { order: i, ...item }
      if (isHrefLinkDefinition(orderedItem)) {
        return [[...pass, orderedItem], fail]
      } else if (isActionLinkDefinition(orderedItem)) {
        return [pass, [...fail, orderedItem]]
      }
    },
    [[] as OrderedHrefItem<Item>[], [] as OrderedActionItem<Item>[]]
  )

  const hasMixedItems = itemsToHydrate.length && actionsToHydrate.length
  const handleSetActiveItem = (item: Item) => {
    if (!hasMixedItems) {
      setActiveItem(item)
    }
  }

  // hydrate the links
  let hydratedLinks = hydrateLinks(pathname, query, itemsToHydrate)

  // hydrate the actions
  const { items: hydratedActions, activeItem: activeHydratedAction } =
    hydrateActions(actionsToHydrate, activeItem, handleSetActiveItem)

  // sort them back to their original order
  const result: (RealizedActionLink | RealizedHrefLink)[] = [
    ...hydratedLinks,
    ...hydratedActions
  ]
    .sort((a, b) => a.order - b.order)
    .map(item => {
      if (isHrefLinkDefinition(item)) {
        const active = activeHydratedAction ? false : item.active
        return { ...item, active } as RealizedHrefLink
      } else if (isActionLinkDefinition(item)) {
        return item as RealizedActionLink
      }
    })

  const activeHydratedLink = result.find(item => item.active)

  return [result, activeHydratedLink]
}

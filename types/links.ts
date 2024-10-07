import { Link as HydratedLink } from '@/components/HydratedLinks'

export interface LinkDefinition {
  id?: string
  label: string
}

export type HrefLinkDefinition = HydratedLink & LinkDefinition

export type ActionLinkDefinition = {
  onClick: (activeLink: ActionLinkDefinition) => void
} & LinkDefinition

export type RealizedLink = {
  active: boolean
} & LinkDefinition

export type RealizedHrefLink = { href: string } & RealizedLink &
  HrefLinkDefinition

export type RealizedActionLink = RealizedLink & ActionLinkDefinition

export function isHrefLinkDefinition(item: any): item is HrefLinkDefinition {
  return typeof item.path === 'string'
}
export function isActionLinkDefinition(
  item: any
): item is ActionLinkDefinition {
  return typeof item.onClick === 'function'
}

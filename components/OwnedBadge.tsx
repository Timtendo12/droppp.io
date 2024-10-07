import Badge from './Badge'
import { Size } from './Pill'

export enum Display {
  Compact,
  Default
}

interface Props {
  owned_count: number
  display?: Display
  size?: Size
  overrideIconSize?: boolean
  showOwnedLabel?: boolean
}

const OwnedBadge = ({
  owned_count,
  display = Display.Default,
  size = 'default',
  overrideIconSize = false,
  showOwnedLabel = false
}: Props) => {
  if (!shouldShowOwnedBadge(owned_count)) return null

  const transformedCount = owned_count > 99 ? '99+' : `${owned_count}`
  const iconSize = overrideIconSize
    ? display === Display.Compact
      ? 'fluid-xs'
      : 'fluid-default'
    : size

  return (
    <Badge
      icon="inventory"
      label={
        showOwnedLabel ? `${transformedCount} owned` : `${transformedCount}`
      }
      className="!border-gray-400 !font-bold"
      size={size}
      iconSize={iconSize}
    />
  )
}

export default OwnedBadge

export const shouldShowOwnedBadge = (owned_count: number) =>
  owned_count !== undefined && owned_count > 0

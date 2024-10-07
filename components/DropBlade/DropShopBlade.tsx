import { DROP_PAGE_TARGET } from '@/constants/drops'
import { numberWithCommas } from '@/util/numberHelpers'
import DropBlade from '.'
import { pluralize } from '@/util/stringHelpers'

interface IProps {
  className?: string
  drop: any
  activeListingCount: number
  isSmallLayout: boolean
}

export const DropShopBlade = ({
  className = '',
  drop,
  activeListingCount,
  isSmallLayout
}: IProps) => {
  return (
    <DropBlade
      drop={drop}
      subContentSlot={
        <ActiveListings active_listing_count={activeListingCount} />
      }
      dropPageTarget={DROP_PAGE_TARGET.shop}
      isSmallLayout={isSmallLayout}
      className={className}
    />
  )
}

export default DropShopBlade

const ActiveListings = ({
  active_listing_count
}: {
  active_listing_count: number | null
}) => {
  if (active_listing_count > 0) {
    return (
      <p className="font-semibold">
        <span className="text-white">
          {numberWithCommas(active_listing_count)}
        </span>{' '}
        <span>{pluralize('LISTING', active_listing_count)}</span>
      </p>
    )
  } else {
    return <span>NO LISTINGS</span>
  }
}

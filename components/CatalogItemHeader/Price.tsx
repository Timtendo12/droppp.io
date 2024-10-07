import { useHeaderContext } from './index'
import { isUniqueProduct, currencyAndUpSuffix } from '@/util/assetHelpers'
import { formatUSDC } from '@/util/currencyHelpers'
import Icon from '../Icon'
import { DROP_NO_LISTING_TYPES, NO_LISTING_MESSAGE_MAP } from '@/enum'
import { getDropNoListingType } from '@/util/dropHelpers'

export const Price = () => {
  const { catalogItem } = useHeaderContext()
  const { listings_available, listing_price } = catalogItem
  const noListings = !(listings_available > 0)
  const isUnique = isUniqueProduct(catalogItem)

  if (noListings) {
    const noListingType = getDropNoListingType(catalogItem)
    const message = NO_LISTING_MESSAGE_MAP[noListingType]

    return (
      <div className="pricing-xl">
        <span className="flex gap-1 items-center text-gray-300">
          {noListingType === DROP_NO_LISTING_TYPES.IN_CRATE && (
            <Icon name="crate" />
          )}
          {message}
        </span>
      </div>
    )
  }

  return (
    <div className="pricing-xl">
      <span className="text-green">{formatUSDC(listing_price)}</span>
      <span className="text-gray-300">
        {' '}
        {currencyAndUpSuffix(isUnique, listings_available)}
      </span>
    </div>
  )
}

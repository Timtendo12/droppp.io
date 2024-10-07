import { getDropNoListingType } from '@/util/dropHelpers'
import { formatUSDC } from '@/util/currencyHelpers'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { currencyAndUpSuffix, isUniqueProduct } from '@/util/assetHelpers'
import { NO_LISTING_MESSAGE_MAP } from '@/enum'

const SubtitleLowestPrice = ({ item }: { item: CatalogItemDetail }) => {
  const isForSale = item.listing_price
  const lowestPrice = formatUSDC(item.listing_price)

  return (
    <div className="pricing-xl text-gray-300">
      {isForSale ? (
        <>
          <span className="text-green">{lowestPrice}</span>
          <span>
            {' '}
            {currencyAndUpSuffix(
              isUniqueProduct(item),
              item.listings_available
            )}
          </span>
        </>
      ) : (
        NO_LISTING_MESSAGE_MAP[getDropNoListingType(item)]
      )}
    </div>
  )
}

export default SubtitleLowestPrice

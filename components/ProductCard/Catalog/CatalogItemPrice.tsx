import classNames from 'classnames'
import { formatUSDC } from '@/util/currencyHelpers'
import { currencyAndUpSuffix } from '@/util/assetHelpers'
import { NO_LISTING_MESSAGE_MAP } from '@/enum'

const SIZE_MAP = {
  default: {
    fontSize: '2em',
    lineHeight: '1.4em'
  },
  small: {
    fontSize: '1.5em',
    lineHeight: '1.2em'
  },
  tiny: {
    fontSize: '1em',
    lineHeight: '1em'
  }
}

interface Props {
  className?: string
  size?: 'tiny' | 'small' | 'default'
  isCatalogAsset?: boolean
  listing_price: number | null
  isUniqueProduct: boolean
  noListingType?: number
  hideUpSuffix?: boolean
}

const CatalogItemPrice = ({
  className,
  size = 'default',
  isCatalogAsset = false,
  listing_price,
  isUniqueProduct,
  noListingType,
  hideUpSuffix
}: Props) => {
  const getContent = () => {
    if (listing_price == null) {
      const message = NO_LISTING_MESSAGE_MAP[noListingType]
      return <span className="text-gray-300">{message}</span>
    }
    const hideSuffix = hideUpSuffix || isUniqueProduct || !isCatalogAsset
    return (
      <>
        {!isCatalogAsset && <span className="text-green">Listed </span>}
        <span className={!isCatalogAsset ? 'text-white' : 'text-green'}>
          {formatUSDC(listing_price)}{' '}
        </span>
        <span className="text-gray-300">{currencyAndUpSuffix(hideSuffix)}</span>
      </>
    )
  }

  return (
    <div
      style={{
        ...SIZE_MAP[size]
      }}
      className={classNames('pricing-lg', className)}
    >
      {getContent()}
    </div>
  )
}

export default CatalogItemPrice

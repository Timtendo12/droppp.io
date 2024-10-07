import Button from '@/components/Button'
import LowestListingBadge from './LowestListingBadge'
import { formatUSDC } from '@/util/currencyHelpers'
import { useWindowWidth } from '@/contexts/windowDimensions'
import { useMintListingAction } from './hooks/useMintListingAction'
import { BREAKPOINTS } from '@/constants'
import { MintListingItem } from '@/api/resources/catalog/item/listings/get/types'
import {
  default as ListViewModalItem,
  Props as ListItemProps
} from '@/components/ListViewModal/ListItem'

export type Props = Omit<ListItemProps, 'children'> & {
  item: MintListingItem
}

const ListItem = ({ item, className = '' }: Props) => {
  const { is_lowest, listing_price } = item
  const { listingAction } = useMintListingAction({ listing: item })

  const windowWidth = useWindowWidth()
  const isButtonSmallLayout = windowWidth < BREAKPOINTS.md
  const buttonSize = isButtonSmallLayout ? 'sm' : 'md'
  const buttonWidthClass = isButtonSmallLayout ? 'w-8' : 'w-11'

  const {
    label: buttonLabel,
    perform: performAction,
    ...buttonProps
  } = listingAction

  const handleButtonClick = () => performAction?.()

  return (
    <ListViewModalItem item={item} className={className}>
      <div className="flex items-center gap-2">
        <div className="flex gap-half items-end max-md:flex-col md:gap-2 md:items-center">
          {is_lowest && <LowestListingBadge />}

          <div className="flex items-baseline">
            <span className="h6 text-success">{formatUSDC(listing_price)}</span>
            <span className="pricing-sm text-gray-300">&nbsp;USDC</span>
          </div>
        </div>

        <Button
          className={buttonWidthClass}
          {...buttonProps}
          onClick={handleButtonClick}
          size={buttonSize}
        >
          {buttonLabel}
        </Button>
      </div>
    </ListViewModalItem>
  )
}

export default ListItem

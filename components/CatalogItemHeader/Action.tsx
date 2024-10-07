import BuyAction, { PRICE_DISCLAIMER } from '@/components/Actions/BuyAction'
import { useHeaderContext } from './index'
import { Owner } from './Owner'
import ViewListingsAction from '@/components/Actions/ViewListingsAction'

export const ActionButtonCss = 'self-stretch h-7 text-[16px] md:h-6'

export function Action({ hasowner = false }) {
  const { catalogItem } = useHeaderContext()
  const {
    data_id,
    chain_template_id,
    listing_price,
    listings_available,
    rarity,
    is_mine,
    drop_type
  } = catalogItem

  const shouldShowPriceDisclaimer = !!listing_price && listings_available > 0
  const product = { chain_template_id, rarity, drop_type }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <BuyAction
          data_id={data_id}
          chain_template_id={chain_template_id}
          listing_price={listing_price}
          listings_available={listings_available}
          is_mine={is_mine}
          rarity={rarity}
          className={ActionButtonCss}
        />
        <ViewListingsAction className={ActionButtonCss} product={product} />
        {hasowner && <Owner />}
      </div>
      {shouldShowPriceDisclaimer && (
        <div className="body-xs text-gray-300 text-center md:text-left">
          {PRICE_DISCLAIMER}
        </div>
      )}
    </>
  )
}

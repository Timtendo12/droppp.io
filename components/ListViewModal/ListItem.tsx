import classNames from 'classnames'
import { ReactNode } from 'react'
import { ListingProfile } from '@/api/resources/shared/listingProfile'
import { MintValues } from './MintValues'
import ProfileLink from './ProfileLink'
import { ItemDisplay } from '../PageSpecificComponents/pdp/SalesHistory'

export type Item = {
  listing_price?: number
  time_purchased?: string
  mint_count?: number
  mint_num?: number
  profile?: ListingProfile
}

export interface Props {
  item: Item
  className?: string
  display?: ItemDisplay
  children?: ReactNode
}

const ListItem = ({
  item,
  className = '',
  display = ItemDisplay.PDP,
  children
}: Props) => {
  const { mint_count, mint_num, profile } = item

  return (
    <li
      className={classNames(
        // base
        'px-3 py-2 flex gap-2 justify-between bg-gray-850',
        // border
        'relative last:after:content-none after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-1 after:border-gray-900',
        // radius
        'first:rounded-t-3xl last:rounded-b-3xl',
        className
      )}
    >
      {/* Left Content */}
      <div className="flex flex-col gap-1 min-w-0">
        <MintValues
          mint_count={mint_count}
          display={display}
          mint_num={mint_num}
        />
        <ProfileLink profile={profile} className="flex flex-1 items-center" />
      </div>

      {/* Right Content */}
      {children}
    </li>
  )
}

export default ListItem

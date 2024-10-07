import { numberWithCommas } from '@/util/numberHelpers'
import { ItemDisplay } from '../PageSpecificComponents/pdp/SalesHistory'

interface MintValuesProps {
  mint_num: number
  mint_count: number
  display?: ItemDisplay
}
export const MintValues = ({
  mint_num,
  mint_count,
  display = ItemDisplay.PDP
}: MintValuesProps) => {
  const mintNumClass = display === ItemDisplay.PDD ? 'h6' : 'h6 md:h5'
  const mintCountClass =
    display === ItemDisplay.PDD
      ? 'max-md:hidden h8 text-gray-300 ml-half'
      : 'max-md:hidden h8 md:h7 text-sm text-gray-300 ml-half'

  return (
    <div className="flex items-baseline">
      <span className={mintNumClass}>#{numberWithCommas(mint_num)}</span>
      <span className={mintCountClass}>
        /&nbsp;{numberWithCommas(mint_count)}
      </span>
    </div>
  )
}

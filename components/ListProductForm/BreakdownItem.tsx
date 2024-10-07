import BreakDownItemLarge from './BreakDownItemLarge'
import BreakDownItemSmall from './BreakDownItemSmall'

export const breakdownText =
  'text-gray-300 font-medium body-sm whitespace-nowrap'

export interface IBreakdownItemProps {
  title: string
  subTitle: string
  subTitleReplacement?: string
  info: string
  index: number
  noBlockChainFee?: boolean
  promoRemoved?: boolean
}

const BreakdownItem = (props: IBreakdownItemProps) => {
  return (
    <>
      <BreakDownItemSmall {...props} />
      <BreakDownItemLarge {...props} />
    </>
  )
}

export default BreakdownItem

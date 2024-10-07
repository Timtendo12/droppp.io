import { OrderSummaryListItem } from '@/components/OrderSummary/OrderSummaryListItem'
import { formatUSDC } from '@/util/currencyHelpers'

export const BreakdownItem = ({ title, value }) => {
  return (
    <OrderSummaryListItem
      title={title}
      value={formatUSDC(value)}
      valueSuffix={<span className="pricing-sm text-gray-300">USDC</span>}
    />
  )
}

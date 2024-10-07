import SplitBadge from '@/components/SplitBadge'
import { numberWithCommas } from '@/util/numberHelpers'
import TooltipMPValueDisclaimer from '../marketplace/TooltipMPValueDisclaimer'
import { formatUSDC } from '@/util/currencyHelpers'

interface QuantityValueBadgeProps {
  className?: string
  quantity: number
  value: number
}

const QuantityValueBadge = ({
  className,
  quantity,
  value
}: QuantityValueBadgeProps) => {
  return (
    <SplitBadge
      className={className}
      items={[
        <div key="left" className="text-xs font-extrabold">
          {numberWithCommas(quantity)}
        </div>,
        <TooltipMPValueDisclaimer
          key="right"
          triggerClassname="-mr-[6px] relative z-modal"
          positionToBottom
          label={
            <div
              key="middle"
              className="flex items-center gap-[4px] relative text-xs font-extrabold text-success whitespace-nowrap"
            >
              {formatUSDC(value)}
              <span className="text-gray-300">USDC</span>
            </div>
          }
        />
      ]}
    />
  )
}

export default QuantityValueBadge

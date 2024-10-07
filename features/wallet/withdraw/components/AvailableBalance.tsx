import { Column } from '@/features/wallet/core/components/Column'
import { cssFormattedSpacing } from '@/util/tailwindHelpers'
import { formatCurrency } from '@/util/currencyHelpers'

type BalanceValueProps = { label: string; value: number; className?: string }

const BalanceValue = ({ label, value, className }: BalanceValueProps) => {
  return (
    <Column className={className}>
      <h4 className="body-sm text-gray-300 mb-1">{label}</h4>
      <div className="h7 md:h6">
        {formatCurrency(value, false)}{' '}
        <span className="body-sm text-gray-300">USDC</span>
      </div>
    </Column>
  )
}

type AvailableBalanceProps = { balance?: number; amount?: number }

export const AvailableBalance = ({
  balance = 0,
  amount = 0
}: AvailableBalanceProps) => {
  const remaining = Math.max(balance - amount, 0)

  return (
    <div
      style={{
        '--containerXPadding': cssFormattedSpacing(3),
        '--containerYPadding': cssFormattedSpacing(2)
      }}
    >
      <div className="grid grid-cols-2 py-[var(--containerYPadding)">
        <BalanceValue
          className="px-0"
          label="Available Balance"
          value={balance}
        />
        <BalanceValue label="Remaining" value={remaining} />
      </div>
    </div>
  )
}

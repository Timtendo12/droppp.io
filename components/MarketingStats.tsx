import { formatUSDC } from '@/util/currencyHelpers'
import { getDynamicDropState, isPostDropSale } from '@/util/dropHelpers'
import { numberWithCommas } from '@/util/numberHelpers'
import { classNames } from '@/util/tailwindHelpers'
import { pluralize } from '@/util/stringHelpers'
import { transformNumberToCompact } from '../util/numberHelpers'
import { CatalogStats } from '@/api/resources/catalog/get/schema'
import { CatalogItemDetailStats } from '@/api/resources/catalog/item/get/schema'
import { MergedDrop } from '@/config/drops/schema'
import { STATS_MAP } from '@/constants/stats'

const ProfileStatNumber = ({
  value,
  isUSDC,
  isMonster,
  valueClassName,
  currencyClassName
}: {
  value: number
  isUSDC?: boolean
  isMonster?: boolean
  valueClassName?: string
  currencyClassName?: string
}) => {
  let formattedValue = '—'

  if (value !== null && value !== undefined) {
    if (isUSDC) {
      formattedValue = formatUSDC(value, 2, 2, 'compact')
    } else {
      formattedValue = transformNumberToCompact(value)
    }
  }
  return (
    <div className="flex gap-1 justify-center items-baseline font-extrabold">
      <h2 className={classNames('h3', valueClassName)}>{formattedValue}</h2>
      {isUSDC && (
        <p
          className={classNames('h7 text-gray-300', currencyClassName, {
            'text-white/48': isMonster
          })}
        >
          USDC
        </p>
      )}
    </div>
  )
}

type MarketingStats = CatalogStats & CatalogItemDetailStats & {}

type MarketingStatsProps = {
  stats: MarketingStats
  type?: 'pre-redemption' | 'monster' | 'promo' | 'sales-history'
  wrapClassName?: string
  className?: string
  statLabelClassName?: string
  statValueClassName?: string
  statCurrencyClassName?: string
}

const MarketingStats = ({
  stats,
  type = 'pre-redemption',
  wrapClassName,
  className,
  statLabelClassName,
  statValueClassName,
  statCurrencyClassName
}: MarketingStatsProps) => {
  const isMonster = type === 'monster'
  const isPromo = type === 'promo'

  return (
    <div
      className={classNames(
        'grid grid-cols-2 md:flex justify-center gap-y-4 divide-x divide-gray-800',
        wrapClassName,
        {
          'divide-white/15': isMonster,
          'md:!grid-cols-3': isPromo
        }
      )}
    >
      {STATS_MAP[type].map(({ key, label, usdc, symbol }, index) => (
        <div
          key={key}
          className={classNames(
            'basis-[236px] md:px-3 flex flex-col items-center justify-center gap-1 h-9 md:h-11',
            className,
            {
              'max-md:border-none': !(index % 2),
              '[&:last-child]:max-md:col-span-2': isPromo
            }
          )}
        >
          <ProfileStatNumber
            value={stats[key]}
            isUSDC={usdc}
            isMonster={isMonster}
            valueClassName={statValueClassName}
            currencyClassName={statCurrencyClassName}
          />
          <div
            className={classNames(
              'h7 font-extrabold text-gray-300 flex items-start gap-[2px]',
              { 'text-white/48': isMonster && !symbol },
              statLabelClassName
            )}
          >
            {label}
            {symbol && <span className="text-[8px]">†</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MarketingStats

interface DropStatsProps {
  className?: string
  drop?: MergedDrop
  type?: 'pre-redemption' | 'monster' | 'promo' | 'sales-history'
}

export const DropStats = ({
  className = null,
  drop,
  type = 'pre-redemption'
}: DropStatsProps) => {
  const dropState = getDynamicDropState(drop)

  if (!isPostDropSale(dropState)) {
    return null
  }

  const { stats = {} } = drop
  const { last_24hr_sales_count } = stats

  return (
    <section className={classNames('container mx-auto mt-4', className)}>
      <MarketingStats stats={stats} type={type} statValueClassName="h4 md:h3" />
      <div className="text-center body-xs mt-4">
        <div className="flex justify-center items-start gap-[2px]">
          <span className="text-[8px]">†</span>Across{' '}
          {numberWithCommas(last_24hr_sales_count)}{' '}
          {pluralize('sale', last_24hr_sales_count)}.
        </div>
        <span className="text-gray-300">
          Stats based on Droppp Marketplace data only.
        </span>
      </div>
    </section>
  )
}

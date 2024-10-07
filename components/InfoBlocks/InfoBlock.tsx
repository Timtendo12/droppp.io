import { classNames } from '@/util/tailwindHelpers'
import { ReactNode } from 'react'
import { numberWithCommas } from '@/util/numberHelpers'
import { formatUSDC } from '@/util/currencyHelpers'

export type Value =
  | {
      type: 'usdc'
      value?: number
      color?: 'green' | 'white'
    }
  | {
      type: 'numeric'
      value?: number | string
    }
  | {
      type: 'fraction'
      value?: { numerator: number | string; denominator: number | string }
    }

export type InfoBlockDefinition = {
  label: string
  value: Value
}

export type InfoBlockAppearance = {
  border: '700' | '800'
}

type Props = {
  label: string
  value: Value
  style?: 'solo' | 'grouped'
  appearance?: InfoBlockAppearance
}

const InfoBlock = ({ label, value, style = 'grouped', appearance }: Props) => {
  appearance = { ...{ border: '800' }, ...appearance }
  return (
    <div
      className={classNames(
        'px-[14px] py-[11px] border-1 rounded-2xl flex flex-1 gap-[4px] align-middle',
        style == 'solo' ? 'flex-row' : 'flex-col',
        {
          'border-gray-700': appearance.border == '700',
          'border-gray-800': appearance.border == '800'
        }
      )}
    >
      <div className="text-gray-300 text-sm flex flex-1 justify-start align-middle">
        {label}
      </div>
      {renderValue(value)}
    </div>
  )
}

const renderValue = (value: Value): ReactNode => {
  switch (value.type) {
    case 'numeric':
      return <div className="body-md">{numberWithCommas(value.value)}</div>
    case 'fraction':
      return (
        <div className="body-md">
          {numberWithCommas(value.value.numerator)}
          <span className="text-gray-400">
            {' '}
            / {numberWithCommas(value.value.denominator)}
          </span>
        </div>
      )
    case 'usdc':
      return (
        <div className="body-md">
          {value.value ? (
            <>
              <span
                className={
                  value.color == 'white' ? 'text-white' : 'text-success'
                }
              >
                {formatUSDC(value.value)}
              </span>{' '}
              <span className="body-xs text-gray-300">USDC</span>
            </>
          ) : (
            <span className="text-gray-300">–</span>
          )}
        </div>
      )
  }
}

export default InfoBlock

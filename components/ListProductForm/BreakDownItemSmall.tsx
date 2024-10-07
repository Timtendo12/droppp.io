import classNames from 'classnames'
import { fieldSubRowClasses } from '.'
import { Pill } from '@/components/Pill'
import { breakdownText, IBreakdownItemProps } from './BreakdownItem'
import styles from './styles.module.scss'
import BreakdownReplacedValue from './BreakdownReplacedValue'
import Tooltip from '../Tooltip'

const BreakDownItemSmall = ({
  title,
  subTitle,
  subTitleReplacement,
  noBlockChainFee,
  promoRemoved,
  info,
  index
}: IBreakdownItemProps) => {
  const renderFee = () => {
    if (noBlockChainFee) {
      return (
        <Pill className="relative self-start h-[21px] bg-redeemable border-redeemable">
          FREE!
        </Pill>
      )
    }

    if (subTitle == 'noFee') {
      return (
        <Pill
          className={classNames(
            styles['border-rainbow'],
            ' text-white w-max mt-1'
          )}
        >
          {subTitle}
        </Pill>
      )
    }

    if (subTitleReplacement && promoRemoved) {
      return <p className="h7">{subTitleReplacement}</p>
    }
    return (
      <div className="flex gap-1 items-center">
        {subTitleReplacement && (
          <BreakdownReplacedValue className="h7">
            {subTitleReplacement}
          </BreakdownReplacedValue>
        )}
        <p className="h7">{subTitle}</p>
      </div>
    )
  }
  return (
    <div
      className={classNames(
        fieldSubRowClasses,
        `border-gray-700 py-2 min-[895px]:hidden`,
        index != 2 ? 'border-b-1' : ''
      )}
    >
      <Tooltip
        trigger={({ DefaultTriggerComponent }) => (
          <div className="flex space-x-1">
            <p className={breakdownText}>{title}</p>
            <DefaultTriggerComponent />
          </div>
        )}
      >
        {info}
      </Tooltip>
      {renderFee()}
    </div>
  )
}

export default BreakDownItemSmall

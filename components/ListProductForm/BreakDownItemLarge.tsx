import classNames from 'classnames'
import { Pill } from '@/components/Pill'
import styles from './styles.module.scss'
import { breakdownText, IBreakdownItemProps } from './BreakdownItem'
import BreakdownReplacedValue from './BreakdownReplacedValue'
import Tooltip from '../Tooltip'

const borderClasses = 'sm:border-r-1 border-gray-700 py-2 sm:py-0'

const BreakDownItemLarge = ({
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
            'text-white w-max mt-1'
          )}
        >
          {subTitle}
        </Pill>
      )
    }

    if (subTitleReplacement && promoRemoved) {
      return (
        <p className="text-white font-semibold text-md">
          {subTitleReplacement}
        </p>
      )
    }
    return (
      <div className="flex gap-1">
        {subTitleReplacement && (
          <BreakdownReplacedValue>{subTitleReplacement}</BreakdownReplacedValue>
        )}
        <p className="text-white font-semibold text-md">{subTitle}</p>
      </div>
    )
  }
  return (
    <div
      className={classNames(
        index != 2 ? borderClasses : '',
        index != 0 ? 'pl-2' : '',
        `pr-2 max-[895px]:hidden flex flex-col`
      )}
    >
      <Tooltip
        position="right top"
        trigger={({ DefaultTriggerComponent }) => (
          <div className="flex space-x-1 text-gray-300">
            <label className={breakdownText}>{title}</label>
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

export default BreakDownItemLarge

import { dateToMoment, diffFromNow, timeDifferenceRelative } from '@/util/time'
import { Pill } from './Pill'
import { dateToLocal } from '@/util/timeHelpers'
import classNames from 'classnames'
import { now } from 'lodash'

const ActivityTime = ({
  date,
  duration = 10,
  className,
  displayRelative = false,
  pillClassName
}: {
  date: string
  duration?: number
  className?: string
  displayRelative?: boolean
  pillClassName?: string
}) => {
  const baseClassName = 'text-gray-300 text-xs font-semibold uppercase'
  const basePillClassName = '!border-blue text-[11px]'
  const justNow = diffFromNow(dateToMoment(date).toDate()) < duration
  const time = displayRelative
    ? timeDifferenceRelative(now(), dateToMoment(date).toDate())
    : dateToLocal({ date: date })
  return (
    <>
      {justNow ? (
        <Pill className={classNames(basePillClassName, pillClassName)}>
          Just Now
        </Pill>
      ) : (
        <span className={classNames(baseClassName, className)}>{time}</span>
      )}
    </>
  )
}

export default ActivityTime

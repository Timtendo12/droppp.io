import classNames from 'classnames'
import { Pill } from './Pill'
import LiveUpdateIndicator from './LiveUpdateIndicator'
import { ReactNode } from 'react'

interface Props {
  emphasize: boolean
  heading: string | ReactNode
  status: boolean
  className?: string
  emphasizeClassName?: string
}

const DatePill = ({
  emphasize,
  heading,
  status,
  className = '',
  emphasizeClassName = ''
}: Props) => {
  const basePillClasses = classNames(
    'leading-none !px-[10px] !py-[6px] !text-[12px] whitespace-nowrap',
    { '!pl-1': status }
  )

  const emphasizeClasses = classNames('border-1', emphasizeClassName)

  return (
    <Pill
      className={classNames(
        basePillClasses,
        className,
        emphasize && emphasizeClasses
      )}
    >
      {status && <LiveUpdateIndicator showLabel={false} />}
      {heading}
    </Pill>
  )
}

export default DatePill

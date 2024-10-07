import classNames from 'classnames'
import { ReactNode } from 'react'

interface IRadioLabelProps {
  title: ReactNode
  label: ReactNode
  labelClasses?: string
  subOption?: boolean
}

const RadioLabel = ({
  title,
  label,
  subOption,
  labelClasses
}: IRadioLabelProps) => {
  return (
    <div className="flex flex-col gap-[5px]">
      {title && (
        <div
          className={classNames(
            'flex items-center gap-1 text-white',
            subOption && 'h6',
            !subOption && 'h5'
          )}
        >
          {title}
        </div>
      )}
      {label && (
        <div
          className={classNames(
            labelClasses,
            subOption && 'text-sm',
            !subOption && 'text-base'
          )}
        >
          {label}
        </div>
      )}
    </div>
  )
}

export default RadioLabel

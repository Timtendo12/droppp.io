import classNames from 'classnames'
import { ReactNode } from 'react'

interface IRadioOptionProps {
  className?: string
  onSelect: (value: any) => void
  id: string
  disabled?: boolean
  groupId: string
  isSelected: boolean
  children: ReactNode
}

const RadioOption = ({
  className,
  onSelect,
  id,
  groupId,
  disabled = false,
  isSelected,
  children
}: IRadioOptionProps) => {
  return (
    <label
      key={`radio_option_${id}`}
      className={classNames(
        'block py-3',
        'grid grid-cols-[1fr_auto] gap-2 items-center cursor-pointer',
        isSelected && 'group is-selected',
        disabled ? 'disabled text-gray-400' : 'text-gray-300',
        className
      )}
    >
      <input
        id={`${groupId}_${id}`}
        tabIndex={0}
        type="radio"
        className="sr-only peer"
        name={`${groupId}_option`}
        defaultChecked={isSelected}
        disabled={disabled}
        onChange={onSelect}
      />

      {/* radio content */}
      <div>{children}</div>

      {/* the radio button */}
      <div
        className={classNames(
          'transition-all border border-gray-25 w-[20px] h-[20px] flex justify-center items-center rounded-full',
          `group-[.is-selected]:border-blue group-[.is-selected]:border-1 peer-focus:ring-blue peer-focus-visible:ring-2`,
          '[.disabled_&]:border-white/15'
        )}
      >
        <div
          aria-hidden={true}
          className="transition-opacity w-[14px] h-[14px] bg-blue rounded-full invisible group-[.is-selected]:visible "
        />
      </div>
    </label>
  )
}

export default RadioOption

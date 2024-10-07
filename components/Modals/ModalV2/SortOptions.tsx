import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React, { ReactNode } from 'react'
import Modal from './BaseModal'
import classNames from 'classnames'
import Icon, { Icons } from '@/components/Icon'
import { SortOption } from '@/constants'

type Props = {
  title?: string
  options: SortOption[]
  defaultOption: SortOption
  onSubmit: (sort: string) => void
}

const SortOptions = NiceModal.create<Props>(
  ({ title = 'Sort By', defaultOption, options, onSubmit }: Props) => {
    const { hide, visible } = useModal()

    const handleOnSubmit = (val: SortOption['value']) => {
      onSubmit(val)
      hide()
    }
    return (
      <Modal
        hide={hide}
        title={title}
        isOpen={visible}
        overlayClassName={'z-confirm'}
      >
        {() => (
          <div className="px-2 mb-2">
            <>
              {options.map(({ value, label, icon }) => (
                <SortOptionItem
                  key={value}
                  displayIcon={icon}
                  formProps={{
                    name: value,
                    onChange: () => {
                      handleOnSubmit(value)
                    },
                    defaultChecked: defaultOption.value === value
                  }}
                  name="options"
                  label={label}
                  value={value}
                />
              ))}
            </>
          </div>
        )}
      </Modal>
    )
  }
)

export default SortOptions

interface SortOptionItemProps {
  className?: string
  name: string
  label: string | ReactNode
  displayIcon: Icons | string
  value: string
  formProps?: {
    onChange: () => void
    name: string
    defaultChecked?: boolean
  }
}
export const SortOptionItem = ({
  className,
  label,
  name,
  value,
  displayIcon,
  formProps
}: SortOptionItemProps) => {
  return (
    <label
      htmlFor={value}
      className={classNames(
        'flex items-center cursor-pointer p-[12px] gap-2 rounded-[18px] focus-within:ring-2 group relative',
        className
      )}
    >
      <input
        {...formProps}
        name={name}
        className="peer sr-only"
        type="radio"
        id={value}
        value={value}
      />

      {/* Option Icon */}
      <Icon
        name={displayIcon}
        className="relative z-[1] h-[20px] w-[20px] flex justify-center items-center"
      />

      <span className="body z-[1] relative flex-1">{label}</span>

      {/* checked icon */}

      <Icon
        name="tick"
        size={20}
        className="relative z-[1] hidden peer-checked:block"
      />

      {/* background */}
      <div className="absolute inset-0 group-hover:bg-white/15 rounded-[inherit]" />
    </label>
  )
}

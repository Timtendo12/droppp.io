import classNames from 'classnames'
import { ChangeEventHandler, ReactNode, useId } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Icon from '@/components/Icon'

interface IConfirmationProps {
  checked?: boolean
  children: ReactNode
  className?: string
  required?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Confirmation = ({
  checked,
  children,
  className,
  required,
  onChange
}: IConfirmationProps) => {
  const checkboxId = useId()
  const requirementText = required ? 'required' : 'optional'

  return (
    <label
      htmlFor={checkboxId}
      className={classNames(
        'flex items-center cursor-pointer p-2 gap-2 rounded-xl ring-error focus:ring-2 focus-visible:ring-2',
        'group-[.is-danger]:bg-gray-700',
        'group-[.is-default]:bg-error/10',
        className
      )}
    >
      <input
        id={checkboxId}
        type="checkbox"
        role="checkbox"
        checked={checked}
        aria-checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={classNames(
          'w-[20px] h-[20px] flex-shrink-0 rounded-full flex items-center justify-center',
          !checked && 'border border-gray-25',
          checked && 'bg-blue',
          'peer-focus:ring-blue peer-focus-visible:ring-2'
        )}
      >
        {checked && <Icon name="tick" size={13} className="text-white" />}
      </div>
      <div className="body-sm">
        {children}
        <span className="opacity-50"> ({requirementText})</span>
      </div>
    </label>
  )
}

export default Confirmation

interface ControlConfirmationProps {
  className?: string
  children: ReactNode
  name: string
  required?: boolean
  control: Control<FieldValues>
}
export const ControlledConfirmation = ({
  className,
  name,
  required,
  control,
  children
}: ControlConfirmationProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <Confirmation
          className={className}
          required={required}
          onChange={onChange}
          checked={!!value}
        >
          {children}
        </Confirmation>
      )}
    />
  )
}

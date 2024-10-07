import classNames from 'classnames'
import React, {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  ReactNode,
  Ref
} from 'react'
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn
} from 'react-hook-form'
import { Icon, Button } from '..'

interface CheckboxProps {
  className?: string
  selected: boolean
  label?: ReactNode
  color?: string
  square?: boolean
  onChange?: (event: MouseEvent) => void
}

const Checkbox = ({
  className,
  selected,
  label,
  color = 'Blue',
  square,
  onChange
}: CheckboxProps) => {
  let iconName = selected ? `checkboxChecked${color}` : 'checkbox'

  if (square) {
    iconName = selected ? `checkboxSquareChecked` : 'checkboxSquare'
  }
  return (
    <Button
      className={classNames(
        'flex items-center focus:ring-blue/[.75] focus-visible:ring-2',
        className
      )}
      theme="clean"
      onClick={onChange}
    >
      <Icon name={iconName} className="text-gray-300" />
      {label && <span className="ml-[10px] body-sm text-left">{label}</span>}
    </Button>
  )
}

export default Checkbox

interface ControlledCheckboxProps {
  className?: string
  label: string | ReactNode
  name: string
  control: Control<FieldValues>
  defaultValue?: any
  theme?: 'square' | 'round'
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
export const ControlledCheckbox = ({
  className,
  label,
  name,
  control,
  theme = 'square',
  rules = {},
  defaultValue,
  onChange: onChangeCallback
}: ControlledCheckboxProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <RealCheckbox
          className={className}
          label={label}
          {...field}
          onChange={e => {
            field.onChange(e)
            onChangeCallback?.(e)
          }}
          theme={theme}
        />
      )}
    />
  )
}

interface RealCheckboxProps {
  className?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: boolean
  theme?: 'square' | 'round'
  label?: ReactNode
}

export const RealCheckbox = forwardRef(function RealCheckbox(
  { className = '', onChange, value, theme, label }: RealCheckboxProps,
  ref: Ref<HTMLInputElement>
) {
  const isSquare = theme === 'square'
  const iconNames = {
    checked: isSquare ? 'checkboxSquareChecked' : 'checkboxCheckedBlue',
    unchecked: isSquare ? 'checkboxSquare' : 'checkbox'
  }
  const focusClasses =
    'peer-focus:ring-blue peer-focus-visible:ring-2 peer-checked:ring-offset-1 peer-checked:ring-offset-white'

  return (
    <label
      className={classNames(
        'flex items-center cursor-pointer gap-1 rounded-xl',
        className
      )}
    >
      <input
        className="peer sr-only"
        type="checkbox"
        ref={ref}
        checked={value}
        onChange={onChange}
      />

      <Icon
        className={classNames(
          'rounded-full flex-shrink-0 hidden peer-checked:flex',
          focusClasses
        )}
        name={iconNames.checked}
      />
      <Icon
        className={classNames(
          'rounded-full flex-shrink-0 peer-checked:hidden text-gray-300',
          focusClasses
        )}
        name={iconNames.unchecked}
      />
      {label}
    </label>
  )
})

interface ControlledRadioProps {
  className?: string
  label: string | ReactNode
  value: string
  register?: UseFormRegisterReturn<string>
}
export const ControlledRadio = ({
  className,
  label,
  value,
  register
}: ControlledRadioProps) => {
  return (
    <label
      className={classNames(
        'flex items-center cursor-pointer p-2 gap-2 rounded-xl bg-gray-700 focus:ring-2 focus-visible:ring-2',
        className
      )}
    >
      <input
        className="peer sr-only"
        type="radio"
        value={value}
        {...register}
      />

      <div className="w-[20px] h-[20px] flex-shrink-0 rounded-full items-center justify-center bg-blue hidden peer-checked:flex">
        <Icon name="tick" size={13} />
      </div>
      <div className="w-[20px] h-[20px] flex-shrink-0 rounded-full border border-gray-25 peer-checked:hidden"></div>
      <div>{label}</div>
    </label>
  )
}

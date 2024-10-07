import React, { Fragment, ReactNode, useId } from 'react'
import RadioLabel from './RadioLabel'
import RadioListSeparator from './RadioListSeparator'
import RadioOption from './RadioOption'

// TODO: should we consider any specific rules
export type RadioOptionValue = any

interface IRadioOptionDefault {
  label: ReactNode
  title: ReactNode
  disabled?: boolean
  value: any
}

interface IRadioOptionCustom {
  disabled?: boolean
  content: ReactNode
  value: any
}

interface IRadioGroupDefault {
  title: ReactNode
  label: ReactNode
  options: IRadioOption[]
}

interface IRadioGroupCustom {
  content: ReactNode
  options: IRadioOption[]
}

// unioned types
type IRadioOption = IRadioOptionDefault | IRadioOptionCustom
type IRadioGroup = IRadioGroupDefault | IRadioGroupCustom
export type RadioTypes = IRadioOption | IRadioGroup

// props for the Radio list
interface IRadioListProps {
  className?: string
  config?: {
    styleClasses?: {
      label?: string
      optionWrapper?: string
    }
  }
  options: RadioTypes[]
  value: any
  onChange: (value: any) => void
}

// creates a list of radio options
const RadioList = ({
  value,
  onChange,
  options,
  config,
  className
}: IRadioListProps) => {
  const id = useId()

  function handleChange(value: any) {
    onChange(value)
  }

  // renders an individual radio option
  function renderAsRadioOption(
    identity: string,
    option: IRadioOption,
    subOption = false
  ) {
    let { content, label, title, disabled } = option as IRadioOptionDefault &
      IRadioOptionCustom
    const isSelected = option.value === value

    if (!content) {
      content = (
        <RadioLabel
          title={title}
          label={label}
          subOption={subOption}
          labelClasses={config?.styleClasses?.label}
        />
      )
    }

    return (
      <RadioOption
        className={config?.styleClasses?.optionWrapper}
        key={identity}
        id={identity}
        groupId={id}
        isSelected={isSelected}
        disabled={disabled}
        onSelect={() => handleChange(option.value)}
      >
        {content}
      </RadioOption>
    )
  }

  // renders a grouping of radio options
  function renderAsRadioGroup(identity: string, group: IRadioGroup) {
    let { label, title, content, options } = group as IRadioGroupDefault &
      IRadioGroupCustom

    if (!content) {
      content = <RadioLabel label={label} title={title} />
    }

    return (
      <>
        {content}
        {options.map((option, index) => (
          <Fragment key={index}>
            {renderAsRadioOption(`${identity}:${index}`, option, true)}
            {index < options.length && <RadioListSeparator />}
          </Fragment>
        ))}
      </>
    )
  }

  return (
    <div
      className={className}
      role="radiogroup"
      aria-orientation="vertical"
      id={id}
    >
      {options.map((option, index) =>
        'options' in option ? (
          renderAsRadioGroup(`${index}`, option)
        ) : (
          <Fragment key={index}>
            {renderAsRadioOption(`${index}`, option)}
            {index < options.length - 1 && <RadioListSeparator />}
          </Fragment>
        )
      )}
    </div>
  )
}

export default RadioList

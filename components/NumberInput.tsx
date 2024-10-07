import { classNames } from '@/util/tailwindHelpers'
import Button from './Button'
import Icon from './Icon'

const NumberInput = ({ value, onChange, max, layout = 'small' }) => {
  const addDisabled = max === undefined ? false : value >= max
  return (
    <div
      className={classNames('flex items-center justify-between', {
        'w-full': layout === 'large'
      })}
    >
      <NumberInputButton
        size={layout}
        disabled={value === 0}
        onChange={() => onChange(value - 1)}
        ariaLabel="Remove"
        iconName="minus"
      />
      <div className="pricing-xl mx-[12px] min-w-[20px] text-center">
        {value}
      </div>
      <NumberInputButton
        size={layout}
        disabled={addDisabled}
        onChange={() => onChange(value + 1)}
        ariaLabel="Add"
        iconName="plus"
      />
    </div>
  )
}

export default NumberInput

const NumberInputButton = ({
  disabled,
  onChange,
  ariaLabel,
  iconName,
  size = 'small'
}) => {
  const buttonClasses = size === 'large' ? '!w-13' : '!w-4'

  return (
    <Button
      aria-label={ariaLabel}
      className={classNames(
        '!h-4 !p-0 bg-white/15 rounded-full',
        buttonClasses
      )}
      onClick={onChange}
      disabled={disabled}
    >
      <Icon name={iconName} size={12} color="white" />
    </Button>
  )
}

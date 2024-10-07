import classNames from 'classnames'
import Icon, { Icons } from '@/components/Icon'
import { Pill, Size } from '@/components/Pill'

export interface BadgeProps {
  label?: string
  hideLabel?: boolean
  className?: string
  size?: Size
  icon?: Icons
  iconSize?: Size
  iconClass?: string
  style?: React.CSSProperties
}

const Badge = ({
  className,
  icon,
  label,
  hideLabel = false,
  iconClass,
  style,
  size = 'default',
  iconSize = undefined
}: BadgeProps) => {
  const isLarge = size === 'lg'
  const isFluid = size == 'fluid-lg' || size == 'fluid-sm'
  const nonFluidFontSize = isLarge ? '11px' : '10px'
  const nonFluidPillClasses = isLarge
    ? 'px-[10px] h-[28px]'
    : 'px-[8px] h-[22px]'

  return (
    <Pill
      title={icon}
      style={style}
      size={size}
      className={classNames(
        'font-extrabold uppercase font-primary',
        !isFluid && nonFluidPillClasses,
        className
      )}
    >
      {icon && (
        <Icon
          name={icon}
          className={iconClass}
          style={getBadgeIconStyles(iconSize ? iconSize : size)}
        />
      )}
      {!hideLabel && (
        <span
          style={{
            fontSize: isFluid
              ? size == 'fluid-sm'
                ? '1.125em'
                : '1.375em'
              : nonFluidFontSize
          }}
        >
          {label}
        </span>
      )}
    </Pill>
  )
}

export default Badge

export const getBadgeIconStyles = (size: Size) => {
  switch (size) {
    case 'fluid-lg':
      return {
        width: '2.125em',
        height: '2.125em',
        marginRight: '0.5em'
      }
    case 'fluid-sm':
      return {
        width: '1.75em',
        height: '1.75em',
        marginRight: '0.5em'
      }
    case 'fluid-xs':
      return {
        width: '1.625em',
        height: '1.625em',
        marginRight: '.375em'
      }
    case 'fluid-default':
      return {
        width: '2em',
        height: '2em',
        marginRight: '0.5em'
      }
    case 'lg':
      return {
        width: '16px',
        height: '16px',
        marginRight: '6px'
      }
    case 'default':
      return {
        width: '14px',
        height: '14px',
        marginRight: '4px'
      }
  }
}

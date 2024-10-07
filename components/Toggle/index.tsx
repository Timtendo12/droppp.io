import classnames from 'classnames'
import React from 'react'
import styles from './styles.module.scss'

interface IToggleProps {
  className?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (e: any) => void
}

const Toggle = ({
  className,
  checked,
  disabled = false,
  onChange
}: IToggleProps) => {
  return (
    <label className={classnames(className, styles.container)}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e)}
      />
      <span
        className={classnames(styles.slider, { [styles.disabled]: disabled })}
      ></span>
    </label>
  )
}

export default Toggle

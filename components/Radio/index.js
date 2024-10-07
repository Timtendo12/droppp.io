import classnames from 'classnames'
import React from 'react'
import { Button } from '..'
import styles from './styles.module.scss'

const Radio = ({
  className,
  selected,
  label = '',
  onChange,
  children = undefined
}) => {
  return (
    <Button
      className={classnames(className, styles.container)}
      theme="clean"
      onClick={onChange}
    >
      {children && children}
      <div
        className={classnames(styles.icon, { [styles.selected]: selected })}
      />
      {label && <span className={styles.label}>{label}</span>}
    </Button>
  )
}

export default Radio

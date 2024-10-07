import classnames from 'classnames'
import React from 'react'
import Button from '@/components/Button'
import styles from './styles.module.scss'

interface Props {
  className?: string
  items: { label: string; value: string }[]
  value: string
  onToggle: (value: string) => void
}

const MultiToggle = ({ className, items, value, onToggle }: Props) => {
  return (
    <div className={classnames(styles.container, className)}>
      {items.map(item => {
        return (
          <Button
            key={item.value}
            className={classnames(styles.tab, {
              [styles.active]: item.value === value
            })}
            theme="clean"
            onClick={() => onToggle(item.value)}
          >
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}

export default MultiToggle

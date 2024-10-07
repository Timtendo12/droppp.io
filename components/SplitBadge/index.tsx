import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './styles.module.scss'

type Props = {
  items: ReactNode[]
  className?: string
}

export default function SplitBadge({ className, items }: Props) {
  return (
    <div className={classNames(className, 'flex gap-[2px]')}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item}
        </div>
      ))}
    </div>
  )
}

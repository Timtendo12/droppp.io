import classnames from 'classnames'
import React from 'react'
import styles from './styles.module.scss'

interface ILoading {
  className?: string
  size?: 'large' | 'medium' | 'small' | 'tiny'
  color?: string
}

const Loading = ({ className, size, color, ...props }: ILoading) => {
  return (
    <svg
      className={classnames(styles.container, styles[size], className)}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <linearGradient id="rainbow-gradient">
        <stop offset="0%" stopColor="#f2a778" />
        <stop offset="50%" stopColor="#ea35cf" />
        <stop offset="100%" stopColor="#6951e2" />
      </linearGradient>

      <circle
        stroke={color || 'url(#rainbow-gradient)'}
        cx="33"
        cy="33"
        r="25"
      ></circle>
    </svg>
  )
}

export default Loading

import React, { useEffect, useState } from 'react'
import { Button, Icon } from '..'
import styles from './styles.module.scss'

const CloseButton = ({ autoClose, closeToast }) => {
  const [progress, setProgress] = useState(0)
  const size = 18
  const strokeWidth = 2

  useEffect(() => {
    let percent = 0
    const interval = setInterval(() => {
      percent += (100 * 100) / autoClose
      setProgress(percent)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const viewBox = `0 0 ${size} ${size}`
  const radius = (size - strokeWidth) / 2
  const circumference = radius * Math.PI * 2
  const dash = (progress * circumference) / 100

  return (
    <Button className={styles.btnClose} theme="clean" onClick={closeToast}>
      <Icon className={styles.iconClose} name="close-toast" />
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          fill="none"
          stroke="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          fill="none"
          stroke="#FFFFFF"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash]}
          strokeLinecap="round"
          style={{ transition: 'all 0.5s' }}
        />
      </svg>
    </Button>
  )
}

export default CloseButton

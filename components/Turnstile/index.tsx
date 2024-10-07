import React, { ForwardedRef } from 'react'
import { Turnstile as _Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { TURNSTILE_KEY } from '@/config'
import styles from './styles.module.scss'
import classNames from 'classnames'

type Props = {
  forwardedRef?: ForwardedRef<TurnstileInstance>
  className?: string
  onSuccess: (token: string) => void
  theme?: 'light' | 'dark'
}

const Turnstile = ({
  forwardedRef,
  className,
  onSuccess,
  theme = 'light'
}: Props) => {
  return (
    <div className={classNames(className, styles.turnstile)}>
      <_Turnstile
        ref={forwardedRef}
        siteKey={TURNSTILE_KEY}
        options={{ theme }}
        onSuccess={onSuccess}
      />
    </div>
  )
}

export default React.forwardRef<TurnstileInstance, Props>((props, ref) => (
  <Turnstile forwardedRef={ref} {...props} />
))

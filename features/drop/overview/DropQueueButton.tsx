import React from 'react'
import { useDropTimerContext } from '../DropTimer'
import {
  ButtonDisabledTheme,
  ButtonLink,
  ButtonTheme
} from '@/components/Button'
import { Drop } from '@/types/drop'
import { classNames } from '@/util/tailwindHelpers'

export const DropQueueButton = ({
  className = '',
  dropId,
  theme = 'secondary',
  disabledTheme = 'secondary'
}: {
  className?: string
  dropId: Drop['id']
  theme?: ButtonTheme
  disabledTheme?: ButtonDisabledTheme
}) => {
  const {
    remainingUntilQueueOpen: { seconds, display }
  } = useDropTimerContext()
  const isDisabled = seconds === null || seconds > 0

  return (
    <ButtonLink
      href={`/reserve-drop/?drop_id=${dropId}`}
      disabledTheme={disabledTheme}
      theme={theme}
      size="lg"
      disabled={isDisabled}
      className={classNames('tabular-nums', className)}
    >
      Join Queue{isDisabled && display}
    </ButtonLink>
  )
}

import React from 'react'
import moment from 'moment'
import { formattedCountdown } from '@/util/time'
import { MergedDrop } from '@/config/drops/schema'

interface Props {
  drop: MergedDrop
  timeRemainingInSeconds?: number
  buttonActivationInSecondsBeforeDrop?: number
  children?: (view: string, disabled: boolean) => React.JSX.Element
}

const CountdownTimeDisplay = ({
  drop,
  timeRemainingInSeconds = 0,
  buttonActivationInSecondsBeforeDrop = 0,
  children
}: Props) => {
  const durationUntilLaunch = moment.duration(timeRemainingInSeconds, 'seconds')
  const durationBeforeButtonActivation = moment.duration(
    buttonActivationInSecondsBeforeDrop,
    'seconds'
  )
  const launchTime = moment().add(durationUntilLaunch).local()

  const view = render(
    drop.state,
    launchTime,
    durationUntilLaunch,
    durationBeforeButtonActivation
  )
  const disabled =
    dropHasFinished(drop.state) ||
    durationUntilLaunch.asSeconds() > durationBeforeButtonActivation.asSeconds()

  if (typeof children == 'function') {
    return children(view, disabled)
  }

  return <>{view}</>
}

const render = (
  state,
  launchDate,
  durationUntilLaunch,
  durationBeforeButtonActivation
) => {
  if (!durationUntilLaunch.isValid()) {
    return 'Invalid Duration'
  }

  if (dropHasFinished(state)) {
    return formattedState(state)
  }

  if (durationUntilLaunch.asSeconds() > 0) {
    if (durationUntilLaunch.asHours() > 24) {
      return `Purchase on ${launchDate.format('MMM D')}`
    } else if (
      durationUntilLaunch.asSeconds() >
      durationBeforeButtonActivation.asSeconds()
    ) {
      return `Join Queue in ${formattedCountdown(durationUntilLaunch)}`
    }
    return 'Join Queue'
  }

  return 'Join Queue'
}

const dropHasFinished = state => {
  return state == 'sold_out' || state == 'ended'
}

const formattedState = state => {
  switch (state) {
    case 'sold_out':
      return 'Sold Out'
    case 'ended':
      return 'Sale Ended'
    default:
      return '(Unsupported State)'
  }
}

export default CountdownTimeDisplay

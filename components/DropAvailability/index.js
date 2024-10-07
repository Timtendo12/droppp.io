import React from 'react'
import { DateFormatter } from '@/util/time'
import { formattedPacificDate } from '@/util/time/pt'

const DropAvailability = ({ drop, time_remaining, children }) => {
  let { available, message } = drop_availability(drop, time_remaining)

  if (drop.state == 'sold_out') {
    message = 'Sold Out'
  } else if (drop.state == 'ended') {
    message = 'Sale Ended'
  } else if (available) {
    message = 'Now Available'
  }

  if (typeof children === 'function') {
    return children(message)
  }

  return <>{children}</>
}

function drop_availability(drop, time_remaining) {
  const message = dropAvailabilityString(drop.time_launch)

  const available = time_remaining <= 0

  return { available: available, message: message }
}

export function dropAvailabilityString(time_launch) {
  return `Join the drop ${formattedPacificDate(
    time_launch,
    DateFormatter.LongHours,
    true
  )}.`
}

export default DropAvailability

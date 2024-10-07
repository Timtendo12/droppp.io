import moment from 'moment'
import { useRouter } from 'next/router'
import { env } from '@/config'
import queryParser from './queryHelpers'

export const calcTimeRemaining = timeLaunch => {
  let now = moment().local()
  let end = moment.utc(timeLaunch).local()
  const remaining = Math.floor(moment.duration(end.diff(now)).asSeconds())
  return remaining
}

export const eightHoursPrior = seconds => {
  const time_launch = RouterLaunchTime() || seconds
  return moment.duration(time_launch, 'seconds').asHours() <= 8
}

export const moreThanEightHoursPrior = seconds => {
  return moment.duration(seconds, 'seconds').asHours() > 8
}

// @todo - This should use `duration_in_seconds` from the drop object instead of hardcoding 10 minutes.
// Trevor - 08/30/2023
export const queueOpen = remaining => {
  return remaining <= 600
}

export const RouterLaunchTime = (): number | undefined => {
  const router = useRouter()
  const query = queryParser(router.asPath.split(/\?/)[1])
  return env !== 'prod' && query.time_launch
    ? calcTimeRemaining(decodeURIComponent(query.time_launch))
    : undefined
}

// @todo - Remove the following three time functions and leverage new typescript based
// time utilities located in the `time` directory.
// Trevor - 05/15/2023

// In almost all cases, prefer formattedPacificDate instead because we usually show all time on the site in PT
export function dateToLocal({ date, format = 'MMM D, YYYY', tz = null }) {
  date = moment.utc(date)
  date = tz ? date.tz(tz) : date.local()
  return date.format(format)
}

export function diffFromNow(date) {
  return moment(moment(new Date())).diff(moment.utc(date).local(), 'minutes')
}

export function initialPackSaleEndedWithinSevenDays(time_launch) {
  return diffFromNow(time_launch) <= 10080 // 10080 minutes in 7 days
}

export function timeDifference(
  now: moment.Moment,
  timeAnnounce?: moment.Moment
): number | undefined {
  return timeAnnounce !== undefined
    ? now.diff(timeAnnounce, 'seconds')
    : undefined
}

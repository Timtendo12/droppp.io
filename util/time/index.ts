import moment, { Moment } from 'moment-timezone'

export enum DateFormatter {
  LongHours = 'MMM Do, YYYY \\a\\t h A',
  LongHoursMinutes = 'MMM Do, YYYY \\a\\t h:mm A',
  LongHoursMinutesSeconds = 'MMM Do, YYYY \\a\\t h:mm:ss A',
  LongHoursMinutesSansYear = 'MMM Do \\a\\t h:mm A',
  LongHoursMinutesSecondsSansYear = 'MMM Do \\a\\t h:mm:ss A',
  LongMonthShortDay = 'MMMM D',
  LongMonthShortDayYear = 'MMMM D, YYYY',
  LongMonthShortDayHours = 'MMM D, YYYY h A',
  YearDayMonthMinutesSeconds = 'YYYY-M-D h:mm:ss',
  Default = 'MMM D, YYYY'
}

type DateArgument = Moment | Date | string

export enum TimeZone {
  Pacific = 'America/Los_Angeles'
}

export const dateToMoment = (
  date: DateArgument = new Date(),
  tz: TimeZone | undefined = TimeZone.Pacific
): Moment => {
  let m = moment.utc(date)
  m = tz ? m.tz(tz) : m.local()
  return m
}

export const isWithinEightHours = (endDate: string): boolean => {
  const now = dateToMoment(new Date())
  const end = dateToMoment(endDate)
  const diff = end.diff(now, 'hours')

  return diff >= 0 && diff < 8
}
export const isToday = (date: string): boolean => {
  const now = dateToMoment(new Date())
  return dateToMoment(date).isSame(now, 'day')
}

export const isOnOrBeforeNow = (date: string): boolean => {
  const now = dateToMoment(new Date())
  return dateToMoment(date).isSameOrBefore(now)
}

export const formattedDate = (
  date: DateArgument = new Date(),
  format: string = DateFormatter.Default
): string => dateToMoment(date).format(format)

export const diffFromNow = (
  date: Date,
  unit: moment.unitOfTime.Diff = 'minutes'
): number => dateToMoment().diff(dateToMoment(date), unit)

export const addHours = (date: string, hours: number): Moment =>
  dateToMoment(date).add(hours, 'hours')

export const addDays = (date: string, days: number): Moment =>
  dateToMoment(date).add(days, 'days')

export function timeDifferenceRelative(current, previous) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerWeek = msPerDay * 7
  var msPerMonth = msPerWeek * 4
  var msPerYear = msPerDay * 365

  var elapsed = current - previous

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' sec ago'
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      (Math.round(elapsed / msPerMinute) > 1 ? ' mins ago' : ' min ago')
    )
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      (Math.round(elapsed / msPerHour) ? ' hours ago' : ' hour ago')
    )
  } else if (elapsed < msPerWeek) {
    return (
      Math.round(elapsed / msPerDay) +
      (Math.round(elapsed / msPerDay) > 1 ? ' days ago' : ' day ago')
    )
  } else if (elapsed < msPerMonth) {
    return (
      Math.round(elapsed / msPerWeek) +
      (Math.round(elapsed / msPerWeek) > 1 ? ' weeks ago' : ' week ago')
    )
  } else if (elapsed < msPerYear) {
    return (
      Math.round(elapsed / msPerMonth) +
      (Math.round(elapsed / msPerMonth) > 1 ? ' months ago' : ' month ago')
    )
  } else {
    return (
      Math.round(elapsed / msPerYear) +
      (Math.round(elapsed / msPerYear) > 1 ? ' years ago' : ' year ago')
    )
  }
}

export const formattedCountdown = (duration: moment.Duration) => {
  let components = [
    { duration: duration.hours(), label: `H` },
    { duration: duration.minutes(), label: `M` },
    { duration: duration.seconds(), label: `S` }
  ]

  return components.reduce((duration, component) => {
    // Skip this component if its duration is 0 and its not a "seconds" component. This prevents us from
    // showing unnecessary 0H or 0M time components.
    if (component.duration == 0 && component.label != 'S') {
      return duration
    }
    return `${duration} ${component.duration}${component.label}`
  }, '')
}

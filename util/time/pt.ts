import { dateToMoment, formattedDate, DateFormatter, TimeZone } from './'

export const formattedPacificDate = (
  date: Date | string,
  format: DateFormatter = DateFormatter.Default,
  appendTimezone: boolean = false
): string =>
  `${formattedDate(dateToMoment(date, TimeZone.Pacific), format)}${
    appendTimezone ? ' PT' : ''
  }`

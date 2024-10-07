import { ZodType } from 'zod'
import { isDev, isLocal, isTest } from '@/config'
import * as Sentry from '@sentry/nextjs'

const enabledForEnvironment = isDev || isLocal || isTest

export const prettyPrint = <T>(input: T) => {
  try {
    const obj = typeof input === 'string' ? JSON.parse(input) : input
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(obj, null, 2))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse JSON:', error)
  }
}

export const parseForSchema = <T>(json: any, schema?: ZodType<T>) => {
  if (schema && enabledForEnvironment) {
    if (isTest) {
      const result = schema.safeParse(json)
      if (result.success === false) {
        // eslint-disable-next-line no-console
        console.error(result.error)
        prettyPrint(json)
      }
    }

    if (isDev) {
      schema.safeParseAsync(json).then(result => {
        result.success === false && Sentry.captureException(result.error)
      })
    } else {
      return schema.parse(json)
    }
  }

  return json
}

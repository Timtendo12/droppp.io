import { parseQueryParameter } from '@/util/queryHelpers'

export interface ApiUrl {
  path: string
  params: URLSearchParams
}

// true for only undefined, null, '', []
// false if values and boolean values - true | false
const isEmpty = value => {
  return value == null || value.length === 0
}

const removeOptionalParams = (obj: {}): {} =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => !isEmpty(v)))

type ParamType = string | string[] | number[] | number | boolean | object

export const buildApiUrl = (
  path: string,
  params?: {
    [index: string]: ParamType
  }
): ApiUrl => {
  const normalizedParams = Object.entries(
    removeOptionalParams(params ?? {})
  ).reduce((obj, [key, value]) => {
    value =
      typeof value === 'object' && !Array.isArray(value)
        ? JSON.stringify(value)
        : parseQueryParameter(value.toString()).join(',')
    if (!isEmpty(value)) obj[key] = value
    return obj
  }, {})
  return {
    path,
    params: new URLSearchParams(normalizedParams)
  }
}

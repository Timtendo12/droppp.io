import { isArray, isEmpty } from 'lodash'
import { ParsedUrlQuery } from 'querystring'
import { extractValuesInDelimitedString } from '@/util/stringHelpers'

export default function queryParser(query) {
  if (!query || query.length <= 0) {
    return {}
  }

  let pairs = query
    .split('&')
    .map(parameter => {
      let split = parameter.split('=')
      return { key: split[0], value: split.length > 1 ? split[1] : null }
    })
    .reduce((accumulator, pair) => {
      accumulator[pair.key] = decodeURI(pair.value)
      return accumulator
    }, {})

  return pairs
}

export const updateSearchParams = (params: {
  [key: string]: string
}): string => {
  if (typeof window === 'undefined') {
    return ''
  }
  const path = window.location.href
  const base = window.location.origin
  const url = new URL(path, base)
  const currentParams = new URLSearchParams(url.search)
  Object.keys(params).forEach(key => {
    currentParams.set(key, params[key])
  })
  url.search = currentParams.toString()

  return url.toString()
}

export const getSearchParamLength = (
  query: Array<string | string[]>
): number => {
  return query.reduce((acc, curr) => {
    if (curr === undefined) return acc
    if (isArray(curr)) {
      return acc + curr.length
    }
    return acc + 1
  }, 0)
}

export function getParameterByName(name: string, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const parseQueryParameter = (parameter: string | string[]): string[] => {
  let parameters = []

  if (!parameter) return parameters

  if (typeof parameter === 'string') {
    parameters = extractValuesInDelimitedString(parameter)
  } else if (Array.isArray(parameter)) {
    parameters = parameter.reduce(
      (accumulator, value) =>
        accumulator.concat(extractValuesInDelimitedString(value)),
      []
    )
  } else {
    parameters.push(JSON.stringify(parameter))
  }

  return parameters.filter(value => !isEmpty(value))
}

export const toggleQueryParameterValue = (
  value: string,
  currentValues: string[]
): string => {
  if (!value) return

  const { values, exists } = currentValues.reduce(
    (accumulator, currentValue) => {
      if (currentValue == value) {
        accumulator.exists = true
      } else {
        accumulator.values.push(currentValue)
      }
      return accumulator
    },
    { values: [], exists: false }
  )

  if (!exists) values.push(value)

  return values.join(',')
}

export const removeEmptyQueryParameters = (query: ParsedUrlQuery) => {
  for (const param in query) {
    const value = query[param]
    if (isEmpty(value) || value == 'false') {
      delete query[param]
    }
  }
}

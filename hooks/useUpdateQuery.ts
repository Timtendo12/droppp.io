import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import {
  parseQueryParameter,
  toggleQueryParameterValue,
  removeEmptyQueryParameters
} from '@/util/queryHelpers'

// apply will simply apply the value provided
// toggle will add or remove the value from the parameter based on whether or not it already exists in the query.
export type ParameterUpdate = {
  parameter: string
  value?: string
  action: 'apply' | 'toggle'
} & { type: 'parameter' }

export type ResetUpdate = { parameters: string[] } & { type: 'reset' }

export type Update = ParameterUpdate | ResetUpdate

const updateParameter = (
  query: ParsedUrlQuery,
  parameter: string,
  action: ParameterUpdate['action'],
  value?: string
): ParsedUrlQuery => {
  const valuesInParameter = parseQueryParameter(query[parameter])

  switch (action) {
    case 'toggle':
      value = toggleQueryParameterValue(value, valuesInParameter)
      break
    default:
      break
  }

  query[parameter] = value

  return query
}

const updateQuery = (query: ParsedUrlQuery, update: Update): ParsedUrlQuery => {
  switch (update.type) {
    case 'parameter':
      query = updateParameter(
        query,
        update.parameter,
        update.action,
        update.value
      )
      break
    case 'reset':
      query = update.parameters.reduce(
        (query, parameter) => updateParameter(query, parameter, undefined),
        query
      )
      break
    default:
      break
  }

  removeEmptyQueryParameters(query)

  return query
}

const useUpdateQuery = (): {
  updateQuery: (
    update: Update,
    before?: (query: ParsedUrlQuery) => ParsedUrlQuery
  ) => void
  query: ParsedUrlQuery
} => {
  const router = useRouter()

  const update = (
    update: Update,
    before?: (query: ParsedUrlQuery) => ParsedUrlQuery
  ) => {
    const query = before?.(router.query) ?? router.query
    router.query = updateQuery(query, update)
    router.push(router, null, { scroll: false, shallow: true })
  }

  return { updateQuery: update, query: router.query }
}

export default useUpdateQuery

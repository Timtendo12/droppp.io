import { TypedQueryOptions } from '@/api/core/query/options'
import { Country } from '@/api/resources/countries/get/schema'
import { State, StatesResponse } from '@/api/resources/states/get/schema'
import { useStatesQuery } from '@/api/resources/states/get'
import { identifiableArrayToMap } from '@/util/mapHelpers'

export default function useStates(
  country?: Country,
  queryOptions?: TypedQueryOptions<StatesResponse, Map<number, State>>
): Map<number, State> | undefined {
  const { data: states } = useStatesQuery<Map<number, State>>(
    country?.id ?? 0,
    {
      select: ({ states }) => identifiableArrayToMap(states),
      ...queryOptions
    }
  )
  return states
}

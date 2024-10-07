import { Country } from '@/api/resources/countries/get/schema'
import { useCountriesQuery } from '@/api/resources/countries/get'
import { identifiableArrayToMap } from '@/util/mapHelpers'

export default function useCountries(): Map<number, Country> | undefined {
  const { data: countries } = useCountriesQuery<Map<number, Country>>({
    select: ({ countries }) => identifiableArrayToMap(countries)
  })
  return countries
}

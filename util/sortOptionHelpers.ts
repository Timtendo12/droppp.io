import { SortOption } from '@/constants'

export const findSortOption = (
  options: SortOption[],
  val: SortOption['value']
) => {
  if (val === undefined || val === null) {
    return undefined
  }
  return options.find(item => item.value === val)
}

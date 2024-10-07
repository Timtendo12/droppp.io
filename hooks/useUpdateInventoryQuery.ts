import { ParsedUrlQuery } from 'querystring'
import { NFT_TYPES } from '@/enum'
import useUpdateQuery, { Update } from '@/hooks/useUpdateQuery'
import { useLayoutData } from '@/contexts/layout'

const updateInventoryQuery = (
  query: ParsedUrlQuery,
  update: Update,
  layoutData: any
): ParsedUrlQuery => {
  switch (update.type) {
    case 'parameter':
      switch (update.parameter) {
        case 'type':
          if (update.value === NFT_TYPES.UNOPENED) {
            delete query.rarities
            delete query.variants
          }
          break
        case 'show_duplicates':
          delete query.exclude_lowest_mint
          break
        case 'collections':
          delete query.cardids
          delete query.variants
          break
        case 'exclude_lowest_mint':
          // This is a carry over from prior logic that was held in InventoryBrowser.
          // It's not the best way to go about clearing out selected assets. Ideally we would only
          // clear out assets that were excluded by applying the `exclude_lowest_mint` filter, but
          // that may require some BE support. What this will do is essentially wipe out all selected
          // assets which could frustrate users, but it's the best we've got right now.
          // Trevor - 08/08/24
          const { updateSelectedAssets } = layoutData
          update.value == 'true' && updateSelectedAssets([])
          break
        default:
          break
      }
      break
    default:
      break
  }

  return query
}

const useUpdateInventoryQuery = (): {
  update: (update: Update) => void
  query: ParsedUrlQuery
} => {
  const layoutData = useLayoutData()
  const { updateQuery, query } = useUpdateQuery()

  const update = (update: Update) => {
    updateQuery(update, query =>
      updateInventoryQuery(query, update, layoutData)
    )
  }

  return { update, query: query }
}

export default useUpdateInventoryQuery

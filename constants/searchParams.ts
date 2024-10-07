import { ParsedUrlQuery } from 'querystring'

export const SEARCH_PARAMS = {
  ITEM: 'item'
}

export const COLLECTION_DETAIL_PARAMS: {
  set: { royalty: 'royalty'; catalog: '' }
  view: { tracker: 'tracker'; catalog: 'catalog' }
} = {
  set: {
    royalty: 'royalty',
    catalog: ''
  },
  view: {
    tracker: 'tracker',
    catalog: 'catalog'
  }
}

export function isCollectionTrackerTrackerView(query: ParsedUrlQuery) {
  if (!query?.view) return false
  return query.view === COLLECTION_DETAIL_PARAMS.view.tracker
}

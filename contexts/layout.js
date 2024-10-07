import { useRouter } from 'next/router'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { BREAKPOINTS } from '../constants'
import { useWindowWidth } from '../contexts/windowDimensions'
import CookieManager from '../services/cookieManager'
import { isActiveInventoryItem } from '../util/inventoryHelpers'
import { SEARCH_PARAMS } from '../constants/searchParams'

let isClosedAutomatically = false

const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [muted, setMuted] = useState()
  const [collapsedCollectionList, setCollapsedCollectionList] = useState(false)
  const [collapsedFilter, setCollapsedFilter] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState([])
  const [activeTransferBar, setActiveTransferBar] = useState(false)
  const [transferBarHeight, setTransferBarHeight] = useState(0)
  const isDetailPaneTransitioning = useRef(false)
  const windowWidth = useWindowWidth()

  const router = useRouter()
  const query = { ...router.query }
  const { id, item, action_id } = query
  const detailOpened = !!item
  const isOpenPackLayout = !!id

  useEffect(() => {
    const mutePackReveal = CookieManager.getData('mute_pack_reveal')
    setMuted(!!mutePackReveal)
  }, [])

  useEffect(() => {
    if (isOpenPackLayout) return

    if (detailOpened) {
      if (!collapsedFilter) {
        isClosedAutomatically = true
        setCollapsedFilter(true)
      }
    } else {
      if (isClosedAutomatically && collapsedFilter) {
        setCollapsedFilter(false)
        isClosedAutomatically = false
      }
    }
  }, [detailOpened])

  // @TODO - What is this here for...can we move this code elsewhere? - Josh Dobson - 4/28/23
  // useEffect(() => {
  //   if (!isOpenPackLayout && !!item) {
  //     const query = { ...router.query }
  //     delete query[SEARCH_PARAMS.ITEM]

  //     router.push(
  //       {
  //         pathname: router.pathname,
  //         query
  //       },
  //       null,
  //       { scroll: false }
  //     )
  //   }
  // }, [collapsedFilter])

  useEffect(() => {
    setCollapsedCollectionList(
      windowWidth > BREAKPOINTS.md && windowWidth < 1280
    )
  }, [windowWidth])

  const setMutePackReveal = mute => {
    CookieManager.setData('mute_pack_reveal', mute)
    setMuted(mute)
  }

  const getSectionCollapseStates = () => {
    return CookieManager.getData('inventory-view')
  }

  const getSectionCollapseState = sname => {
    const data = getSectionCollapseStates()
    return !data[sname]
  }

  const setSectionCollapseState = (sname, state) => {
    const data = getSectionCollapseStates()
    data[sname] = state
    CookieManager.setData('inventory-view', data)
  }

  // ===> Collection Tracker Layout
  const getViewState = () => {
    return CookieManager.getData('collection-view')
  }

  const getViewStateById = id => {
    const data = getViewState()
    return data[id]
  }

  const getCollectionViewType = collectionId => {
    const data = getViewStateById(collectionId) || {}
    return data.viewType
  }

  const setCollectionViewType = (collectionId, viewType) => {
    const data = getViewState()
    data[collectionId] = {
      ...data[collectionId],
      viewType
    }
    CookieManager.setData('collection-view', data)
  }

  const getCollapseStatus = collectionId => {
    const data = getViewStateById(collectionId) || {}
    return data.collapseStatus
  }

  const getCollapseStatusById = (collectionId, id) => {
    const collapseStatus = getCollapseStatus(collectionId) || {}
    return collapseStatus[id]
  }

  const setCollapseStatus = (collectionId, id, state) => {
    const data = getViewState()
    if (!data[collectionId]) {
      data[collectionId] = {}

      if (!data[collectionId].collapseStatus) {
        data[collectionId].collapseStatus = {}
      }
    }
    data[collectionId].collapseStatus = {
      ...data[collectionId].collapseStatus,
      [id]: state
    }
    CookieManager.setData('collection-view', data)
  }

  const openCollectionDetail = (id, mint_num) => {
    if (isActiveInventoryItem(id, query[SEARCH_PARAMS.ITEM])) {
      delete query[SEARCH_PARAMS.ITEM]
      delete query.mint_num
    } else {
      query[SEARCH_PARAMS.ITEM] = id
      if (mint_num) {
        query.mint_num = mint_num
      }
    }

    router.replace(
      {
        pathname: router.pathname,
        query
      },
      null,
      { scroll: false, shallow: true }
    )
  }
  // ===> End

  const updateSelectedAssets = assets => {
    let newAssets = []
    if (Array.isArray(assets)) {
      newAssets = assets
    } else {
      const exists = selectedAssets.map(({ id }) => id).includes(assets.id)
      if (exists) {
        newAssets = [...selectedAssets.filter(({ id }) => id !== assets.id)]
      } else {
        newAssets = [...selectedAssets, assets]
      }
    }
    setSelectedAssets(newAssets)
    setActiveTransferBar(!!newAssets.length)
  }

  const removeSelectedAsset = asset => {
    const newAssets = [...selectedAssets.filter(({ id }) => id !== asset.id)]
    setSelectedAssets(newAssets)
    setActiveTransferBar(!!newAssets.length)
  }

  const openInventoryDetail = id => {
    if (isActiveInventoryItem(id, item)) {
      delete query[SEARCH_PARAMS.ITEM]
    } else {
      query[SEARCH_PARAMS.ITEM] = id
    }

    router.replace(
      {
        pathname: router.pathname,
        query
      },
      null,
      { scroll: false, shallow: true }
    )
  }

  const openActivityDetail = id => {
    if (!id || isActiveInventoryItem(id, action_id)) {
      delete query.action_id
    } else {
      query.action_id = id
    }

    router.push(
      {
        pathname: router.pathname,
        query
      },
      null,
      { scroll: false, shallow: true }
    )
  }

  return (
    <LayoutContext.Provider
      value={{
        mutePackReveal: muted,
        setMutePackReveal,
        collapsedFilter,
        updateSelectedAssets,
        removeSelectedAsset,
        selectedAssets,
        activeTransferBar,
        setActiveTransferBar,
        transferBarHeight,
        setTransferBarHeight,
        getSectionCollapseState,
        setSectionCollapseState,
        isDetailPaneTransitioning,
        openInventoryDetail,
        openActivityDetail,
        // Collection Tracker Layout
        collapsedCollectionList,
        getCollectionViewType,
        setCollectionViewType,
        getCollapseStatusById,
        setCollapseStatus,
        openCollectionDetail
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayoutData = () => useContext(LayoutContext)

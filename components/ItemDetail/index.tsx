import classnames from 'classnames'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import PrivateInventoryDetail from './PrivateInventoryDetail'
import PublicInventoryDetail from './PublicInventoryDetail'
import CatalogItemDetail from './CatalogItemDetail'
import CollectionTrackerItemDetail from './CollectionTrackerItemDetail'
import { SEARCH_PARAMS } from '@/constants/searchParams'
import { DetailPresentationStyle } from '@/types/grid'

export enum DetailAssetType {
  publicAsset = 'publicAsset',
  catalogItem = 'catalogItem',
  privateAsset = 'privateAsset',
  trackerAsset = 'trackerAsset'
}

interface Props {
  type?: DetailAssetType
  presentationStyle: DetailPresentationStyle
  id: string
}

const ItemDetail = ({
  id,
  type = DetailAssetType.privateAsset,
  presentationStyle
}: Props) => {
  const { query, ...router } = useRouter()

  const wrapperClassName =
    presentationStyle !== 'modal'
      ? 'flex-1 absolute inset-0 border-l border-defaultBorder overflow-y-scroll overflow-x-hidden'
      : ''

  const props = {
    id,
    presentationStyle,
    onClose: () => {
      delete query[SEARCH_PARAMS.ITEM]

      router.push({ pathname: router.pathname, query }, null, {
        scroll: false,
        shallow: true
      })
    }
  }

  const renderContent = () => {
    if (type === DetailAssetType.trackerAsset) {
      return <CollectionTrackerItemDetail {...props} />
    } else if (type === DetailAssetType.catalogItem) {
      return <CatalogItemDetail {...props} />
    } else if (type === DetailAssetType.publicAsset) {
      return <PublicInventoryDetail {...props} />
    } else {
      return <PrivateInventoryDetail {...props} />
    }
  }

  return (
    <ItemDetailWrapper>
      <div className={wrapperClassName}>{renderContent()}</div>
    </ItemDetailWrapper>
  )
}

export default ItemDetail

const ItemDetailWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      className={classnames(
        `sticky top-[var(--secondaryNavHeight)] w-full flex-1 overflow-x-hidden max-h-[calc(100vh-var(--secondaryNavHeight))]`
      )}
    >
      {children}
    </div>
  )
}

import classnames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { useLayoutData } from '@/contexts/layout'
import useBreakpoints from '@/hooks/useBreakpoints'
import { Icon, Button } from '@/components'
import { CollectionsItemType } from '@/api/resources/user/tracker/drops/get/schema'
import CollectionListItem from '@/components/PageSpecificComponents/collectionTracker/CollectionsListItem'
import {
  NavigationTabsSubtitle,
  NavigationTabsTitle
} from '@/components/NavigationTabs'
import { HorizontalNavigationIcon } from '@/components/HorizontalNavigation/HorizontalNavigationDropdown'
import DefaultModal from '@/components/Modals/ModalV2'
import { FilterOptions } from './FilterOptions'

interface Props {
  collections: CollectionsItemType[]
  defaultCollectionId?: number
}

const wrapperClassnames =
  'sticky top-[var(--headerHeight)] z-20 border-defaultBorder'

const CollectionsList = ({ collections, defaultCollectionId }: Props) => {
  const router = useRouter()
  const { collection_id } = router.query
  const { isMobile } = useBreakpoints()
  const { collapsedCollectionList } = useLayoutData()
  const MobileCollectionListModal = useModal(DefaultModal)

  const handleOpenDetail = (id: number) => {
    if (isMobile) {
      MobileCollectionListModal.hide()
    }
    router.query.collection_id = id.toString()
    router.push(router, null, { scroll: true, shallow: true })
  }

  const renderContent = () => {
    return (
      <div className="max-md:-mt-3">
        <FilterOptions />
        <div className="py-3 md:p-3">
          {!collapsedCollectionList && (
            <div className="flex items-center utility-alt mb-[12px]">
              <Icon className="mr-1" name="collection" />
              <span className="h6">Collections</span>
            </div>
          )}
          {collections.map(collection => (
            <CollectionListItem
              key={collection.id}
              collection={collection}
              active={
                collection.id === Number(collection_id || defaultCollectionId)
              }
              onOpenDetail={() => handleOpenDetail(collection.id)}
            />
          ))}
        </div>
      </div>
    )
  }

  const onOpenCollectionListModal = () => {
    MobileCollectionListModal.show({
      shouldPersistOnRouteChange: true,
      children: renderContent(),
      title: 'Filter',
      renderInlineTitle: false
    })
  }

  if (isMobile) {
    const selectedCollection =
      collections.find(collection => collection.id === Number(collection_id)) ||
      collections[0]
    return (
      <Button
        className={classnames(
          wrapperClassnames,
          'w-full h-8 bg-black flex items-center justify-between container-padding border-b'
        )}
        theme="clean"
        onClick={onOpenCollectionListModal}
      >
        <div className="min-w-0 flex-1 text-left uppercase mr-1">
          <NavigationTabsSubtitle>Collection Tracker</NavigationTabsSubtitle>
          <div className="flex items-center mt-[6px]">
            <NavigationTabsTitle>{selectedCollection.name}</NavigationTabsTitle>
            {selectedCollection.exclusive && (
              <Icon name="exclusiveBadge" className="ml-1" size={20} />
            )}
          </div>
        </div>
        <HorizontalNavigationIcon />
      </Button>
    )
  }

  return (
    <div
      className={classnames(
        wrapperClassnames,
        collapsedCollectionList ? 'w-auto' : 'w-[310px]',
        'h-[calc(100vh-var(--headerHeight))] flex-shrink-0 border-r overflow-auto'
      )}
    >
      {renderContent()}
    </div>
  )
}

export default CollectionsList

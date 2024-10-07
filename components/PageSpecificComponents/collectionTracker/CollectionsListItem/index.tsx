import classnames from 'classnames'
import React from 'react'
import { useLayoutData } from '@/contexts/layout'
import { Button, CollectionThumb } from '@/components'
import styles from './styles.module.scss'

const CollectionsListItem = ({ collection, active, onOpenDetail }) => {
  const { collapsedCollectionList } = useLayoutData()
  const { drop_name } = collection

  const handleOpenDetail = () => {
    onOpenDetail && onOpenDetail()
  }

  return (
    <Button
      className={classnames(styles.container, 'group', {
        [styles.active]: active
      })}
      style={{
        '--hoverColor': collection.hover_color || '#ffffff'
      }}
      theme="clean"
      onClick={handleOpenDetail}
    >
      <CollectionThumb collection={collection} isActive={active} />
      {!collapsedCollectionList && (
        <div className="flex items-center ml-[12px] w-[calc(100%-68px)]">
          <div className="flex-1 text-base line-clamp-2">{drop_name}</div>
        </div>
      )}
    </Button>
  )
}

export default CollectionsListItem

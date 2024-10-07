import classnames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-collapse'
import { DROP_TYPES } from '@/enum'
import { useLayoutData } from '@/contexts/layout'
import { Icon, CollectionCard, Button } from '@/components'
import RarityBadge from '@/components/RarityBadge'
import styles from './styles.module.scss'
import { Rarity } from '@/api/resources/shared/rarity'

interface Props {
  groupId?: number
  dropType?: number
  rarity?: Rarity
  items: any[]
  viewAsCatalog?: boolean
  redeemable?: boolean
}

const CollectionCardGroup = ({
  groupId,
  dropType,
  viewAsCatalog = true,
  rarity,
  redeemable,
  items
}: Props) => {
  const [open, setOpen] = useState(true)
  const { getCollapseStatusById, setCollapseStatus } = useLayoutData()
  const router = useRouter()
  const { collection_id } = router.query
  const dropPosted =
    dropType === DROP_TYPES.POST_TOKEN ||
    dropType === DROP_TYPES.POST_REDEMPTION_DEADLINE
  const collapseKey = `${groupId}${rarity}`

  useEffect(() => {
    const initialCollapsed = getCollapseStatusById(collection_id, collapseKey)
    setOpen(!initialCollapsed)
  }, [])

  if (!items) {
    return null
  }

  const getCollectedCount = () => {
    let count = 0
    items.forEach(item => item.is_collected && count++)
    return count
  }

  const formatCollectedCount = () => {
    return `${getCollectedCount()}/${items.length}`
  }

  const getCollectedPerc = () => {
    return `${(getCollectedCount() / items.length) * 100}%`
  }

  const handleToggle = () => {
    setCollapseStatus(collection_id, collapseKey, open)
    setOpen(!open)
  }

  return (
    <div
      className={classnames(styles.container, {
        'first:border-none': viewAsCatalog,
        'first:-mt-3': viewAsCatalog && rarity
      })}
    >
      {!!rarity && (
        <Button
          className={classnames(styles.header, {
            'pointer-events-none': viewAsCatalog
          })}
          theme="clean"
          onClick={handleToggle}
        >
          <RarityBadge rarity={rarity} redeemable={redeemable} />
          {!viewAsCatalog && (
            <div className={styles.progress}>
              <div className={styles.total}>{formatCollectedCount()}</div>
              <div
                className={classnames(
                  styles.totalProgress,
                  dropPosted && styles.posted
                )}
              >
                <span
                  className={classnames(styles.activeProgress, styles[rarity])}
                  style={{ width: getCollectedPerc() }}
                ></span>
              </div>
              <Icon
                className={classnames(styles.expandIcon, {
                  [styles.open]: open
                })}
                name="arrow-down"
              />
            </div>
          )}
        </Button>
      )}
      <Collapse
        isOpened={viewAsCatalog || open}
        theme={{ collapse: styles.collapse, content: styles.content }}
      >
        {items.map(card => (
          <CollectionCard key={card.id} card={card} />
        ))}
      </Collapse>
    </div>
  )
}

export default CollectionCardGroup

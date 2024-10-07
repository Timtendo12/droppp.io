import { useRouter } from 'next/router'
import classnames from 'classnames'
import React, { useState, useEffect, ReactNode } from 'react'
import { Collapse } from 'react-collapse'
import { useLayoutData } from '@/contexts/layout'
import { Button, Icon } from '@/components'
import styles from './styles.module.scss'
import { TRACKER_SECTION_IDS } from '@/enum'

interface Props {
  id: number
  title: string
  disabled?: boolean
  children: ReactNode
}

const CollectionGroupCollapse = ({ id, title, disabled, children }: Props) => {
  const [open, setOpen] = useState(!!disabled)
  const { getCollapseStatusById, setCollapseStatus } = useLayoutData()

  const router = useRouter()
  const { collection_id } = router.query

  useEffect(() => {
    if (disabled) return
    const initialCollapsed = getCollapseStatusById(collection_id, id)
    setOpen(!initialCollapsed)
  }, [])

  const handleToggle = () => {
    setCollapseStatus(collection_id, id, open)
    setOpen(!open)
  }

  return (
    <div
      id={`collection-group-${id}`}
      className="relative border border-defaultBorder rounded-2xl md:rounded-[32px]"
    >
      <Button
        className={classnames(styles.header, {
          'pointer-events-none': disabled,
          'pb-3': id === TRACKER_SECTION_IDS.ROYALTY_SET
        })}
        theme="clean"
        onClick={handleToggle}
      >
        <div className="h5">{title}</div>
        {!disabled && (
          <Icon
            className={classnames(styles.expandIcon, { [styles.open]: open })}
            name="arrow-down"
          />
        )}
      </Button>
      <Collapse
        isOpened={open}
        theme={{
          collapse: classnames(styles.collapse, {
            'md:mb-1': id === TRACKER_SECTION_IDS.ROYALTY_SET
          }),
          content: styles.content
        }}
      >
        {children}
      </Collapse>
    </div>
  )
}

export default CollectionGroupCollapse

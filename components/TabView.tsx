import _ from 'lodash'
import React, { ReactNode, useState } from 'react'
import HorizontalNavigation from './HorizontalNavigation'
import classNames from 'classnames'

export interface TabViewItem {
  label: string
  content: ReactNode
}

interface TabViewItemWithId extends TabViewItem {
  id: string
}

interface TabView {
  className?: string
  contentClassName?: string
  navClassName?: string
  name: string
  title?: string
  items: TabViewItem[]
}

export default function TabView({
  items,
  name,
  title,
  className = '',
  contentClassName = '',
  navClassName = ''
}: TabView) {
  const tabs: TabViewItemWithId[] = items.map(item => {
    const result = { ...item, id: _.kebabCase(item.label) }
    return {
      ...result,
      onClick: () => setActiveTab(result)
    }
  })
  const [activeTab, setActiveTab] = useState<TabViewItemWithId>(tabs[0])

  return (
    <div
      role="tablist"
      aria-label={`${name} tab`}
      className={classNames('flex flex-col', className)}
    >
      <div className={classNames(navClassName, 'flex mb-2')}>
        {title && <h2 className="h4">{title}</h2>}
        <HorizontalNavigation
          items={tabs}
          initialActiveItem={activeTab}
          className="flex-1 flex justify-end"
          horizontalItemsConfig={{ gap: 3 }}
        />
      </div>

      {tabs.map(({ id, content }: TabViewItemWithId, index) => {
        const isActive = id === activeTab.id
        return (
          isActive && (
            <div
              className={contentClassName}
              key={id}
              id={`panel-${id}`}
              role="tabpanel"
              tabIndex={-index}
              aria-labelledby={`tab-${id}`}
            >
              {content}
            </div>
          )
        )
      })}
    </div>
  )
}

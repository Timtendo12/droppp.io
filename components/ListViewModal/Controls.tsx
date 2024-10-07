import React, { Context, useContext } from 'react'
import classNames from 'classnames'
import SortFilterDropdown from '@/components/SortFilterDropdown'
import { BREAKPOINTS } from '@/constants'
import { RefreshButton } from './RefreshButton'
import { useWindowWidth } from '@/contexts/windowDimensions'
import useBreakpoints from '@/hooks/useBreakpoints'
import { IContextValue, Sort } from './types'

type Props<
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
> = {
  context: Context<ContextValue>
  sort: Sort
  className?: string
}

export default function Controls<
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
>({ context, sort, className }: Props<Item, FetchedData, ContextValue>) {
  const { isLoading, data, actions } = useContext(context)

  const { refresh, updateSort } = actions
  const { sort: sortValue } = data ?? {}

  const windowWidth = useWindowWidth()
  const { isMedium } = useBreakpoints(['md'])
  const isSmallLayout = windowWidth < BREAKPOINTS.listViewModalSm
  const buttonsSize = isMedium ? 'lg' : isSmallLayout ? 'sm' : 'md'

  const handleRefreshButtonClick = () => refresh?.()
  const handleSortChange = (val: string) => updateSort?.(val)

  const renderContent = () => {
    return (
      <>
        <RefreshButton
          size={buttonsSize}
          onClick={handleRefreshButtonClick}
          isDisabled={isLoading}
        />
        <SortFilterDropdown
          className="!m-0"
          triggerConfig={{
            type: 'button',
            size: buttonsSize,
            optionDisplay: isSmallLayout ? 'modal' : 'popup',
            popupBgTheme: 'light'
          }}
          value={sortValue}
          defaultOption={sort.default}
          options={sort.options}
          onChange={handleSortChange}
        />
      </>
    )
  }

  if (isSmallLayout) {
    return (
      <div className="fixed bottom-2 rounded-[38px] p-[12px] bg-black/75 z-30 h-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-[12px]">
        {renderContent()}
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'sticky top-[var(--listViewModalBodyOffsetY-sm)] md:top-[var(--listViewModalBodyOffsetY)] z-20 bg-black w-full ',
        className
      )}
    >
      <div className="flex gap-2 items-center justify-end pb-3">
        {renderContent()}
      </div>
    </div>
  )
}

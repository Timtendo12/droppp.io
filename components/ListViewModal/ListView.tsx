import { Context, ReactNode, useContext } from 'react'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroller'
import { VIEW_MODAL_SCROLLVIEW_ID } from '@/components/Modals/ModalV2/ViewModal'
import { InfiniteScrollLoader } from '@/components/InfiniteScrollLoader'
import { ViewModalScrollBorder } from '@/components/Modals/ModalV2/ViewModal/ViewModalScrollBorder'
import EmptyView, { Config as EmptyViewConfig } from './EmptyView'
import ListLoading from '@/components/Loading/List'
import { ItemType, IContextValue } from './types'

const controlsOffsetMarginClass = 'max-[569px]:mb-12'

type ListItemsProps<
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
> = {
  context: Context<ContextValue>
  emptyViewConfig: EmptyViewConfig
  children?: (item: ItemType<Item, FetchedData, ContextValue>) => ReactNode
}

const ListItems = <
  Item,
  FetchedData,
  Value extends IContextValue<Item, FetchedData>
>({
  context,
  emptyViewConfig,
  children
}: ListItemsProps<Item, FetchedData, Value>) => {
  const { data, actions } = useContext(context)
  const { total = 0, items = [], hasMore = false } = data
  const { fetchMore } = actions

  if (total <= 0)
    return (
      <EmptyView
        {...emptyViewConfig}
        className={classNames('flex-1 px-3', controlsOffsetMarginClass)}
      />
    )

  return (
    <InfiniteScroll
      className="!overflow-visible pb-12 listViewModalSm:pb-8"
      loadMore={fetchMore}
      hasMore={hasMore}
      loader={<InfiniteScrollLoader key="" />}
      useWindow={false}
      getScrollParent={() => document.getElementById(VIEW_MODAL_SCROLLVIEW_ID)}
    >
      {items.map(
        item =>
          !!children && children(item as ItemType<Item, FetchedData, Value>)
      )}
    </InfiniteScroll>
  )
}

export type ListViewProps<
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
> = {
  context: Context<ContextValue>
  emptyViewConfig: EmptyViewConfig
  stickyTopClassName: string
  className?: string
  children?: (item: ItemType<Item, FetchedData, ContextValue>) => ReactNode
}

export const ListView = <
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
>({
  context,
  emptyViewConfig,
  stickyTopClassName,
  className,
  children
}: ListViewProps<Item, FetchedData, ContextValue>) => {
  const { isLoading } = useContext(context)

  return (
    <div className={className}>
      <ViewModalScrollBorder
        className={classNames('sticky z-10', stickyTopClassName)}
      />
      {isLoading ? (
        <ListLoading
          className={classNames('flex-1', controlsOffsetMarginClass)}
        />
      ) : (
        <ListItems context={context} emptyViewConfig={emptyViewConfig}>
          {children}
        </ListItems>
      )}
      {/* MASK TO VISUALLY HIDE ITEMS SCROLLED PAST HEADER */}
      <div
        className="
        fixed z-10 left-0 right-0 top-[var(--viewModalHeaderHeight)] bg-black
        h-[var(--listViewModalBodyOffsetY-sm)] md:h-[var(--listViewModalBodyOffsetY)]"
      />
    </div>
  )
}

export default ListView

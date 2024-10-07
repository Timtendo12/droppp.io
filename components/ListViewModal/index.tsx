import React, { Context, useContext, ReactNode } from 'react'
import classNames from 'classnames'
import ViewModal from '../../components/Modals/ModalV2/ViewModal'
import Loading from '@/components/Loading'
import QuantityBadge from '@/components/QuantityBadge'
import { numberWithCommas } from '@/util/numberHelpers'
import Controls from './Controls'
import ListView from './ListView'
import { Config as EmptyViewConfig } from './EmptyView'
import { ItemType, IContextValue, Sort } from './types'

const STICKY_TOP_CLASSES =
  'listViewModalSm:top-[calc(var(--listViewModalBodyOffsetY-sm)+var(--controlsHeight-sm))] md:top-[calc(var(--listViewModalBodyOffsetY)+var(--controlsHeight))]'

const ViewHeader = ({
  title,
  subtitle,
  count,
  isLoading
}: {
  title: string
  subtitle?: string
  count: number
  isLoading: boolean
}) => {
  const _count = isLoading ? '–' : numberWithCommas(count)
  return (
    <div className="flex flex-col gap-[6px]">
      {subtitle && <div className="h8 text-gray-300 truncate">{subtitle}</div>}
      <div className="flex items-center">
        <h1 className="h5 truncate">{title}</h1>
        <QuantityBadge value={_count} className="ml-1" />
      </div>
    </div>
  )
}

type Props<
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
> = {
  modalId: string
  context: Context<ContextValue>
  title: string
  subTitle?: string
  sort: Sort
  emptyViewConfig: EmptyViewConfig
  wrapClassName?: string
  contentClassName?: string
  leadingContentSlot?: ReactNode
  children?: (item: ItemType<Item, FetchedData, ContextValue>) => ReactNode
}

const ListViewModal = <
  Item,
  FetchedData,
  ContextValue extends IContextValue<Item, FetchedData>
>({
  modalId,
  context,
  title,
  subTitle,
  sort,
  emptyViewConfig,
  wrapClassName,
  contentClassName,
  leadingContentSlot,
  children
}: Props<Item, FetchedData, ContextValue>) => {
  const { isInitializing, isLoading, data } = useContext(context)

  return (
    <ViewModal
      id={modalId}
      cancelButtonConfig={{
        label: 'Close'
      }}
      headerChildren={
        <ViewHeader
          title={title}
          subtitle={subTitle}
          count={data?.total}
          isLoading={isLoading}
        />
      }
    >
      {isInitializing ? (
        <Loading />
      ) : (
        <div
          className={classNames(
            `
            container-sm min-h-full flex flex-col pt-[var(--listViewModalBodyOffsetY-xs)] 
            listViewModalSm:pt-[var(--listViewModalBodyOffsetY-sm)] 
            md:pt-[var(--listViewModalBodyOffsetY)]`,
            contentClassName
          )}
          style={{
            '--listViewModalBodyOffsetY-xs': '24px',
            '--listViewModalBodyOffsetY-sm': '32px',
            '--listViewModalBodyOffsetY': '64px',
            '--controlsHeight-sm': '64px',
            '--controlsHeight': '72px'
          }}
        >
          <Controls
            context={context}
            sort={sort}
            className="max-[569px]:hidden h-[var(--controlsHeight-sm)] md:h-[var(--controlsHeight)]"
          />
          <div
            // className is connected to product slot column by id #productSlot to help with centering of list refresh component
            className={classNames(
              'flex min-w-0 [&:not(&:has(#productSlot))]:flex-1 listViewModalSm:gap-3 max-listViewModalSm:flex-1 max-listViewModalSm:flex-col',
              wrapClassName
            )}
          >
            {leadingContentSlot && (
              <div
                id="productSlot"
                className={classNames(
                  'z-20 flex flex-col self-start listViewModalSm:gap-3 min-w-0 w-full listViewModalSm:w-[201px] min-[815px]:w-[250px] min-[851px]:w-[300px] max-listViewModalSm:bg-black sticky top-[var(--listViewModalBodyOffsetY-xs)]',
                  STICKY_TOP_CLASSES
                )}
              >
                {leadingContentSlot}
              </div>
            )}

            <ListView
              context={context}
              emptyViewConfig={emptyViewConfig}
              className="flex-1 relative min-w-0 flex flex-col"
              stickyTopClassName={STICKY_TOP_CLASSES}
            >
              {children}
            </ListView>
          </div>
        </div>
      )}
    </ViewModal>
  )
}

export default ListViewModal

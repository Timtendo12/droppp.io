import ViewSalesHistoryAction from '@/components/Actions/ViewSalesHistoryAction'
import { CatalogItemSalesHistory } from '@/api/resources/catalog/item/sales/history/get/schema'
import EmptyView from '@/components/ListViewModal/EmptyView'
import { CatalogItemDetailStats } from '@/api/resources/catalog/item/get/schema'
import MarketingStats from '../../../MarketingStats'
import classNames from 'classnames'
import ListItem from '@/features/salesHistory/ListItem'
import { salesHistoryEmptyViewConfig } from '@/features/salesHistory/config'

export enum ItemDisplay {
  PDD = 0,
  PDP = 1
}

type SalesHistoryProps = {
  history: CatalogItemSalesHistory
  stats?: CatalogItemDetailStats
  itemTitle?: string
  type?: ItemDisplay
}

const SalesHistory = ({
  history,
  stats,
  itemTitle,
  type = ItemDisplay.PDP
}: SalesHistoryProps) => {
  const { data } = history

  const baseLinkClasses = 'section-link mt-4'

  let wrapperClasses =
    type === ItemDisplay.PDD
      ? 'w-full text-center'
      : 'container px-0 text-center max-w-[392px] md:max-w-[736px]'
  let historyClasses =
    type === ItemDisplay.PDD ? 'mt-4' : 'w-full flex flex-col mt-4 md:mt-8'
  let historyItemClasses =
    type === ItemDisplay.PDD ? 'max-md:bg-gray-800 body-sm' : ''
  let statsWrapClasses =
    type === ItemDisplay.PDD
      ? '!flex !flex-col divide-gray-800 divide-y mt-4 !gap-y-0 divide-x-0'
      : '!flex !flex-col md:!flex-row divide-y mt-4 max-md:gap-y-0 divide-x-0 md:divide-x md:divide-y-0 md:divide-gray-800 w-full mt-4 md:mt-6'
  let statsInnerClasses =
    type === ItemDisplay.PDD
      ? '!flex-row-reverse justify-between h-9 !basis-0 px-0 md:!px-0 py-[12px] max-md:!border-[1px] max-md:!border-x-0 first:pt-0 last:pb-0 body'
      : '!flex !flex-row-reverse md:!flex-col justify-between items-center md:justify-center gap-1 h-9 md:h-11 max-md:basis-0 py-[12px] md:py-0 md:px-3 max-md:!border-[1px] max-md:!border-x-0 first:pt-0 last:pb-0'
  let statValueClasses = type === ItemDisplay.PDD ? 'h6' : 'h6 md:h4'
  let statCurrencyClasses =
    type === ItemDisplay.PDD ? 'h8 font-semibold' : 'h8 font-semibold md:h7'
  let statLabelClasses =
    type === ItemDisplay.PDD
      ? 'body-sm capitalize font-normal'
      : 'text-base capitalize whitespace-nowrap font-normal md:h7 md:font-extrabold md:uppercase'
  let linkClasses = type === ItemDisplay.PDD ? 'text-sm' : '!text-base'

  return data.length > 0 ? (
    <>
      <div className={wrapperClasses}>
        <div
          className={classNames('text-left h4 md:text-center', {
            'h5 text-left md:!text-left': type === ItemDisplay.PDD
          })}
        >
          Sales History
        </div>
        {stats && (
          <MarketingStats
            stats={stats}
            type="sales-history"
            wrapClassName={statsWrapClasses}
            className={statsInnerClasses}
            statLabelClassName={statLabelClasses}
            statValueClassName={statValueClasses}
            statCurrencyClassName={statCurrencyClasses}
          />
        )}
        <div className={historyClasses}>
          {data.map(item => (
            <ListItem
              key={item.chain_asset_id}
              item={{ profile: item.buyer, ...item }}
              className={historyItemClasses}
              display={type}
            />
          ))}
        </div>
        <ViewSalesHistoryAction
          className={classNames(baseLinkClasses, linkClasses)}
          data_id={data[0].data_id}
          subTitle={itemTitle}
        />
      </div>
    </>
  ) : type === ItemDisplay.PDD ? (
    <div className="my-12">
      <EmptyView {...salesHistoryEmptyViewConfig} />
    </div>
  ) : (
    <div className="mt-16 mb-8">
      <EmptyView {...salesHistoryEmptyViewConfig} />
    </div>
  )
}

export default SalesHistory

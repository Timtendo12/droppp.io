import { Attributes } from '@/components/CatalogItemDetails/Shared/Attributes'
import { Disclosures } from '@/components/CatalogItemDetails/Shared/Disclosures'
import { DropConfig } from '@/config/drops/schema'
import { Description } from './Description'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { shouldProductShowTimeline } from '@/util/assetHelpers'
import DropExclusiveSection from '@/components/DropExclusiveSection'
import { CatalogItemSalesHistory } from '@/api/resources/catalog/item/sales/history/get/schema'
import SalesHistory from '@/components/PageSpecificComponents/pdp/SalesHistory'
import collectionStatsInfoBlockDefinitions from '@/components/InfoBlocks/CollectionStatsInfoBlockDefinitions'
import SeparatedContent from '@/components/SeparatedContent'
import { ImportantDatesTimeline } from '@/components/DropContent/ImportantDatesTimeline'
import { useRef } from 'react'
import useElementWidth from '@/hooks/useElementWidth'
import { useDropContext } from '@/features/drop/DropContextProvider'
import InfoBlocks from '@/components/InfoBlocks'
import useBreakpoints, {
  MututallyExclusiveBreakpointOption
} from '@/hooks/useBreakpoints'

type Props = {
  catalogItem: CatalogItemDetail
  catalogItemSalesHistory?: CatalogItemSalesHistory
  drop?: DropConfig
}

export function NormalDetails({
  catalogItem,
  catalogItemSalesHistory,
  drop
}: Props) {
  let { breakpoint } = useBreakpoints(undefined, 0)
  let statBlocksPerColumn: {
    [K in MututallyExclusiveBreakpointOption]: number
  } = { sm: 2, md: 2, lg: 4, xl: 4 }

  const mergedDrop = { ...drop, ...catalogItem }
  const { stats } = catalogItem

  const shouldShowTimeline = shouldProductShowTimeline(catalogItem)

  const salesHistoryItemTitle = catalogItem.rarity
    ? catalogItem.rarity + ' - ' + catalogItem.name
    : catalogItem.name

  return (
    <div className="w-full flex flex-col items-center">
      <div className="container max-w-[392px] md:max-w-[736px] flex flex-col gap-8 ">
        <Description description={catalogItem.description} />
        <div>
          <div className="h4 mb-3">Stats</div>
          <InfoBlocks
            definitions={collectionStatsInfoBlockDefinitions(catalogItem)}
            blocksPerRow={statBlocksPerColumn[breakpoint]}
            className="grid-cols-4"
          />
        </div>
        {drop?.exclusive && (
          <DropExclusiveSection
            isContainer={false}
            iconClasses="!w-4 !h-4"
            layoutClasses="!items-start !text-left !my-0"
            titleClasses="!font-black !text-xl !leading-tight"
            descriptionClasses="!body text-base"
            linkClasses="md:utility-lg"
            iconInline={true}
          />
        )}
      </div>
      {catalogItemSalesHistory && (
        <div className="container mx-auto w-full max-w-[392px] md:max-w-[1200px]">
          <SeparatedContent showSeparator>
            <SalesHistory
              history={catalogItemSalesHistory}
              stats={stats}
              itemTitle={salesHistoryItemTitle}
            />
          </SeparatedContent>
        </div>
      )}
      {shouldShowTimeline && (
        <div className="container">
          <div className="mx-auto w-[100%] max-w-[360px] md:max-w-[1200px]">
            <SeparatedContent showSeparator>
              <ImportantDates drop={mergedDrop} />
            </SeparatedContent>
          </div>
        </div>
      )}
      <div className="container">
        <div className="mx-auto w-full max-w-[392px] md:max-w-[1200px]">
          <SeparatedContent showSeparator>
            <div className="container px-0 w-full flex flex-col gap-8 mx-auto max-w-[392px] md:max-w-[736px]">
              <Attributes catalogItem={catalogItem} />
              <Disclosures catalogItem={catalogItem} drop={drop} />
            </div>
          </SeparatedContent>
        </div>
      </div>
    </div>
  )
}

const ImportantDates = ({ drop }) => {
  const importantDatesRef = useRef(null)
  const { width } = useElementWidth(importantDatesRef)
  const context = useDropContext()

  if (!context) return null

  const {
    isPostRedemption,
    isLaunched,
    isPostSnapshot,
    isShipping,
    isPostShipping
  } = context

  const isVerticalLayout = width < 768
  const isLeftAligned = width < 475

  return (
    <ImportantDatesTimeline
      ref={importantDatesRef}
      drop={drop}
      config={{
        isVertical: isVerticalLayout,
        textAlign: isLeftAligned ? 'left' : 'center',
        eventLocation: 'pdp',
        states: {
          isLaunched,
          isPostSnapshot,
          isPostRedemption,
          isShipping,
          isPostShipping
        }
      }}
    />
  )
}

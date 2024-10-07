import { dehydrate, QueryClient } from '@tanstack/query-core'
import { NextPageContext } from 'next'
import { DefaultLayout } from '@/layouts'
import { shouldRespondAs404 } from '@/api/core/errors'
import { Loading } from '@/components'
import {
  catalogItemDetailQueryKey,
  getCatalogItemDetail,
  useCatalogItemDetailQuery
} from '@/api/resources/catalog/item/get'
import { serverQueryContext } from '@/api/core/query/options'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { ISeo } from '@/components/Seo'
import { findDropConfigById } from '@/config/drops'
import { CatalogItemBackground } from '@/components/CatalogItemBackground'
import ErrorDetail from '@/components/ApiError'
import { CatalogItemHeader } from '@/components/CatalogItemHeader'
import { CatalogItemDetails } from '@/components/CatalogItemDetails'
import DropNavigation from '@/components/DropNavigation'
import { Drop } from '@/types/drop'
import { getPageOgMeta } from '@/util/metatagHelpers'
import { useCatalogItemSalesHistoryQuery } from '@/api/resources/catalog/item/sales/history/get'
import { isMonsterProduct } from '@/util/assetHelpers'
import { DropTimerProvider } from '@/features/drop/DropTimer'
import { DropProvider } from '@/features/drop/DropContextProvider'

const buildCatalogItemSeo = (
  catalogItem: CatalogItemDetail,
  drop: Drop
): ISeo => {
  const description = drop.isPfp
    ? `Rarity: ${catalogItem.rarity}. View more details about this PFP digital collectible on Droppp.`
    : `Rarity: ${catalogItem.rarity}. View more details about this digital collectible on Droppp.`
  const keywords = `${catalogItem.name}, ${catalogItem.drop_name}, droppp, rarity, digital collectible, NFT, funko`
  return {
    title: `${catalogItem.name} - ${catalogItem.drop_name}`,
    description: description,
    keywords: keywords,
    og: getPageOgMeta(
      drop.meta.og,
      `drops/${drop.cloudinaryFolder}`,
      description,
      keywords
    )
  }
}

export default function ProductPage({
  chainTemplateId
}: {
  chainTemplateId: string
}) {
  const { isLoading, data, isError, error } =
    useCatalogItemDetailQuery(chainTemplateId)

  const {
    isLoading: isSalesHistoryLoading,
    data: salesHistoryData,
    isError: isSalesHistoryError,
    error: salesHistoryError
  } = useCatalogItemSalesHistoryQuery({ data_id: data.card.data_id.toString() })

  if (isLoading) return <Loading />
  if (isError) return <ErrorDetail error={error} />

  if (isSalesHistoryLoading) return <Loading />
  if (isSalesHistoryError) return <ErrorDetail error={salesHistoryError} />

  const { card: catalogItem } = data
  const drop = findDropConfigById(catalogItem.drop_id)
  drop.meta.og.title = `${catalogItem.name} - ${drop.meta.og.title}`
  const headerWrapClasses = isMonsterProduct(drop?.id)
    ? 'container max-w-[392px] md:max-w-2xl mb-8'
    : 'container max-w-[392px] md:max-w-[736px] mb-8'

  return (
    <DefaultLayout
      seo={buildCatalogItemSeo(catalogItem, drop)}
      headerConfiguration={{
        offset: undefined,
        translucent: false
      }}
    >
      <DropProvider drop={drop}>
        <DropTimerProvider drop={drop}>
          {!drop.shouldSkipBuild && (
            <DropNavigation title={catalogItem.name} drop={drop} />
          )}
          <div>
            <CatalogItemBackground catalogItem={catalogItem} drop={drop} />
            <div className="mt-8">
              <div className={headerWrapClasses}>
                <div className="flex flex-col items-center gap-8">
                  <CatalogItemHeader catalogItem={catalogItem} />
                </div>
              </div>
              <CatalogItemDetails
                catalogItem={catalogItem}
                catalogItemSalesHistory={salesHistoryData}
                drop={drop}
              />
            </div>
          </div>
        </DropTimerProvider>
      </DropProvider>
    </DefaultLayout>
  )
}

export async function getServerSideProps(nextPageContext: NextPageContext) {
  const { id } = nextPageContext.query
  const queryClient = new QueryClient()
  const chainTemplateId = id?.toString() ?? ''

  try {
    await queryClient.fetchQuery(
      catalogItemDetailQueryKey(chainTemplateId),
      queryContext =>
        getCatalogItemDetail(
          chainTemplateId,
          serverQueryContext(queryContext, nextPageContext)
        )
    )
  } catch (error) {
    // RQ POC - should we rethrow? e.g a 500 status code - Eric, Fri Jan 20 2023
    if (shouldRespondAs404(error)) return { notFound: true }
  }

  return {
    props: {
      chainTemplateId,
      reactQueryData: dehydrate(queryClient)
    }
  }
}

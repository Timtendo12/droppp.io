import { QueryClient } from '@tanstack/react-query'
import React from 'react'
import { useAuth } from '@/contexts/auth'
import { ButtonLink } from '@/components/Button'
import { Icon } from '@/components'
import { DefaultLayout } from '@/layouts'
import DropHeroFactory from '@/components/DropHeroes/DropHeroFactory'
import DropHeroList from '@/components/DropHeroList'
import DropBlade from '@/components/DropBlade'
import dropManager from '@/services/dropManager'
import { OG_TAGS, SOCIAL_LINKS } from '@/constants'
import FooterLegal from '@/components/Footer/components/FooterLegal'
import { DropState } from '@/enum'
import { Drop } from '@/types/drop'
import { buildOgImageUrl } from '@/util/cloudinaryHelpers'
import MetaPhysical from '@/components/PageSpecificComponents/home/MetaPhysical'
import Droppp101 from '@/components/PageSpecificComponents/home/Droppp101'
import HeroImage from '@/components/HeroImage'
import FooterRestrictions from '@/components/Footer/components/FooterRestrictions'
import MarketplaceBlade from '@/components/PageSpecificComponents/home/MarketplaceBlade'
import {
  HotItems,
  MarketplaceSummary
} from '@/api/resources/marketplace/summary/get/schema'
import CatalogItemsSection from '@/components/MarketplaceItemsSection/CatalogItemsSection'
import {
  getMarketplaceSummary,
  marketplaceSummaryKey
} from '@/api/resources/marketplace/summary/get'
import { serverQueryContext } from '@/api/core/query/options'
import { NextPageContext } from 'next'
import { isHeaderTranslucent } from './drops'
import useSetUpProgress from '@/hooks/useSetUpProgress'
import SeparatedContent from '@/components/SeparatedContent'
import MarketplaceItemsSection from '@/components/MarketplaceItemsSection'
import SectionLink from '@/components/SectionLink'
import useBreakpoints from '@/hooks/useBreakpoints'
import { initialPackSaleEndedWithinSevenDays } from '@/util/timeHelpers'
import { sortDropsByLaunchDate } from '@/util/dropHelpers'

type Props = {
  drops: Drop[]
  dropHeros: Drop[]
  hot_items: HotItems
  summary: MarketplaceSummary
}

const mediaPath = 'pages/home'
const imgPath = 'pages/home/'
const ogImage = buildOgImageUrl(`${mediaPath}/${OG_TAGS.home.og.image}`)
const meta = { ...OG_TAGS.home, og: { ...OG_TAGS.home.og, image: ogImage } }

const footerHeroProps = {
  path: imgPath,
  id: 'pre-footer_qwhv61',
  alt: 'Monster chilling on the bed using their laptop',
  sizing: { height: { mini: 300, full: 1019 }, ratio: 2.75, maxWidth: 1600 },
  // Custom Options: to container, image offset & sizing
  offset: 'translate-x-[5%] min-[420px]:translate-x-[0]'
}

type EducationalContentMode = 'none' | 'metaphysical' | 'droppp101'

const educationalContentMode = (
  user: any,
  isSetUpComplete: boolean
): EducationalContentMode => {
  if (!user) return 'metaphysical'
  if (!isSetUpComplete) return 'droppp101'
  return 'none'
}

const RootPage = ({ drops, dropHeros = [], hot_items }: Props) => {
  const { user } = useAuth()
  const setUpProgress = useSetUpProgress()
  const { isMobile } = useBreakpoints(['mobile'])

  const { isComplete: isSetUpComplete } = setUpProgress
  const footerHeroImageProps = { ...footerHeroProps }
  const noDrops = dropHeros.length === 0
  const shouldShowHotItems = hot_items?.length > 0
  const eduMode = educationalContentMode(user, isSetUpComplete)

  dropHeros = sortDropsByLaunchDate(dropHeros)

  return (
    <DefaultLayout
      seo={meta}
      headerConfiguration={{
        removeNavigationSpacing: !noDrops,
        offset: undefined,
        translucent: isHeaderTranslucent(dropHeros?.[0])
      }}
      footerConfiguration={{
        removeDefaultOffset: true,
        dropLegal: <FooterLegal drops={dropHeros} />,
        children: (
          <FooterRestrictions
            drops={dropHeros}
            displayTerritoryRestrictionDisclaimer={true}
          />
        )
      }}
    >
      <>
        <DropHeroList drops={dropHeros}>
          {(drop, index) => <DropHeroFactory key={index} drop={drop} />}
        </DropHeroList>
        <MarketplaceBlade />

        <section className="container mt-8">
          <SeparatedContent showSeparator={false}>
            <MarketplaceItemsSection<any>
              id="latest-drops"
              title="Latest Drops"
              titleClass="h3 text-center"
              icon={<Icon name="inventory" className="w-4 h-4" />}
              description={<p>Explore these exciting new collections!</p>}
              items={layout => drops.slice(0, layout.columns * 2)}
              itemComponent={(drop, _, cardMetrics) => (
                <DropBlade
                  key={`${drop.id}`}
                  drop={drop}
                  isSmallLayout={cardMetrics.cardLayout === 'small'}
                />
              )}
            />
            <SectionLink className="mt-8" href="/drops">
              View All Drops
            </SectionLink>
          </SeparatedContent>
        </section>

        {eduMode !== 'none' && (
          <SeparatedContent
            showSeparator={isMobile}
            separatorContainerClass="container"
          >
            {eduMode === 'metaphysical' ? (
              <MetaPhysical className="mt-0 md:mt-8 mb-8" />
            ) : eduMode === 'droppp101' ? (
              <Droppp101 className="mb-8" setUpProgress={setUpProgress} />
            ) : (
              <></>
            )}
          </SeparatedContent>
        )}

        {shouldShowHotItems && (
          <section className="container">
            <SeparatedContent showSeparator={eduMode === 'none'}>
              <CatalogItemsSection
                id="hot-items"
                title="Hot Items"
                titleClass="h3 text-center"
                icon={<Icon name="burn" className="w-4 h-4" />}
                description={
                  <p>The most popular items on Droppp within the past day.</p>
                }
                descriptionClass="text-center"
                items={layout =>
                  hot_items.slice(0, layout.columns * 2).map(item => {
                    return {
                      id: item.cardid,
                      ...item
                    }
                  })
                }
              />
              <SectionLink className="mt-8" href="/marketplace">
                View Marketplace
              </SectionLink>
            </SeparatedContent>
          </section>
        )}

        <SeparatedContent
          // If Let's Talk is right next to Shop The Latest Drops don't show the separator.
          showSeparator={!(!shouldShowHotItems && eduMode !== 'none')}
          separatorContainerClass="container"
        >
          <section>
            <div className="flex flex-col items-center mx-auto mt-8 text-center max-w-[1440px] overflow-hidden">
              <div className="container max-w-[534px]">
                <h2 className="h2 mb-2">Let’s Talk!</h2>
                <p className="body md:body-lg mb-4">
                  We’re chatting about the next drop, promotions, challenges and
                  more on Discord. Come join the fun!
                </p>
              </div>
              <ButtonLink
                className="w-max relative z-10"
                theme="rainbow"
                size="lg"
                newTab
                href={SOCIAL_LINKS.discord}
              >
                <div className="flex">
                  <Icon className="mr-1" name="discord-white" />
                  Join us on discord
                </div>
              </ButtonLink>
              <HeroImage {...footerHeroImageProps} />
            </div>
          </section>
        </SeparatedContent>
      </>
    </DefaultLayout>
  )
}

export default RootPage

export async function getServerSideProps(nextPageContext: NextPageContext) {
  const dropStates = [
    DropState.AnnounceLiteUltra,
    DropState.AnnounceLiteMystery,
    DropState.SaleContinued
  ]

  const dropHeroStates = [
    DropState.AnnounceLiteUltra,
    DropState.AnnounceLiteMystery,
    DropState.AnnounceFull,
    DropState.AnnounceFullCatalogEnabled,
    DropState.SaleContinued,
    DropState.SaleEnded,
    DropState.SoldOut
  ]

  const drops = await dropManager.refresh(
    drop =>
      !dropStates.includes(drop.state) &&
      !initialPackSaleEndedWithinSevenDays(drop.time_launch) &&
      !drop.shouldSkipBuild
  )

  const dropHeros = await dropManager.refresh(
    drop =>
      dropHeroStates.includes(drop.state) &&
      initialPackSaleEndedWithinSevenDays(drop.time_launch)
  )

  let hot_items: HotItems = []

  // Hot Items from Marketplace Summary
  try {
    const queryClient = new QueryClient()
    const response = await queryClient.fetchQuery(
      marketplaceSummaryKey(['hot_items']),
      queryContext =>
        getMarketplaceSummary(
          undefined,
          serverQueryContext(queryContext, nextPageContext)
        )
    )
    hot_items = response.hot_items
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }

  return {
    props: {
      hot_items,
      drops: drops.slice(0, 8),
      dropHeros: dropHeros
    }
  }
}

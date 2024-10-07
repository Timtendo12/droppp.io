import { QueryClient } from '@tanstack/react-query'
import { NextPageContext } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { serverQueryContext } from '@/api/core/query/options'
import {
  getMarketplaceSummary,
  marketplaceSummaryQueryKey
} from '@/api/resources/marketplace/summary/get'
import { MarketplaceSummary } from '@/api/resources/marketplace/summary/get/schema'
import { Icon } from '@/components'
import SectionLink from '@/components/SectionLink'
import MarketplaceItemsSection from '@/components/MarketplaceItemsSection'
import CatalogItemsSection from '@/components/MarketplaceItemsSection/CatalogItemsSection'
import ShopDroppp from '@/components/PageSpecificComponents/marketplace/ShopDroppp'
import { findDropConfigById } from '@/config/drops'
import {
  OG_TAGS,
  SECONDARY_NAV_HEIGHT,
  SECONDARY_NAV_HEIGHT_PX
} from '@/constants'
import DefaultLayout from '@/layouts/Default'
import { buildOgImageUrl } from '@/util/cloudinaryHelpers'
import { DateFormatter } from '@/util/time'
import { formattedPacificDate } from '@/util/time/pt'
import ScrollableSecondaryNavigation from '@/components/ScrollableSecondaryNavigation'
import MARKET_LANDING_SUBNAV_LINKS from '@/constants/market-landing-subnav'
import useHiddenHeader from '@/hooks/useHiddenHeader'
import useIsSticky from '@/hooks/useIsSticky'
import { spreadIntoEach } from '@/util/arrayHelpers'
import SeparatedContent from '@/components/SeparatedContent'
import MonsterPromoHeader from '@/components/MonsterPromoHeader'
import BrandSeparator from '@/components/BrandSeparator'
import CloudinaryImage from '@/components/CloudinaryImage'
import FAQ_QUESTIONS from '@/constants/questions'
import DropShopBlade from '@/components/DropBlade/DropShopBlade'
import CollectionTrackerCTA from '@/components/PageSpecificComponents/marketplace/CollectionTrackerCTA'
import { DROP_THEME } from '@/constants/drops'

type Props = {
  summary: MarketplaceSummary
}

const mediaPath = 'pages/marketplace'

const Marketplace = ({ summary }: Props) => {
  const subNavRef = useRef<HTMLDivElement>()
  const [sections, setSections] = useState<NodeListOf<HTMLElement>>()

  const ogImage = buildOgImageUrl(
    `${mediaPath}/${OG_TAGS.marketplace.og.image}`
  )

  const meta = {
    ...OG_TAGS.marketplace,
    og: { ...OG_TAGS.marketplace.og, image: ogImage }
  }

  const isSticky = useIsSticky(subNavRef, {
    threshold: 0.999,
    rootMargin: `0px 0px -${SECONDARY_NAV_HEIGHT_PX} 0px`
  })

  const shouldShowHotItems = summary.hot_items.length > 0
  const shouldShowExpiringSoon = summary.closing_redemptions.length > 0
  const shouldShowUpcomingRedemptions = summary.starting_redemptions.length > 0
  const shouldShowFreshInventory = summary.recently_listed_assets.length > 0

  const subnav = MARKET_LANDING_SUBNAV_LINKS.filter(link => {
    if (
      (link.id === 'hot-items' && !shouldShowHotItems) ||
      (link.id === 'expiring-soon' && !shouldShowExpiringSoon) ||
      (link.id === 'upcoming-snapshots' && !shouldShowUpcomingRedemptions) ||
      (link.id === 'fresh-inventory' && !shouldShowFreshInventory)
    ) {
      return undefined
    }
    return link
  })

  useHiddenHeader(isSticky)

  useEffect(() => {
    setSections(document.querySelectorAll('section'))
  }, [])

  return (
    <DefaultLayout
      seo={meta}
      headerConfiguration={{
        offset: undefined
      }}
    >
      <MonsterPromoHeader />

      <div className="md:pl-3">
        <ShopDroppp />
      </div>
      <div
        className="border-b w-full border-gray-800 sticky top-[-1px] -bottom-9 flex bg-black z-[21]"
        ref={subNavRef}
      >
        <ScrollableSecondaryNavigation
          className="w-full flex justify-center h-9"
          horizontalItemsConfig={{ align: 'center' }}
          items={subnav}
          sections={sections}
          scrollOffset={SECONDARY_NAV_HEIGHT}
        />
      </div>
      <div className="mt-8 container">
        {shouldShowHotItems && (
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
              summary.hot_items.slice(0, layout.columns * 2).map(item => {
                return {
                  id: item.cardid,
                  ...item
                }
              })
            }
          />
        )}

        <SeparatedContent showSeparator={shouldShowHotItems}>
          <MarketplaceItemsSection<any>
            id="latest-drops"
            title="Shop The Latest Drops"
            titleClass="h3 text-center"
            icon={<Icon name="inventory" className="w-4 h-4" />}
            description={<p>Join in on these exciting new collections!</p>}
            items={layout =>
              summary.drops
                .map(item => {
                  const drop = findDropConfigById(item.id)
                  if (!drop) return null
                  return {
                    drop: drop,
                    ...item
                  }
                })
                .filter(drop => drop)
                .slice(0, layout.columns * 2)
            }
            itemComponent={(drop, _, cardMetrics) => {
              return (
                <DropShopBlade
                  key={`${drop.id}`}
                  drop={drop.drop}
                  activeListingCount={drop.active_listing_count}
                  isSmallLayout={cardMetrics.cardLayout === 'small'}
                />
              )
            }}
          />
          <SectionLink className="mt-8" href="/drops">
            View All Drops
          </SectionLink>
          <CollectionTrackerCTA className="mt-8" />
        </SeparatedContent>

        {shouldShowExpiringSoon && (
          <SeparatedContent>
            <section className="w-full" id="expiring-soon">
              <div>
                <div className="flex flex-col items-center text-center">
                  <Icon name="clock" className="w-4 h-4 mb-1" />
                  <h3 className="h3 mb-1">Expiring Soon</h3>
                  <p className="body lg:body-lg text-center text-gray-300 max-w-3xl">
                    Grab a redemption token to instantly redeem for a physical
                    collectible before they expire on the dates indicated below.
                  </p>

                  {/* REPEATED / SectionLink remove component */}
                  <SectionLink
                    className="mt-3"
                    href={`/faq?question=${FAQ_QUESTIONS.redemptions.items.howDoRedemptionTokensWork.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    How do Redemption Tokens Work?
                  </SectionLink>
                </div>
                {summary.closing_redemptions.map((drop, index) => {
                  const dropConfig = findDropConfigById(drop.drop_id)
                  if (!dropConfig) return null

                  return (
                    <SeparatedContent
                      showSeparator={index != 0}
                      key={drop.drop_id}
                    >
                      <CatalogItemsSection
                        id={drop.drop_id.toString()}
                        drop_id={drop.drop_id}
                        title={drop.drop_name}
                        titleClass="h5 mb-[13px]"
                        headerClass="!items-start"
                        headerLogos={<DropLogoHeader drop={dropConfig} />}
                        description={
                          <ClosingRedemptionsDescription
                            date={drop.redeem_end_date}
                          />
                        }
                        descriptionClass="!text-base"
                        className="mt-8 !px-0"
                        items={spreadIntoEach(drop.cards, {
                          drop_name: drop.drop_name
                        })}
                      />
                      <SectionLink
                        className="mt-8"
                        href={`${dropConfig.url}/shop`}
                      >
                        Shop Collection
                      </SectionLink>
                    </SeparatedContent>
                  )
                })}
              </div>
            </section>
          </SeparatedContent>
        )}

        {shouldShowUpcomingRedemptions && (
          <SeparatedContent>
            <section className="w-full" id="upcoming-snapshots">
              <div>
                <div className="flex flex-col items-center text-center">
                  <Icon name="calendar" className="w-4 h-4 mb-1" />
                  <h3 className="h3 mb-1">Upcoming Snapshots</h3>
                  <p className="body lg:body-lg text-gray-300 max-w-3xl">
                    These collections are within 30 days of their snapshot.
                    Collect a Legendary or Grail before the snapshot to be
                    eligible for a redemption token when it occurs.
                  </p>
                  <SectionLink
                    href={`/faq?question=${FAQ_QUESTIONS.redemptions.items.whatAreCollectionSnapshots.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3"
                  >
                    What is a Snapshot?
                  </SectionLink>
                </div>

                {summary.starting_redemptions.map((drop, index) => {
                  const dropConfig = findDropConfigById(drop.drop_id)
                  if (!dropConfig) return null
                  return (
                    <SeparatedContent
                      showSeparator={index != 0}
                      key={drop.drop_id}
                    >
                      <CatalogItemsSection
                        key={drop.drop_id}
                        id={drop.drop_id.toString()}
                        drop_id={drop.drop_id}
                        title={drop.drop_name}
                        titleClass="h5 mb-[13px]"
                        headerClass="!items-start"
                        headerLogos={<DropLogoHeader drop={dropConfig} />}
                        description={
                          <UpcomingRedemptionsDescription
                            date={drop.redeem_start_date}
                          />
                        }
                        descriptionClass="!text-base"
                        className="mt-8 !px-0"
                        items={spreadIntoEach(drop.cards, {
                          drop_name: drop.drop_name
                        })}
                      />
                      <SectionLink
                        className="mt-8"
                        href={`${dropConfig.url}/shop`}
                      >
                        Shop Collection
                      </SectionLink>
                    </SeparatedContent>
                  )
                })}
              </div>
            </section>
          </SeparatedContent>
        )}

        {shouldShowFreshInventory && (
          <SeparatedContent>
            <CatalogItemsSection
              id="fresh-inventory"
              title="Fresh Inventory"
              titleClass="h3 text-center"
              description={
                <p>
                  These items have inventory available now! Grab some before
                  they’re gone.
                </p>
              }
              descriptionClass="text-center"
              icon={<Icon name="market" className="w-4 h-4" />}
              items={layout =>
                summary.recently_listed_assets
                  .slice(0, layout.columns * 2)
                  .map(item => {
                    return {
                      id: item.cardid,
                      ...item
                    }
                  })
              }
            />
          </SeparatedContent>
        )}
      </div>
    </DefaultLayout>
  )
}

export default Marketplace

const DropLogoHeader = ({ drop }) => {
  const {
    heroLogo,
    heroLogo2,
    heroLogoAlt,
    theme,
    exclusive,
    cloudinaryFolder
  } = drop

  const imgPath = `drops/${cloudinaryFolder}/`

  const isLightTheme = theme === DROP_THEME.LIGHT

  let logoId, logoHeight, logoWidth
  if (isLightTheme && heroLogoAlt) {
    logoId = heroLogoAlt.id
    logoHeight = heroLogoAlt.height
    logoWidth = heroLogoAlt.width
  } else {
    logoId = heroLogo.id
    logoHeight = heroLogo.height
    logoWidth = heroLogo.width
  }

  return exclusive ? (
    <div className="max-sm:mb-3 mb-2">
      <div
        className="max-sm:w-full flex max-sm:justify-center items-center gap-2"
        style={{
          maxHeight: 'calc(var(--fluidUnit) * 9',
          minHeight: '56px'
        }}
      >
        <Icon name="funkoLogo" />
        <BrandSeparator />
        <Icon name={'exclusiveBadgeTextWhite'} />
      </div>
      <div className="max-sm:w-full flex items-center gap-2 mt-[13px]">
        {heroLogo2 && (
          <>
            <CloudinaryImage
              imageId={heroLogo2.id}
              path={imgPath}
              layout="fixed"
              height={heroLogo2.height / 2}
              width={heroLogo2.width / 2}
            />
            <BrandSeparator />
          </>
        )}
        <CloudinaryImage
          imageId={logoId}
          path={imgPath}
          layout="fixed"
          height={logoHeight / 2}
          width={logoWidth / 2}
        />
      </div>
    </div>
  ) : (
    <div
      className="max-sm:w-full flex max-sm:justify-center items-center gap-2 max-sm:mb-3 mb-[13px]"
      style={{
        maxHeight: 'calc(var(--fluidUnit) * 9',
        minHeight: '56px'
      }}
    >
      <Icon name="funkoLogo" />
      <BrandSeparator />
      {heroLogo2 && (
        <>
          <CloudinaryImage
            imageId={heroLogo2.id}
            path={imgPath}
            layout="fixed"
            height={heroLogo2.height / 2}
            width={heroLogo2.width / 2}
          />
          <BrandSeparator />
        </>
      )}
      <CloudinaryImage
        imageId={logoId}
        path={imgPath}
        layout="fixed"
        height={logoHeight / 2}
        width={logoWidth / 2}
      />
    </div>
  )
}

const ClosingRedemptionsDescription = ({ date }) => {
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 flex items-center justify-center mr-1 flex-shrink-0">
        <Icon name="clock" color="white" className="h-2 w-2" />
      </div>
      <span className="body text-white">
        Redeem by{' '}
        {formattedPacificDate(
          date,
          DateFormatter.LongHoursMinutesSecondsSansYear,
          true
        )}
      </span>
    </div>
  )
}

const UpcomingRedemptionsDescription = ({ date }) => {
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 flex items-center justify-center mr-1 flex-shrink-0">
        <Icon name="calendar" color="white" className="h-2 w-2" />
      </div>
      <span className="body text-white">
        Collect before{' '}
        {formattedPacificDate(
          date,
          DateFormatter.LongHoursMinutesSansYear,
          true
        )}
      </span>
    </div>
  )
}

export async function getServerSideProps(nextPageContext: NextPageContext) {
  const queryClient = new QueryClient()

  const summary = await queryClient.fetchQuery(
    marketplaceSummaryQueryKey,
    queryContext =>
      getMarketplaceSummary(
        null,
        serverQueryContext(queryContext, nextPageContext)
      )
  )

  if (!summary) {
    return { notFound: true }
  }

  return {
    props: { summary }
  }
}

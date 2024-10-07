import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/layouts/Default'
import DropBlade, { DropBladeData } from '@/components/DropBlade'
import dropManager from '@/services/dropManager'
import moment from 'moment'
import { OG_TAGS } from '@/constants'
import CatchEveryDrop from '@/components/PageSpecificComponents/drops/CatchEveryDrop'
import StayTuned from '@/components/PageSpecificComponents/drops/StayTuned'
import FooterLegal from '@/components/Footer/components/FooterLegal'
import DropHeroFactory from '@/components/DropHeroes/DropHeroFactory'
import { DropState } from '@/enum'
import { Drop } from '@/types/drop'
import { buildOgImageUrl } from '@/util/cloudinaryHelpers'
import FooterRestrictions from '@/components/Footer/components/FooterRestrictions'
import DropHeroList from '@/components/DropHeroList'
import useElementWidth from '@/hooks/useElementWidth'
import ProductGrid from '@/components/ProductGrid'
import { initialPackSaleEndedWithinSevenDays } from '@/util/timeHelpers'
import { sortDropsByLaunchDate } from '@/util/dropHelpers'
import { DROP_THEME } from '@/constants/drops'

const mediaPath = 'pages/drops'
const ogImage = buildOgImageUrl(`${mediaPath}/${OG_TAGS.drops.og.image}`)

const meta = {
  ...OG_TAGS.drops,
  og: { ...OG_TAGS.drops.og, image: ogImage }
}

type Props = {
  drops: [string, DropBladeData[]][]
  dropHeros: Drop[]
}

export const isHeaderTranslucent = (dropHero: Drop) => {
  return dropHero ? (dropHero.theme === DROP_THEME.LIGHT ? false : true) : true
}

const DropsLandingPage = ({ drops, dropHeros = [] }: Props) => {
  const containerRef = useRef<HTMLDivElement>()
  const { width: containerWidth } = useElementWidth(containerRef)
  const router = useRouter()

  useEffect(() => {
    if (
      'scrollRestoration' in history &&
      history.scrollRestoration !== 'manual'
    ) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  // handle and store scroll position
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  // restore scroll position
  useEffect(() => {
    if ('scrollPosition' in sessionStorage && containerWidth) {
      window.scrollTo(0, Number(sessionStorage.getItem('scrollPosition')))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [containerWidth])

  return (
    <DefaultLayout
      seo={meta}
      footerConfiguration={{
        dropLegal: <FooterLegal drops={dropHeros} />,
        children: (
          <FooterRestrictions
            drops={dropHeros}
            displayTerritoryRestrictionDisclaimer={true}
          />
        )
      }}
      headerConfiguration={{
        removeNavigationSpacing: true,
        translucent: isHeaderTranslucent(dropHeros?.[0])
      }}
    >
      {dropHeros.length > 0 ? (
        <>
          <DropHeroList drops={dropHeros}>
            {(drop, index) => <DropHeroFactory key={index} drop={drop} />}
          </DropHeroList>
          <CatchEveryDrop />
        </>
      ) : (
        <StayTuned />
      )}
      <div className="container max-w-[1200px]">
        {drops.map((year, index) => (
          <div
            key={index}
            id={`drops-${year[0]}`}
            className="[&:not(:last-child)]:mb-8"
          >
            <h4 className="h4 mb-4">{`Class of ${year[0]}`}</h4>
            <div className="w-full" ref={containerRef}>
              <ProductGrid
                containerWidth={containerWidth}
                items={year[1]}
                itemComponent={(drop, _, cardMetrics) => (
                  <DropBlade
                    key={`${drop.id}`}
                    drop={drop}
                    isSmallLayout={cardMetrics.cardLayout === 'small'}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  )
}
export default DropsLandingPage

export async function getServerSideProps() {
  const drops = await dropManager.refresh(
    drop =>
      !dropStates.includes(drop.state) &&
      !initialPackSaleEndedWithinSevenDays(drop.time_launch) &&
      !drop.shouldSkipBuild
  )

  // only pass the data needed for the page
  const mappedDrops = drops.map(
    ({
      id,
      url,
      mockName,
      cardBg,
      cardBgSmall,
      cardLogo,
      type,
      cloudinaryFolder,
      exclusive = false,
      time_launch
    }) => {
      return {
        id,
        url,
        mockName,
        cardBg,
        cardBgSmall,
        cardLogo,
        type,
        cloudinaryFolder,
        exclusive,
        time_launch
      }
    }
  )

  const heros = await dropManager.refresh(
    drop =>
      dropHeroStates.includes(drop.state) &&
      initialPackSaleEndedWithinSevenDays(drop.time_launch)
  )

  return {
    props: {
      drops: arrangeDropsByYear(mappedDrops),
      dropHeros: sortDropsByLaunchDate(heros)
    }
  }
}

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

const arrangeDropsByYear = drops => {
  const result = {}
  for (let item, i = 0; (item = drops[i++]); ) {
    let year = moment(item.time_launch).format('Y')

    if (!(year in result)) {
      result[year] = []
    }
    result[year].push(item)
  }
  return Object.entries(result).reverse()
}

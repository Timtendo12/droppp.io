import classNames from 'classnames'
import { createContext, useContext, useState } from 'react'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { isPfp } from '@/api/resources/shared/drop'
import { MediaLoadingSkeleton } from '@/components/MediaLoadingSkeleton'
import { NormalHero } from './NormalHero'
import { PfpHero } from './PfpHero'
import { Action } from './Action'
import { Content } from './Content'

export type HeaderContextType = {
  catalogItem: CatalogItemDetail | null
}

export const HeaderContext = createContext<HeaderContextType>({
  catalogItem: null
})

export const useHeaderContext = () =>
  useContext(HeaderContext) as HeaderContextType

export function CatalogItemHeader({
  catalogItem
}: {
  catalogItem: CatalogItemDetail
}) {
  const [loadingHero, setLoadingHero] = useState(true)
  const isPfpItem = isPfp(catalogItem)
  const handleLoadComplete = () => setLoadingHero(false)

  return (
    <HeaderContext.Provider
      value={{
        catalogItem
      }}
    >
      <Content
        itemHero={
          <div className="flex flex-col items-center relative">
            <div
              className={classNames(
                'relative flex flex-col items-center gap-2 drop-shadow-2xl',
                {
                  'w-[300px] h-[300px] md:w-[340px] md:h-[340px]': isPfpItem
                }
              )}
            >
              {isPfpItem ? (
                <PfpHero onLoadComplete={handleLoadComplete} />
              ) : (
                <NormalHero onLoadComplete={handleLoadComplete} />
              )}
            </div>
            {loadingHero ? (
              <MediaLoadingSkeleton className="absolute inset-0" />
            ) : null}
          </div>
        }
        itemAction={<Action hasowner={isPfpItem} />}
      />
    </HeaderContext.Provider>
  )
}

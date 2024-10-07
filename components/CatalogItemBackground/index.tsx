import { CSSProperties } from 'react'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { buildCloudinaryUrl } from '@/util/cloudinaryHelpers'
import { DropConfig } from '@/config/drops/schema'
import { isPfp } from '@/api/resources/shared/drop'
import DropFallbackHeroBg from '@/components/DropFallbackHeroBg'

export interface CSSVariables extends CSSProperties {
  '--bg-image-url': string
}

export function CatalogItemBackground({
  catalogItem,
  drop
}: {
  catalogItem: CatalogItemDetail
  drop?: DropConfig
}) {
  if (!drop) {
    return null
  }

  return <HeroBg drop={drop} catalogItem={catalogItem} />
}

const HeroBg = ({ drop, catalogItem }) => {
  if (drop.heroBg) {
    const bgHeight = isPfp(catalogItem)
      ? 'h-[276px] md:h-[304px]'
      : 'h-[340px] md:h-[300px]'

    const bgUrl = buildCloudinaryUrl(
      `drops/${drop.cloudinaryFolder}`,
      drop.heroBg
    )

    const style = {
      '--bg-image-url': `url(${bgUrl})`
    } satisfies CSSVariables

    return (
      <div style={style} className="relative">
        <div
          className={`absolute bg-[image:var(--bg-image-url)] w-full bg-no-repeat bg-cover bg-center ${bgHeight} z-[-1]`}
        ></div>
      </div>
    )
  } else {
    return (
      <div className="relative">
        <DropFallbackHeroBg />
      </div>
    )
  }
}

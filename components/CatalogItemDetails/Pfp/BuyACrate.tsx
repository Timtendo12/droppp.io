import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { useGetDrop } from '@/api/resources/drop/get'
import { ButtonLink } from '@/components/Button'
import Separator from '@/components/Separator'
import { findDropConfigById } from '@/config/drops'
import CloudinaryImage from '@/components/CloudinaryImage'

export function BuyACrate({ item }: { item: CatalogItemDetail }) {
  const { listings_available, collected_count, drop_id } = item
  const { cloudinaryFolder } = findDropConfigById(drop_id)
  const imgPath = `drops/${cloudinaryFolder}/`

  const inCrate = !(listings_available > 0) && !collected_count

  const { isLoading, data } = useGetDrop(drop_id, {
    enabled: inCrate
  })

  if (!inCrate || isLoading || !data) {
    return <></>
  }

  const { chain_template_id } = data.drop.assets[0]

  return (
    <div className="text-center">
      <Separator className="mb-8" />
      <CloudinaryImage
        path={imgPath}
        imageId="pack1"
        alt="Crate Image"
        width={144}
        height={142}
      />
      <h3 className="h3 mt-2">Unleash A Beast</h3>
      <p className="text-gray-200 mt-2">
        This monster is still inside a crate — will it be you who sets it free?
        <br />
        Open a crate for a chance to release it.
      </p>
      <ButtonLink
        className="inline-flex mt-2"
        theme="blue"
        size="lg"
        newTab
        href={`/products/${chain_template_id}`}
      >
        Buy a crate
      </ButtonLink>
      <Separator className="mt-8" />
    </div>
  )
}

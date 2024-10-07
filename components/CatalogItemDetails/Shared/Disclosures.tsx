import Link from 'next/link'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { DropConfig } from '@/config/drops/schema'

export function Disclosures({
  catalogItem: {
    legal,
    immutables: { EULA }
  },
  drop
}: {
  catalogItem: CatalogItemDetail
  drop?: DropConfig
}) {
  const territoryRestrictions = drop?.openables?.territoryRestrictions

  return (
    <div className="flex flex-col gap-8 w-full justify-start">
      {territoryRestrictions ? (
        <div className="flex flex-col gap-2">
          <h4 className="h4">Territory Restrictions</h4>
          <p
            className="body-md text-gray-300"
            dangerouslySetInnerHTML={{ __html: territoryRestrictions }}
          />
        </div>
      ) : null}
      {legal ? (
        <div className="flex flex-col gap-2">
          <h4 className="h4">Legal</h4>
          <p className="body-md text-gray-300">{legal}</p>
        </div>
      ) : null}
      {EULA ? (
        <div className="flex flex-col gap-2">
          <h4 className="h4">EULA</h4>
          <p className="body-md">
            <Link className="text-white" href={EULA}>
              {EULA}
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  )
}

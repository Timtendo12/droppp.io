import React, { ReactNode } from 'react'
import { Asset } from '@/api/resources/asset/get/schema'
import RoundedBox from '@/components/RoundedBox'
import ProductTransactionCard from './ProductTransactionCard'

type Props = {
  asset: Asset
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  renderRightColumnTopSlot?: () => ReactNode
}

export default function ProductTransactionLayout({
  asset,
  title,
  description,
  children,
  renderRightColumnTopSlot
}: Props) {
  return (
    <div className="container pb-4 mt-4 md:mt-8 px-3 max-[390px]:px-2">
      <h3 className="h3 text-left md:text-center my-1 pl-1 md:pl-0">{title}</h3>

      {description && (
        <h4 className="body-sm font-normal text-gray-200 text-left md:text-center mt-1 pl-1 md:pl-0">
          {description}
        </h4>
      )}

      {/* Asset */}
      <div className="min-[570px]:flex min-[570px]:space-x-3 md:flex md:justify-center mt-4 items-start">
        <ProductTransactionCard asset={asset} />

        {/* Children / Right Column */}
        <div className="min-[570px]:min-w-[260px] min-[570px]:w-[480px] flex-0 mt-3 min-[570px]:mt-0">
          {renderRightColumnTopSlot?.()}
          <RoundedBox className="!px-0 !pb-3 !pt-0">{children}</RoundedBox>
        </div>
      </div>
    </div>
  )
}

import NiceModal from '@ebay/nice-modal-react'
import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import { CLOUDINARY_WALLET_PATH } from '@/pages/wallet'
import Button from '@/components/Button'
import CloudinaryImage from '@/components/CloudinaryImage'
import RoundedBox from '@/components/RoundedBox'

export default function ColumnCustomAddressUpsell() {
  return (
    <aside>
      <RoundedBox className="!bg-gray-800 flex flex-col text-center lg:text-left lg:flex-row items-center gap-3 !p-3">
        <div className="max-lg:order-1">
          <h4 className="h5 mb-1">Make your profile sing</h4>
          <p className="body-sm mb-2 text-gray-300">
            Stand out with a unique and easy to remember Droppp address for a
            one-time purchase of $4.99
          </p>
          <Button
            className="max-lg:w-full"
            size="xs"
            onClick={() => NiceModal.show(MODAL_ID.wallet.customWaxAddress)}
          >
            Get Custom Address
          </Button>
        </div>
        <div className="aspect-1 relative min-w-[139px]">
          <CloudinaryImage
            layout="fill"
            imageId={'upgrade-address'}
            path={CLOUDINARY_WALLET_PATH}
            objectFit="contain"
            objectPosition="center"
          />
        </div>
      </RoundedBox>
    </aside>
  )
}

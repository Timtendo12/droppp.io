import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth'
import { ButtonLink } from '@/components/Button'
import RoundedBox from '@/components/RoundedBox'
import { CollectionsItemType } from '@/api/resources/user/tracker/drops/get/schema'
import { findDropConfigById } from '@/config/drops'
import moment from 'moment'
import { dateToMoment } from '@/util/time'
import { DropState } from '@/enum'

const CollectionBanner = ({
  collection
}: {
  collection: CollectionsItemType
}) => {
  const { selectedWallet } = useAuth()

  const drop = findDropConfigById(collection.id)

  if (!drop) return null

  const { time_launch, state, id } = drop
  const isStillAvailable =
    dateToMoment(time_launch).isBefore(moment()) &&
    state !== DropState.SaleEnded &&
    state !== DropState.SoldOut

  if (isStillAvailable) {
    return (
      <RoundedBox className="!bg-blue mb-3 text-center !py-3 !px-2">
        <h3 className="h5">Packs are still available!</h3>
        <p className="body-sm mt-1">
          Time’s running out, there are still packs up for grabs.{' '}
          <Link
            href={`/reserve-drop/?drop_id=${id}`}
            target="_blank"
            className="underline"
          >
            Buy Now
          </Link>
        </p>
      </RoundedBox>
    )
  }

  if (!selectedWallet) {
    return (
      <RoundedBox className="text-gray-300 body mb-4">
        To buy items within the Collection Tracker you must have a Droppp
        address. Get a free Droppp address by purchasing your first pack during
        a drop or by depositing at least 5 USDC into your Droppp Balance.
        Alternatively, you can upgrade to a custom address now for $4.99.
        <br />
        <ButtonLink href="/wallet" size="xs" className="mt-2 inline-flex">
          Upgrade to Custom Address
        </ButtonLink>
      </RoundedBox>
    )
  }

  return null
}

export default CollectionBanner

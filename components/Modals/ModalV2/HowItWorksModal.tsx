import NiceModal from '@ebay/nice-modal-react'
// Constants & Helpers
import { MODAL_ID } from '@/constants/modalId'
import { hideModal } from '.'
import {
  footer,
  button,
  linkNewTab,
  info,
  paragraphClasses
} from './shared/props'
import { showDropStatusIndicator } from '@/util/dropHelpers'
import { DateFormatter, dateToMoment, addHours } from '@/util/time'
import { formattedPacificDate } from '@/util/time/pt'
import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
// Components
import Button from '@/components/Button'
import DatePill from '@/components/DatePill'
import { getDropCloudinaryFolderById } from '@/config/drops'
import { DropConfig } from '@/config/drops/schema'
import Link from 'next/link'
import { getDynamicDropState } from '@/util/dropHelpers'
import { findDropConfigById } from '@/config/drops'
import { DynamicDropState } from '@/enum'
import classNames from 'classnames'
import ModalSequence from './ModalSequence'
import { redeemableRarityString } from '@/util/rarityHelpers'
import { HOW_IT_WORKS_TITLES } from '@/features/drop/howItWorks/content'

////////////////////////////////////////////////////////////////////////////////
// Types, Enums & Constants

export enum ModalViewId {
  Introduction = 'introduction',
  RedemptionBegins = 'redemption-begins',
  RedemptionEnds = 'redemption-ends',
  Final = 'final'
}

type ModalSequenceGoTo = {
  (target: string | number): void
  (arg0: ModalViewId): void
}

type ModalSequenceIndicatorProps = {
  id: ModalViewId
  goTo: ModalSequenceGoTo
}

type FooterProps = {
  id: ModalViewId
  goTo: ModalSequenceGoTo
  onNext: () => void
  onPreview?: () => void
}

////////////////////////////////////////////////////////////////////////////////
// Component
interface Props {
  viewId: ModalViewId
  catalogItem: CatalogItemDetail
}

const HowItWorksModal = NiceModal.create(
  ({ viewId = ModalViewId.Introduction, catalogItem }: Props) => {
    const viewIndex: number = Object.values(ModalViewId).indexOf(viewId)
    const Content = getContent(catalogItem)
    return (
      <ModalSequence
        id={MODAL_ID.howItWorks}
        modalId={MODAL_ID.howItWorks}
        initialViewIndex={viewIndex}
        init={({ goTo, next, previous }) => [
          {
            id: ModalViewId.Introduction,
            title: Content[ModalViewId.Introduction].title,
            onSubmit: null,
            isForm: false,
            header: Content[ModalViewId.Introduction].header,
            indicator: Content[ModalViewId.Introduction].indicator,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>{Content[ModalViewId.Introduction].view}</ModalBody>
                <ModalFooter>
                  <Footer
                    id={ModalViewId.Introduction}
                    onNext={next}
                    goTo={goTo}
                  />
                </ModalFooter>
              </>
            )
          },
          {
            id: ModalViewId.RedemptionBegins,
            onSubmit: null,
            isForm: false,
            title: Content[ModalViewId.RedemptionBegins].title,
            header: Content[ModalViewId.RedemptionBegins].header,
            indicator: Content[ModalViewId.RedemptionBegins].indicator,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>
                  {Content[ModalViewId.RedemptionBegins].view}
                </ModalBody>
                <ModalFooter>
                  <Footer
                    id={ModalViewId.RedemptionBegins}
                    onNext={next}
                    onPreview={previous}
                    goTo={goTo}
                  />
                </ModalFooter>
              </>
            )
          },
          {
            id: ModalViewId.RedemptionEnds,
            onSubmit: null,
            isForm: false,
            title: Content[ModalViewId.RedemptionEnds].title,
            header: Content[ModalViewId.RedemptionEnds].header,
            indicator: Content[ModalViewId.RedemptionEnds].indicator,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>
                  {Content[ModalViewId.RedemptionEnds].view}
                </ModalBody>
                <ModalFooter>
                  <Footer
                    id={ModalViewId.RedemptionEnds}
                    onNext={next}
                    onPreview={previous}
                    goTo={goTo}
                  />
                </ModalFooter>
              </>
            )
          },
          {
            id: ModalViewId.Final,
            onSubmit: null,
            isForm: false,
            title: Content[ModalViewId.Final].title,
            header: Content[ModalViewId.Final].header,
            indicator: Content[ModalViewId.Final].indicator,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>{Content[ModalViewId.Final].view}</ModalBody>
                <ModalFooter>
                  <Footer
                    id={ModalViewId.Final}
                    onNext={next}
                    onPreview={previous}
                    goTo={goTo}
                  />
                </ModalFooter>
              </>
            )
          }
        ]}
      />
    )
  }
)

////////////////////////////////////////////////////////////////////////////////
// Helper Components

const Footer = ({ onNext, onPreview, ...props }: FooterProps) => {
  const isStart = props.id === ModalViewId.Introduction
  const isFinal = props.id === ModalViewId.Final
  return (
    <div {...footer} key={props.id}>
      <div className="flex flex-col w-full">
        <div className="w-full flex gap-2">
          {!isStart && (
            <Button {...button} size="md" theme="gray" onClick={onPreview}>
              Previous
            </Button>
          )}
          <Button
            {...button}
            size="md"
            theme="white"
            onClick={isFinal ? () => hideModal(MODAL_ID.howItWorks) : onNext}
          >
            {isFinal ? 'Close' : 'Next'}
          </Button>
        </div>
        <ModalSequenceIndicator {...props} />
      </div>
    </div>
  )
}

const ModalSequenceIndicator = ({ id, goTo }: ModalSequenceIndicatorProps) => {
  const ids = Object.values(ModalViewId)
  const selected = ids.indexOf(id)
  return (
    <div className="gap-1 w-full flex flex-1 flex-row items-center justify-center mt-3">
      {ids.map((id, i) => (
        <div
          key={id}
          onClick={() => {
            goTo(i)
          }}
          className={`h-1 rounded ${
            i == selected ? 'w-3 bg-white' : 'w-1 bg-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////
// Helper Content

const getContent = (
  catalogItem: CatalogItemDetail & Pick<DropConfig, 'id'>
) => {
  const {
    time_launch,
    redeem_start_date,
    redeem_end_date,
    estimated_ship_target,
    redeem_ship_date
  } = catalogItem

  const drop_id = catalogItem.drop_id || catalogItem.id
  const drop = findDropConfigById(drop_id)
  const dropState = getDynamicDropState(drop)

  const rsdFormatted = formattedPacificDate(
    redeem_start_date,
    DateFormatter.LongHours,
    true
  )
  const redFormatted = formattedPacificDate(
    redeem_end_date,
    DateFormatter.LongHoursMinutesSeconds,
    true
  )

  const endClosingDate = addHours(redeem_end_date, 11)
  const cloudinaryFolder = getDropCloudinaryFolderById(drop_id)
  const sharedImageProps = {
    width: 480,
    height: 300,
    path: cloudinaryFolder,
    className: 'aspect-[24/15]'
  }

  const collectionTrackerURL = `/collection-tracker/${
    dropState != DynamicDropState.Announce ? `?collection_id=${drop_id}` : ''
  }`

  const modal1Copy = catalogItem.exclusive
    ? 'Collect Digital Pop! by opening packs or buying them on'
    : 'Collect Digital Pop! by opening packs or buying them on a secondary marketplace like'

  return {
    [ModalViewId.Introduction]: {
      title: HOW_IT_WORKS_TITLES[ModalViewId.Introduction],
      header: {
        image: {
          ...sharedImageProps,
          id: 'hiw-1',
          alt: 'Open Packs & Collect Digital Pop!'
        }
      },
      indicator: (
        <HIWDatePill
          heading={formattedPacificDate(time_launch)}
          status={showDropStatusIndicator(
            dateToMoment(time_launch),
            dateToMoment(redeem_start_date)
          )}
        />
      ),
      view: (
        <>
          <p className={classNames(paragraphClasses, '-mt-1')}>
            {modal1Copy}{' '}
            <Link href="/marketplace" {...linkNewTab} className="inline-link">
              Droppp Marketplace
            </Link>
            . Collecting a {redeemableRarityString(drop)} qualifies you for a
            Redemption Token to redeem the physical counterpart.
            <br />
            <br />
            What is a Royalty Set? Every collection will have a unique physical
            Pop! that can be redeemed by collecting one of every Common,
            Uncommon, Rare, and Epic Digital Pop! in that set.
            <br />
            <br />
            Check out the{' '}
            <Link
              href={collectionTrackerURL}
              {...linkNewTab}
              className="inline-link"
            >
              Collection Tracker
            </Link>{' '}
            after opening a pack to track your progress toward completing a
            Royalty Set.
          </p>
          <p {...info}>
            Keep Royalty Sets in the same account to receive a Redemption Token.
          </p>
        </>
      )
    },
    [ModalViewId.RedemptionBegins]: {
      title: HOW_IT_WORKS_TITLES[ModalViewId.RedemptionBegins],
      header: {
        image: {
          ...sharedImageProps,
          id: 'hiw-2',
          alt: 'Redemption begins'
        }
      },
      indicator: (
        <HIWDatePill
          heading={formattedPacificDate(redeem_start_date)}
          status={showDropStatusIndicator(
            dateToMoment(redeem_start_date),
            dateToMoment(redeem_end_date)
          )}
        />
      ),
      view: (
        <>
          <p className={classNames(paragraphClasses, '-mt-1')}>
            A snapshot of your inventory will occur on {rsdFormatted}. For every{' '}
            {redeemableRarityString(drop)} in your inventory, you’ll receive a
            Redemption Token to redeem within 30 days for the physical
            counterpart.
          </p>
          <p {...info}>
            Collecting a {redeemableRarityString(drop)} after the snapshot will
            not grant you a Redemption Token. We advise not opening packs or
            transferring items for at least one hour before or after the
            snapshot time to be certain they are included in the snapshot. Any
            items received from opening a pack after the snapshot will not
            receive a Redemption Token.
          </p>
        </>
      )
    },
    [ModalViewId.RedemptionEnds]: {
      title: HOW_IT_WORKS_TITLES[ModalViewId.RedemptionEnds],
      header: {
        image: {
          ...sharedImageProps,
          id: 'hiw-3',
          alt: 'Redemption Ends'
        }
      },
      indicator: (
        <HIWDatePill
          heading={formattedPacificDate(redeem_end_date)}
          status={showDropStatusIndicator(
            dateToMoment(redeem_end_date),
            endClosingDate
          )}
        />
      ),
      view: (
        <p className={classNames(paragraphClasses, '-mt-1')}>
          Redeem your Redemption Tokens within 30 days before they expire on{' '}
          {redFormatted}.
        </p>
      )
    },
    [ModalViewId.Final]: {
      title: HOW_IT_WORKS_TITLES[ModalViewId.Final],
      header: {
        image: {
          ...sharedImageProps,
          id: 'hiw-4',
          alt: 'ENJOY YOUR physical collectibles'
        }
      },
      indicator: (
        <HIWDatePill
          // show actual date if backend provides it, otherwise show estimated date
          heading={
            (redeem_ship_date && formattedPacificDate(redeem_ship_date)) ||
            estimated_ship_target
          }
          status={showDropStatusIndicator(
            dateToMoment(redeem_end_date),
            dateToMoment(redeem_ship_date)
          )}
        />
      ),
      view: (
        <>
          <p className={classNames(paragraphClasses, '-mt-1')}>
            Sit back and relax, limited edition physical collectible figures
            will be on their way<sup>†</sup>. Tracking links will be provided in
            your Activity when ready.
          </p>
          <p {...info}>
            Shipping date subject to change based on global shipping and port
            delays.
            <br />
            <sup>†</sup>For tokens redeemed by {redFormatted}.
          </p>
        </>
      )
    }
  }
}

export default HowItWorksModal

const HIWDatePill = ({ heading, status }) => {
  return (
    <DatePill
      className="mb-3"
      emphasize
      heading={heading}
      emphasizeClassName={'!border-gray-300'}
      status={status}
    />
  )
}

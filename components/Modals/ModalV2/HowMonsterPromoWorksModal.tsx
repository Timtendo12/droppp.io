import NiceModal from '@ebay/nice-modal-react'
import { useRouter } from 'next/router'
import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import { useAuth } from '@/contexts/auth'
import Button from '@/components/Button'
import Modal, { hideModal } from './'
import { findDropConfigById } from '@/config/drops'
import { Promotion } from '@/contexts/auth/types'
import { DROPPP_MONSTERS_ID, getDropppMonstersPromotion } from '@/constants'
import classNames from 'classnames'

const Content = {
  summary: ({
    startDisplayDate,
    endDisplayDate,
    endDisplayYear,
    marketplaceFee
  }: Promotion) => (
    <>
      From {startDisplayDate} - {endDisplayDate}, {endDisplayYear}, enjoy a
      waived {marketplaceFee} marketplace fee when selling items from any
      collection while having your avatar set to a Series 1 Droppp Monster.
    </>
  ),
  terms: [
    () => (
      <>
        To receive a 0% marketplace fee when listing an item on Droppp, owners
        of Droppp Monster Series 1 must have their avatar set to any monster
        held in their Droppp inventory at the time of listing.
      </>
    ),
    () => (
      <>
        Please note that setting a monster in your avatar does not apply
        retroactively to existing listings. To enjoy the 0% marketplace fee on
        existing listings, users must modify each listing individually.
      </>
    ),
    () => (
      <>
        Existing listings will continue to benefit from the 0% marketplace fee
        even after this promotion expires.
      </>
    ),
    ({ marketplaceFee }: Promotion) => (
      <>
        If a listing is modified or cancelled and re-listed after the promotion
        ends, it will be subject to the standard {marketplaceFee} marketplace
        fee.
      </>
    ),
    ({ marketplaceFee }: Promotion) => (
      <>
        In case an owner sells or removes their Droppp monster, active listings
        that were listed with a 0% marketplace fee will continue to enjoy this
        benefit until modified or cancelled and re-listed. Once modified or
        cancelled and re-listed, the listing will be subject to the standard{' '}
        {marketplaceFee} marketplace fee.
      </>
    )
  ]
}

interface Props {
  onNavigate?: () => void
  overlayClassName?: string
}

const HowMonsterPromoWorksModal = NiceModal.create<Props>(
  ({ onNavigate, overlayClassName }) => {
    const { user } = useAuth() || {}
    const { push: navigateTo } = useRouter()
    const droppp = findDropConfigById(DROPPP_MONSTERS_ID)

    // can we determine if they have a Monster avatar available?
    const canSetAvatar = !!user?.account_wax

    // clean up and then navigate to a new page
    const closeThenNavigate = (url: string) => {
      hideModal(MODAL_ID.howMonsterPromoWorks)
      navigateTo(url)
      onNavigate?.()
    }

    // selecting avatars or shop pages
    const handleShopMonsters = () => closeThenNavigate(`${droppp.url}/shop`)
    const handleSetAvatar = () =>
      closeThenNavigate(`/${user.account_wax}/?set-avatar`)

    const shopMonstersButton = (
      <Button
        onClick={handleShopMonsters}
        className="!whitespace-normal leading-[100%]"
      >
        Shop Monsters
      </Button>
    )

    const setAvatarButton = (
      <Button theme="gray" onClick={handleSetAvatar}>
        Set Avatar
      </Button>
    )

    const footerClasses = classNames(
      'grid gap-2',
      canSetAvatar ? 'grid-cols-2' : 'grid-cols-1'
    )

    const monsterPromo = getDropppMonstersPromotion()

    return (
      <Modal
        id={MODAL_ID.howMonsterPromoWorks}
        overlayClassName={overlayClassName}
        title="How It Works"
      >
        {({ ModalBody, ModalFooter }) => (
          <>
            <ModalBody>
              <p className="mb-2 text-lg">{Content.summary(monsterPromo)}</p>
              <p className="modal-copy-sm mb-2 font-bold">
                Terms &amp; Conditions
              </p>
              <ol className="modal-copy-sm list-decimal mr-1 ml-2 leading-normal">
                {Content.terms.map((term, i) => (
                  <li key={`item_${i}`}>{term(monsterPromo)}</li>
                ))}
              </ol>
            </ModalBody>
            <ModalFooter>
              <div className={footerClasses}>
                {canSetAvatar && setAvatarButton}
                {shopMonstersButton}
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
    )
  }
)

export default HowMonsterPromoWorksModal

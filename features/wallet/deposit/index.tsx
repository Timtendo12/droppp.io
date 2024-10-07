import NiceModal from '@ebay/nice-modal-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MODAL_ID } from '@/constants/modalId'
import { hideModal } from '@/components/Modals/ModalV2'
import {
  submit,
  paragraphClasses,
  footer
} from '@/components/Modals/ModalV2/shared/props'
import { Content as ContentGetUSDC } from '@/components/Modals/ModalV2/content/getUSDC'
import { Content as ContentDepositUSDC } from './components/depositUSDC'
import { Content as ContentConfirmToken } from './components/confirmToken'
import { Content as ContentChooseNetwork } from './components/chooseNetwork'
import ModalSequence from '@/components/Modals/ModalV2/ModalSequence'
import Button from '@/components/Button'
import classNames from 'classnames'
import { DepositProvider } from '@/features/wallet/deposit/components/DepositContext'

////////////////////////////////////////////////////////////////////////////////
// Types, Enums & Constants

enum ModalViewId {
  ChooseAdventure = 'choose-adventure',
  HowCanIGetUSDC = 'how-can-i-get-usdc',
  ConfirmToken = 'confirm-token',
  ChooseNetwork = 'choose-network',
  DepositUSDC = 'deposit-usdc',
  AlmostDone = 'almost-done'
}

type ModalSequenceGoTo = {
  (target: string | number): void
  (arg0: ModalViewId): void
}

////////////////////////////////////////////////////////////////////////////////
// Component

const DepositSequenceModal = NiceModal.create(() => {
  // Hooks ///////////////////////////////////////////////////////////////////////
  const router = useRouter()
  const [hasUSDC, setHasUSDC] = useState<boolean>(false)

  const handleSupportLink = () =>
    router.push('/support').then(() => hideModal(MODAL_ID.wallet.addFunds))

  // Retreat
  const handleRetreatHowCanIGetUSDC = (goTo: ModalSequenceGoTo): void =>
    goTo(ModalViewId.ChooseAdventure)

  const handleRetreatConfirmToken = (goTo: ModalSequenceGoTo): void =>
    hasUSDC
      ? goTo(ModalViewId.ChooseAdventure)
      : goTo(ModalViewId.HowCanIGetUSDC)

  // Advance
  const handleGoToConfirmToken = (goTo: ModalSequenceGoTo): void =>
    goTo(ModalViewId.ConfirmToken)

  const handleGoToHowCanIGetUSDC = (goTo: ModalSequenceGoTo): void =>
    goTo(ModalViewId.HowCanIGetUSDC)

  // Render /////////////////////////////////////////////////////////////////////

  return (
    <DepositProvider>
      <ModalSequence
        id={MODAL_ID.wallet.addFunds}
        modalId={MODAL_ID.wallet.addFunds}
        init={sequenceControls => {
          const { previous, goTo } = sequenceControls
          const selectorContent = ContentDepositUSDC()

          return [
            {
              id: ModalViewId.ChooseAdventure,
              title: 'Choose Your Adventure',
              overlayHeaderOpaqueOnScroll: true,
              header: {
                image: {
                  path: 'global/modals/',
                  id: 'choose-adventure',
                  alt: 'header image',
                  width: 480,
                  height: 300,
                  className: 'aspect-[24/15]'
                }
              },
              view: ({ ModalFooter, ModalBody }) => (
                <>
                  <ModalBody>
                    <p className={classNames(paragraphClasses)}>
                      Droppp Marketplace only accepts USDC for funding your
                      account. USDC is a stablecoin that is meant to work like a
                      substitute for a U.S. dollar. If you don’t have USDC, we
                      will help you purchase some. Otherwise, you may proceed
                      with funding your account.
                    </p>
                  </ModalBody>
                  <ModalFooter {...footer}>
                    <Button
                      {...submit}
                      theme="white"
                      onClick={() => {
                        setHasUSDC(false)
                        handleGoToHowCanIGetUSDC(goTo)
                      }}
                    >
                      How to get&nbsp;USDC
                    </Button>
                    <Button
                      {...submit}
                      theme="blue"
                      onClick={() => {
                        setHasUSDC(true)
                        handleGoToConfirmToken(goTo)
                      }}
                    >
                      I&nbsp;have USDC
                    </Button>
                  </ModalFooter>
                </>
              )
            },
            {
              id: ModalViewId.HowCanIGetUSDC,
              title: ContentGetUSDC.title,
              onRetreat: () => handleRetreatHowCanIGetUSDC(goTo),
              header: { image: { ...ContentGetUSDC.image } },
              overlayHeaderOpaqueOnScroll: true,
              view: ({ ModalFooter, ModalBody }) => (
                <>
                  <ModalBody>
                    {ContentGetUSDC.body(handleSupportLink)}
                  </ModalBody>
                  <ModalFooter {...footer}>
                    <Button
                      {...submit}
                      onClick={() => handleGoToConfirmToken(goTo)}
                    >
                      I&nbsp;have&nbsp;USDC
                    </Button>
                  </ModalFooter>
                </>
              )
            },
            {
              id: ModalViewId.ConfirmToken,
              title: ContentConfirmToken.title,
              onRetreat: () => handleRetreatConfirmToken(goTo),
              header: ContentConfirmToken.header,
              overlayHeaderOpaqueOnScroll: true,
              view: props =>
                ContentConfirmToken.view({ ...props, ...sequenceControls })
            },
            {
              id: ModalViewId.ChooseNetwork,
              title: ContentChooseNetwork.title,
              onRetreat: previous,
              header: ContentChooseNetwork.header,
              overlayHeaderOpaqueOnScroll: true,
              view: props =>
                ContentChooseNetwork.view({
                  ...props,
                  ...sequenceControls
                })
            },
            {
              id: ModalViewId.DepositUSDC,
              title: ContentDepositUSDC().title,
              onRetreat: previous,
              header: selectorContent.header,
              overlayHeaderOpaqueOnScroll: true,
              view: props =>
                selectorContent.view({
                  ...props,
                  ...sequenceControls
                })
            },
            {
              id: ModalViewId.AlmostDone,
              title: 'Almost Done',
              overlayHeaderOpaqueOnScroll: true,
              header: {
                image: {
                  path: 'global/modals/',
                  id: 'what-is-usdc',
                  alt: 'header image',
                  width: 480,
                  height: 300,
                  className: 'aspect-[24/15]'
                }
              },
              onRetreat: previous,
              view: ({ ModalBody, ModalFooter }) => (
                <>
                  <ModalBody>
                    <p className={classNames(paragraphClasses)}>
                      To finish depositing funds into your Droppp Balance please
                      review and complete your transaction in your crypto
                      exchange or external wallet. Then sit back and relax;
                      funds typically arrive within 10 minutes.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      {...submit}
                      onClick={() => hideModal(MODAL_ID.wallet.addFunds)}
                    >
                      Done
                    </Button>
                  </ModalFooter>
                </>
              )
            }
          ]
        }}
      />
    </DepositProvider>
  )
})

export default DepositSequenceModal

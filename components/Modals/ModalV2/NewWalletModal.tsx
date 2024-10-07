import NiceModal from '@ebay/nice-modal-react'
// Constants & Helpers
import { MODAL_ID } from '@/constants/modalId'
import { hideModal, switchModal } from '.'
import { paragraphClasses, footer, button, linkNewTab } from './shared/props'
import { Content as ContentGetUSDC } from './content/getUSDC'
// Components
import ModalSequence, {
  IModalSequenceControllerProps,
  IModalSequenceViewProps
} from './ModalSequence'
import Button from '@/components/Button'
import classNames from 'classnames'

////////////////////////////////////////////////////////////////////////////////
// Types, Enums & Constants

enum ModalViewId {
  Introduction = 'information',
  WhatIsUSDC = 'what-is-usdc',
  GetUSDC = 'get-usdc',
  Security = 'security',
  Verify = 'verify'
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
}

////////////////////////////////////////////////////////////////////////////////
// Component

const NewWalletModal = NiceModal.create(() => {
  return (
    <ModalSequence
      id={MODAL_ID.wallet.newWalletAlert}
      modalId={MODAL_ID.wallet.newWalletAlert}
      init={({ goTo, next, previous }: IModalSequenceControllerProps) =>
        [
          {
            id: ModalViewId.Introduction,
            title: Content[ModalViewId.Introduction].title,
            header: Content[ModalViewId.Introduction].header,
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
            id: ModalViewId.WhatIsUSDC,
            onRetreat: () => previous(),
            title: Content[ModalViewId.WhatIsUSDC].title,
            header: Content[ModalViewId.WhatIsUSDC].header,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>{Content[ModalViewId.WhatIsUSDC].view}</ModalBody>
                <ModalFooter>
                  <Footer
                    id={ModalViewId.WhatIsUSDC}
                    onNext={next}
                    goTo={goTo}
                  />
                </ModalFooter>
              </>
            )
          },
          {
            id: ModalViewId.GetUSDC,
            onRetreat: () => previous(),
            title: Content[ModalViewId.GetUSDC].title,
            header: Content[ModalViewId.GetUSDC].header,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>{Content[ModalViewId.GetUSDC].view}</ModalBody>
                <ModalFooter>
                  <Footer id={ModalViewId.GetUSDC} onNext={next} goTo={goTo} />
                </ModalFooter>
              </>
            )
          },
          {
            id: ModalViewId.Security,
            onRetreat: () => previous(),
            title: Content[ModalViewId.Security].title,
            header: Content[ModalViewId.Security].header,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>{Content[ModalViewId.Security].view}</ModalBody>
                <ModalFooter>
                  <Footer id={ModalViewId.Security} onNext={next} goTo={goTo} />
                </ModalFooter>
              </>
            )
          },
          {
            id: ModalViewId.Verify,
            onRetreat: () => previous(),
            title: Content[ModalViewId.Verify].title,
            header: Content[ModalViewId.Verify].header,
            overlayHeaderOpaqueOnScroll: true,
            view: ({ ModalBody, ModalFooter }) => (
              <>
                <ModalBody>{Content[ModalViewId.Verify].view}</ModalBody>
                <ModalFooter>
                  <Footer id={ModalViewId.Verify} onNext={next} goTo={goTo} />
                </ModalFooter>
              </>
            )
          }
        ] as IModalSequenceViewProps[]
      }
    />
  )
})

////////////////////////////////////////////////////////////////////////////////
// Helpers

const handleGoToWallet = () => {
  hideModal(MODAL_ID.wallet.newWalletAlert)
}

const handleVerifyIdentity = () => {
  switchModal(MODAL_ID.wallet.newWalletAlert, MODAL_ID.identityVerificationGate)
}

////////////////////////////////////////////////////////////////////////////////
// Helper Components

const Footer = ({ onNext, ...props }: FooterProps) => {
  const isVerify = props.id === ModalViewId.Verify
  const theme = isVerify ? 'rainbow' : 'white'
  return (
    <div {...footer} key={props.id}>
      <div className="flex flex-col w-full">
        <div className="w-full flex gap-2">
          {isVerify && (
            <Button
              {...button}
              size="md"
              theme="gray"
              onClick={handleGoToWallet}
            >
              {Content[ModalViewId.Verify].dismiss}
            </Button>
          )}
          <Button
            {...button}
            size="md"
            theme={theme}
            onClick={isVerify ? handleVerifyIdentity : onNext}
          >
            {Content[props.id].action}
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

const sharedImageProps = {
  width: 480,
  height: 300,
  path: 'global/modals/',
  className: 'aspect-[24/15]'
}

const Content: Record<
  ModalViewId,
  Omit<IModalSequenceViewProps, 'id'> & { dismiss?: string; action: string }
> = {
  [ModalViewId.Introduction]: {
    title: 'Introducing the new & Improved Droppp Wallet',
    header: {
      image: {
        ...sharedImageProps,
        id: 'wallet-mon_1',
        alt: 'Header image with a wallet, cards and license'
      }
    },
    view: (
      <>
        <p className={classNames(paragraphClasses, '-mt-1')}>
          Droppp now enables you to carry a balance for purchases on the Droppp
          Marketplace. Add funds easily by transferring USDC from an external
          crypto wallet or exchange. Identity verification is required to add
          funds or withdraw from your Droppp Balance.
        </p>
        <p className={paragraphClasses}>
          Funds in your Droppp Balance are managed by 
          <a href="http://circle.com" {...linkNewTab}>
            Circle
          </a>
           and seamlessly integrated into Droppp.
        </p>
      </>
    ),
    action: 'What is USDC?'
  },
  [ModalViewId.WhatIsUSDC]: {
    title: 'What is USDC?',
    header: {
      image: {
        ...sharedImageProps,
        id: 'what-is-usdc',
        alt: 'Header image with a monster sitting on a bench reading a tech magazine'
      }
    },
    view: (
      <p className={classNames(paragraphClasses, '-mt-1')}>
        USDC is a stablecoin that is meant to work like a substitute for a U.S.
        dollar. Currently, Droppp only supports USDC for funding your Droppp
        balance and making purchases on the marketplace.
      </p>
    ),
    action: 'Where Can I get USDC?'
  },
  [ModalViewId.GetUSDC]: {
    title: 'Where Can I get USDC?',
    header: {
      image: ContentGetUSDC.image
    },
    view: (
      <p className={classNames(paragraphClasses, '-mt-1')}>
        Adding funds to your Droppp Wallet is easy. Simply transfer USDC from an
        external crypto wallet or buy it from an exchange like 
        <a href="http://coinbase.com" {...linkNewTab}>
          Coinbase
        </a>
         and transfer it to your Droppp Wallet.
      </p>
    ),
    action: 'Learn About Security'
  },
  [ModalViewId.Security]: {
    title: 'We Take Security Seriously',
    header: {
      image: {
        ...sharedImageProps,
        id: 'safe-secure',
        alt: 'Header image with a coin surrounded by security lasers'
      }
    },
    view: (
      <p className={classNames(paragraphClasses, '-mt-1')}>
        Droppp takes security seriously and uses a variety of measures to
        protect your account, including two-factor authentication when
        withdrawing.
      </p>
    ),
    action: 'Last Step'
  },
  [ModalViewId.Verify]: {
    title: 'Verify Your Identity',
    header: {
      image: {
        ...sharedImageProps,
        id: 'kyc',
        alt: 'Header image of a monster behind a security podium reviewing a passport',
        path: 'global/modals/'
      }
    },
    view: (
      <p className={classNames(paragraphClasses, '-mt-1')}>
        Before you can start listing items, adding or withdrawing funds, and
        making purchases on the Droppp Marketplace, you'll need to verify your
        identity. This process is quick and easy and usually requires only a
        photo I.D. and a few minutes of your time.
      </p>
    ),
    dismiss: 'Go To Wallet',
    action: 'Verify Identity'
  }
}

export default NewWalletModal

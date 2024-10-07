import { buildCloudinaryVideoUrl } from '@/util/cloudinaryHelpers'
import CoinbaseOverlayDisclaimer from '@/features/wallet/deposit/components/CoinbaseOverlayDisclaimer'
import USDCDepositSelector from '@/features/wallet/deposit/components/USDCDepositSelector'
import TransparentVideo from '@/components/TransparentVideo'
import { NetworkType } from '@/api/resources/shared/crypto'
import { CRYPTO_NETWORKS } from '@/constants/cryptoNetworks'
import Toast from '@/components/Toast'
import { submit } from '@/components/Modals/ModalV2/shared/props'
import Button from '@/components/Button'
import SubFooter from '@/features/wallet/deposit/components/SubFooter'
import { WalletAddressGetResponse } from '@/api/resources/user/wallet/address/get/schema'
import {
  useDepositContext,
  useDepositDispatch
} from '@/features/wallet/deposit/components/DepositContext'
import {
  ContentType,
  DepositViewType,
  DepositViewBodyProps
} from '@/features/wallet/deposit/types'
import { ModalHeaderContent } from '@/components/Modals/ModalV2/ModalHeader'
import { useWalletQuery } from '@/api/resources/user/wallet/get'
import { DEPOSIT_CLOUDINARY_PATH } from '../../core/constants'

const EthereumScanTutorialAlpha = {
  component: (
    <TransparentVideo
      sources={{
        mp4: {
          src: buildCloudinaryVideoUrl(
            DEPOSIT_CLOUDINARY_PATH,
            'tutorial-ethereum-phone-hevc'
          )
        },
        webm: {
          src: buildCloudinaryVideoUrl(
            DEPOSIT_CLOUDINARY_PATH,
            'tutorial-ethereum-phone'
          )
        }
      }}
    />
  )
}
const PolygonScanTutorialAlpha = {
  component: (
    <TransparentVideo
      sources={{
        mp4: {
          src: buildCloudinaryVideoUrl(
            DEPOSIT_CLOUDINARY_PATH,
            'tutorial-polygon-phone-hevc'
          )
        },
        webm: {
          src: buildCloudinaryVideoUrl(
            DEPOSIT_CLOUDINARY_PATH,
            'tutorial-polygon-phone'
          )
        }
      }}
    />
  )
}

const EthereumTutorialCopyVideo = {
  video: {
    path: DEPOSIT_CLOUDINARY_PATH,
    id: 'tutorial-ethereum-desktop'
  }
}
const PolygonTutorialCopyVideo = {
  video: {
    path: DEPOSIT_CLOUDINARY_PATH,
    id: 'tutorial-polygon-desktop'
  }
}

type DepositCopy = {
  title: string
  description: string
  media: ModalHeaderContent
}

const DEPOSIT_QR_DATA = (network: NetworkType): DepositCopy => {
  const media =
    network === 'POLY' ? PolygonScanTutorialAlpha : EthereumScanTutorialAlpha
  return {
    title: 'Scan',
    description: `Scan the QR below from inside your crypto exchange’s app or external wallet. Then double check that your network is set to ${CRYPTO_NETWORKS[network].label}. No memo required.`,
    media: media
  }
}

const DEPOSIT_COPY_DATA = (network: NetworkType): DepositCopy => {
  const media =
    network === 'POLY' ? PolygonTutorialCopyVideo : EthereumTutorialCopyVideo
  return {
    title: 'Paste',
    description: `Copy the address below and paste it into your crypto exchange or external wallet. Then double check that your network is set to ${CRYPTO_NETWORKS[network].label}. No memo required.`,
    media: media
  }
}

interface DepositSelectorBodyProps extends DepositViewBodyProps {
  onChange: (val: DepositViewType) => void
  address: WalletAddressGetResponse
  state: DepositViewType
  content: DepositCopy
  network: NetworkType
}

const DepositSelectorBody = ({
  onChange,
  address,
  network,
  state,
  content,
  next,
  ModalBody,
  ModalFooter
}: DepositSelectorBodyProps) => {
  const {
    data: { has_deposited }
  } = useWalletQuery()

  return (
    <>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300">{content.description}</p>
          {!has_deposited && (
            <Toast type="information" inline>
              Pro Tip: Since this is your first time depositing funds at Droppp,
              you may want to consider sending a small amount first.
            </Toast>
          )}
          <USDCDepositSelector
            address={address}
            state={'deposit'}
            viewState={state}
            network={network}
            onChange={onChange}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button {...submit} onClick={next}>
          Next
        </Button>
        <SubFooter />
      </ModalFooter>
    </>
  )
}

export const Content = (): ContentType => {
  const { depositViewType, network = 'POLY', address } = useDepositContext()
  const dispatch = useDepositDispatch()

  const isCopy = depositViewType === 'copy'
  const content = isCopy ? DEPOSIT_COPY_DATA(network) : DEPOSIT_QR_DATA(network)

  return {
    title: `${content.title} Address & Confirm Network`,
    // @ts-ignore - still working out the types on this one where it could be component or video - Josh Dobson - 1/18/24
    header: {
      className: 'bg-gradient-to-b from-gray-850/0 to-black aspect-[9/5]',
      overlayComponent: <CoinbaseOverlayDisclaimer />,
      ...content.media
    },
    view: props => (
      <DepositSelectorBody
        state={depositViewType}
        address={address}
        network={network}
        content={content}
        onChange={val => dispatch({ type: 'depositViewType', payload: val })}
        {...props}
      />
    )
  }
}

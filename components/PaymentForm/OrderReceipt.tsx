import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import { SUPPORT_EMAIL } from '@/config'
import { useAuth } from '@/contexts/auth'
import useBreakpoints from '@/hooks/useBreakpoints'
import { numberWithCommas } from '@/util/numberHelpers'
import { AddressPurchase } from '@/api/resources/shared/purchase'
import { Icon, Button, Separator } from './..'
import OrderItem from './OrderItem'
import SummaryItem from '../Checkout/SummaryItem'
import { StepDataProps } from '.'

interface Props {
  order?: AddressPurchase[]
  stepData?: StepDataProps
}

const OrderReceipt = ({ order, stepData }: Props) => {
  const { isMobile } = useBreakpoints()
  const { user, getReturnUri, removeReturnUri, getOauthData, removeOauthData } =
    useAuth()
  const router = useRouter()
  const { orderId, paymentMethod, credit } = stepData

  const getNumOfItems = () => {
    if (!Object.values(order).length) {
      return 0
    }
    return Object.values(order).reduce((a, b) => a + Number(b.count), 0)
  }

  const getItemsPrice = () => {
    if (!Object.values(order).length) {
      return 0
    }
    return (
      Object.values(order)?.reduce((a, b) => a + b.price * b.count, 0) / 100
    )
  }

  const getSubtotal = () => {
    let subTotal = getItemsPrice()
    if (!!credit) {
      subTotal = subTotal - credit
    }
    return subTotal
  }

  const getTotal = () => {
    return getSubtotal().toFixed(2)
  }

  const getAppliedCredit = () => {
    return `-$${numberWithCommas(Number(credit).toFixed(2))}`
  }

  const onContinue = () => {
    const returnUri = getReturnUri()
    const onboarding = returnUri !== '/wallet'
    if (!user.mfa_type && onboarding) {
      router.push('/setup-2fa')
    } else {
      const oauthData = getOauthData()

      if (oauthData) {
        removeOauthData()
        window.location.href = oauthData.redirect_uri
      } else if (returnUri) {
        removeReturnUri()
        router.replace('/wallet?addressPurchased=success')
      } else {
        router.push('/inventory/?addressPurchased=success')
      }
    }
  }

  let lblButtonContinue = 'Continue'

  const returnUri = getReturnUri()
  if (getOauthData()) {
    lblButtonContinue = 'Finish'
  }

  if (returnUri) {
    lblButtonContinue = 'Continue to Wallet'
  }

  return (
    <div className="w-full md:w-[584px] p-3 md:p-4 bg-gray-850 rounded-3xl">
      <div className="md:flex justify-between">
        <div>
          <div className="flex items-center">
            <Icon name="dpLogoRainbow" className="max-w-6 max-h-5" />
            <div className="h4 ml-3">Thank You</div>
          </div>
          <div className="body text-gray-300 mt-1">
            Receipt for your recent Droppp purchase.
          </div>
        </div>
        <div className="body max-md:flex max-md:mt-2">
          <div className="text-gray-300">Order Number:</div>
          <Link className="inline-link max-md:ml-1" href="/activity">
            DP{orderId}
          </Link>
        </div>
      </div>
      <Separator className="my-3" />
      <OrderItem inReview order={order} isAddress={true} />
      <Separator className="mt-3" />
      <div className="space-y-1 mt-2">
        <SummaryItem label="Number of Items" value={getNumOfItems()} />
        <SummaryItem
          label="Subtotal"
          value={`$${numberWithCommas(getItemsPrice())}`}
        />
        {!!credit && <SummaryItem label="Credit" value={getAppliedCredit()} />}
        {paymentMethod && (
          <SummaryItem
            label={<Icon name="dpCustomAddressPayWhite" />}
            value={`**** ${paymentMethod.card.last4}`}
          />
        )}
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <div className="h5">Total</div>
        <div className="pricing-xl">${numberWithCommas(getTotal())} USD</div>
      </div>
      <Button
        className="w-full mt-3"
        size={isMobile ? 'md' : 'lg'}
        theme="rainbow"
        onClick={onContinue}
      >
        {lblButtonContinue}
      </Button>
      <div className="body-sm mt-3 text-gray-300 text-center">
        Issues? Contact us at{' '}
        <a className="inline-link" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}.
        </a>
      </div>
    </div>
  )
}

export default OrderReceipt

// const mockOrder = [
//   {
//     count: 1,
//     media: [
//       {
//         size0_type: 'p',
//         size0_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_120,w_120/q_65/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png',
//         size1_type: 'p',
//         size1_url:
//           'https://droppp.mypinata.cloud/ipfs/QmVKtvQ2gwuVQ44VskpG7N7CQvP4WAVyEzyfNAiUGUkKDP/Packs/BOB_ROSS_5_DIGITAL_POP.png',
//         size2_type: 'p',
//         size2_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_250,w_250/q_75/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png',
//         size3_type: 'p',
//         size3_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_400,w_400/q_75/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png',
//         size4_type: 'p',
//         size4_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_550,w_550/q_85/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png'
//       }
//     ],
//     name: 'Standard Pack',
//     price: 999,
//     redeemable: false,
//     template_id: 953
//   },
//   {
//     count: 1,
//     media: [
//       {
//         size0_type: 'p',
//         size0_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_120,w_120/q_65/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png',
//         size1_type: 'p',
//         size1_url:
//           'https://droppp.mypinata.cloud/ipfs/QmVKtvQ2gwuVQ44VskpG7N7CQvP4WAVyEzyfNAiUGUkKDP/Packs/BOB_ROSS_5_DIGITAL_POP.png',
//         size2_type: 'p',
//         size2_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_250,w_250/q_75/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png',
//         size3_type: 'p',
//         size3_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_400,w_400/q_75/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png',
//         size4_type: 'p',
//         size4_url:
//           'https://res.cloudinary.com/droppp/image/upload/c_fit,h_550,w_550/q_85/e_loop/v1639677298/dev/assets/298694c4e2d6578b4d6076becaa9798a.png'
//       }
//     ],
//     name: 'Premium Pack',
//     price: 2999,
//     redeemable: false,
//     template_id: 954
//   }
// ]
// const mockAddressPurchase = [
//   {
//     name: 'Custom Droppp Address',
//     count: 1,
//     media: [
//       {
//         size1_type: 'p',
//         size1_url: '/images/icon-card.png'
//       }
//     ],
//     price: 499,
//     template_id: 0,
//     address: 'matt.dp'
//   }
// ]
// const mockStepData = {
//   cardType: 0,
//   invoiceUrl:
//     'https://invoice.stripe.com/i/acct_1J0b2hH2b78LMQRr/test_YWNjdF8xSjBiMmhIMmI3OExNUVJyLF9LeXhIeG90YmNaenRPSXAyS0hCYjV6TzVGemxRSW9p0100zCXIP7fN',
//   orderId: 843,
//   paymentMethod: {
//     card: { last4: '4242' },
//     created: 1642441897,
//     customer: null,
//     id: 'pm_1KIzMjH2b78LMQRrjdVMJ9zR',
//     livemode: false,
//     object: 'payment_method',
//     type: 'card'
//   }
// }

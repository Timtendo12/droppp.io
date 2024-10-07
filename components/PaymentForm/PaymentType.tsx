import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  CanMakePaymentResult,
  PaymentMethod,
  PaymentRequest,
  Stripe,
  StripeElements
} from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { STRIPE_CARD_TYPES } from '@/enum'
import { useAuth } from '@/contexts/auth'
import { numberWithCommas } from '@/util/numberHelpers'
import useBreakpoints from '@/hooks/useBreakpoints'
import {
  AddressPurchase,
  CompletedPurchaseResponse,
  PurchaseResponse
} from '@/api/resources/shared/purchase'
import { StripeCardElement, Toast, Icon, Button, Separator } from './..'
import RoundedBox from '@/components/RoundedBox'
import OrderSummary from './OrderSummary'
import { tryApiAction } from '@/api/core/compat'
import { purchaseWaxAddress } from '@/api/resources/user/account/wax/purchase'
import { completeWaxAddressPurchase } from '@/api/resources/user/account/wax/purchase/complete'
import { ApiErrorResponse } from '@/api/core/errors'

type PaymentCardType = typeof STRIPE_CARD_TYPES[keyof typeof STRIPE_CARD_TYPES]

export interface PaymentTypeProps {
  stripe: Pick<
    Stripe,
    'paymentRequest' | 'createPaymentMethod' | 'confirmCardPayment'
  >
  elements: StripeElements
  order?: AddressPurchase[]
  onComplete?: (
    paymentMethod: PaymentMethod,
    cardType?: PaymentCardType
  ) => void
  onCompletePurchase?: ({ id, credit }) => void
}

const PaymentType = ({
  stripe,
  elements,
  order,
  onComplete,
  onCompletePurchase
}: PaymentTypeProps) => {
  const router = useRouter()
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>()
  const [canMakePayment, setCanMakePayment] = useState<CanMakePaymentResult>()
  const [complete, setComplete] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const { creditBalance } = useAuth()
  const { isMobile } = useBreakpoints()

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
    if (!!creditBalance && creditBalance > 0) {
      subTotal = creditBalance > subTotal ? creditBalance - subTotal : 0
    }
    return subTotal
  }

  useEffect(() => {
    if (!stripe) {
      return
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Purchase Custom Address',
        amount: Number((getSubtotal() * 100).toFixed(0))
      }
    })

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(setCanMakePayment)

    setPaymentRequest(pr)
  }, [stripe])

  const getRemainingCredit = () => {
    return `$${numberWithCommas(
      Number(
        creditBalance > getItemsPrice() ? creditBalance - getItemsPrice() : 0
      ).toFixed(2)
    )}`
  }

  const getAppliedCredit = () => {
    return creditBalance > getItemsPrice() ? getItemsPrice() : creditBalance
  }

  const onHandlePay = (type: PaymentCardType) => () => {
    paymentRequest.on('paymentmethod', ({ paymentMethod, complete }) => {
      // eslint-disable-next-line no-console
      console.log('Received Stripe Payment Method: ', paymentMethod)
      complete('success')
      onComplete(paymentMethod, type)
      purchaseOrder(paymentMethod).then()
    })

    paymentRequest.show()
  }

  const handleCardChange = ({ error, complete }) => {
    setComplete(complete)
    setError(error)
  }

  const requestPaymentMethod = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let paymentMethod = null

    setLoading(true)

    const cardElement = elements.getElement(CardElement)
    if (cardElement) {
      const res = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })
      paymentMethod = res?.paymentMethod
    }

    setLoading(false)
    onComplete(paymentMethod)
    // onComplete(paymentMethod, STRIPE_CARD_TYPES.CC)
    router.query.step = 'summary'
    router.push(router).then()
  }

  const handlePurchaseSuccess = (
    appliedCredit: number,
    data: CompletedPurchaseResponse
  ) => {
    onCompletePurchase({
      id: data.order.id,
      credit: appliedCredit
    })
    router.query.step = 'receipt'
    router.push(router).then()
  }

  const notifyPaymentError = (description: string) => {
    Toast({
      type: 'warning',
      title: 'Please update your payment information.',
      description,
      action: {
        label: 'Update Payment Information',
        callback: () => router.reload()
      }
    })
  }

  const handlePurchaseFailure = (errorData: ApiErrorResponse) => {
    if (errorData.card_cooldown) {
      // setCooldown(true)
    } else if (errorData.payment_error) {
      Toast({
        type: 'warning',
        title: 'Please update your payment information.',
        description: Object.entries(errorData.errors)[0][1]?.toString(),
        action: {
          label: 'Update Payment Information',
          callback: () => router.reload()
        }
      })
    } else {
      Toast({
        type: 'warning',
        title: 'Error',
        description: Object.entries(errorData.errors)[0][1]?.toString()
      })
    }
  }

  const purchaseOrder = async (paymentMethod: PaymentMethod) => {
    setLoading(true)

    const { success: purchaseSuccess, data: purchaseData } =
      await tryApiAction<PurchaseResponse>(() =>
        purchaseWaxAddress({
          account: `${(order[0] as AddressPurchase).address}.dp`,
          payment_method: paymentMethod?.id
        })
      )

    setLoading(false)

    if (purchaseSuccess === true) {
      const { payment_intent_client_secret: paymentIntentClientSecret } =
        purchaseData

      const appliedCredit =
        !!creditBalance && creditBalance > 0 ? getAppliedCredit() : undefined

      if (paymentIntentClientSecret) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          paymentIntentClientSecret
        )

        if (!error && paymentIntent.status === 'succeeded') {
          setLoading(true)

          const {
            success: completePurchaseSuccess,
            data: completePurchaseData
          } = await tryApiAction<CompletedPurchaseResponse>(() =>
            completeWaxAddressPurchase({
              payment_intent: paymentIntent?.id
            })
          )

          if (completePurchaseSuccess === true) {
            handlePurchaseSuccess(appliedCredit, completePurchaseData)
            return
          }

          notifyPaymentError(error.message)
        }
      } else {
        handlePurchaseSuccess(appliedCredit, purchaseData)
        return
      }
    } else {
      handlePurchaseFailure(purchaseData)
    }
  }

  const renderPaymentMethods = () => {
    // const canMakePayment = { applePay: true, googlePay: true }
    return (
      <>
        {!!creditBalance && (
          <div className="mt-3 px-3 py-2 bg-gray-800 rounded-2xl">
            <div className="utility-alt">
              Your account has available credit:
            </div>
            <div className="mt-2 md:flex">
              <div className="w-1/2">
                <div className="body-sm text-gray-300">Credit Balance:</div>
                <div className="flex items-center mt-1">
                  <div className="pricing-lg">
                    ${numberWithCommas(creditBalance.toFixed(2))}
                  </div>
                  <div className="utility-alt mx-1">Applied</div>
                  <Icon name="tick-green" />
                </div>
              </div>
              <Separator
                className="md:mx-5 max-md:my-2 border-gray-700"
                vertical={!isMobile}
              />
              <div className="w-1/2">
                <div className="body-sm text-gray-300">Remaining Balance:</div>
                <div className="pricing-lg mt-1">{getRemainingCredit()}</div>
              </div>
            </div>
          </div>
        )}
        {canMakePayment && (
          <>
            <div className="body text-gray-300 mt-2">Select payment type</div>
            <div className="block md:flex mt-3">
              {canMakePayment.applePay && (
                <Button
                  className="w-full"
                  theme="gray"
                  loading={loading}
                  onClick={onHandlePay(STRIPE_CARD_TYPES.APPLE)}
                >
                  <div className="flex">
                    <Icon className="mr-1" name="apple" />
                    Apple Pay
                  </div>
                </Button>
              )}
              {canMakePayment.googlePay && (
                <Button
                  className="w-full md:ml-2 max-md:mt-2"
                  theme="gray"
                  loading={loading}
                  onClick={onHandlePay(STRIPE_CARD_TYPES.GOOGLE)}
                >
                  <div className="flex">
                    <Icon className="mr-1" name="google" />
                    Google Pay
                  </div>
                </Button>
              )}
            </div>
            <Separator className="mt-3" text="or" />
          </>
        )}
        <StripeCardElement onChange={handleCardChange} />
      </>
    )
  }

  return (
    <div className="flex items-start max-lg:flex-col-reverse gap-2 md:gap-3">
      <RoundedBox className="w-full">
        <div className="h4">Payment Method</div>
        {renderPaymentMethods()}
        <Button
          className="w-full mt-3"
          size="lg"
          disabled={!!getSubtotal() && (!stripe || error || !complete)}
          loading={loading}
          onClick={requestPaymentMethod}
        >
          Continue
        </Button>
      </RoundedBox>
      <OrderSummary order={order} />
    </div>
  )
}

export default PaymentType

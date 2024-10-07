import { Stripe } from '@stripe/stripe-js'
import NiceModal from '@ebay/nice-modal-react'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  AddressPurchase,
  PurchaseResponse,
  CompletedPurchaseResponse
} from '@/api/resources/shared/purchase'
import { MODAL_ID } from '@/constants/modalId'
import { useAuth } from '@/contexts/auth'
import { numberWithCommas } from '@/util/numberHelpers'
import { Icon, Button, Toast, Separator } from './..'
import Collapsible from '@/components/Collapsible'
import useBreakpoints from '@/hooks/useBreakpoints'
import RoundedBox from '@/components/RoundedBox'
import OrderItem from './OrderItem'
import SummaryItem from '../Checkout/SummaryItem'
import { StepDataProps } from '.'
import { tryApiAction } from '@/api/core/compat'
import { purchaseWaxAddress } from '@/api/resources/user/account/wax/purchase'
import { completeWaxAddressPurchase } from '@/api/resources/user/account/wax/purchase/complete'
import { ApiErrorResponse } from '@/api/core/errors'
import { sendGTMEvent } from '@next/third-parties/google'

export interface OrderSummaryProps {
  stripe?: Pick<Stripe, 'confirmCardPayment'>
  order?: AddressPurchase[]
  stepData?: StepDataProps
  onComplete?: ({ action_id, id, credit }) => void
}

const OrderSummary = ({
  stripe,
  order,
  stepData,
  onComplete
}: OrderSummaryProps) => {
  const router = useRouter()
  const [showContent, setShowContent] = useState(true)
  const [loading, setLoading] = useState(false)
  const { isLarge } = useBreakpoints()
  const { creditBalance, fetchUser } = useAuth()

  const {
    handleSubmit,
    formState: { isValid }
  } = useForm()

  const customWax = `${(order[0] as AddressPurchase).address}.dp`

  const { paymentMethod, cardType } = stepData || {}

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
    if (!!creditBalance && creditBalance > 0) {
      subTotal = creditBalance > subTotal ? 0 : subTotal - creditBalance
    }
    return subTotal
  }

  const getTotal = () => {
    return Number(getSubtotal()).toFixed(2)
  }

  const getAppliedCreditValue = () => {
    return creditBalance > getItemsPrice() ? getItemsPrice() : creditBalance
  }

  const getAppliedCredit = () => {
    return `-$${numberWithCommas(Number(getAppliedCreditValue()).toFixed(2))}`
  }

  const handlePurchaseSuccess = (
    appliedCredit: number,
    data: CompletedPurchaseResponse
  ) => {
    const { order, action_id } = data
    onComplete({
      id: order.id,
      action_id,
      credit: appliedCredit
    })

    sendGTMEvent({
      event: 'address_upgrade'
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
      !!onComplete &&
        NiceModal.show(MODAL_ID.queueItModal, {
          id: 'payment-cool-off'
        }).then()
    } else if (errorData.payment_error) {
      notifyPaymentError(Object.entries(errorData.errors)[0][1]?.toString())
    } else {
      Toast({
        type: 'warning',
        title: 'Error',
        description: Object.entries(errorData.errors)[0][1]?.toString()
      })
    }
  }

  const purchaseOrder = async () => {
    setLoading(true)

    const { success: purchaseSuccess, data: purchaseData } =
      await tryApiAction<PurchaseResponse>(() =>
        purchaseWaxAddress({
          account: customWax,
          payment_method: paymentMethod?.id
        })
      )

    await fetchUser?.()

    setLoading(false)

    if (purchaseSuccess === true) {
      const { payment_intent_client_secret: paymentIntentClientSecret } =
        purchaseData

      const appliedCredit =
        !!creditBalance && creditBalance > 0
          ? getAppliedCreditValue()
          : undefined

      if (paymentIntentClientSecret) {
        setLoading(true)

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          paymentIntentClientSecret
        )

        if (!error && paymentIntent.status === 'succeeded') {
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
          setLoading(false)
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

  return (
    <RoundedBox
      className={classnames(
        'w-full md:min-w-[400px]',
        onComplete ? 'md:w-full' : 'lg:w-[400px]'
      )}
    >
      <form onSubmit={handleSubmit(purchaseOrder)}>
        <Collapsible
          label={
            <div className="flex justify-between w-full h4 cursor-pointer">
              {onComplete ? 'Order Summary' : 'Order Details'}
              {!onComplete && (
                <Icon
                  className={classnames(
                    'lg:hidden transition-transform -rotate-90',
                    {
                      '!rotate-0': showContent
                    }
                  )}
                  name="arrowDown"
                />
              )}
            </div>
          }
          disabled={isLarge}
          open={showContent}
          onToggle={() => setShowContent(!showContent)}
        >
          <OrderItem order={order} isAddress={true} inReview={!!onComplete} />
          <Separator className="mt-2" />
          <div className="space-y-1 mt-2">
            <SummaryItem label="Number of Items" value={getNumOfItems()} />
            <SummaryItem
              label="Subtotal"
              value={`$${numberWithCommas(getItemsPrice().toFixed(2))}`}
            />
            {!!creditBalance && creditBalance > 0 && (
              <SummaryItem label="Credit" value={getAppliedCredit()} />
            )}
            {onComplete && paymentMethod && (
              <SummaryItem
                label={cardType ? <Icon name={cardType} /> : 'Payment Method'}
                value={`**** ${paymentMethod.card.last4}`}
              />
            )}
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <div className="h5">Total</div>
            <div className="pricing-xl">
              ${numberWithCommas(getTotal())} USD
            </div>
          </div>
        </Collapsible>
        {onComplete && (
          <Button
            className="w-full mt-3"
            size="lg"
            theme="rainbow"
            loading={loading}
            disabled={!isValid}
            onClick={purchaseOrder}
          >
            Pay Now
          </Button>
        )}
      </form>
    </RoundedBox>
  )
}

export default OrderSummary

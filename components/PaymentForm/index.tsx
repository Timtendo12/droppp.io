import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe, PaymentMethod } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useCallback } from 'react'
import { stripeApiKey } from '@/config'
import { AddressPurchase } from '@/api/resources/shared/purchase'
import { Loading } from '..'
import PaymentType from './PaymentType'
import OrderSummary from './OrderSummary'
import OrderReceipt from './OrderReceipt'
import classnames from 'classnames'

const stripePromise = loadStripe(stripeApiKey)

const TitleMap = {
  payment: 'Checkout',
  summary: 'Review',
  receipt: 'Summary'
}

interface Props {
  waxAddress?: AddressPurchase[]
}

type PaymentMethodType = Pick<PaymentMethod, 'id'> & {
  card: Pick<PaymentMethod['card'], 'last4'>
}

export interface StepDataProps {
  paymentMethod?: PaymentMethodType
  cardType?: string
  orderId?: number
  action_id?: number
  credit?: number
}

const PaymentForm = ({ waxAddress }: Props) => {
  const router = useRouter()
  const [step, setStep] = useState('payment')
  const [stepData, setStepData] = useState<StepDataProps>()

  useEffect(() => {
    const getStep = async () => {
      if (stepData) {
        setStep(router.query.step?.toString() || 'payment')
      } else {
        delete router.query.step
        router.replace(router)
      }
    }
    getStep()
  }, [router.query.step])

  const handleCompleteStripe = useCallback((paymentMethod, cardType) => {
    setStepData({ cardType, paymentMethod })
  }, [])

  const handleCompletePurchase = useCallback(
    ({ id, action_id = null, credit }) => {
      setStepData(preState => ({
        ...preState,
        orderId: id,
        action_id,
        credit
      }))
    },
    []
  )

  const order = waxAddress

  if (!order) {
    return <Loading />
  }

  const PaymentSteps = ({ stripe, elements }) => {
    if (step === 'receipt') {
      return <OrderReceipt order={order} stepData={stepData} />
    }

    if (step === 'summary') {
      return (
        <OrderSummary
          stripe={stripe}
          order={order}
          stepData={stepData}
          onComplete={handleCompletePurchase}
        />
      )
    }

    return (
      <PaymentType
        stripe={stripe}
        elements={elements}
        order={order}
        onComplete={handleCompleteStripe}
        onCompletePurchase={handleCompletePurchase}
      />
    )
  }

  return (
    <div className={classnames('w-full mx-auto  px-2 md:px-4')}>
      <div
        className={classnames('mx-auto', {
          'max-w-[1100px]': step === 'payment',
          'max-w-[584px]': step !== 'payment'
        })}
      >
        <div className="h2 mb-3 md:mb-4">{TitleMap[step]}</div>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>{PaymentSteps}</ElementsConsumer>
        </Elements>
      </div>
    </div>
  )
}

export default PaymentForm

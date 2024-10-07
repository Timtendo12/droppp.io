import NiceModal from '@ebay/nice-modal-react'
import React, { useEffect, useState } from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { formatCurrency, getPriceStringFromCents } from '@/util/currencyHelpers'
import { MODAL_ID } from '@/constants/modalId'
import { Button, Separator, Toast } from '@/components'
import { Pill } from '@/components/Pill'
import ConditionalWrap from '@/components/ConditionalWrap'
import RoundedBox from '@/components/RoundedBox'
import DetailHeader from '@/components/ActivityDetail/DetailHeader'
import PurchaseItems from '@/components/ActivityDetail/PurchaseItems'
import OrderTracking from '@/components/ActivityDetail/OrderTracking'
import { ActionDetailProps } from '..'
import { tryApiAction } from '@/api/core/compat'
import { RedeemOrderGetResponse } from '@/api/resources/redeem/order/save/schema'
import { saveRedeemOrder } from '@/api/resources/redeem/order/save'

const Redeem = ({ activity }: ActionDetailProps) => {
  const [newShippingAddress, setNewShippingAddress] = useState()

  const { order, charge } = activity
  const {
    order_id,
    status_display,
    shipping_address,
    order_date,
    estimated_ship_target,
    redeem_ship_date,
    summary_lines,
    item_count,
    shipping,
    discount,
    editable,
    addon_count,
    tracking_urls
  } = order
  const { credit, amount, card_brand, card_last4, subtotal, tax } = charge
  const {
    receiver_full_name,
    street_address1,
    street_address2,
    city,
    state,
    postal_code,
    country_name,
    country_id,
    verification_code
  } = newShippingAddress || shipping_address || {}

  const details = [
    {
      label: 'Status',
      value: <Pill className="!border-blue">{status_display}</Pill>
    },
    { label: 'Redemption ID', value: `#${order_id}` },
    { label: 'Date Redeemed', value: dateToLocal({ date: order_date }) }
  ]

  // When a collection ships (redeem_ship_date has a value), the "Estimated Ship Target" field should be removed from the activity detail pane
  // https://app.asana.com/0/1202871321789760/1203696214840703/f
  if (!redeem_ship_date) {
    details.push({
      label: 'Estimated Ship Target',
      value: estimated_ship_target
    })
  }

  const items = summary_lines.map(({ description, media, qty }) => ({
    name: description,
    media: [media],
    price: `x ${qty}`
  }))
  const shippingDetail = [
    {
      label: 'Number of Items',
      value: item_count
    },
    {
      label: 'Subtotal',
      value: getPriceStringFromCents(subtotal)
    },
    {
      label: 'Shipping',
      value: getPriceStringFromCents(shipping)
    },
    {
      label: 'Discount',
      value: `-${getPriceStringFromCents(discount)}`
    },
    {
      label: 'Tax',
      value: getPriceStringFromCents(tax)
    }
  ]

  if (addon_count) {
    shippingDetail.splice(1, 0, {
      label: 'UV Premium Pop! Protector',
      value: `${addon_count}`
    })
  }

  if (country_id !== 1) {
    if (amount > 0) {
      shippingDetail.push({
        label: 'Payment Method',
        value: `${card_brand.toUpperCase()} **** ${card_last4}`
      })
    }
    shippingDetail.push({
      label: 'Delivery Method',
      value: 'Delivery Duty Paid'
    })
  }
  if (credit) {
    shippingDetail.push({
      label: 'Credit',
      value: `-${formatCurrency(credit / 100)} USD`
    })
  }

  useEffect(() => {
    setNewShippingAddress(null)
  }, [activity])

  const handleSubmit = async formData => {
    const { success, data } = await tryApiAction<RedeemOrderGetResponse>(() =>
      saveRedeemOrder(formData)
    )

    if (success === true) {
      const { address_suggestions } = data

      if (address_suggestions?.length) {
        NiceModal.show(MODAL_ID.addressSuggestion, {
          shipping_address: formData,
          order_id,
          suggestions: address_suggestions,
          onComplete: address => {
            setNewShippingAddress(address)
            NiceModal.hide(MODAL_ID.editShipping)
          }
        })
      } else {
        NiceModal.show(MODAL_ID.addressWarning, {
          shipping_address: formData,
          order_id,
          onRetreat: () => {},
          onComplete: address => {
            setNewShippingAddress(address)
            NiceModal.hide(MODAL_ID.editShipping)
          }
        })
      }
    } else {
      Toast({
        type: 'warning',
        description: Object.entries(data.errors)[0][1]
      })
    }
  }

  const handleEditshipping = () => {
    NiceModal.show(MODAL_ID.editShipping, {
      data: {
        ...(newShippingAddress || shipping_address),
        order_id,
        save_address: true
      },
      onSubmit: data => {
        new Promise(async resolve => {
          await handleSubmit(data)
          resolve(data)
        })
      }
    })
  }

  return (
    <>
      <DetailHeader details={details} />
      <ConditionalWrap
        condition={verification_code === 'WARNING'}
        wrap={children => (
          <Toast
            className="mt-3"
            title={<div className="utility-alt">Unverified Address</div>}
            type="attention"
            separator
            inline
          >
            {children}
          </Toast>
        )}
        falseWrap={children => (
          <RoundedBox className="mt-3 !py-2 max-md:bg-gray-800" size="sm">
            {children}
          </RoundedBox>
        )}
      >
        <div className="flex justify-between">
          <div className="h7">Shipping To</div>
          {editable && (
            <Button
              className="section-link"
              theme="clean"
              onClick={handleEditshipping}
            >
              Edit
            </Button>
          )}
        </div>
        <div className="body-sm mt-1">
          {receiver_full_name}
          <br />
          {street_address1}
          <br />
          {street_address2 && (
            <>
              {street_address2}
              <br />
            </>
          )}
          {city}, {state} {postal_code}
          <br />
          {country_name}
        </div>
      </ConditionalWrap>
      {status_display === 'Shipped' && !!tracking_urls.length && (
        <OrderTracking trackingUrls={tracking_urls} />
      )}
      <Separator className="my-3" />
      <PurchaseItems
        items={items}
        shippingDetail={shippingDetail}
        total={`${formatCurrency(amount / 100)} USD`}
      />
    </>
  )
}

export default Redeem

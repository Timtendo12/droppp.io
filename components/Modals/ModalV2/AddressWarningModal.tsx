import React, { useState } from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { getAddressLine } from '@/util/shippingAddressHelper'
import Toast from '@/components/Toast'
import Modal from './BaseModal'
import ModalStateGraphic from './ModalStateGraphic'
import { tryApiAction } from '@/api/core/compat'
import { RedeemOrderGetResponse } from '@/api/resources/redeem/order/save/schema'
import { saveRedeemOrder } from '@/api/resources/redeem/order/save'
import Button from '@/components/Button'
import { ShippingAddress } from '@/components/Forms/FormShippingInfo'

interface Props {
  shipping_address: ShippingAddress
  order_id: number
  assets?: string
  addons?: string
  onRetreat?: () => void
  onComplete?: (data) => void
}

const AddressWarningModal = NiceModal.create<Props>(
  ({ shipping_address, assets, addons, onComplete, order_id }) => {
    const { hide, visible, remove } = useModal()
    const [loading, setLoading] = useState(false)
    const isUsShipping = shipping_address.country_id === 1

    const handleComplete = () => {
      return new Promise(async (resolve, reject) => {
        setLoading(true)
        const requestData = {
          ...shipping_address,
          order_id,
          assets,
          addons,
          selected_address: '0'
        }
        const { success, data } = await tryApiAction<RedeemOrderGetResponse>(
          () => saveRedeemOrder(requestData)
        )
        setLoading(false)

        if (success === true) {
          resolve(onComplete(data.shipping_address))
          hide()
        } else {
          Toast({
            type: 'warning',
            description: Object.entries(data.errors)[0][1]
          })
          reject()
        }
      })
    }

    return (
      <Modal
        shouldBlockActions={loading}
        isOpen={visible}
        hide={hide}
        onAfterClose={remove}
      >
        {({ ModalBody, ModalFooter }) => (
          <div className="px-[var(--modalPadding)]">
            <ModalBody>
              <div className="mb-1 text-center">
                <ModalStateGraphic icon="exclamation" className="mx-auto" />
                <h1 className="h4 mt-3">
                  We Could Not Verify That<br></br> This Is a Valid Address.
                </h1>
                <div className="body text-gray-300 mt-2">
                  Please double check and confirm<br></br> that the address
                  entered is a valid address
                  {isUsShipping ? '.' : ' for shipping internationally.'}
                </div>
                <div className="h7 mt-3">The address entered</div>
                <div className="body border border-gray-700 mt-2 p-2 rounded-2xl text-left">
                  {getAddressLine(shipping_address)}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                loading={loading}
                onClick={handleComplete}
              >
                Use this address
              </Button>
            </ModalFooter>
          </div>
        )}
      </Modal>
    )
  }
)

export default AddressWarningModal

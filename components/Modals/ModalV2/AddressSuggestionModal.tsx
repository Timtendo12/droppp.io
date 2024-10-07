import { classNames } from '@/util/tailwindHelpers'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React, { useState } from 'react'
import { getAddressLine } from '@/util/shippingAddressHelper'
import { MODAL_ID } from '@/constants/modalId'
import { RealCheckbox } from '@/components/Checkbox'
import Modal from './BaseModal'
import { useSaveRedeemOrderMutation } from '@/api/resources/redeem/order/save'
import Button from '@/components/Button'
import { ShippingAddress } from '@stripe/stripe-js'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  shipping_address: ShippingAddress
  order_id: number
  assets?: string
  addons?: string
  suggestions: any[]
  onComplete?: (data) => void
}

// @todo - this should should be an input of any request data along with the shipping address and not specific to assets and addons - Josh Dobson - 7/12/24
const AddressSuggestionModal = NiceModal.create<Props>(
  ({ shipping_address, order_id, assets, addons, suggestions, onComplete }) => {
    const { hide, visible, remove } = useModal()
    const [loading, setLoading] = useState(false)
    const [selectedAddress, setSelectedAdddress] = useState()
    const queryClient = useQueryClient()

    const { mutate: saveOrderMutation } = useSaveRedeemOrderMutation()

    const handleSelectAddress = id => () => {
      setSelectedAdddress(id)
    }

    const handleConfirmAddress = async (e?: any) => {
      return new Promise(async (resolve, reject) => {
        e?.preventDefault()
        setLoading(true)
        const requestData = {
          ...shipping_address,
          order_id,
          assets,
          addons,
          save_address: false,
          selected_address: selectedAddress
        }
        saveOrderMutation(requestData, {
          onSuccess: data => {
            const { address_warning } = data

            if (!address_warning) {
              hide()
              resolve(onComplete(data.shipping_address))
            } else {
              NiceModal.show(MODAL_ID.addressWarning, {
                address: shipping_address,
                onRetreat: () => {},
                onComplete: address => {
                  resolve(onComplete(address))
                }
              })
              reject()
            }
          },
          onSettled: () => {
            setLoading(false)
            queryClient.invalidateQueries({ queryKey: ['/redeem/order/get'] })
          }
        })
      })
    }

    return (
      <Modal
        onCancel={() => {}}
        shouldBlockActions={loading}
        isOpen={visible}
        hide={hide}
        onAfterClose={remove}
      >
        {({ ModalBody, ModalFooter }) => (
          <form
            className="px-[var(--modalPadding)]"
            onSubmit={e => handleConfirmAddress(e)}
          >
            <ModalBody>
              <div className="mb-3 text-center">
                <h1 className="h4">Select an address</h1>
                <div className="body text-gray-300 mt-2">
                  Choose the best address for your location.
                </div>
                <div className="h7 mt-3">Suggested address</div>
                {suggestions.map((adddress, index) => {
                  const isSelected = selectedAddress === index + 1
                  return (
                    <AddressWrapper key={index} isSelected={isSelected}>
                      <RealCheckbox
                        className="p-2"
                        theme="round"
                        value={isSelected}
                        label={getAddressLine(adddress)}
                        onChange={handleSelectAddress(index + 1)}
                      />
                    </AddressWrapper>
                  )
                })}
                <div className="h7 mt-3">The address entered</div>
                <AddressWrapper isSelected={selectedAddress === 0}>
                  <RealCheckbox
                    className="p-2"
                    theme="round"
                    value={selectedAddress === 0}
                    label={getAddressLine(shipping_address)}
                    onChange={handleSelectAddress(0)}
                  />
                </AddressWrapper>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={typeof selectedAddress === 'undefined'}
                type="submit"
                loading={loading}
                className="w-full"
              >
                Confirm
              </Button>
            </ModalFooter>
          </form>
        )}
      </Modal>
    )
  }
)

const AddressWrapper = ({ children, isSelected }) => {
  return (
    <div
      className={classNames(
        'body border border-gray-700 mt-2 rounded-2xl text-left',
        {
          'bg-gray-800': isSelected
        }
      )}
    >
      {children}
    </div>
  )
}

export default AddressSuggestionModal

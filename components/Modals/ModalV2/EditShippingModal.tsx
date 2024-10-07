import NiceModal from '@ebay/nice-modal-react'
import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import ShippingForm from '@/components/Forms/FormShippingInfo'
import Modal from './'

interface Props {
  data: any
  onSubmit: (data) => void
}

const EditShippingModal = NiceModal.create<Props>(({ data, onSubmit }) => {
  return (
    <Modal id={MODAL_ID.editShipping} title="Edit Shipping Information">
      {({ ModalBody, ModalFooter }) => (
        <ShippingForm
          onSubmit={onSubmit}
          data={data}
          countryFieldDisabled={true}
        >
          {({ Body, Footer }) => {
            return (
              <>
                <ModalBody>{Body}</ModalBody>
                <ModalFooter>{Footer}</ModalFooter>
              </>
            )
          }}
        </ShippingForm>
      )}
    </Modal>
  )
})

export default EditShippingModal

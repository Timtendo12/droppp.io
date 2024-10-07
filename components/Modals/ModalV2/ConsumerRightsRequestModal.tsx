import NiceModal from '@ebay/nice-modal-react'
import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import Modal from './'
import FormConsumerRights from '@/components/Forms/FormConsumerRights'

const ConsumerRightsRequestModal = NiceModal.create(() => {
  return (
    <Modal id={MODAL_ID.consumerRightsRequest} title="Consumer Rights Request">
      {modalProps => <FormConsumerRights {...modalProps} />}
    </Modal>
  )
})

export default ConsumerRightsRequestModal

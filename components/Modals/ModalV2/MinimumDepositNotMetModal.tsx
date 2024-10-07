import NiceModal from '@ebay/nice-modal-react'
import React from 'react'
import { hideModal } from '.'
import { MODAL_ID } from '@/constants/modalId'
import BooleanModal from './BooleanModal'

interface IMinimumDepositNotMetModalProps {
  onViewFAQ: () => void
  onAddFunds: () => void
  onCancel?: () => void

  currency?: 'usdc' | string
  minimumDeposit?: number
}

const MinimumDepositNotMetModal = NiceModal.create(
  ({
    minimumDeposit = 5,
    currency = 'usdc',
    ...actions
  }: IMinimumDepositNotMetModalProps) => {
    const hide = () => hideModal(MODAL_ID.minimumDepositNotMet)

    function onCancel() {
      actions.onCancel?.()
      hide()
    }

    function onViewFAQ() {
      actions.onViewFAQ()
      hide()
    }

    function onAddFunds() {
      actions.onAddFunds()
      hide()
    }

    return (
      <BooleanModal
        id={MODAL_ID.minimumDepositNotMet}
        title="Initial Deposit Minimum Not Met"
        onCancel={onCancel}
        secondaryButton={{
          label: 'View FAQ',
          onClick: onViewFAQ,
          theme: 'gray',
          size: 'md'
        }}
        primaryButton={{
          label: 'Add Funds',
          onClick: onAddFunds,
          theme: 'rainbow',
          size: 'md'
        }}
      >
        <div className="flex flex-col gap-2 text-gray-300">
          <div>
            You must deposit at least {minimumDeposit}{' '}
            <span className="uppercase">{currency}</span> in order to use your
            Droppp Balance on the marketplace.
          </div>

          <div>
            Once the funds are deposited into your account, you will also be
            granted a free WAX address if you don’t already have one. This
            address is where your items will live once bought on the
            marketplace.
          </div>
        </div>
      </BooleanModal>
    )
  }
)

export default MinimumDepositNotMetModal

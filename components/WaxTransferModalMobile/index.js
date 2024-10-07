import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { ModalMobile } from '..'
import { addFavoriteAddress } from '@/util/persistDataHelpers'
import { TransferDetail, Confirm } from './contents'
import styles from './styles.module.scss'

export default function TransferModal({
  open,
  waxBalance,
  onClose,
  onComplete
}) {
  const initialDetails = {
    targetAddress: '',
    memo: '',
    transferAmount: 0
  }

  const [details, setDetails] = useState(initialDetails)
  const [confirming, setConfirming] = useState(false)

  const handleClose = () => {
    setDetails(initialDetails)
    setConfirming(false)
    onClose && onClose()
  }

  const handleConfirm = details => {
    setDetails(details)
    setConfirming(true)
  }

  const closeConfirm = () => {
    setConfirming(false)
  }

  const handleComplete = balance => {
    addFavoriteAddress(details?.address)
    onComplete && onComplete(balance)
  }

  const renderContent = () => {
    return (
      <>
        <TransferDetail
          details={details}
          waxBalance={waxBalance}
          onConfirm={handleConfirm}
        />

        <ModalMobile
          visible={confirming}
          onClose={() => setConfirming(false)}
          renderContent={() => (
            <Confirm
              details={details}
              waxBalance={waxBalance}
              onTransfer={handleComplete}
              close={closeConfirm}
            />
          )}
        />
      </>
    )
  }

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      parentSelector={() => document.body}
      shouldCloseOnEsc={false}
    >
      <div className={styles.header}>
        <div className={styles.btnBack} onClick={handleClose}>
          Cancel
        </div>
        Transfer
      </div>
      <div className={styles.container}>{renderContent()}</div>
    </ReactModal>
  )
}

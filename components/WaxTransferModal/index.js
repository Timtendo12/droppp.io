import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { Icon, Button } from '..'
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

  const handleComplete = balance => {
    addFavoriteAddress(details?.address)
    onComplete && onComplete(balance)
  }

  const renderContent = () => {
    if (confirming) {
      return (
        <Confirm
          details={details}
          waxBalance={waxBalance}
          onTransfer={handleComplete}
        />
      )
    }

    return (
      <TransferDetail
        details={details}
        waxBalance={waxBalance}
        onConfirm={handleConfirm}
      />
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
      <div className={styles.container}>
        <Button className={styles.btnClose} theme="clean" onClick={handleClose}>
          <Icon name="close" size={24} />
        </Button>
        {confirming && (
          <Button
            className={styles.btnBack}
            theme="clean"
            onClick={() => setConfirming(false)}
          >
            <Icon name="back" />
            Go Back
          </Button>
        )}
        {renderContent()}
      </div>
    </ReactModal>
  )
}

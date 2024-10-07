import React from 'react'
import Modal from '@/components/Modals/Modal'
import styles from './styles.module.scss'
import Button, { ButtonLink } from '@/components/Button'
import Icon from '@/components/Icon'
import { SUPPORT_EMAIL } from '@/config'

const ModalFreeAddress = ({ open, onClose }) => {
  const renderContent = () => {
    return (
      <div className={styles.container}>
        <Button theme="clean" onClick={onClose}>
          <Icon name="close" size={24} />
        </Button>
        <div className={styles.title}>Need a Free Address?</div>
        <div className={styles.description}>
          We are more than happy to provide our users with a free wallet address
          on a case-by-case basis. A typical situation where you need a wallet
          address before participating in your first drop is when you have
          bought packs or tokens on the secondary market and need to transfer
          them to your Droppp account to unpack or redeem them.
          <br />
          <br />
          Please allow 2-3 business days for your request to be processed.
          However if you need an address immediately, you can always purchase a
          custom address for $4.99.
        </div>
        <ButtonLink className="mt-3" size="lg" href={`mailto:${SUPPORT_EMAIL}`}>
          Drop Us a Line
        </ButtonLink>
      </div>
    )
  }

  return (
    <Modal
      open={open}
      className=""
      renderContent={renderContent}
      onClose={onClose}
    />
  )
}

export default ModalFreeAddress

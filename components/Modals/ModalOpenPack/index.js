import React from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modals/Modal'
import styles from './styles.module.scss'

const ModalOpenPack = ({ openUrl, onClose }) => {
  const renderContent = () => {
    return (
      <div className={styles.container}>
        <img className={styles.hero} src="/images/bg-open-pack.png" alt="" />
        <div className={styles.content}>
          <div className={styles.title}>Unsupported Pack</div>
          <div className={styles.description}>
            This is a pack that was created before Droppp. Unfortunately, the
            pack cannot be opened on our site.
            <br />
            <br />
            <b>Don’t worry you can still open them.</b>
            <br />
            <br />
            <ol>
              <li>Transfer this pack back to the account you sent it from.</li>
              <li>
                Open the pack by navigating to the{' '}
                <a href={openUrl} target="_blank" rel="noreferrer">
                  Legacy Pack Drop Site
                </a>
                .
              </li>
              <li>Transfer the new NFTs back to your Droppp account.</li>
            </ol>
          </div>
          <Button
            className="w-full mt-2"
            size="lg"
            theme="gray"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal
      className={styles.modalContainer}
      open={openUrl}
      renderContent={renderContent}
      onClose={onClose}
    />
  )
}

export default ModalOpenPack

import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modals/Modal'
import styles from './styles.module.scss'

const ModalTwoFANote = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { enable2FA } = router.query

  useEffect(() => {
    setOpen(enable2FA)
  }, [enable2FA])

  const handleClose = async () => {
    delete router.query.enable2FA
    await router.push(router)
  }

  const renderContent = () => {
    return (
      <div className={styles.container}>
        <img className={styles.hero} src="/images/bg-2fa.jpg" alt="" />
        <div className={styles.content}>
          <div className={styles.title}>
            2-Step Verification is Now Available
          </div>
          <div className={styles.description}>
            Protect your wallet with an extra layer of security. Add 2-step
            verification to require an extra code at login.
          </div>
          <Button
            className="w-full mt-2"
            size="lg"
            onClick={() => router.push('/account')}
          >
            Set Up 2-Step Verification
          </Button>
          <Button
            className="w-full mt-2"
            size="lg"
            theme="gray"
            onClick={handleClose}
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
      open={open}
      renderContent={renderContent}
      onClose={handleClose}
    />
  )
}

export default ModalTwoFANote

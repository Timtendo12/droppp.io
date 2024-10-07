import classnames from 'classnames'
import React from 'react'
import ReactModal from 'react-modal'
import { ModalMobile } from '@/components'
import styles from './styles.module.scss'
import useBreakpoints from '@/hooks/useBreakpoints'

const Modal = ({
  className,
  mobileContentClass = '',
  open,
  renderContent,
  shouldCloseOnOverlayClick = true,
  onClose
}) => {
  const { isMobile } = useBreakpoints()
  if (isMobile) {
    return (
      <ModalMobile
        visible={!!open}
        className={mobileContentClass}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        onClose={onClose}
        renderContent={renderContent}
      />
    )
  }

  return (
    <ReactModal
      isOpen={!!open}
      className={classnames(className, styles.modal)}
      overlayClassName={styles.overlay}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {renderContent()}
    </ReactModal>
  )
}

export default Modal

import classnames from 'classnames'
import ReactDOM from 'react-dom'
import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './styles.module.scss'

const ModalContainer = ({
  // component: Component,
  className,
  overlayClassName,
  visible,
  shouldCloseOnOverlayClick = true,
  renderContent,
  unmountOnExit = true,
  onClose = () => {}
  // ...props
}) => {
  useEffect(() => {
    const bodyClasses = document.body.classList

    if (visible) {
      bodyClasses.add('blockBodyScrolling')
    }
    return () => {
      bodyClasses.remove('blockBodyScrolling')
    }
  }, [visible])

  const handleOutsideClick = () => {
    if (!shouldCloseOnOverlayClick) {
      return
    }
    onClose()
  }

  return (
    <>
      {visible && (
        <div
          className={classnames(styles.overlay, overlayClassName)}
          onClick={handleOutsideClick}
        />
      )}
      <CSSTransition
        appear
        in={visible}
        unmountOnExit={unmountOnExit}
        timeout={500}
      >
        <div className={classnames(styles.wrapper, className)}>
          {renderContent && renderContent()}
          {/* <Component {...props} onClose={onClose} /> */}
        </div>
      </CSSTransition>
    </>
  )
}

const ModalMobile = props => {
  return ReactDOM.createPortal(
    <ModalContainer {...props} />,
    document.getElementById('modal')
  )
}

export default ModalMobile

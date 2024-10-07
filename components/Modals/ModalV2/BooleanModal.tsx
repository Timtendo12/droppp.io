import React, { ReactNode, useState } from 'react'
import Modal, { ModalButtonProps } from './BaseModal'
import classNames from 'classnames'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { textAlignmentClass } from '@/util/tailwindHelpers'
import { TextAlignment } from '@/types/tailwind'
import { ModalFooterButtons } from './ModalFooterButtons'
import { ModalHeaderContent } from './ModalHeader'
import { ModalProps } from './'

const PRIMARY_BUTTON_INIT: ModalButtonProps = {
  size: 'md',
  theme: 'blue',
  onClick: () => alert('not set'),
  label: 'Confirm',
  disabled: false
}

interface Props extends Omit<ModalProps, 'children'> {
  children: ReactNode
  header?: ModalHeaderContent
  primaryButton: ModalButtonProps
  secondaryButton?: ModalButtonProps
  textAlignment?: TextAlignment
  subFooter?: ReactNode
  notifyOnPromiseRejection?: boolean
}

const BooleanModal = NiceModal.create<Props>(
  ({
    children,
    header,
    className,
    primaryButton = PRIMARY_BUTTON_INIT,
    secondaryButton,
    textAlignment = 'left',
    subFooter,
    notifyOnPromiseRejection = true,
    ...modalProps
  }) => {
    const { hide, visible, remove } = useModal()
    const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState(false)

    return (
      <Modal
        {...modalProps}
        shouldBlockActions={isPrimaryButtonLoading}
        isOpen={visible}
        hide={hide}
        onAfterClose={remove}
      >
        {({ ModalBody, ModalFooter, ModalHeaderMedia }) => (
          <>
            <div className="px-[var(--modalPadding)]">
              {header && <ModalHeaderMedia content={header} />}
              <ModalBody
                className={classNames(
                  textAlignmentClass(textAlignment as TextAlignment),
                  className
                )}
              >
                {children}
              </ModalBody>
              <ModalFooter>
                <ModalFooterButtons
                  primaryButton={primaryButton}
                  primaryButtonInit={PRIMARY_BUTTON_INIT}
                  isPrimaryButtonLoading={isPrimaryButtonLoading}
                  setIsPrimaryButtonLoading={setIsPrimaryButtonLoading}
                  secondaryButton={secondaryButton}
                  hide={hide}
                  notifyOnPromiseRejection={notifyOnPromiseRejection}
                />
                {subFooter && subFooter}
              </ModalFooter>
            </div>
          </>
        )}
      </Modal>
    )
  }
)

export default BooleanModal

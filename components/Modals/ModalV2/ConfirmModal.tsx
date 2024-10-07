import React, { ReactNode, useState } from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import Modal, { ModalButtonProps } from './BaseModal'
import classNames from 'classnames'
import { textAlignmentClass } from '@/util/tailwindHelpers'
import { TextAlignment } from '@/types/tailwind'
import { ModalFooterButtons } from './ModalFooterButtons'
import { ModalHeaderContent } from './ModalHeader'

export interface ConfirmModalProps {
  children?: ReactNode
  description?: ReactNode
  header?: ModalHeaderContent
  className?: string
  overlayClassName?: string
  onCancel?: () => void
  primaryButton: ModalButtonProps
  secondaryButton?: ModalButtonProps
  textAlignment?: TextAlignment
  title: ReactNode
}

const ConfirmModal = NiceModal.create<ConfirmModalProps>(
  ({
    children,
    description,
    className,
    header,
    primaryButton,
    secondaryButton,
    textAlignment = 'center',
    onCancel,
    overlayClassName,
    title
  }) => {
    const { hide, visible, remove } = useModal()
    const [isLoading, setIsLoading] = useState<boolean>()

    return (
      <Modal
        overlayClassName={classNames(overlayClassName, 'z-confirm')}
        isCancelDisabled={true}
        shouldHideHeader={true}
        shouldBlockActions={isLoading}
        isOpen={visible}
        hide={hide}
        onAfterClose={remove}
        title={title}
        titleClassName="!h3"
        onCancel={onCancel}
      >
        {({ ModalBody, ModalFooter, ModalHeaderMedia }) => (
          <div className="px-[var(--modalPadding)] pt-[var(--modalPadding)]">
            {header && <ModalHeaderMedia content={header} />}
            <ModalBody
              className={classNames(
                textAlignmentClass(textAlignment),
                className
              )}
            >
              <div className="space-y-2">
                {description && (
                  <div className="text-gray-300 mx-1">{description}</div>
                )}
                {children && <div>{children}</div>}
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalFooterButtons
                primaryButton={primaryButton}
                isPrimaryButtonLoading={isLoading}
                setIsPrimaryButtonLoading={setIsLoading}
                secondaryButton={secondaryButton}
                hide={hide}
              />
            </ModalFooter>
          </div>
        )}
      </Modal>
    )
  }
)

export default ConfirmModal

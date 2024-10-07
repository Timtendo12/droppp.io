import React, { ReactElement, useState } from 'react'
import Modal, { ModalButtonProps } from './BaseModal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ModalFooterButtons } from './ModalFooterButtons'
import { ModalHeaderContent } from './ModalHeader'
import { isFunction } from '@/util/functionHelpers'
import { ModalProps } from './'

export type InfoModalHeader = ModalHeaderContent & {
  overlayComponent?: ReactElement
  className?: string
}
interface Props extends Omit<ModalProps, 'hide' | 'onAfterClose' | 'isOpen'> {
  header: InfoModalHeader
  primaryButton?: ModalButtonProps
  secondaryButton?: ModalButtonProps
}

const PRIMARY_BUTTON_INIT: ModalButtonProps = {
  theme: 'blue',
  onClick: () => alert('action not defined'),
  label: 'Close',
  disabled: false
}

const InfoModal = NiceModal.create<Props>(
  ({
    children,
    primaryButton,
    secondaryButton,
    header,
    ...modalProps
  }: Props) => {
    const { hide, visible, remove } = useModal()
    const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState(false)

    return (
      <Modal
        overlayHeaderOpaqueOnScroll={true}
        renderInlineTitle={false}
        isOpen={visible}
        hide={hide}
        onAfterClose={remove}
        {...modalProps}
      >
        {({ ModalBody, ModalFooter, ModalHeaderMedia }) => (
          <div className="px-[var(--modalPadding)]">
            {isFunction(children) ? (
              children({ ModalFooter, ModalBody, ModalHeaderMedia })
            ) : (
              <>
                <ModalHeaderMedia
                  content={header}
                  overlayComponent={header.overlayComponent}
                />
                <ModalBody>{children}</ModalBody>
                {(!!primaryButton || !!secondaryButton) && (
                  <ModalFooter>
                    <ModalFooterButtons
                      primaryButton={primaryButton}
                      primaryButtonInit={PRIMARY_BUTTON_INIT}
                      isPrimaryButtonLoading={isPrimaryButtonLoading}
                      setIsPrimaryButtonLoading={setIsPrimaryButtonLoading}
                      secondaryButton={secondaryButton}
                      hide={hide}
                    />
                  </ModalFooter>
                )}
              </>
            )}
          </div>
        )}
      </Modal>
    )
  }
)

export default InfoModal

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React, { ReactNode } from 'react'
import Modal, {
  IModal,
  MODAL_TRANSITION_LENGTH_MS,
  ModalChildren
} from './BaseModal'
import { ModalId } from '@/constants/modalId'
import { isFunction } from 'lodash'

export type ModalShowOptions = {
  [key: string]: unknown
}

export interface ModalProps
  extends Omit<IModal, 'hide' | 'onAfterClose' | 'isOpen' | 'children'> {
  children: ReactNode | ModalChildren
  shouldPersistOnRouteChange?: boolean
}

const DefaultModal = NiceModal.create<ModalProps>(
  ({ children, ...modalProps }: ModalProps) => {
    const { hide, visible, remove } = useModal()

    return (
      <Modal isOpen={visible} hide={hide} onAfterClose={remove} {...modalProps}>
        {({ ModalFooter, ModalBody, ModalHeaderMedia }) => {
          return (
            <div className="px-[var(--modalPadding)]">
              {isFunction(children) ? (
                children({ ModalFooter, ModalBody, ModalHeaderMedia })
              ) : (
                <ModalBody>{children}</ModalBody>
              )}
            </div>
          )
        }}
      </Modal>
    )
  }
)

export const hideModal = (id: ModalId, delay?: boolean | number): void => {
  setTimeout(
    () => NiceModal.hide(id as string),
    typeof delay === 'number' ? delay : delay ? MODAL_TRANSITION_LENGTH_MS : 0
  )
}

export const showModal = <T = ModalShowOptions,>(
  id: ModalId,
  options: T = {} as T,
  delay?: boolean | number
): void => {
  setTimeout(
    () => NiceModal.show(id as string, options),
    typeof delay === 'number'
      ? delay
      : delay
      ? MODAL_TRANSITION_LENGTH_MS * 1.5
      : 0
  )
}

export const switchModal = (
  hide: ModalId,
  show: ModalId,
  showOptions?: ModalShowOptions
): void => {
  hideModal(hide)
  showModal(show, showOptions, true)
}

export default DefaultModal

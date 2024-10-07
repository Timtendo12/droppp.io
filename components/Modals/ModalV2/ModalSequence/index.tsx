import React, { ReactNode, useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import ModalMediaHeader from '@/components/Modals/ModalV2/ModalHeader'
import { isFunction } from 'lodash'

// components
import Modal from '..'
import { InfoModalHeader } from '@/components/Modals/ModalV2/InfoModal'
import { ModalChildren, ModalTitleProps } from '../BaseModal'

interface IModalSequenceProps {
  id: string
  modalId: string
  initialViewIndex?: number
  init: (controller: IModalSequenceControllerProps) => IModalSequenceViewProps[]
}

// props for each sequence view
export interface IModalSequenceViewProps {
  id: string
  className?: string
  onRetreat?: () => void
  skip?: boolean
  view: Omit<ModalChildren, 'ModalHeaderMedia'>
  title?: ReactNode | ModalTitleProps
  indicator?: ReactNode
  shouldHideHeader?: boolean
  overlayHeaderOpaqueOnScroll?: boolean
  header?: InfoModalHeader
}

// functions to help control the flow of a sequence
export interface IModalSequenceControllerProps {
  next: () => void
  previous: () => void
  goTo: (target: number | string) => void
  reset: () => void
  close: () => void
}

const ModalSequence = ({
  id,
  modalId,
  initialViewIndex = 0,
  init
}: IModalSequenceProps) => {
  const [viewIndex, setViewIndex] = useState(initialViewIndex)

  const views = init({
    next: onNext,
    previous: onPrevious,
    goTo: onGoTo,
    reset: onReset,
    close: onClose
  }) // prepare all views

  let { id: viewId, view, header, indicator, ...modalProps } = views[viewIndex] // get view to render

  function onGoTo(target: number | string) {
    const index =
      typeof target === 'string'
        ? views.findIndex(view => view.id === target)
        : (target as number)
    setViewIndex(Math.max(0, Math.min(views.length - 1, index)))
  } // navigate directly to a view or form

  function onClose() {
    NiceModal.hide(modalId)
  } // close the modal entirely

  function onNext() {
    let nextIndex = viewIndex
    for (let i = viewIndex; i < views.length; i++) {
      if (i > viewIndex && !views[i].skip) {
        nextIndex = i
        break
      }
    }
    onGoTo(nextIndex)
  } // move to the next, non-skipped view

  function onPrevious() {
    let previousIndex = viewIndex
    for (let i = viewIndex; i-- > 0; ) {
      if (i < viewIndex && !views[i].skip) {
        previousIndex = i
        break
      }
    }
    onGoTo(previousIndex)
  } // go to the previous, non-skipped view

  function onReset() {
    onGoTo(0)
  } // reset and return to the beginning

  const {
    className: mediaHeaderClassName,
    overlayComponent: mediaHeaderOverlay,
    ...mediaHeaderProps
  } = header ?? {}

  return (
    <Modal id={id} viewId={viewId} {...modalProps}>
      {({ ModalBody, ModalFooter }) => (
        <>
          {!!header && (
            <ModalMediaHeader
              className={mediaHeaderClassName}
              overlayComponent={mediaHeaderOverlay}
              content={mediaHeaderProps}
              indicator={indicator}
              insetTitle={false}
            />
          )}
          {isFunction(view) ? view({ ModalBody, ModalFooter }) : view}
        </>
      )}
    </Modal>
  )
}

export default ModalSequence

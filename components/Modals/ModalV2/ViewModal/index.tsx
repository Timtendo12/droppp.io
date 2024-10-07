import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import { MODAL_TRANSITION_LENGTH_MS } from '@/components/Modals/ModalV2/BaseModal'
import ViewModalHeader from './ViewModalHeader'
import classNames from 'classnames'
import { ButtonTheme } from '@/components/Button'

type Props = {
  children: ReactNode
  hasLogoMobile?: boolean
  headerChildren?: ReactNode
  cancelButtonConfig?: ViewModalCancelButtonConfig
}

export type ViewModalCancelButtonConfig = {
  label?: string
  theme?: ButtonTheme
  action?: () => void
}

export const VIEW_MODAL_SCROLLVIEW_ID = 'view-modal-scrollView'
const VIEW_MODAL_HEADER_HEIGHT = 64
export const headerHeightCustomProp: React.CSSProperties = {
  '--viewModalHeaderHeight': `${VIEW_MODAL_HEADER_HEIGHT}px`
}

const ViewModal = NiceModal.create<Props>(
  ({ children, cancelButtonConfig, headerChildren, hasLogoMobile = true }) => {
    const { hide, visible, remove } = useModal()

    const handleOnCancel = () => {
      hide()
      cancelButtonConfig?.action?.()
    }

    return (
      <ReactModal
        closeTimeoutMS={MODAL_TRANSITION_LENGTH_MS}
        onRequestClose={handleOnCancel}
        className="flex flex-col flex-1 max-h-[100dvh] !bg-transparent"
        overlayClassName={classNames(
          'fixed inset-0 bg-black flex flex-col z-viewModal'
        )}
        isOpen={visible}
        onAfterClose={remove}
      >
        <ViewModalHeader
          cancelButtonConfig={{ ...cancelButtonConfig, action: handleOnCancel }}
          onLogoAction={hide}
          shouldShowLogoOnSmall={hasLogoMobile}
          // ReactModal will remove this custom prop if added above - Josh - 11/15/23
          style={headerHeightCustomProp}
        >
          {headerChildren}
        </ViewModalHeader>
        <div
          id={VIEW_MODAL_SCROLLVIEW_ID}
          className="flex flex-1 overflow-y-auto"
          // ReactModal will remove this custom prop if added above - Josh - 11/15/23
          style={headerHeightCustomProp}
        >
          <div className="h-full w-full">{children}</div>
        </div>
      </ReactModal>
    )
  }
)

export default ViewModal

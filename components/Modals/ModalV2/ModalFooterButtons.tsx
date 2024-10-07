import React, { Dispatch, SetStateAction } from 'react'
import { setObjectDefaults } from '@/util/objectHelpers'
import Button from '@/components/Button'
import { ModalButtonProps } from './BaseModal'
import { handlePrimaryButtonAction } from './modalUtils'

const PRIMARY_BUTTON_INIT: ModalButtonProps = {
  size: 'md',
  theme: 'blue',
  type: 'button',
  onClick: () => alert('action not defined'),
  label: 'Done',
  disabled: false
}

interface Props {
  primaryButton: ModalButtonProps
  primaryButtonInit?: ModalButtonProps
  secondaryButton?: ModalButtonProps
  isPrimaryButtonLoading?: boolean
  notifyOnPromiseRejection?: boolean
  setIsPrimaryButtonLoading?: Dispatch<SetStateAction<boolean>>
  hide?: () => Promise<unknown>
}

export const ModalFooterButtons = ({
  primaryButton,
  primaryButtonInit = PRIMARY_BUTTON_INIT,
  secondaryButton = undefined,
  isPrimaryButtonLoading,
  setIsPrimaryButtonLoading,
  hide,
  notifyOnPromiseRejection = true
}: Props) => {
  const ButtonClasses = 'w-full flex-1'

  // allows for only having to pass one property in the object
  const _primaryButton = new Proxy(
    primaryButton,
    setObjectDefaults(primaryButtonInit)
  )

  return (
    <div className="flex gap-2 w-full">
      {secondaryButton && (
        <Button
          disabled={secondaryButton.disabled}
          className={ButtonClasses}
          theme={secondaryButton.theme}
          onClick={secondaryButton.onClick}
          size={secondaryButton.size}
        >
          {secondaryButton.label}
        </Button>
      )}
      <Button
        size={_primaryButton.size}
        className={ButtonClasses}
        theme={_primaryButton.theme}
        loading={isPrimaryButtonLoading || _primaryButton.loading}
        disabled={_primaryButton.disabled}
        type={_primaryButton.type}
        onClick={() =>
          handlePrimaryButtonAction(
            _primaryButton.onClick,
            hide,
            setIsPrimaryButtonLoading,
            notifyOnPromiseRejection
          )
        }
      >
        {_primaryButton.label}
      </Button>
    </div>
  )
}

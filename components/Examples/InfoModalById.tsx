import React, { PropsWithChildren } from 'react'
import InfoModal from '../Modals/ModalV2/InfoModal'
import { ModalFooterButtons } from '../Modals/ModalV2/ModalFooterButtons'

export default function InfoModalById({ children }: PropsWithChildren<{}>) {
  return (
    <InfoModal
      id={'infoModalByIdExample'}
      title={'Unique ID Example'}
      header={{
        image: {
          path: 'global/modals/',
          id: 'wallet-mon_1',
          alt: 'header image',
          width: 480,
          height: 300
        }
      }}
      primaryButton={{
        theme: 'blue',
        onClick: () => alert('action not defined'),
        label: 'Close',
        disabled: false
      }}
    >
      {({ ModalBody, ModalFooter }) => {
        return (
          <>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <ModalFooterButtons
                primaryButton={{
                  theme: 'blue',
                  label: 'Next',
                  onClick: () => alert('Next')
                }}
                secondaryButton={{
                  theme: 'destructive',
                  label: 'Close',
                  onClick: () => alert('Close')
                }}
              />
            </ModalFooter>
          </>
        )
      }}
    </InfoModal>
  )
}

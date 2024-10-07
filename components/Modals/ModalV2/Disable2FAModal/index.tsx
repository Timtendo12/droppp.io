import { useRouter } from 'next/router'
import { MODAL_ID } from '@/constants/modalId'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import ConfirmDisable from './ConfirmDisable'
import Verification from './Verification'
import ModalSequence from '@/components/Modals/ModalV2/ModalSequence'

export default function Disable2FAModal() {
  const router = useRouter()

  return (
    <ModalSequence
      id={MODAL_ID.disable2FA}
      modalId={MODAL_ID.disable2FA}
      init={({ goTo, close }) => [
        {
          id: 'confirm-disable',
          title: null,
          view: modalProps => (
            <ConfirmDisable
              {...modalProps}
              onConfirm={() => goTo('verification')}
            />
          )
        },
        {
          id: 'verification',
          title: null,
          view: modalProps => (
            <Verification
              {...modalProps}
              onContinue={() => goTo('completed')}
            />
          )
        },
        {
          id: 'completed',
          title: null,
          view: ({ ModalFooter, ModalBody }) => (
            <>
              <ModalBody>
                <div className="text-center">
                  <Icon className="m-auto" name="success" />
                  <div className="mt-2 h4">2-Step Verification Disabled</div>
                  <div className="mt-2 body text-gray-300">
                    Your account no longer requires 2-step verification to log
                    in or transfer items.
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    close()
                    router.reload()
                  }}
                >
                  Done
                </Button>
              </ModalFooter>
            </>
          )
        }
      ]}
    />
  )
}

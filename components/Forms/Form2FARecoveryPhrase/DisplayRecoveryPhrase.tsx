import { ControlledConfirmation } from '@/components/AcknowledgeBox/Confirmation'
import Button from '@/components/Button'
import CopyButton from '@/components/Button/CopyButton'
import RoundedBox from '@/components/RoundedBox'
import Toast from '@/components/Toast'
import { useForm } from 'react-hook-form'
import { Form2FARecoveryButtonLabel } from './constants'
import { ModalChildrenWrappers } from '@/components/Modals/ModalV2/BaseModal'
import classNames from 'classnames'

const buttonStyleProps = {
  className: 'w-full'
}

interface Props {
  modalContentWrappers?: ModalChildrenWrappers
  recoveryPhrase: string
  onContinue: () => void
}

export const DisplayRecoveryPhrase = ({
  modalContentWrappers,
  recoveryPhrase,
  onContinue
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm()

  const onSubmit = async () => {
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!modalContentWrappers ? (
        <>
          <modalContentWrappers.ModalBody>
            <Body control={control} recoveryPhrase={recoveryPhrase} />
          </modalContentWrappers.ModalBody>
          <modalContentWrappers.ModalFooter>
            <Footer isValid={isValid} recoveryPhrase={recoveryPhrase} />
          </modalContentWrappers.ModalFooter>
        </>
      ) : (
        <>
          <Body
            control={control}
            recoveryPhrase={recoveryPhrase}
            className="mt-3"
          />
          <Footer
            isValid={isValid}
            recoveryPhrase={recoveryPhrase}
            className="mt-3"
          />
        </>
      )}
    </form>
  )
}

const Body = ({ control, recoveryPhrase, className = '' }) => {
  return (
    <div className={className}>
      <Toast type="attention" inline>
        With 2FA enabled, you’ll need the phrase below to regain access to your
        account if you were to lose your device. Without this phrase or your
        device you will not be able to access your account and{' '}
        <b>Droppp Support can not regain access</b> for you. We recommend
        printing the phrase and keeping it in a safe place.
      </Toast>
      <div className="mt-2 h7">Your Secret Recovery Phrase</div>
      <RoundedBox
        className="flex justify-between items-center gap-1 h-9 mt-1 bg-gray-800 border border-gray-700 !px-2 !py-[12px]"
        size="sm"
      >
        <div className="h-full overflow-auto flex-1 body">{recoveryPhrase}</div>
        <CopyButton
          valueToCopy={recoveryPhrase}
          size="sm"
          className="relative before:absolute before:-inset-2"
        />
      </RoundedBox>
      <div className="body-sm mt-1 text-center text-gray-300">
        10 Uses Remaining
      </div>
      <ControlledConfirmation
        className="body-sm bg-gray-800 mt-2"
        required
        name={'confirm'}
        control={control}
      >
        I have stored the phrase above in a secure&nbsp;location.
      </ControlledConfirmation>
    </div>
  )
}

const Footer = ({ isValid, recoveryPhrase, className = '' }) => {
  const handlePrintPhrase = () => {
    const element = document.createElement('a')
    const file = new Blob([recoveryPhrase], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'droppp-recovery-phrase.txt'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className={classNames('flex gap-2', className)}>
      <Button {...buttonStyleProps} theme="gray" onClick={handlePrintPhrase}>
        {Form2FARecoveryButtonLabel.Print}
      </Button>
      <Button type="submit" {...buttonStyleProps} disabled={!isValid}>
        {Form2FARecoveryButtonLabel.Continue}
      </Button>
    </div>
  )
}

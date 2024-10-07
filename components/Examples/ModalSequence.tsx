import Button from '@/components/Button'
import NiceModal from '@ebay/nice-modal-react'
import ModalSequence from '../Modals/ModalV2/ModalSequence'
import { ModalFooterButtons } from '../Modals/ModalV2/ModalFooterButtons'
import { useForm } from 'react-hook-form'
import Field from '../Field'
import { Input } from '../Inputs'
import Toast from '../Toast'

export default NiceModal.create(() => {
  return (
    <ModalSequence
      id={'modalSequenceExample'}
      modalId={'modalSequenceExample'}
      init={sequenceProps => [
        {
          id: 'view1',
          title: {
            header: 'Enter withdrawal address & Choose network',
            body: 'Inline Title'
          },
          overlayHeaderOpaqueOnScroll: true,
          header: {
            image: {
              path: 'global/modals/',
              id: 'wallet-mon_1',
              alt: 'header image',
              width: 480,
              height: 300
            }
          },
          view: ({ ModalBody, ModalFooter }) => {
            const { next } = sequenceProps
            return (
              <>
                <ModalBody>This is the first view</ModalBody>
                <ModalFooter>
                  <Button onClick={next} className="w-full">
                    Continue
                  </Button>
                </ModalFooter>
              </>
            )
          }
        },
        {
          id: 'view2',
          onRetreat: sequenceProps.previous,
          title: {
            header: 'Show only header title',
            body: ''
          },
          view: ({ ModalBody, ModalFooter }) => {
            const { next, close } = sequenceProps
            return (
              <>
                <ModalBody>This is the second view</ModalBody>
                <ModalFooter>
                  <ModalFooterButtons
                    primaryButton={{
                      theme: 'blue',
                      label: 'Next',
                      onClick: next
                    }}
                    secondaryButton={{
                      theme: 'destructive',
                      label: 'Close',
                      onClick: close
                    }}
                  />
                </ModalFooter>
              </>
            )
          }
        },
        {
          id: 'view3',
          onRetreat: sequenceProps.previous,
          title: 'Enter your first name',
          view: viewProps => <FinalStepForm {...viewProps} {...sequenceProps} />
        }
      ]}
    />
  )
})

const FinalStepForm = ({ ModalBody, ModalFooter, close }) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm({ mode: 'onChange', delayError: 1000 })

  const onSubmit = () => {
    Toast({
      type: 'success',
      autoClose: 3000,
      description: 'Form Submitted Successfully'
    })
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <Field
          className="w-full"
          name={'firstName'}
          errors={errors}
          label="First Name"
        >
          <Input
            register={register('firstName', {
              required: 'This field is required',
              validate: {
                matchName: value => value === 'John' || 'Name must be John'
              }
            })}
            label="First Name"
            id={'firstName'}
            placeholder="First Name"
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" disabled={!isValid} className="w-full">
          Submit
        </Button>
      </ModalFooter>
    </form>
  )
}

import React from 'react'
import { useForm } from 'react-hook-form'
import { SUPPORT_EMAIL } from '@/config'
import { FOOTER_LINKS } from '@/constants'
import { useLegalConsumerRightsInfo } from '@/api/resources/legal/consumer-rights/info/get'
import { Input } from '@/components/Inputs'
import Separator from '@/components/Separator'
import { ControlledCheckbox, ControlledRadio } from '@/components/Checkbox'
import AcknowledgeBox from '@/components/AcknowledgeBox'
import Field from '@/components/Field'
import Toast from '@/components/Toast'
import { ModalChildrenWrappers } from '../Modals/ModalV2/BaseModal'
import { useAddLegalConsumerRightsMutation } from '@/api/resources/legal/consumer-rights/add'
import { isApiError } from '@/api/core/errors'
import { hideModal } from '../Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import Button from '../Button'

export const INPUTS = {
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  phone: 'phone',
  country: 'country',
  state: 'state',
  wax_account: 'wax_account',
  request_type: 'request_type',
  request_affiliation: 'request_affiliation',
  agent_first_name: 'agent_first_name',
  agent_last_name: 'agent_last_name',
  agent_email: 'agent_email'
}

const DEFAULT_VALUES = {
  [INPUTS.first_name]: '',
  [INPUTS.last_name]: '',
  [INPUTS.email]: '',
  [INPUTS.phone]: '',
  [INPUTS.country]: '',
  [INPUTS.state]: '',
  [INPUTS.wax_account]: '',
  [INPUTS.request_type]: [],
  [INPUTS.request_affiliation]: 'self',
  [INPUTS.agent_first_name]: '',
  [INPUTS.agent_last_name]: '',
  [INPUTS.agent_email]: ''
}

const INPUT_VALIDATORS = {
  required: {
    required: 'This field is required'
  }
}

const FormConsumerRights = ({
  ModalBody,
  ModalFooter
}: ModalChildrenWrappers) => {
  const {
    control,
    getValues,
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({ mode: 'onChange', defaultValues: DEFAULT_VALUES })

  const request_affiliation = watch(INPUTS.request_affiliation)

  const addLegalConsumerRightsMutation = useAddLegalConsumerRightsMutation({
    onSuccess: () => {
      Toast({
        type: 'success',
        title: 'Success',
        description: 'Your request has been submitted!'
      })
      hideModal(MODAL_ID.consumerRightsRequest)
    },
    onError: err => {
      if (isApiError(err)) {
        const { errorMessage, details } = err
        Toast({
          type: 'warning',
          title: errorMessage,
          description: Object.entries(details)[0][1]
        })
      }
    }
  })

  const onSubmit = data => {
    addLegalConsumerRightsMutation.mutate({
      ...data,
      [INPUTS.request_type]: Object.keys(requestTypes)
        .reduce((acc, value, index) => {
          if (data.request_type[index]) acc.push(value)
          return acc
        }, [] as string[])
        ?.join(',')
    })
  }

  const { data: legalConsumerRightsInfo } = useLegalConsumerRightsInfo()
  const {
    request_type_display: requestTypes = [],
    request_affiliation_display: requesterTypes = []
  } = legalConsumerRightsInfo || {}

  const isAgent = request_affiliation === 'agent'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <div className="flex flex-col gap-2 w-full">
          <div className="body text-gray-300">
            Depending on where you reside, you may have certain rights regarding
            your personal information. To exercise these rights, please fill out
            this form. For more information about our privacy practices and
            other choices available to you, please see our{' '}
            <a
              className="inline-link"
              href={FOOTER_LINKS.privacy.href}
              target="_blank"
              rel="noreferrer"
            >
              {FOOTER_LINKS.privacy.label}
            </a>
            .
          </div>
          <div className="flex max-md:flex-col gap-2 mt-1">
            <Field
              className="w-full"
              name={INPUTS.first_name}
              errors={errors}
              label="First Name"
            >
              <Input
                register={register(INPUTS.first_name, {
                  ...INPUT_VALIDATORS['required']
                })}
                id={INPUTS.first_name}
                placeholder="Type Here"
              />
            </Field>

            <Field
              className="w-full"
              name={INPUTS.last_name}
              errors={errors}
              label="Last Name"
            >
              <Input
                register={register(INPUTS.last_name, {
                  ...INPUT_VALIDATORS['required']
                })}
                id={INPUTS.last_name}
                placeholder="Type Here"
              />
            </Field>
          </div>

          <Field name={INPUTS.email} errors={errors} label="Email Address">
            <Input
              register={register(INPUTS.email, {
                ...INPUT_VALIDATORS['required']
              })}
              id={INPUTS.email}
              placeholder="Type Here"
            />
          </Field>

          <Field name={INPUTS.phone} errors={errors} label="Phone Number">
            <Input
              register={register(INPUTS.phone, {
                ...INPUT_VALIDATORS['required']
              })}
              id={INPUTS.phone}
              placeholder="000 000 0000"
            />
          </Field>
          <div className="md:flex gap-2 mt-1">
            <Field
              className="w-full"
              name={INPUTS.country}
              errors={errors}
              label="Country"
            >
              <Input
                register={register(INPUTS.country, {
                  ...INPUT_VALIDATORS['required']
                })}
                id={INPUTS.country}
                placeholder="Type Here"
              />
            </Field>
            <Field
              className="w-full max-md:mt-2"
              name={INPUTS.state}
              errors={errors}
              label="state"
            >
              <Input
                register={register(INPUTS.state, {
                  ...INPUT_VALIDATORS['required']
                })}
                id={INPUTS.state}
                placeholder="Type Here"
              />
            </Field>
          </div>

          <Field
            name={INPUTS.wax_account}
            errors={errors}
            label="Droppp Wallet Address"
          >
            <Input
              register={register(INPUTS.wax_account, {
                ...INPUT_VALIDATORS['required']
              })}
              autoComplete={INPUTS.wax_account}
              id={INPUTS.wax_account}
              placeholder="example.dp"
            />
          </Field>
          <Separator className="my-1" />
          <div className="h5">TYPE OF REQUEST(S)</div>
          <div className="body text-gray-300">Check all that apply.</div>
          {Object.entries(requestTypes).map(([key, value], index) => {
            return (
              <ControlledCheckbox
                key={key}
                defaultValue={false}
                rules={{
                  validate: () => {
                    const values = getValues(INPUTS.request_type) as []
                    return (
                      values.some(value => value) || 'At least one is required'
                    )
                  }
                }}
                className="-mt-1"
                name={`${INPUTS.request_type}.${index}`}
                control={control}
                label={value}
              />
            )
          })}
          <Separator className="my-1" />
          <div className="h5">TYPE OF REQUESTER</div>
          <div className="body text-gray-300">
            I hereby certify that I am (select one):
          </div>
          <AcknowledgeBox
            confirm={Object.keys(requesterTypes).map(key => (
              <ControlledRadio
                key={key}
                register={register(INPUTS.request_affiliation, {
                  ...INPUT_VALIDATORS['required']
                })}
                label={requesterTypes[key]}
                value={key}
              />
            ))}
          />
          {isAgent && (
            <>
              <div className="h5 mt-1">Authorized agent</div>
              <div className="body text-gray-300">
                If you are not making this request on your own behalf, please
                provide the following additional details:
              </div>
              <div className="flex max-md:flex-col gap-2 mt-1">
                <Field
                  className="w-full"
                  name={INPUTS.agent_first_name}
                  errors={errors}
                  label="First Name"
                >
                  <Input
                    register={register(INPUTS.agent_first_name, {
                      ...INPUT_VALIDATORS['required']
                    })}
                    id={INPUTS.agent_first_name}
                    placeholder="Type Here"
                  />
                </Field>

                <Field
                  className="w-full"
                  name={INPUTS.agent_last_name}
                  errors={errors}
                  label="Last Name"
                >
                  <Input
                    register={register(INPUTS.agent_last_name, {
                      ...INPUT_VALIDATORS['required']
                    })}
                    id={INPUTS.agent_last_name}
                    placeholder="Type Here"
                  />
                </Field>
              </div>

              <Field
                name={INPUTS.agent_email}
                errors={errors}
                label="Email Address"
              >
                <Input
                  register={register(INPUTS.agent_email, {
                    ...INPUT_VALIDATORS['required']
                  })}
                  id={INPUTS.agent_email}
                  placeholder="Type Here"
                />
              </Field>
              <Toast className="mt-1" type="attention" inline>
                If you are submitting this request as an authorized agent, you
                are required to submit proof of your authorization to make this
                request, such as a valid power of attorney or proof that you
                have signed permission from the individual who is the subject of
                the request. Please email us this proof of authorization to{' '}
                <a
                  className="underline"
                  href="mailto:support@droppp.io"
                  rel="noreferrer"
                >
                  {SUPPORT_EMAIL}
                </a>
                .
              </Toast>
              <div className="body-xs text-gray-300">
                Please do not provide any sensitive personal information in
                connection with this request, such as a driver's license or
                other government-issued ID. In some cases, we may be required to
                contact the individual who is the subject of the request to
                verify his or her own identity or confirm you have permission to
                submit this request.
                <br />
                <br /> Where required by law, we may ask you to provide
                additional information to confirm your identity. Please monitor
                your inbox for a follow-up email from support@droppp.io.
                Requests may be denied if they cannot be verified or confirmed.
              </div>
            </>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          loading={isSubmitting || addLegalConsumerRightsMutation.isLoading}
          disabled={!isValid}
          size="lg"
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormConsumerRights

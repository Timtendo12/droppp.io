import React, { ReactNode, useEffect } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Input } from '@/components/Inputs'
import Button from '@/components/Button'
import CountrySelector from '@/components/Select/CountrySelector'
import StateSelector from '@/components/Select/StateSelector'
import Field from '@/components/Field'
import useBreakpoints from '@/hooks/useBreakpoints'

const INPUTS = {
  country_id: 'country_id',
  receiver_first_name: 'receiver_first_name',
  receiver_last_name: 'receiver_last_name',
  street_address1: 'street_address1',
  street_address2: 'street_address2',
  city: 'city',
  state: 'state',
  postal_code: 'postal_code'
} as const

export type ShippingAddress = {
  country_id?: number
  receiver_first_name?: string
  receiver_last_name?: string
  street_address1?: string
  street_address2?: string
  city?: string
  state?: string
  postal_code?: string
  country_name?: string
}

const DEFAULT_VALUES = {
  [INPUTS.country_id]: 1,
  [INPUTS.receiver_first_name]: '',
  [INPUTS.receiver_last_name]: '',
  [INPUTS.street_address1]: '',
  [INPUTS.street_address2]: '',
  [INPUTS.city]: '',
  [INPUTS.state]: '',
  [INPUTS.postal_code]: ''
}

const INPUT_VALIDATORS = {
  required: {
    required: 'This field is required'
  }
}
interface Props {
  countryFieldDisabled?: boolean
  defaultValues?: ShippingAddress
  onChangeCountry?: (data) => void
}

const ShippingFormController = ({
  countryFieldDisabled = false,
  onChangeCountry,
  data = DEFAULT_VALUES,
  onSubmit,
  children
}: {
  data?: ShippingAddress
  onChangeCountry?: (data) => void
  countryFieldDisabled?: boolean
  onSubmit: (data: ShippingAddress) => void
  children: ({
    Body,
    Footer
  }: {
    Body: ReactNode
    Footer: ReactNode
  }) => ReactNode
}) => {
  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: data
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children({
          Body: (
            <FormShippingInfo
              countryFieldDisabled={countryFieldDisabled}
              defaultValues={data}
              onChangeCountry={onChangeCountry}
            />
          ),
          Footer: <FormShippingInfoSubmit />
        })}
      </form>
    </FormProvider>
  )
}

const FormShippingInfo = ({
  countryFieldDisabled = false,
  onChangeCountry,
  defaultValues = DEFAULT_VALUES
}: Props) => {
  const {
    watch,
    control,
    register,
    formState: { errors }
  } = useFormContext<ShippingAddress>()

  const { isMedium } = useBreakpoints(['md'])

  const country_id = watch(INPUTS.country_id)
  const isUsShipping = country_id === 1

  useEffect(() => {
    !!onChangeCountry && !!country_id && onChangeCountry(country_id)
  }, [country_id])

  return (
    <>
      <Field name={INPUTS.country_id} errors={errors} label="Country">
        <CountrySelector
          disabled={countryFieldDisabled}
          formProps={{
            name: INPUTS.country_id,
            control
          }}
        />
      </Field>

      <div className="md:flex gap-2 mt-2">
        <Field
          className="flex-1"
          name={INPUTS.receiver_first_name}
          errors={errors}
          label="First Name"
        >
          <Input
            defaultValue={defaultValues.receiver_first_name}
            register={register(INPUTS.receiver_first_name, {
              ...INPUT_VALIDATORS['required']
            })}
            id={INPUTS.receiver_first_name}
          />
        </Field>

        <Field
          className="max-md:mt-2 flex-1"
          name={INPUTS.receiver_last_name}
          errors={errors}
          label="Last Name"
        >
          <Input
            defaultValue={defaultValues.receiver_last_name}
            register={register(INPUTS.receiver_last_name, {
              ...INPUT_VALIDATORS['required']
            })}
            id={INPUTS.receiver_last_name}
          />
        </Field>
      </div>

      <Field
        className="mt-2"
        name={INPUTS.street_address1}
        errors={errors}
        label="Address Line 1"
      >
        <Input
          defaultValue={defaultValues.street_address1}
          register={register(INPUTS.street_address1, {
            ...INPUT_VALIDATORS['required']
          })}
          id={INPUTS.street_address1}
        />
      </Field>

      <Field
        className="mt-2"
        name={INPUTS.street_address2}
        errors={errors}
        label="Address Line 2"
        optional={true}
      >
        <Input
          defaultValue={defaultValues.street_address2}
          register={register(INPUTS.street_address2)}
          id={INPUTS.street_address2}
        />
      </Field>

      <Field className="mt-2" name={INPUTS.city} errors={errors} label="City">
        <Input
          defaultValue={defaultValues.city}
          register={register(INPUTS.city, {
            ...INPUT_VALIDATORS['required']
          })}
          id={INPUTS.city}
        />
      </Field>
      <div className={isUsShipping && isMedium ? 'flex gap-2' : ''}>
        {isUsShipping ? (
          <Field
            className="mt-2 w-full"
            name={INPUTS.state}
            errors={errors}
            label="State"
          >
            <StateSelector
              formProps={{
                name: INPUTS.state,
                control,
                rules: { ...INPUT_VALIDATORS['required'] }
              }}
              selectorProps={{
                menuPlacement: 'top',
                defaultValue: defaultValues.state
              }}
            />
          </Field>
        ) : (
          <Field
            className="mt-2"
            name={INPUTS.state}
            errors={errors}
            label="state"
          >
            <Input
              defaultValue={defaultValues.state}
              register={register(INPUTS.state, {
                ...INPUT_VALIDATORS['required']
              })}
              id={INPUTS.state}
            />
          </Field>
        )}
        <Field
          className="mt-2"
          name={INPUTS.postal_code}
          errors={errors}
          label={isUsShipping ? 'Zip Code' : 'Postal Code'}
        >
          <Input
            defaultValue={defaultValues.postal_code}
            register={register(INPUTS.postal_code, {
              ...INPUT_VALIDATORS['required']
            })}
            id={INPUTS.postal_code}
          />
        </Field>
      </div>
    </>
  )
}

export const FormShippingInfoSubmit = ({ label = 'Continue' }) => {
  const {
    formState: { isValid, isSubmitting }
  } = useFormContext()

  return (
    <Button
      className="w-full"
      type="submit"
      disabled={!isValid}
      loading={isSubmitting}
    >
      {label}
    </Button>
  )
}

export default ShippingFormController

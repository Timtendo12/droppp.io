import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import ControlledSelect from '@/components/Select/ControlledSelect'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import Button from '@/components/Button'
import Field from '@/components/Field'
import { Input } from '@/components/Inputs'
import { MergedDrop } from '@/config/drops/schema'
import NiceModal from '@ebay/nice-modal-react'
import Modal, { hideModal } from '@/components/Modals/ModalV2'
import { DropState } from '@/enum'
import classNames from 'classnames'
import Separator from '@/components/Separator'
import Collapsible from '@/components/Collapsible'
import Icon from '@/components/Icon'

type Props = {
  drop: MergedDrop
  context: any
}

type DropSettingsInputs = {
  state: DropState
  time_launch: string
  redeem_start_date: string
  redeem_end_date: string
  duration_in_seconds: string
  redeem_ship_date: string
}

export const DropSettings = NiceModal.create<Props>(
  ({ drop, context }: Props) => {
    // fill with params from local storage if on dev
    // fill with drop values if no local storage or not on dev
    const { updateDropContext, ...dropContext } = context

    const {
      state,
      time_launch,
      redeem_start_date,
      redeem_end_date,
      redeem_ship_date,
      duration_in_seconds
    } = dropContext

    const methods = useForm<DropSettingsInputs>({
      defaultValues: {
        state,
        time_launch,
        redeem_start_date,
        redeem_end_date,
        redeem_ship_date,
        duration_in_seconds
      }
    })

    const { handleSubmit } = methods

    const onSubmit = data => {
      // grabs the value off the option object
      data.state = data.state.value || data.state
      updateDropContext({ ...dropContext, ...data }, true)
      hideModal(MODAL_ID.devOnly.dropSettings)
    }

    return (
      <Modal title={'Drop Settings'} id={MODAL_ID.devOnly.dropSettings}>
        {({ ModalBody, ModalFooter }) => (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody className="space-y-2">
                <Collapsible
                  contentClassName={'mt-2'}
                  label={isOpen => (
                    <div className="flex items-center">
                      <div className="h8">Current Drop State</div>
                      <Icon name={`arrow-${isOpen ? 'up' : 'down'}`} />
                    </div>
                  )}
                >
                  <DropStateDisplay contextValues={dropContext} />
                </Collapsible>
                <Separator />
                <DropSettingsForm drop={drop} />
              </ModalBody>
              <ModalFooter className="flex gap-2">
                <Button className="w-full" type="submit">
                  Update
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        )}
      </Modal>
    )
  }
)

const DropSettingsForm = ({ drop }) => {
  const { register, setValue, control } = useFormContext()

  const setTimeInSeconds = (
    option: '1m' | '30m',
    input: keyof DropSettingsInputs
  ) => {
    if (option === '1m') {
      setValue(input, 60)
    }
    if (option === '30m') {
      setValue(input, 1800)
    }
  }

  return (
    <>
      <Field className="w-full" name={'state'} label="Drop State">
        <ControlledSelect
          name={'state'}
          searchable={false}
          options={[
            { label: 'Lite Pop', value: 'lite_pop' },
            { label: 'Lite Ultra', value: 'lite_ultra' },
            { label: 'Lite Mystery', value: 'lite_mystery' },
            { label: 'Sale Ended', value: 'ended' },
            { label: 'Sold Out', value: 'sold_out' }
          ]}
          formProps={{
            name: 'state',
            control
          }}
          selectorProps={{
            placeholder: 'Select Drop State'
          }}
        />
      </Field>
      <Field className="w-full" name={'time_launch'} label="Launch Time">
        <Input
          register={register('time_launch')}
          id={'time_launch'}
          placeholder="Launch"
        />
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex gap-2">
            <SetNowButton inputId="time_launch" />
            <SetTimeButton time="10s" inputId="time_launch" />
            <SetTimeButton time="30m" inputId="time_launch" />
            <SetTimeButton time="8h" inputId="time_launch" />
          </div>
          <ResetButton inputId="time_launch" drop={drop} />
        </div>
      </Field>
      <Field
        className="w-full"
        name={'queueOffset'}
        label="Queue Open (secs prior to launch)"
      >
        <Input
          register={register('duration_in_seconds')}
          placeholder="Launch"
        />
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex gap-2">
            <Button
              theme="clean-blue"
              size="sm"
              onClick={() => setTimeInSeconds('1m', 'duration_in_seconds')}
            >
              1 min
            </Button>
            <Button
              theme="clean-blue"
              size="sm"
              onClick={() => setTimeInSeconds('30m', 'duration_in_seconds')}
            >
              30 mins
            </Button>
          </div>
          <ResetButton inputId="duration_in_seconds" drop={drop} />
        </div>
      </Field>
      <Field className="w-full" name={'redeem_start_date'} label="Snapshot">
        <Input
          register={register('redeem_start_date')}
          placeholder="Redeem Start Date"
        />
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex gap-2">
            <SetNowButton inputId="redeem_start_date" />
            <SetTimeButton time="10s" inputId="redeem_start_date" />
          </div>
          <ResetButton inputId="redeem_start_date" drop={drop} />
        </div>
      </Field>
      <Field
        className="w-full"
        name={'redeem_end_date'}
        label="Redemption Closed"
      >
        <Input
          register={register('redeem_end_date')}
          placeholder="Redemption Closed"
        />
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex gap-2">
            <SetNowButton inputId="redeem_end_date" />
            <SetTimeButton time="10s" inputId="redeem_end_date" />
          </div>
          <ResetButton inputId="redeem_end_date" drop={drop} />
        </div>
      </Field>
      <Field
        className="w-full"
        name={'redeem_ship_date'}
        label="Shipping (B/E supplied)"
      >
        <Input
          register={register('redeem_ship_date')}
          placeholder="Shipping Date"
        />
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex gap-2">
            <SetNowButton inputId="redeem_ship_date" />
            <Button theme="clean-blue" size="sm">
              No Date Supplied
            </Button>
          </div>
          <ResetButton inputId="redeem_ship_date" drop={drop} />
        </div>
      </Field>
    </>
  )
}

type TimeOptions = 'now' | '10s' | '30m' | '8h'

const setTime = (
  option: TimeOptions,
  input: keyof DropSettingsInputs,
  setValue: (input: string, value: string) => void
) => {
  if (option === 'now') {
    setValue(input, convertTimeString(new Date()))
  }
  if (option === '10s') {
    setValue(input, convertTimeString(new Date(Date.now() + 10000)))
  }
  if (option === '30m') {
    setValue(input, convertTimeString(new Date(Date.now() + 1.8e6)))
  }
  if (option === '8h') {
    setValue(input, convertTimeString(new Date(Date.now() + 2.88e7)))
  }
}

const ResetButton = ({ inputId, drop }) => {
  const { setValue } = useFormContext()

  const resetInput = (input: keyof DropSettingsInputs) => {
    if (!drop[input]) return
    setValue(inputId, drop[input].toString())
  }

  return (
    <Button
      theme="clean"
      size="sm"
      onClick={() => resetInput(inputId)}
      className="font-bold"
    >
      Reset
    </Button>
  )
}

const SetTimeButton = ({
  time,
  inputId
}: {
  time: TimeOptions
  inputId: keyof DropSettingsInputs
}) => {
  const { setValue } = useFormContext()
  return (
    <Button
      theme="clean-blue"
      size="sm"
      onClick={() => setTime(time, inputId, setValue)}
    >
      {time}
    </Button>
  )
}
const SetNowButton = ({ inputId }) => {
  return <SetTimeButton time="now" inputId={inputId} />
}

const convertTimeString = (date: Date) => {
  return date.toISOString().replace('T', ' ').split('.')[0]
}

const DropStateDisplay = ({ contextValues }) => {
  const {
    isLaunchDay,
    isWithin8HoursBeforeQueue,
    isQueueOpen,
    isLaunched,
    isPostSale,
    isPostSnapshot,
    isPostRedemption,
    isShipping
  } = contextValues

  return (
    <div className="tabular-nums flex gap-2">
      <div>
        <DropStateHelper title={'isLaunchDay'} bool={isLaunchDay} />
        <DropStateHelper
          title={'isWithin8HoursBeforeQueue'}
          bool={isWithin8HoursBeforeQueue}
        />
        <DropStateHelper title={'isQueueOpen'} bool={isQueueOpen} />
      </div>
      <div>
        <DropStateHelper title={'isLaunched'} bool={isLaunched} />
        <DropStateHelper title={'isPostSale'} bool={isPostSale} />
        <DropStateHelper title={'isPostSnapshot'} bool={isPostSnapshot} />
      </div>
      <div>
        <DropStateHelper title={'isPostRedemption'} bool={isPostRedemption} />
        <DropStateHelper title={'isShipping'} bool={isShipping} />
      </div>
    </div>
  )
}

const DropStateHelper = ({ bool, title }) => {
  return (
    <p className={classNames('text-success', { '!text-error': !bool })}>
      {title}
    </p>
  )
}

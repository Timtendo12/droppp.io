import Button from '@/components/Button'
import { ControlledCryptoNetworkSelector } from '@/features/wallet/deposit/components/CryptoNetworkSelector'
import { CRYPTO_NETWORK_SELECTOR_OPTIONS } from '@/features/wallet/core/constants'
import { FieldValues, useForm } from 'react-hook-form'
import { submit } from '@/components/Modals/ModalV2/shared/props'
import SubFooter from '@/features/wallet/deposit/components/SubFooter'
import { NetworkType } from '@/api/resources/shared/crypto'
import { useState } from 'react'
import { tryApiAction } from '@/api/core/compat'
import { getWalletAddress } from '@/api/resources/user/wallet/address/get'
import {
  useDepositContext,
  useDepositDispatch
} from '@/features/wallet/deposit/components/DepositContext'
import {
  ContentType,
  DepositViewBodyProps
} from '@/features/wallet/deposit/types'

type FormValues = {
  network: NetworkType
}

const ChooseNetworkBody = ({
  ModalBody,
  ModalFooter,
  next
}: DepositViewBodyProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const { network } = useDepositContext()
  const dispatch = useDepositDispatch()

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormValues>({ defaultValues: { network } })

  const onSubmit = async (e: FieldValues) => {
    setIsFetching(true)
    const { success, data } = await tryApiAction(() =>
      getWalletAddress({ chain: e.network })
    )
    if (success) {
      dispatch({ type: 'network', payload: e.network })
      dispatch({ type: 'address', payload: data })
      setIsFetching(false)
      next()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300">
            In the next step, you will receive an address that you will use to
            send funds to Droppp. We need to know which network you will use in
            order to provide you with the correct address. You can always come
            back and change this.
          </p>
          <ControlledCryptoNetworkSelector
            name="network"
            className="-mt-1"
            control={control}
            required
            options={Object.values(CRYPTO_NETWORK_SELECTOR_OPTIONS)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button disabled={!isValid} loading={isFetching} {...submit}>
          Next
        </Button>
        <SubFooter />
      </ModalFooter>
    </form>
  )
}

export const Content: ContentType = {
  title: `Choose a network`,
  header: {
    className: 'bg-gradient-to-b from-gray-850/0 to-black aspect-[9/5]',
    image: {
      path: 'global/modals/',
      id: 'network-modal-hero-polygon',
      alt: 'header image',
      width: 480,
      height: 300,
      className: 'aspect-[24/15]'
    }
  },
  view: props => <ChooseNetworkBody {...props} />
}

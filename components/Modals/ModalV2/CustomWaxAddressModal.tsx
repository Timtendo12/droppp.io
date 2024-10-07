import React from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import InfoModal from './InfoModal'
import InputCustomAddress from '@/components/Inputs/InputCustomAddress'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import { CLOUDINARY_WALLET_PATH } from '@/pages/wallet'
import { setReturnUri } from '@/util/cookieHelpers'
import BooleanModal from './BooleanModal'
import { SUPPORT_EMAIL } from '@/config'

const CustomWaxAddressModal = NiceModal.create(() => {
  const FreeAddressModal = useModal(BooleanModal)

  return (
    <InfoModal
      id={MODAL_ID.wallet.customWaxAddress}
      title="Make your profile sing"
      header={{
        image: {
          path: CLOUDINARY_WALLET_PATH,
          id: 'upgrade-address',
          alt: 'Monster singing into mic',
          width: 250,
          height: 245
        }
      }}
      subFooter={
        <div className="mt-3 text-center">
          <Button
            className="underline text-gray-300 body-sm"
            theme="clean"
            onClick={() =>
              FreeAddressModal.show({
                title: 'Need a free Address?',
                children: (
                  <>
                    <p>
                      We are more than happy to provide our users with a free
                      wallet address on a case-by-case basis. A typical
                      situation where you need a wallet address before
                      participating in your first drop is when you have bought
                      packs or tokens on the secondary market and need to
                      transfer them to your Droppp account to unpack or redeem
                      them.
                      <br />
                      <br />
                      Please allow 2-3 business days for your request to be
                      processed. However if you need an address immediately, you
                      can always purchase a custom address for $4.99.
                    </p>
                  </>
                ),
                primaryButton: {
                  label: 'Drop Us a Line',
                  onClick: () =>
                    (window.location.href = `mailto:${SUPPORT_EMAIL}&subject=Send me a free address!`)
                }
              })
            }
          >
            Need a Free Address Sooner?
          </Button>
        </div>
      }
    >
      {({ ModalHeaderMedia, ...modalProps }) => {
        return (
          <>
            <ModalHeaderMedia
              content={{
                image: {
                  path: CLOUDINARY_WALLET_PATH,
                  id: 'upgrade-address',
                  alt: 'Monster singing into mic',
                  width: 250,
                  height: 245
                }
              }}
            />
            <CustomAddressForm {...modalProps} />
          </>
        )
      }}
    </InfoModal>
  )
})

const CustomAddressForm = ({ ModalBody, ModalFooter }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid }
  } = useForm({
    defaultValues: { customAddress: '' }
  })

  const router = useRouter()

  const hideModal = () => NiceModal.hide(MODAL_ID.wallet.customWaxAddress)

  const onSubmit = data => {
    if (!isValid) return
    setReturnUri('/wallet')
    router.push(`/purchase-wax?address=${data.customAddress}`)
    hideModal()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <p className="mb-3">
          Create a distinct profile name that doubles as your Droppp address,
          where your digital items are stored on the blockchain. Upgrade to a
          custom address for $4.99 or get a free random Droppp address by
          depositing at least 5 USDC into your Droppp Wallet or making a
          purchase during a drop.
        </p>
        <Controller
          control={control}
          name={'customAddress'}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <div className="utility text-white mb-1">New Address</div>
              <InputCustomAddress
                onChange={address => field.onChange(address)}
                onChangeValidation={isValid => {
                  !isValid &&
                    setError('customAddress', {
                      message: 'Please enter a valid address'
                    })
                }}
              />
            </>
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          theme="rainbow"
          className="w-full"
          disabled={!isValid}
        >
          Continue to purchase
        </Button>
      </ModalFooter>
    </form>
  )
}

export default CustomWaxAddressModal

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useQueueIt } from '@/contexts/queueIt'
import { useAuth } from '@/contexts/auth'
import { Separator, Toast } from '..'
import Button from '@/components/Button'
import RoundedBox from '@/components/RoundedBox'
import { useReserveDropOrderAssetsMutation } from '@/api/resources/drop/order/assets/reserve'
import { FieldValues, useForm } from 'react-hook-form'
import { getPriceStringFromCents } from '@/util/currencyHelpers'
import ErrorBox from '@/components/ErrorBox'
import { PACK_PURCHASE_FEE } from '@/constants'
import { PackSelectionAcknowledge } from './PackSelectionAcknowledge'
import ControlledPackSelector from './ControlledPackSelector'
import PackSelectionSummary from './PackSelectionSummary'
import { OrderReservationsDrop } from '@/api/resources/shared/drop'
import { ApiError } from '@/api/core/errors'
import DropExclusiveSection from '@/components/DropExclusiveSection'
import { DropOrderAsset } from '@/api/resources/drop/order/assets/get/schema'
import { DEFAULT_PACK_TYPE } from '@/api/resources/shared/asset'
import { useWindowWidth } from '@/contexts/windowDimensions'
import { PackSelectorProps } from '../PackSelector'
import { isIn } from '@/util/typeHelper'
import { pluralize } from '@/util/stringHelpers'

interface Props {
  drop: OrderReservationsDrop
  assets: DropOrderAsset[]
  limit: number
}

export const PACK_SELECTION_FORM_INPUTS = {
  ACCEPT_PARTNER_OPT_IN: 'acceptUpdates',
  ACCEPT_EXCLUSIVE: 'acceptExclusive',
  ACCEPT_EULA: 'acceptEula'
}

export default function PackSelection({ drop, assets, limit }: Props) {
  const router = useRouter()
  const { exclusive, licensor, id } = drop
  const { user } = useAuth()
  const { getQueueItToken } = useQueueIt()
  const [error, setError] = useState<ApiError>(null)

  const limitCurrencyString = `${getPriceStringFromCents(limit)} USD`

  const mythicPack = assets.find(asset => asset.name === 'Mythic Pack')
  const windowWidth = useWindowWidth()

  const {
    handleSubmit,
    control,
    watch,
    clearErrors,
    formState: { isValid, errors }
  } = useForm({
    mode: 'onChange'
  })

  const [defaultOrderPackAssets, additionalOrderPackAssets] = assets.reduce(
    (result, asset) => {
      if (isIn(DEFAULT_PACK_TYPE, asset.name)) {
        result[0].push(asset)
      } else {
        result[1].push(asset)
      }
      return result
    },
    [[], []] as [DropOrderAsset[], DropOrderAsset[]]
  )

  const shouldShowAdditionalAssets = additionalOrderPackAssets.length > 0
  const formPackValues: Array<number> = watch(
    assets.map(asset => asset.id.toString())
  )
  const acceptUpdates = watch(PACK_SELECTION_FORM_INPUTS.ACCEPT_PARTNER_OPT_IN)
  const numberOfItems =
    formPackValues.reduce((acc, value) => acc + value, 0) || 0
  const subtotal = getSubtotalFromWatchValues(assets, formPackValues)
  const fee = subtotal * PACK_PURCHASE_FEE || 0
  const total = subtotal + fee || 0

  // Checks if any input has returned a max limit error
  const hasMaxLimitError = Object.values(errors).some(
    error => error.type === 'maxLimit'
  )

  const {
    mutate: reserveDropOrderAssetsMutation,
    isLoading,
    isSuccess
  } = useReserveDropOrderAssetsMutation(user, {
    onSuccess: data => {
      const { reservation_id } = data

      const query: {
        drop_id: string
        reservation_id: string
        partner_data_opt_in?: boolean
      } = {
        drop_id: id.toString(),
        reservation_id: reservation_id.toString()
      }

      if (acceptUpdates) {
        query.partner_data_opt_in = acceptUpdates
      }

      router.push({ pathname: 'checkout', query })
    },
    onError: (err: ApiError) => setError(err)
  })

  const onSubmit = async (formData: FieldValues) => {
    const queueItToken = getQueueItToken()
    const assetIds = []
    const quantities = []

    // filters out other form values that may be present then pushes values that exist in formData
    assets.forEach(asset => {
      if (formData[asset.id]) {
        assetIds.push(asset.id)
        quantities.push(formData[asset.id])
      }
    })
    reserveDropOrderAssetsMutation({
      drop_id: id?.toString(),
      assets: assetIds.join(),
      quantities: quantities.join(),
      queue_it_token: queueItToken
    })
  }

  const packSelectorLayout: PackSelectorProps['layout'] =
    windowWidth < 470 ? 'large' : 'small'

  return (
    <div className="container-xs">
      <h1 className="h3 mb-1">Purchase</h1>
      <p className="body text-gray-300 mb-4">
        {getSubtitle(limit, mythicPack)}
      </p>

      <RoundedBox>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(data => onSubmit(data))}
        >
          <div className="flex flex-col gap-3">
            {/* PACK SELECTORS */}
            {defaultOrderPackAssets.map(pack => (
              <ControlledPackSelector
                key={pack.id}
                rules={{
                  validate: {
                    // checks to make sure at least one pack has been added
                    minAmount: (_, formValues) =>
                      minPackAmountValidator(formValues, assets),
                    // checks to make sure the total value of both packs amount is less than the subtotal limit
                    maxLimit: (_, formValues) => {
                      const result =
                        getSubtotalAmountFromFormValues(
                          defaultOrderPackAssets,
                          formValues
                        ) <= limit
                      if (result) clearErrors()
                      return result
                    }
                  }
                }}
                layout={packSelectorLayout}
                control={control}
                pack={pack}
              >
                {/* shown underneath each item when in small layout */}
                <MaxLimitError
                  limit={limitCurrencyString}
                  isVisible={hasMaxLimitError && packSelectorLayout === 'large'}
                />
              </ControlledPackSelector>
            ))}

            {/* FORM ERRORS - only shown at md */}
            <MaxLimitError
              limit={limitCurrencyString}
              isVisible={hasMaxLimitError && packSelectorLayout === 'small'}
            />

            <Separator className="hidden min-[470px]:block" />

            {shouldShowAdditionalAssets && (
              <>
                {additionalOrderPackAssets.map(pack => (
                  <ControlledPackSelector
                    key={pack.id}
                    layout={packSelectorLayout}
                    control={control}
                    rules={{
                      validate: {
                        minAmount: (_, formValues) =>
                          minPackAmountValidator(formValues, assets)
                      }
                    }}
                    pack={pack}
                  />
                ))}
                <Separator className="hidden min-[469px]:block" />
              </>
            )}
          </div>

          {exclusive && (
            <DropExclusiveSection
              showBottomSeparator
              isContainer={false}
              layoutClasses="!items-start !text-left my-[27px] mt-0"
              descriptionClasses="text-sm"
              linkClasses="text-sm"
              iconInline={true}
            />
          )}

          <PackSelectionSummary
            hasMaxLimitError={hasMaxLimitError}
            numberOfItems={numberOfItems}
            subtotal={subtotal}
            fee={fee}
          />

          <Separator />

          <div className="flex justify-between h5">
            <span>Total</span>
            <span>{getPriceStringFromCents(total)} USD</span>
          </div>

          <PackSelectionAcknowledge
            control={control}
            isExclusiveDrop={exclusive}
            licensor={licensor}
          />

          <ErrorBox error={error} />

          <Button
            type="submit"
            disabled={!isValid}
            // isSuccess will keep button in loading state until route change
            loading={isLoading || isSuccess}
          >
            Continue
          </Button>
        </form>
      </RoundedBox>
    </div>
  )
}

const minPackAmountValidator = (
  formValues: FieldValues,
  assets: DropOrderAsset[]
) => {
  const numberOfItems = assets.reduce((acc, asset) => {
    return acc + formValues[asset.id]
  }, 0)
  const result = numberOfItems > 0
  return result || 'Please select at least one pack'
}

const getSubtotalAmountFromFormValues = (
  assets: DropOrderAsset[],
  formValues: FieldValues
): number => {
  return (
    assets.reduce((acc, asset) => {
      return acc + formValues[asset.id] * asset.price
    }, 0) || 0
  )
}

const MaxLimitError = ({ limit, isVisible }) => {
  if (!isVisible) return null
  return (
    <Toast type="warning" inline>
      <div className="utility-alt">Pack Limit Exceeded</div>
      <div className="body-sm mt-[4px]">
        The subtotal value of both standard and premium packs combined cannot
        exceed {limit}.
      </div>
    </Toast>
  )
}

const getSubtitle = (limit: number, mythicPack?: DropOrderAsset) => {
  const hasMythic = !!mythicPack
  const mythicLimit = mythicPack?.pack_limit
  const limitString = getPriceStringFromCents(limit, true) + ' USD'

  return hasMythic
    ? `Choose the quantity of items to purchase. Standard and Premium Packs have a subtotal limit of ${limitString}. Mythic Packs are limited to ${mythicLimit} ${pluralize(
        'pack',
        mythicLimit
      )} per transaction.`
    : `Select the amount of packs to purchase. Subtotal limit is ${limitString}.`
}

const getSubtotalFromWatchValues = (
  assets: DropOrderAsset[],
  watchValues: any[]
): number => {
  return (
    watchValues.reduce((acc, value, index) => {
      return acc + value * assets[index].price
    }, 0) || 0
  )
}

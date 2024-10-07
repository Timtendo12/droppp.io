import React from 'react'
import classNames from 'classnames'
import { Button, Input } from '..'
import { Pill } from '@/components/Pill'
import { formatUSDC } from '@/util/currencyHelpers'
import { useMemo } from 'react'
import BreakdownItem, { IBreakdownItemProps } from './BreakdownItem'
import { AssetType } from '@/api/resources/shared/asset'
import { useAddListingMutation } from '@/api/resources/user/listing/add'
import { ListingPreview } from '@/api/resources/user/listing/preview/schema'
import Field from '@/components/Field'
import { useForm } from 'react-hook-form'
import { calculateListingTotal } from '@/util/listingHelpers'
import { useEditListingMutation } from '@/api/resources/user/listing/edit'
import { useCancelListingMutation } from '@/api/resources/user/listing/cancel'
import {
  isMaxOrLower,
  isMinOrGreater,
  requiredField
} from '@/util/forms/inputValidators'
import { ListingAddResponse } from '@/api/resources/user/listing/add/schema'
// import MonsterListingPromo from '@/components/MonsterListingPromo'
import { useInventory } from '@/hooks/useInventory'
import { MIN_LISTING_PRICE, MAX_LISTING_PRICE } from '@/constants/marketplace'
import { useLayoutData } from '@/contexts/layout'
import { useMarketplace } from '@/hooks/useMarketplace'
import AcknowledgeBox from '../AcknowledgeBox'
import { ControlledConfirmation } from '../AcknowledgeBox/Confirmation'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { getDropppMonstersPromotion } from '@/constants'
import { useAuth } from '@/contexts/auth'

export const mobileBreak = '390px'
export const tabletBreak = '834px'
export const fieldSubRowClasses = 'flex justify-between items-center'

const pillClasses = 'rounded-md px-1 mr-2'
const currencyClasses = 'text-xxs text-gray-400'
const fieldRowClasses = 'py-[19px] px-3 border-gray-900 border-b'
const btnContClasses = 'mt-0 pt-0'

const INPUTS = {
  price: 'price',
  acknowledge: 'acknowledge'
}

const CURRENCY_FORMAT = 'usdc'

export interface IProductListingFormProps {
  asset: AssetType
  update: boolean
  listing_id?: number
  listing_preview: ListingPreview
  onUpdate: (price: number) => void
  onDelete: () => void
  onDismiss: () => void
}

const ListProductForm = ({
  onUpdate,
  onDelete,
  // onDismiss,
  asset,
  listing_preview,
  listing_id,
  update
}: IProductListingFormProps) => {
  const { price, lowest_price, suggested_price, fee_display } = listing_preview
  const { id } = asset
  const { user } = useAuth()
  const { refreshAssets } = useInventory()
  const { removeSelectedAsset } = useLayoutData()
  const { refreshCatalogItemListings } = useMarketplace()

  const onMutationSuccess = {
    onSuccess: () => {
      refreshAssets()
      // remove item from selected assets for transfer or bulk listing - Josh Dobson - 10/4/23
      removeSelectedAsset(asset)
      refreshCatalogItemListings(asset.template_id).then()
    }
  }
  const addListingMutation = useAddListingMutation(id, onMutationSuccess)
  const editListingMutation = useEditListingMutation(
    listing_id,
    onMutationSuccess
  )
  const cancelListingMutation = useCancelListingMutation(listing_id, {
    onSuccess: () => {
      onDelete()
      refreshAssets()
      refreshCatalogItemListings(asset.template_id).then()
    }
  })

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    delayError: 1000,
    defaultValues: { [INPUTS.price]: price || '' }
  })

  const priceInput = watch(INPUTS.price)
  const promoAcknowledge = watch(INPUTS.acknowledge)

  const isPriceChanged = +priceInput !== price

  const isUsingMonsterAvatar =
    fee_display.marketplace_fee.discount_removed === 'monster_promo'
  const promoConfig = getDropppMonstersPromotion()
  const showPromoAcknowledge =
    user && (isUsingMonsterAvatar || promoConfig.active)

  let marketplaceFee = fee_display.marketplace_fee.amount
  if (isUsingMonsterAvatar && !promoAcknowledge) {
    marketplaceFee = 0
  }

  const total = priceInput
    ? calculateListingTotal(
        Number(priceInput),
        marketplaceFee,
        fee_display.blockchain_fee.amount,
        fee_display.collection_fee.amount
      )
    : 0

  const handleFormSubmit = async data => {
    const price = data.price

    // perform the update
    let response: ListingAddResponse = null
    if (update) {
      response = await editListingMutation.mutateAsync({ price })
    } else {
      response = await addListingMutation.mutateAsync({ price })
    }

    // check for the final price from the server
    // if not available, just round the number locally
    const displayPrice =
      response.listings?.[0]?.listing_price || Math.round(price)
    onUpdate?.(displayPrice)
  }

  const handleUpdatePrice = (price: number | string) => {
    // update the price value
    setValue(INPUTS.price, price, { shouldValidate: true })
    trigger(INPUTS.price)
  }

  const priceBreakdown = useMemo(
    () => breakdownList(fee_display),
    [fee_display]
  )

  const hasSuggestedPrice = suggested_price !== null
  const hasLowestPrice = lowest_price !== null
  const formattedSuggestedPrice = formatUSDC(suggested_price)
  const formattedPriceInput = formatUSDC(Number(priceInput))
  const isAmountSuggestedPrice = formattedPriceInput === formattedSuggestedPrice

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Input */}
      <div className={classNames(fieldRowClasses, '!pt-[12px]')}>
        <Field name={INPUTS.price} errors={errors} label="Listing Price">
          <Input
            register={register(INPUTS.price, {
              ...requiredField,
              pattern: {
                value: /^\d*\.?(\d{1,2})?$/,
                message: 'Maximum two decimal places allowed'
              },
              validate: {
                ...isMinOrGreater(
                  MIN_LISTING_PRICE,
                  `Price must be at least ${formatUSDC(MIN_LISTING_PRICE)} USDC`
                ),
                ...isMaxOrLower(
                  MAX_LISTING_PRICE,
                  `Price must be below ${formatUSDC(
                    MAX_LISTING_PRICE + 0.01
                  )} USDC`
                )
              }
            })}
            hasError={errors[INPUTS.price]}
            autoComplete="off"
            info={<span className="inline-block mr-1">USDC</span>}
            id={INPUTS.price}
            format="currency"
            inputMode="decimal"
            currency="usdc"
            placeholder="Sale Price"
          />
        </Field>
      </div>

      {/* Details */}

      <div className={classNames(fieldRowClasses, fieldSubRowClasses)}>
        <p className="h7">Lowest listing</p>
        <p className="h7">
          {hasLowestPrice ? (
            <>
              {formatUSDC(lowest_price)}{' '}
              <span className={currencyClasses}>{CURRENCY_FORMAT}</span>
            </>
          ) : (
            <span className="text-gray-300 font-semibold">NONE LISTED</span>
          )}
        </p>
      </div>

      {hasSuggestedPrice && (
        <div
          className={classNames(fieldRowClasses, fieldSubRowClasses, 'py-2')}
        >
          <p className="h7 my-auto">Suggested Price</p>

          <div className="flex flex-row">
            <Button
              theme="clean"
              type="button"
              onClick={() => {
                handleUpdatePrice(formattedSuggestedPrice)
              }}
              disabled={isAmountSuggestedPrice}
            >
              {isAmountSuggestedPrice ? (
                <Pill className={classNames(pillClasses, 'text-gray-400')}>
                  Autofill
                </Pill>
              ) : (
                <Pill className={classNames(pillClasses, 'text-800 bg-blue')}>
                  Autofill
                </Pill>
              )}
            </Button>

            <p className="h7 my-auto whitespace-nowrap">
              {formattedSuggestedPrice}{' '}
              <span className={currencyClasses}>{CURRENCY_FORMAT}</span>
            </p>
          </div>
        </div>
      )}

      <div className={fieldRowClasses}>
        <p className="h7">Fee Breakdown</p>

        <div className={'block min-[895px]:flex justify-between mt-2'}>
          {priceBreakdown.map((row, key) => (
            <BreakdownItem
              key={key}
              {...row}
              promoRemoved={!!promoAcknowledge}
            />
          ))}
        </div>
        {showPromoAcknowledge && (
          <AcknowledgeBox
            className="mt-3"
            type="danger"
            title="Promotion Will Be Removed"
            confirm={
              <ControlledConfirmation
                required
                control={control}
                name="acknowledge"
              >
                I acknowledge and wish to proceed.
              </ControlledConfirmation>
            }
          >
            {isUsingMonsterAvatar ? (
              <>
                The Droppp Monsters promotion has expired. If you update or
                remove this listing, the promotion will be removed. See{' '}
                <Button
                  theme="clean"
                  className="underline"
                  onClick={() => {
                    NiceModal.show(MODAL_ID.howMonsterPromoWorks, {
                      overlayClassName: 'z-confirm'
                    })
                  }}
                >
                  Terms &amp; Conditions
                </Button>{' '}
                for more information.
              </>
            ) : (
              <>
                Updating this listing without a Droppp Monster set as your
                avatar will reset your marketplace fee back to 2%.
              </>
            )}
          </AcknowledgeBox>
        )}
      </div>

      {/* <MonsterListingPromo
        onNavigate={onDismiss}
        applied={isUsingMonsterAvatar}
      /> */}

      <div
        className={classNames(
          fieldRowClasses,
          fieldSubRowClasses,
          'border-b-0 !py-3'
        )}
      >
        <p className="h7">You will receive</p>
        <p className="h7">
          {total} <span className={currencyClasses}>{CURRENCY_FORMAT}</span>
        </p>
      </div>

      {/* Form Actions */}

      {!update && (
        <div className={classNames(btnContClasses, 'px-3')}>
          <Button
            theme="rainbow"
            className="w-full"
            loading={addListingMutation.isLoading}
            type="submit"
            disabled={!isValid}
          >
            List For Sale
          </Button>
        </div>
      )}

      {update && (
        <div
          className={classNames(
            fieldSubRowClasses,
            btnContClasses,
            'px-3',
            'max-[580px]:flex-col gap-2'
          )}
        >
          <Button
            theme="destructive"
            className="max-[580px]:order-1 w-full"
            type="button"
            disabled={isUsingMonsterAvatar && !promoAcknowledge}
            onClick={() => {
              cancelListingMutation.mutate()
            }}
          >
            Remove Listing
          </Button>

          <Button
            className="w-full"
            loading={addListingMutation.isLoading}
            type="submit"
            disabled={!isValid || !isPriceChanged}
          >
            Update
          </Button>
        </div>
      )}
    </form>
  )
}

export default ListProductForm

const breakdownList = (
  fee_display: ListingPreview['fee_display']
): IBreakdownItemProps[] => {
  return Object.keys(fee_display).map((key, i) => {
    const { label, amount, info, discount_removed, previous_amount } =
      fee_display[key]

    const hasPromoApplied = discount_removed == 'monster_promo'
    const blockChainFee = fee_display['blockchain_fee']?.amount
    const noBlockChainFee = key === 'blockchain_fee' && !blockChainFee
    const subTitle = (hasPromoApplied ? previous_amount : amount) + '%'
    const subTitleReplacement = hasPromoApplied ? `${amount}%` : null

    return {
      index: i,
      title: label,
      subTitle,
      info: info,
      noBlockChainFee,
      subTitleReplacement
    }
  })
}

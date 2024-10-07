import { ReactNode } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import classNames from 'classnames'
import moment from 'moment'
import { RARITY_TYPES } from '@/enum'
import { EULA_URL } from '@/constants'
import { useForm } from 'react-hook-form'
import { usePurchaseListingMutation } from '@/api/resources/user/listing/purchase'
import { useQueryClient } from '@tanstack/react-query'
import { assetQueryKey } from '@/api/resources/asset/get'
import { catalogItemDetailQueryKey } from '@/api/resources/catalog/item/get'
import { formatCurrency } from '@/util/currencyHelpers'
import { numberWithCommas } from '@/util/numberHelpers'
import { isUniqueProduct } from '@/util/assetHelpers'
import { Pill } from '@/components/Pill'
import Icon from '@/components/Icon'
import Button, { ButtonLink } from '@/components/Button'
import AcknowledgeBox from '@/components/AcknowledgeBox'
import { ControlledConfirmation } from '@/components/AcknowledgeBox/Confirmation'
import ProductTransactionLayout from '@/layouts/Product/ProductTransactionLayout'
import RoundedBox from '@/components/RoundedBox'
import CatalogItemPrice from '@/components/ProductCard/Catalog/CatalogItemPrice'
import { ReservedListing } from '@/api/resources/shared/listingReserve'
import { findDropConfigById } from '@/config/drops'
import { sendGTMEvent } from '@next/third-parties/google'

const currency = 'USDC'
const balanceLabelClasses = 'mb-1 body-sm text-gray-300'
const currencyClasses = 'pricing-sm text-gray-400'
const fieldSubRowClasses = 'flex justify-between items-center'
const fieldRowClasses = 'px-3 h-7 bg-gray-850 border-gray-900 border-b'

const EXPIRED_TYPES = {
  TOKEN: 'token',
  NFT: 'nft',
  CARD: 'card'
}

const EXPIRED_CONTENT_MAP = {
  [EXPIRED_TYPES.TOKEN]: {
    title: 'This redemption token is expired',
    description: () =>
      'The timeframe to redeem this token has passed and is no longer redeemable for a physical item.'
  },
  [EXPIRED_TYPES.NFT]: {
    title: 'Redemption Tokens are already issued',
    description: (name?: string) =>
      `To redeem the physical item associated with ${name} you will need to purchase the redemption token instead.`
  },
  [EXPIRED_TYPES.CARD]: {
    title: 'Redemption Tokens are already issued',
    description: () =>
      'This collection’s redemption period has already occurred and this item is no longer eligible to receive a redemption token.'
  }
}

const Content = {
  disclaimer: (
    <>
      This purchase is a peer-to-peer transaction with the seller. Droppp is not
      responsible for user actions within the marketplace. See{' '}
      <Link href="/terms" className="inline-link" target={'blank'}>
        Terms of Service
      </Link>
      .
    </>
  ),
  agreement: (eulaUrl: string) => (
    <>
      Before proceeding with your purchase, you must acknowledge the{' '}
      <EulaLink url={eulaUrl} />.
    </>
  ),
  agreementExpired: (eulaUrl: string) => (
    <>
      Before proceeding with your purchase, you must acknowledge that this item
      is no longer redeemable for a physical item, and you agree to the{' '}
      <EulaLink url={eulaUrl} />
    </>
  ),
  agreementExclusive: (eulaUrl: string) => (
    <>
      By proceeding with this purchase you acknowledge you have read and agree
      to the <EulaLink url={eulaUrl} /> for the product that you are purchasing
      and that Droppp Exclusives can not be transferred outside of Droppp.
    </>
  )
}

export interface ProductBuyItem {
  reservation: ReservedListing
  walletBalance: number
  onSuccess: () => void
}

const ProductBuyItem = ({
  reservation,
  walletBalance,
  onSuccess
}: ProductBuyItem) => {
  const {
    listing: {
      reservation_id,
      listing_price: price,
      asset,
      associated_redemption_coin
    },
    seller
  } = reservation
  const { isPfp } = findDropConfigById(asset.drop_id) || {}
  const balanceAfterPurchase = walletBalance - price
  const queryClient = useQueryClient()
  const purchaseMutation = usePurchaseListingMutation(reservation_id, {
    onSuccess: () => {
      onSuccess()

      sendGTMEvent({
        event: 'marketplace_purchase'
      })

      queryClient.invalidateQueries(assetQueryKey(asset.id.toString())).then()
      queryClient
        .invalidateQueries(
          catalogItemDetailQueryKey(asset.template_id.toString())
        )
        .then()
    }
  })

  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm()

  const handleFormSubmit = () => {
    purchaseMutation.mutate()
  }

  const getExpiredType = () => {
    if (
      asset.attributes.rarity === RARITY_TYPES.Redeemable &&
      !asset.redeemable
    ) {
      return EXPIRED_TYPES.TOKEN
    }

    if (associated_redemption_coin) {
      const { redeem_start_date, redeem_end_date } = associated_redemption_coin
      const availablePurchase = moment().isBetween(
        moment.utc(redeem_start_date),
        moment.utc(redeem_end_date)
      )

      if (availablePurchase) {
        return EXPIRED_TYPES.NFT
      }

      return EXPIRED_TYPES.CARD
    }
  }

  const expiredType = getExpiredType()

  const renderAssociated = () => {
    const { name, media, listing_price, chain_template_id } =
      associated_redemption_coin

    return (
      <RoundedBox className="flex max-md:flex-col items-center gap-2 mt-2 !p-2 !rounded-2xl !bg-gray-800">
        <div className="flex items-center gap-2 w-full">
          <div className="relative h-7 w-7 md:h-6 md:w-6 flex-shrink-0">
            <Image
              className="rounded flex-shrink-0"
              src={media[0].size1_url}
              alt=""
              layout="fill"
            />
          </div>
          <div>
            <div className="h7">{name}</div>
            <CatalogItemPrice
              className="mt-[4px] !text-sm"
              listing_price={listing_price}
              size="tiny"
              isCatalogAsset
              isUniqueProduct={isUniqueProduct(associated_redemption_coin)}
            />
          </div>
        </div>
        <ButtonLink
          className="max-md:w-full"
          size="sm"
          newTab
          href={`/products/${chain_template_id}`}
        >
          View on Market
        </ButtonLink>
      </RoundedBox>
    )
  }

  const renderRightColumnTopSlot = () => {
    if (!expiredType) {
      return null
    }

    const { title, description } = EXPIRED_CONTENT_MAP[expiredType]
    return (
      <RightTopSlot title={title} description={description(asset.name)}>
        {expiredType === EXPIRED_TYPES.NFT && renderAssociated()}
      </RightTopSlot>
    )
  }

  return (
    <ProductTransactionLayout
      title="Listing Reserved"
      description="After 60 seconds, this listing will be released back to the open market."
      asset={asset}
      renderRightColumnTopSlot={renderRightColumnTopSlot}
    >
      <>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div
            className={classNames(
              fieldRowClasses,
              fieldSubRowClasses,
              'rounded-t-3xl'
            )}
          >
            <p className="h6">Mint</p>
            <p className="body">#{numberWithCommas(asset.mint_num)}</p>
          </div>

          <div className={classNames(fieldRowClasses, fieldSubRowClasses)}>
            <p className="h6">Seller</p>

            <div className="flex">
              <Image
                className="rounded"
                src={seller.media.avatar_media.size1_url}
                alt={seller.seller_account_wax}
                width={22}
                height={22}
              />
              <p className="body ml-1">{seller.seller_account_wax}</p>
            </div>
          </div>

          <div className={classNames(fieldRowClasses, fieldSubRowClasses)}>
            <p className="h6 flex-1">Price</p>

            <div className="flex flex-0">
              {!isPfp && (
                <Pill className="mr-1 !border-success origin-right min-[350px]:mr-2 text-[8px] min-[350px]:text-xxs">
                  Lowest&nbsp;Listing
                </Pill>
              )}

              <p className="pricing-xl my-auto whitespace-nowrap text-success">
                {formatCurrency(price, false)}{' '}
                <span className={currencyClasses}>{currency}</span>
              </p>
            </div>
          </div>

          <div
            className={classNames(
              fieldRowClasses,
              fieldSubRowClasses,
              'flex flex-col border-b-0 pb-0 gap-2 pt-3 !h-auto'
            )}
          >
            <div className="w-full ">
              <div className="flex mb-2">
                <Icon name={'wallet'} />
                <p className="h7 ml-1">Droppp balance</p>
              </div>

              <div className="flex mb-1">
                <div
                  className={classNames(
                    'border-r-1 border-gray-700 w-1/2 flex-1 pr-3'
                  )}
                >
                  <p className={balanceLabelClasses}>Available</p>

                  <p className="pricing-xl my-auto whitespace-nowrap">
                    {formatCurrency(walletBalance, false)}{' '}
                    <span className={currencyClasses}>{currency}</span>
                  </p>
                </div>

                <div className={classNames('w-1/2 pl-4 flex-1')}>
                  <p className={balanceLabelClasses}>Remaining</p>

                  <p className="pricing-xl my-auto whitespace-nowrap">
                    {formatCurrency(balanceAfterPurchase, false)}{' '}
                    <span className={currencyClasses}>{currency}</span>
                  </p>
                </div>
              </div>
            </div>

            <AcknowledgeBox
              confirm={
                <>
                  <ControlledConfirmation
                    required
                    control={control}
                    name="eula"
                  >
                    I acknowledge the EULA
                  </ControlledConfirmation>

                  {asset.exclusive && (
                    <ControlledConfirmation
                      required
                      control={control}
                      name="dropppExclusive"
                    >
                      I acknowledge this is a Droppp Exclusive
                    </ControlledConfirmation>
                  )}

                  {!!expiredType && (
                    <ControlledConfirmation
                      required
                      control={control}
                      name="expiredRedemptionToken"
                    >
                      I acknowledge this item is not redeemable for a physical
                      item
                    </ControlledConfirmation>
                  )}
                </>
              }
            >
              <AcknowledgeContent
                isExclusive={asset.exclusive}
                isExpired={!!expiredType}
                eulaUrl={asset.attributes.EULA}
              />
            </AcknowledgeBox>

            <Button
              theme="rainbow"
              className="w-full"
              type="submit"
              loading={purchaseMutation.isLoading}
              disabled={!isValid}
            >
              Buy
            </Button>

            <p className="body-xs text-gray-300">{Content.disclaimer}</p>
          </div>
        </form>
      </>
    </ProductTransactionLayout>
  )
}

const EulaLink = ({ url = EULA_URL }: { url: string }) => {
  return (
    <a
      className="inline-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      End User License Agreement
    </a>
  )
}

const AcknowledgeContent = ({
  isExclusive,
  isExpired,
  eulaUrl
}: {
  isExclusive: boolean
  isExpired: boolean
  eulaUrl?: string
}) => {
  if (isExclusive) {
    return Content.agreementExclusive(eulaUrl)
  } else if (isExpired) {
    return Content.agreementExpired(eulaUrl)
  } else {
    return Content.agreement(eulaUrl)
  }
}

const RightTopSlot = ({
  title,
  description,
  children
}: {
  title: string
  description: string
  children?: ReactNode
}) => {
  return (
    <RoundedBox className="mb-3 !p-3">
      <div className="flex items-center mb-1">
        <Icon className="flex-none" name="informationalFilled" size={20} />
        <p className="h6 ml-1">{title}</p>
      </div>
      <p className="body-sm text-gray-200">{description}</p>
      {children}
    </RoundedBox>
  )
}

export default ProductBuyItem

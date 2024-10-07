import Link from 'next/link'
import { ReactNode } from 'react'
import { isValidHttpUrl } from '@/util/urlHelpers'
import { isOneOfOne } from '@/util/assetHelpers'
import InventoryPreviewMedia from '@/components/InventoryPreviewMedia'
import RarityBadge from '@/components/RarityBadge'
import Separator from '@/components/Separator'
import AttributeList, { Attribute } from './components/AttributeList'
import { AssetCollection } from '@/api/resources/shared/asset'
import { AssetAttributes } from '@/api/resources/shared/assetAttributes'
import { Rarity } from '@/api/resources/shared/rarity'
import { TraitItem } from '@/api/resources/shared/trait'
import { Owner } from '@/api/resources/catalog/item/get/schema'
import CloudinaryImage from '@/components/CloudinaryImage'
import useBreakpoints from '@/hooks/useBreakpoints'
import { Drop } from '@/types/drop'
import Icon from '@/components/Icon'
import MarkdownParagraph from '@/components/MarkdownParagraph'
import DropExclusiveSection from '@/components/DropExclusiveSection'
import Collapsible from '../Collapsible'
import { isMonsterProduct } from '@/util/assetHelpers'
import { ButtonLink } from '../Button'
import { getAssetName } from '@/util/inventoryHelpers'
import { DetailPresentationStyle } from '../InventoryBrowser/hooks/useDetailPresentationStyle'
import { ModalTheme } from '@/types/modal'
import { flipLightDarkTheme } from '@/util/theme'
import { ModalCloseButton } from '../Modals/ModalV2/ModalCloseButton'
import InfoBlocks from '@/components/InfoBlocks'
import { InfoBlockDefinition } from '@/components/InfoBlocks/InfoBlock'
import collectionStatsInfoBlockDefinitions from '@/components/InfoBlocks/CollectionStatsInfoBlockDefinitions'
import tailwindConfig from '@/tailwind.config'
import { classNames } from '@/util/tailwindHelpers'
import { isPfp } from '@/api/resources/shared/drop'

// all option due to strict null checks false - Josh Dobson - 4/28/23
export interface ItemDetail {
  name?: string
  collection?: AssetCollection
  schema_name?: string
  description?: string
  legal?: string
  drop_name?: string
  drop_id?: number
  card_id?: number
  chain_template_id?: number
  chain_url?: string
  attributes?: AssetAttributes
  immutables?: AssetAttributes
  owned_count?: number
  rarity?: Rarity
  mint_num?: number | null
  mint_count?: number
  timestamp?: string | null
  traits?: TraitItem[]
  owner?: string | Owner
  contract?: any // @TODO - api/resources/shared/asset.ts - Josh Dobson - 4/28/23
  redeemable?: boolean
  time_launch?: string
  redeem_start_date?: string
  redeem_end_date?: string
  redeem_ship_date?: string
  estimated_ship_target?: string
  fallback?: number
}

interface Props {
  presentationStyle: DetailPresentationStyle
  isPdd?: boolean
  asset: ItemDetail
  drop?: Drop
  assetActionsSlot?: ReactNode
  marketplaceSlot?: ReactNode
  subtitle?: ReactNode
  highLevelInfo?: InfoBlockDefinition[]
  badgeSlot?: ReactNode
  importantDatesSlot?: ReactNode
  attributesComponent?: ReactNode
  salesHistorySlot?: ReactNode
  onClose: () => void
}

const BaseDetail = ({
  presentationStyle,
  isPdd = false,
  asset,
  drop,
  subtitle,
  highLevelInfo,
  assetActionsSlot,
  marketplaceSlot,
  importantDatesSlot,
  badgeSlot,
  attributesComponent,
  salesHistorySlot,
  onClose
}: Props) => {
  const { isSmall } = useBreakpoints(['sm'])

  const {
    collection,
    schema_name,
    description,
    legal,
    traits,
    chain_template_id,
    chain_url
  } = asset

  const rarity = asset.attributes?.rarity || asset.rarity
  const shouldRenderSalesHistorySlot =
    salesHistorySlot && (!drop || (drop && !isMonsterProduct(drop.id)))
  const showStats = !isOneOfOne(rarity)
  const isOwner = !!asset.owned_count && !isPdd
  const attributes = asset.attributes || asset.immutables || undefined
  const eula = attributes?.EULA
  const assetName = getAssetName(asset.name, attributes)
  const theme = drop.theme

  highLevelInfo = ((): InfoBlockDefinition[] => {
    let definitions: InfoBlockDefinition[] = highLevelInfo
      ? [...highLevelInfo]
      : []

    if (Number.isInteger(asset.card_id)) {
      definitions.push({
        label: 'Card ID',
        value: {
          type: 'numeric',
          value: asset.card_id
        }
      })
    }

    return definitions
  })()

  const stats = collectionStatsInfoBlockDefinitions(asset, isOwner)

  const productPageButton = (
    <ButtonLink
      href={`/products/${chain_template_id}`}
      theme="secondary"
      className="w-full mx-auto block mt-1"
      newTab
    >
      View Product Page
    </ButtonLink>
  )

  return (
    <div
      style={{
        '--containerPadding': !isSmall ? '16px' : '32px',
        '--separatorColor':
          presentationStyle == 'modal' &&
          tailwindConfig.theme.colors['gray-700']
      }}
    >
      <Header
        asset={asset}
        title={assetName}
        subtitle={subtitle}
        drop={drop}
        rarity={rarity}
        badgeSlot={badgeSlot}
        presentationStyle={presentationStyle}
        theme={theme}
        onClose={onClose}
      />
      <div className="p-[var(--containerPadding)] pt-0">
        {(assetActionsSlot || highLevelInfo.length > 0 || marketplaceSlot) && (
          <div className="flex flex-1 flex-col gap-2 pt-2">
            {assetActionsSlot && (
              <>
                {assetActionsSlot}
                {(highLevelInfo.length > 0 || marketplaceSlot) && (
                  <Separator className="my-2" />
                )}
              </>
            )}
            <InfoBlocks
              definitions={highLevelInfo}
              blockAppearance={
                presentationStyle == 'modal' && { border: '700' }
              }
            />
            {marketplaceSlot && marketplaceSlot}
          </div>
        )}
        {!!traits?.length && (
          <>
            <Separator className="my-4" />
            <AttributeList className="my-3">
              <h1 className="h5 mb-2">Traits</h1>
              {traits.map(({ name, value, percent }, index) => (
                <Attribute
                  key={index}
                  label={name}
                  value={`${value} - ${percent}%`}
                />
              ))}
            </AttributeList>
            {!description && productPageButton}
          </>
        )}
        {description && (
          <>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
              <h2 className="h5">Description</h2>
              <MarkdownParagraph className="body-sm text-gray-300">
                {description}
              </MarkdownParagraph>
              {drop?.exclusive && (
                <DropExclusiveSection
                  isContainer={false}
                  wrapperClasses="mt-2 mb-1"
                  layoutClasses="!items-start !text-left my-0"
                  descriptionClasses="mt-1 !text-sm"
                  linkClasses="!text-xs"
                  iconInline={true}
                />
              )}
              {productPageButton}
            </div>
          </>
        )}
        {shouldRenderSalesHistorySlot && (
          <>
            <Separator className="my-4" />
            {salesHistorySlot}
          </>
        )}
        {showStats && (
          <>
            <Separator className="my-4" />
            <h2 className="h5 mb-2">Stats</h2>
            <div className="flex flex-col gap-2">
              <InfoBlocks
                definitions={stats.slice(0, 2)}
                blocksPerRow={2}
                blockAppearance={
                  presentationStyle == 'modal' && { border: '700' }
                }
              />
              <InfoBlocks
                definitions={stats.slice(2)}
                blocksPerRow={3}
                blockAppearance={
                  presentationStyle == 'modal' && { border: '700' }
                }
              />
            </div>
          </>
        )}
        {importantDatesSlot && (
          <>
            <Separator className="my-4" />
            {importantDatesSlot}
          </>
        )}
        {attributes && (
          <>
            <Separator className="my-4" />
            <Collapsible
              open
              labelClassName={'flex gap-1 justify-between cursor-pointer'}
              contentClassName="mt-2"
              label={isOpen => (
                <>
                  <h1 className="h5">Attributes</h1>
                  <Icon name={isOpen ? 'arrowUp' : 'arrowDown'} />
                </>
              )}
            >
              <AttributeList>
                {attributesComponent}

                <Attribute
                  label="Collection"
                  value={`${collection.display_name} (${collection.name})`}
                />
                <Attribute label="Schema" value={schema_name} />
                {Object.keys(attributes).map(key => (
                  <Attribute
                    key={key}
                    label={key}
                    value={attributeFormat(attributes[key])}
                  />
                ))}
              </AttributeList>
              {chain_url && (
                <ButtonLink
                  href={chain_url}
                  theme="secondary"
                  className="w-full mx-auto block mt-3"
                  newTab
                >
                  View on Blockchain
                </ButtonLink>
              )}
            </Collapsible>
          </>
        )}
        {drop?.openables?.territoryRestrictions && isPdd && (
          <>
            <Separator className="my-4" />
            <Collapsible
              labelClassName={'flex gap-1 justify-between cursor-pointer'}
              contentClassName="mt-2"
              label={isOpen => (
                <>
                  <h1 className="h5">Territory Restrictions</h1>
                  <Icon name={isOpen ? 'arrowUp' : 'arrowDown'} />
                </>
              )}
            >
              <p className="mt-1 text-sm">
                {drop.openables.territoryRestrictions}
              </p>
            </Collapsible>
          </>
        )}
        {legal && (
          <>
            <Separator className="my-4" />
            <Collapsible
              labelClassName={'flex gap-1 justify-between cursor-pointer'}
              contentClassName="mt-2"
              label={isOpen => (
                <>
                  <h1 className="h5">Legal</h1>
                  <Icon name={isOpen ? 'arrowUp' : 'arrowDown'} />
                </>
              )}
            >
              <p className="mt-1 text-sm">{legal}</p>
            </Collapsible>
          </>
        )}
        {eula && (
          <>
            <Separator className="my-4" />
            <Collapsible
              labelClassName={'flex gap-1 justify-between cursor-pointer'}
              contentClassName="mt-2"
              label={isOpen => (
                <>
                  <h1 className="h5">Eula</h1>
                  <Icon name={isOpen ? 'arrowUp' : 'arrowDown'} />
                </>
              )}
            >
              <p className="mt-1 text-sm">
                <Link href={`${eula}`} target="_blank">
                  {eula}
                </Link>
              </p>
            </Collapsible>
          </>
        )}
      </div>
    </div>
  )
}

export default BaseDetail

const Header = ({
  presentationStyle,
  theme,
  asset,
  drop,
  title,
  subtitle,
  rarity,
  badgeSlot,
  onClose
}) => {
  const { redeemable, fallback } = asset
  const shouldRenderBadgeSlot = rarity || badgeSlot || drop.exclusive

  // check if asset is a PFP to determine if we should use the fallback bg, this should be fixed by an additional fallback property eventually - Josh Dobson - 8/27/24
  const isPfpDrop = isPfp(asset)
  const useFallbackBg = fallback && !isPfpDrop

  return (
    <>
      <CloseButon
        theme={theme}
        presentationStyle={presentationStyle}
        onClose={onClose}
      />
      {/* catalog item background image */}
      <div
        className={classNames(
          'transform-gpu h-[192px] absolute left-0 right-0 top-0 z-[-1]',
          {
            "before:content-[''] before:z-10 before:h-8 before:absolute before:top-0 before:w-full before:bg-gradient-to-b before:from-black/90":
              theme != 'light' && !fallback,
            "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#242424]":
              useFallbackBg
          }
        )}
      >
        {!useFallbackBg && (
          <CloudinaryImage
            imageId={'PDD-banner'}
            path={`drops/${drop.cloudinaryFolder}/`}
            layout="fill"
            transformations={{ resize: { width: 800 } }}
          />
        )}
      </div>
      <InventoryPreviewMedia inventory={asset} className="mt-4" />
      <div className="flex flex-col gap-2 mt-4 px-[var(--containerPadding)]">
        {shouldRenderBadgeSlot && (
          <div className="flex gap-1">
            <RarityBadge rarity={rarity} redeemable={redeemable} size="lg" />
            {badgeSlot}
            {drop.exclusive && <Icon name="exclusiveBadge" size={28} />}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div className="h3">{title}</div>
          {subtitle}
        </div>
      </div>
    </>
  )
}

const CloseButon = ({
  theme,
  presentationStyle,
  onClose
}: {
  presentationStyle: DetailPresentationStyle
  theme?: ModalTheme
  onClose: () => void
}) => {
  if (presentationStyle === 'modal') return null

  return (
    <ModalCloseButton
      className="!absolute top-2 right-2 z-10"
      theme={flipLightDarkTheme(theme)}
      onClick={onClose}
    />
  )
}

export const attributeFormat = attribute => {
  if (typeof attribute == 'boolean') return attribute ? 'Yes' : 'No'
  if (isValidHttpUrl(attribute))
    return (
      <Link className="text-white" href={attribute}>
        {attribute}
      </Link>
    )
  return attribute.toString()
}

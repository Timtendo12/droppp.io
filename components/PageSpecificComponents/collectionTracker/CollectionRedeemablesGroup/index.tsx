import React from 'react'
import { useRouter } from 'next/router'
import { CollectionCard } from '@/components'
import RarityBadge from '@/components/RarityBadge'
import styles from './styles.module.scss'
import CatalogItemPrice from '@/components/ProductCard/Catalog/CatalogItemPrice'

const CollectionRedeemablesGroup = ({ rarity, items }) => {
  const { query } = useRouter()
  const renderCardType = item => {
    const { owned_mint_nums } = item

    if (!owned_mint_nums?.length) {
      return <CollectionCard card={item} viewAsRedeemable />
    }

    return owned_mint_nums?.map(mint_num => (
      <CollectionCard
        key={mint_num}
        card={item}
        mint_num={mint_num.toString()}
        viewAsRedeemable
      />
    ))
  }

  return (
    <div id={`collection-redeemables-${rarity}`} className={styles.container}>
      <div key={rarity} className={styles.rarityGroup}>
        <RarityBadge rarity={rarity} redeemable={true} />
        {items?.map(item => (
          <div key={item.id} className={styles.cardGroup}>
            <div className={styles.cardName}>
              {item.name} - {item.variant}
            </div>
            {!query.hide_lowest_prices && item.listing_price !== undefined && (
              <CatalogItemPrice
                className="!text-xs mt-2"
                listing_price={item.listing_price}
                isUniqueProduct={false}
                isCatalogAsset
                hideUpSuffix
              />
            )}
            <div className={styles.collapse}>{renderCardType(item)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionRedeemablesGroup

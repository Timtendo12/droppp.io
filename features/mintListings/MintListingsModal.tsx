import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { Product } from '@/features/mintListings/Product'
import { ViewModalScrollBorder } from '@/components/Modals/ModalV2/ViewModal/ViewModalScrollBorder'
import {
  MintListingsContext,
  MintListingsProvider
} from './MintListingsProvider'
import ListItem from './ListItem'
import { DEFAULT_MINT_LISTING_SORT_OPTION } from './hooks/useMintListingsQuery'
import { MINT_LISTING_SORT_OPTIONS } from '@/constants'
import ListViewModal from '@/components/ListViewModal'

type Props = {
  chain_template_id: number
}

const MintListingsModal = NiceModal.create<Props>(({ chain_template_id }) => {
  return (
    <MintListingsProvider chainTemplateId={chain_template_id}>
      <ListViewModal
        modalId={MODAL_ID.marketplace.mintListings}
        context={MintListingsContext}
        title="Listings"
        sort={{
          options: MINT_LISTING_SORT_OPTIONS,
          default: DEFAULT_MINT_LISTING_SORT_OPTION
        }}
        emptyViewConfig={{
          title: 'No Listings on Market',
          description:
            'Press the ‘Refresh Listings’ button when it turns white to load new listings.',
          icon: 'cards'
        }}
        leadingContentSlot={
          <>
            <Product />
            <ViewModalScrollBorder className="listViewModalSm:hidden" />
          </>
        }
      >
        {item => (
          <ListItem
            key={item.listing_id}
            item={{ profile: item.seller, ...item }}
          />
        )}
      </ListViewModal>
    </MintListingsProvider>
  )
})

export default MintListingsModal

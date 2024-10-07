import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { SALES_HISTORY_SORT_OPTIONS } from '@/constants'
import {
  SalesHistoryContext,
  SalesHistoryProvider
} from '@/features/salesHistory/SalesHistoryProvider'
import ListViewModal from '@/components/ListViewModal'
import ListItem from './ListItem'
import { DEFAULT_SALES_HISTORY_SORT_OPTION } from './hooks/useSalesHistoryQuery'
import { salesHistoryEmptyViewConfig } from './config'

type Props = {
  data_id: number
  subTitle: string
}

const SalesHistoryModal = NiceModal.create<Props>(({ data_id, subTitle }) => {
  return (
    <SalesHistoryProvider dataId={data_id}>
      <ListViewModal
        modalId={MODAL_ID.marketplace.salesHistory}
        context={SalesHistoryContext}
        title="Sales History"
        subTitle={subTitle}
        wrapClassName="pt-1"
        contentClassName="max-w-[768px]"
        sort={{
          options: SALES_HISTORY_SORT_OPTIONS,
          default: DEFAULT_SALES_HISTORY_SORT_OPTION
        }}
        emptyViewConfig={salesHistoryEmptyViewConfig}
      >
        {item => (
          <ListItem
            key={item.data_id}
            item={{ profile: item.buyer, ...item }}
          />
        )}
      </ListViewModal>
    </SalesHistoryProvider>
  )
})

export default SalesHistoryModal

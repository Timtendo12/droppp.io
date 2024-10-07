import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import {
  ACTION_REFETCH_INTERVAL,
  ACTIVITY_TYPE_MAP,
  DETAIL_PANE_TRANSITION_DURATION_MS,
  HEADER_HEIGHT_WEB
} from '@/constants'
import { ACTIVITY_TYPES } from '@/enum'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useLayoutData } from '@/contexts/layout'
import { useGetUserAction } from '@/api/resources/user/action/get'
import { ActionDetailType } from '@/api/resources/shared/action'
import { Loading, Button, Icon, ModalMobile } from '..'
import Transfer from './transfer'
import WaxTransfer from './wax-transfer'
import Purchase from './purchase'
import AccountPurchase from './account-purchase'
import Redeem from './redeem'
import PromoClaim from './promo-claim'
import Sale from './sale'
import MarketplacePurchase from './marketplace-purchase'
import Deposit from './deposit'
import Withdrawal from './withdrawal'

export interface ActionDetailProps {
  id?: string
  activity: ActionDetailType
}

const DETAIL_MAP = {
  [ACTIVITY_TYPES.ACCOUNT_PURCHASE]: AccountPurchase,
  [ACTIVITY_TYPES.PURCHASE]: Purchase,
  [ACTIVITY_TYPES.TRANSFER_BATCH]: Transfer,
  [ACTIVITY_TYPES.REDEEM]: Redeem,
  [ACTIVITY_TYPES.PROMO_CLAIM]: PromoClaim,
  [ACTIVITY_TYPES.TRANSFER_WAX]: WaxTransfer,
  [ACTIVITY_TYPES.SALE]: Sale,
  [ACTIVITY_TYPES.MARKETPLACE_PURCHASE]: MarketplacePurchase,
  [ACTIVITY_TYPES.DEPOSIT]: Deposit,
  [ACTIVITY_TYPES.WITHDRAWAL]: Withdrawal
}

const ActivityDetail = () => {
  const router = useRouter()
  const { action_id: id } = router.query
  const [enableRefetch, setEnableRefetch] = useState(false)
  const { isMobile } = useBreakpoints()
  const { openActivityDetail } = useLayoutData()

  const res = useGetUserAction(id as string, {
    enabled: !!id,
    refetchInterval: enableRefetch ? ACTION_REFETCH_INTERVAL : false
  })
  const { isLoading, data, status } = res

  useEffect(() => {
    if (!isLoading && status === 'success') {
      const { type, batches } = data.action
      if (
        [ACTIVITY_TYPES.TRANSFER_BATCH, ACTIVITY_TYPES.TRANSFER_WAX].includes(
          type
        )
      ) {
        const hasPendingActivity = batches.find(
          ({ chain_status }) => chain_status < 10
        )
        setEnableRefetch(!!hasPendingActivity)
      } else {
        setEnableRefetch(false)
      }
    }
  }, [id, isLoading, data, status])

  if (!isLoading && status !== 'success') {
    router.push('/404')
    return null
  }

  const renderContent = () => {
    if (isLoading) {
      return <Loading />
    }

    const { type = ACTIVITY_TYPES.REDEEM } = data.action
    const { label } = ACTIVITY_TYPE_MAP[type] || {}
    const DetailComponent = DETAIL_MAP[type]
    return (
      <>
        <div className="w-full flex justify-between items-center max-md:p-2">
          {!isMobile && <div className="h5">{label}</div>}
          <Button theme="clean" onClick={() => openActivityDetail()}>
            <Icon name="close" size={24} />
          </Button>
        </div>
        <div className="w-full max-md:px-3 max-md:pb-1 md:pt-2 max-md:overflow-auto">
          {isMobile && <div className="h4 mb-2">{label}</div>}
          <DetailComponent id={id.toString()} activity={data.action} />
        </div>
      </>
    )
  }

  if (isMobile) {
    return (
      <ModalMobile
        className="h-[calc(var(--height)-32px)] justify-start"
        visible={!!id}
        onClose={() => openActivityDetail()}
        renderContent={renderContent}
      />
    )
  }

  return (
    <div
      className={classNames(
        `flex shrink-0 sticky w-[400px] max-w-[0px] overflow-x-hidden`,
        {
          '!max-w-[400px]': !!id
        }
      )}
      style={{
        top: HEADER_HEIGHT_WEB,
        height: 'calc(100vh - var(--headerHeight))',
        transition: `max-width ${DETAIL_PANE_TRANSITION_DURATION_MS}ms linear`
      }}
    >
      <div className="absolute inset-0 w-[400px] border-l border-defaultBorder overflow-y-scroll">
        <div className="px-4 py-3">{renderContent()}</div>
      </div>
    </div>
  )
}

export default ActivityDetail

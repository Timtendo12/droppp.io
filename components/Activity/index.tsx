import classnames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { ACTIVITY_TYPE_MAP, WAX_PURCHASE_PRICE } from '@/constants'
import { formatCurrency, formatWAXP } from '@/util/currencyHelpers'
import useBreakpoints from '@/hooks/useBreakpoints'
import { Button, Icon } from '..'
import styles from './styles.module.scss'
import { useLayoutData } from '@/contexts/layout'
import { isActiveInventoryItem } from '@/util/inventoryHelpers'
import { ACTIVITY_TYPES } from '@/enum'
import ActivityTime from '../ActivityTime'

const Activity = ({ activity }) => {
  const router = useRouter()
  const { isMobile, isMedium, isLarge } = useBreakpoints()
  const { openActivityDetail } = useLayoutData()
  const { id, type, info, amount, info_count, time_created } = activity
  const { label, icon, unit } = ACTIVITY_TYPE_MAP[type] || {}

  let amountLabel = ''
  if (unit) {
    if (unit === 'USDC') {
      amountLabel = `${formatCurrency(amount, false)} USDC`
    } else if (unit === 'WAXP') {
      amountLabel = `${formatWAXP(info_count)} WAXP`
    } else {
      amountLabel = `${info_count} ${unit}`
      if (info_count > 1) {
        amountLabel += 's'
      }
    }
  } else if (type === ACTIVITY_TYPES.ACCOUNT_PURCHASE) {
    amountLabel = `$${WAX_PURCHASE_PRICE}`
  }

  const { action_id } = router.query

  return (
    <Button
      className={classnames(styles.activity, {
        [styles.active]: isActiveInventoryItem(id, action_id)
      })}
      theme="clean"
      onClick={() => openActivityDetail(id)}
    >
      <div
        className={classnames(styles.content, {
          [styles.active]: isActiveInventoryItem(id, action_id)
        })}
      >
        <div className="flex w-full items-center">
          <Icon className="mr-2" name={icon} />
          <div className="text-left">
            <div className={isMobile ? 'h7' : 'h6'}>{label}</div>
            {isMobile && <div className="body-sm mt-[4px]">{info}</div>}
          </div>
        </div>
        {isMedium && <div className="w-full text-left body">{info}</div>}
        {isLarge && (
          <div className="w-full text-center body">{amountLabel}</div>
        )}
        <div
          className={classnames(
            'text-right body whitespace-nowrap ml-1',
            isMobile ? 'w-auto' : 'w-full'
          )}
        >
          <ActivityTime
            date={time_created}
            className="!text-right !text-base !text-white !capitalize !whitespace-nowrap !ml-1 !w-full"
          />
        </div>
      </div>
    </Button>
  )
}

export default Activity

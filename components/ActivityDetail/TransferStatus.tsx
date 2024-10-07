import classnames from 'classnames'
import React from 'react'
import { formatTransferState } from '@/util/activityHelpers'
import { Icon } from './..'

const StatusItem = ({ state, chainStatus }) => {
  const status = formatTransferState(state, chainStatus)
  return (
    <div className="flex flex-col justify-center items-center">
      <Icon
        className={classnames({
          'animate-spin': status === 'pending'
        })}
        name={`transfer-status-${status}`}
      />
      <div
        className={classnames('body-xs mt-1 capitalize', {
          'text-gray-500': status === 'none'
        })}
      >
        {state}
      </div>
    </div>
  )
}

const Divider = () => (
  <div className="flex-1 flex justify-around items-center h-2">
    <div className="w-[4px] h-[4px] bg-gray-300 rounded-full"></div>
    <div className="w-[4px] h-[4px] bg-gray-300 rounded-full"></div>
    <div className="w-[4px] h-[4px] bg-gray-300 rounded-full"></div>
    <div className="w-[4px] h-[4px] bg-gray-300 rounded-full"></div>
  </div>
)

const TransferStatus = ({ chainStatus }) => {
  return (
    <div className="flex mt-2">
      <StatusItem state="submitted" chainStatus={chainStatus} />
      <Divider />
      <StatusItem state="confirmed" chainStatus={chainStatus} />
      <Divider />
      <StatusItem state="complete" chainStatus={chainStatus} />
    </div>
  )
}

export default TransferStatus

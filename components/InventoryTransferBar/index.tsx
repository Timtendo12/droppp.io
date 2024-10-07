import classnames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { useLayoutData } from '@/contexts/layout'
import useBreakpoints from '@/hooks/useBreakpoints'
import { isTransferring } from '@/util/inventoryHelpers'

import { Card } from '@/components/InventoryBrowser'
import { BrowserGridItemType } from '@/components/InventoryBrowser/BrowserGridItem'
import { MODAL_ID } from '@/constants/modalId'
import { Button } from '..'
import { showModal } from '@/components/Modals/ModalV2'

const TRANSFER_BUTTON_TEXT = 'Transfer'

interface Props {
  onComplete?: () => void
  className?: string
  loadedInventories: Card<BrowserGridItemType>[]
}

const InventoryTransferBar = ({ className, loadedInventories }: Props) => {
  const contentRef = useRef(null)
  const {
    selectedAssets,
    activeTransferBar,
    transferBarHeight,
    setTransferBarHeight,
    updateSelectedAssets
  } = useLayoutData()
  const { isMobile } = useBreakpoints()

  useEffect(() => {
    setTransferBarHeight(contentRef?.current?.clientHeight)
  }, [contentRef?.current?.clientHeight])

  const handleSelectAll = isClear => () => {
    const newSelectedAssets = []
    if (!isClear) {
      loadedInventories
        .map(item => item.details)
        .filter(
          // @ts-expect-error
          ({ transferable, chain_status_text }) =>
            transferable && !isTransferring(chain_status_text)
        )
        .forEach(inventory => newSelectedAssets.push(inventory))
    }
    updateSelectedAssets([...newSelectedAssets])
  }

  const handleOpenTransferModal = () => {
    showModal(MODAL_ID.transfer.review)
  }

  const renderContent = () => {
    return (
      <>
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center w-full">
          <div className="flex justify-between">
            <div className="body mr-2 md:ml-1 pr-2 md:border-r border-gray-100/20">
              {`${selectedAssets.length} Item${
                selectedAssets.length === 1 ? '' : 's'
              } Selected`}
            </div>
            <div>
              <Button
                className="utility"
                theme="clean"
                onClick={handleSelectAll(false)}
              >
                Select All {loadedInventories.length}
              </Button>
              <Button
                className="utility ml-2"
                theme="clean"
                onClick={handleSelectAll(true)}
              >
                Clear All
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full md:w-auto"
              theme="white"
              onClick={handleOpenTransferModal}
            >
              {TRANSFER_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className={classnames('sticky mx-2 z-50', className)}
      style={{
        '--transferBarHeight': `${transferBarHeight}px`,
        '--transferBarBottomMargin': `-${isMobile ? 8 : 16}px`,
        '--transferBarTranslate': `${transferBarHeight}px`,
        top: '100dvh',
        height: '0px'
      }}
    >
      <div
        ref={contentRef}
        className={classnames(
          'absolute invisible bottom-2 w-full transition-transform flex justify-between p-2 border bg-gray-800 border-gray-700 rounded-[20px]',
          {
            height: 'var(--transferBarHeight)',
            ['!visible']: activeTransferBar
          }
        )}
      >
        {renderContent()}
      </div>
    </div>
  )
}

export default InventoryTransferBar

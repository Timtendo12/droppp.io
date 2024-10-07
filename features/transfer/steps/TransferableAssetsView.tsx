import React from 'react'
import {
  TransferSequence,
  TransferStepConfiguration,
  TransferStepProps,
  TransferSteps
} from '../types'
import { useTransferContext } from '../TransferProvider'
import { pluralize } from '@/util/stringHelpers'
import TransferList from '../components/TransferList'

export default function TransferableAssetsView({
  ModalBody
}: TransferStepProps) {
  const {
    preview: {
      transferable_assets: { items }
    }
  } = useTransferContext()
  return (
    <ModalBody className='className="min-h-[50vh] outline"'>
      <TransferList items={items} />
    </ModalBody>
  )
}

TransferableAssetsView.configure = (
  sequence: TransferSequence
): TransferStepConfiguration => {
  return {
    id: TransferSteps.transferableAssets,
    title: <Title />,
    onRetreat: () => sequence.goTo('review'),
    view: props => (
      <TransferableAssetsView
        sequence={sequence}
        {...props}
      ></TransferableAssetsView>
    )
  }
}

const Title = () => {
  const {
    preview: {
      transferable_assets: { count }
    }
  } = useTransferContext()
  return (
    <>
      {count} {pluralize('item', count)}
    </>
  )
}

import { ReactNode } from 'react'
import { ModalViewId } from '@/components/Modals/ModalV2/HowItWorksModal'

export const HOW_IT_WORKS_TITLES: Record<ModalViewId, ReactNode> = {
  introduction: <>Open Packs & Collect Digital&nbsp;Pop!</>,
  'redemption-begins': 'Redemption is Open',
  'redemption-ends': 'Redemption is Closed',
  final: 'Physical Collectibles Ship'
}

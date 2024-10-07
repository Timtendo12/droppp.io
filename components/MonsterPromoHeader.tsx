import NiceModal from '@ebay/nice-modal-react'
import { getDropppMonstersPromotion } from '@/constants'
import { MODAL_ID } from '@/constants/modalId'
import { Promotion } from '@/contexts/auth/types'
import Button from './Button'

const Content = {
  header: 'Receive 0% Marketplace Fees!',
  details({
    promotion,
    onLearnMore
  }: {
    promotion: Promotion
    onLearnMore: () => void
  }) {
    const { startDisplayDate, endDisplayDate, endDisplayYear, marketplaceFee } =
      promotion

    return (
      <>
        From {startDisplayDate} - {endDisplayDate}, {endDisplayYear}, enjoy a
        waived {marketplaceFee} marketplace fee when selling items from any
        collection while having your avatar set to a Series 1 Droppp Monster.{' '}
        <Button
          theme="clean"
          className="underline cursor-pointer"
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </>
    )
  }
}

const MonsterPromoHeader = () => {
  const promotion = getDropppMonstersPromotion()
  if (!promotion?.active) {
    return null
  }

  // displays the learn more modal
  const onLearnMore = () => NiceModal.show(MODAL_ID.howMonsterPromoWorks)

  return (
    <div className="text-center bg-blue text-white flex flex-col gap-1 p-2 w-full relative">
      <h5 className="h5">{Content.header}</h5>
      <p className="body-sm">
        {Content.details({
          promotion,
          onLearnMore
        })}
      </p>
    </div>
  )
}

export default MonsterPromoHeader

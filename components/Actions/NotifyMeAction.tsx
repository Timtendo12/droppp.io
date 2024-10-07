import Button, { ButtonTheme } from '@/components/Button'
import Icon from '@/components/Icon'
import { showModal } from '../Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { sendGTMEvent } from '@next/third-parties/google'

type Props = {
  dropId: number
  buttonTheme?: ButtonTheme
}

const NotifyMeAction = ({ dropId, buttonTheme = 'white' }: Props) => {
  return (
    <Button
      size="lg"
      theme={buttonTheme}
      onClick={() => {
        showModal(MODAL_ID.notifyMe, { dropId })
        sendGTMEvent({
          event: 'notify_me_start',
          drop_id: dropId
        })
      }}
    >
      <Icon name="bell" className="mr-1" />
      Notify Me
    </Button>
  )
}

export default NotifyMeAction

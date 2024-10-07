import { classNames } from '@/util/tailwindHelpers'
import { MergedDrop } from '@/config/drops/schema'
import { formattedPacificDate } from '@/util/time/pt'
import Button from '../Button'
import { ModalViewId } from '../Modals/ModalV2/HowItWorksModal'
import { showModal } from '../Modals/ModalV2'
import { sendGTMEvent } from '@next/third-parties/google'
import { MODAL_ID } from '@/constants/modalId'
import React, { Ref } from 'react'
import Timeline from '../Timeline'
import { HOW_IT_WORKS_TITLES } from '@/features/drop/howItWorks/content'

export const ImportantDatesTimeline = React.forwardRef(
  (
    {
      drop,
      config
    }: {
      drop: MergedDrop
      config?: {
        isVertical?: boolean
        textAlign?: 'center' | 'left'
        buttonTheme?: 'clean-blue' | 'secondary'
        headerClasses?: string
        descriptionClasses?: string
        eventLocation: string
        states: {
          isLaunched: boolean
          isPostSnapshot: boolean
          isPostRedemption: boolean
          isShipping: boolean
          isPostShipping: boolean
        }
      }
      eventLocation?: string
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const {
      redeem_start_date,
      redeem_end_date,
      time_launch,
      redeem_ship_date,
      estimated_ship_target
    } = drop

    const {
      isLaunched,
      isPostSnapshot,
      isPostRedemption,
      isShipping,
      isPostShipping
    } = config.states

    const textAlign = config?.textAlign === 'left' ? 'text-left' : 'text-center'
    const descriptionClasses =
      config?.descriptionClasses || 'text-base text-gray-300'
    const buttonTheme = config.buttonTheme || 'clean-blue'

    const handleOpenModal = (index?: number) => {
      const viewId = Object.values(ModalViewId)[index || 0]
      const source = index !== undefined ? viewId : 'button'
      const hiw_source = `hiw_${config.eventLocation}_${source}`

      showModal(MODAL_ID.howItWorks, { viewId, catalogItem: drop })

      sendGTMEvent({
        event: 'view_how_it_works',
        hiw_source
      })
    }

    return (
      <div
        className={classNames({
          'space-y-8': !config.isVertical,
          'space-y-4': config.isVertical
        })}
        ref={ref}
      >
        <div
          className={classNames(
            'text-center max-w-2xl mx-auto space-y-2',
            textAlign
          )}
        >
          <h4 className={classNames('h4', config.headerClasses)}>
            Mark your calendar
          </h4>
          <p className={classNames(descriptionClasses)}>
            Keep an eye on the following dates so you don’t miss out on the
            limited edition physical collectibles designed exclusively for this
            drop!
          </p>
        </div>
        <Timeline
          className="max-w-[1024px] mx-auto"
          isVertical={config.isVertical}
          textAlign={config.textAlign}
          isCompleted={isPostShipping}
          markers={[
            {
              title: formattedPacificDate(time_launch),
              description: HOW_IT_WORKS_TITLES[ModalViewId.Introduction],
              isActive: isLaunched
            },
            {
              title: formattedPacificDate(redeem_start_date),
              description: HOW_IT_WORKS_TITLES[ModalViewId.RedemptionBegins],
              isActive: isPostSnapshot
            },
            {
              title: formattedPacificDate(redeem_end_date),
              description: HOW_IT_WORKS_TITLES[ModalViewId.RedemptionEnds],
              isActive: isPostRedemption
            },
            {
              title:
                (redeem_ship_date && formattedPacificDate(redeem_ship_date)) ||
                estimated_ship_target,
              description: HOW_IT_WORKS_TITLES[ModalViewId.Final],
              isActive: isShipping
            }
          ]}
          markerAction={index => handleOpenModal(index)}
        />
        <Button
          theme={buttonTheme}
          className={classNames('mx-auto block', {
            'text-base': buttonTheme === 'clean-blue',
            '!mt-2 w-full': buttonTheme === 'secondary'
          })}
          onClick={() => handleOpenModal()}
        >
          How It Works
        </Button>
      </div>
    )
  }
)

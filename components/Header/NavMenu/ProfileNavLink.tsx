import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MODAL_ID } from '@/constants/modalId'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { showModal } from '@/components/Modals/ModalV2'
import { getUsersWaxAddressInfo } from '@/util/accountHelpers'
import ConditionalWrap from '@/components/ConditionalWrap'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useAuth } from '@/contexts/auth'
import IdentityVerificationState from '@/types/identityVerificationState'

const BUTTON_CLASSES = 'flex items-center gap-[12px] relative'

export default function ProfileLink() {
  const { isMobile } = useBreakpoints()
  const { user, identityVerificationState } = useAuth()
  const { waxAddress, addressType } = getUsersWaxAddressInfo(user)
  const isAddressTypeNone = addressType === 'none'
  const kycVerified =
    identityVerificationState === IdentityVerificationState.Completed

  return (
    <ConditionalWrap
      condition={isAddressTypeNone}
      wrap={children => (
        <Button
          theme="clean"
          className={BUTTON_CLASSES}
          onClick={() => showModal(MODAL_ID.wallet.customWaxAddress)}
        >
          <div className="h-[36px] w-[36px] rounded-full flex items-center justify-center bg-gray-700">
            <Icon className="w-3 h-3 text-white" name="profileLogo" />
          </div>
          {children}
        </Button>
      )}
      falseWrap={children => (
        <Link
          href={`/${waxAddress}`}
          className={classNames(BUTTON_CLASSES, {
            ['md:pointer-events-none']: !open
          })}
        >
          <Image
            className="rounded-xl"
            src={user?.avatar_media?.size1_url}
            alt={waxAddress}
            width={40}
            height={40}
          />
          {kycVerified && (
            <Icon
              name="verifiedOutlined"
              className="absolute -left-[4px] -bottom-[4px]"
            />
          )}
          {children}
        </Link>
      )}
    >
      {!isMobile && <div className="utility-alt">{waxAddress}</div>}
    </ConditionalWrap>
  )
}

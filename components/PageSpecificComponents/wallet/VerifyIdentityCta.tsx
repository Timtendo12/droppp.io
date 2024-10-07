import React from 'react'
import { CLOUDINARY_WALLET_PATH } from '@/pages/wallet'
import Button from '@/components/Button'
import CloudinaryImage from '@/components/CloudinaryImage'
import { MODAL_ID } from '@/constants/modalId'
import IdentityVerificationState from '@/types/identityVerificationState'

import { showModal } from '@/components/Modals/ModalV2'
import { SUPPORT_EMAIL } from '@/config'

export interface IVerifyIdentity {
  identityVerificationState: IdentityVerificationState
}

const VerifyIdentityCta = ({
  identityVerificationState: verifyState = IdentityVerificationState.New
}: IVerifyIdentity) => {
  const isPending = verifyState == IdentityVerificationState.Pending
  const isCompleted = verifyState == IdentityVerificationState.Completed
  const isFailed = verifyState == IdentityVerificationState.Failed

  if (isCompleted) return null

  const handleAction = () => {
    if (isFailed) {
      window.location.href = `mailto:${SUPPORT_EMAIL}?Subject=Identity verification was unsuccessful`
      return
    }
    showModal(MODAL_ID.identityVerificationGate)
  }
  return (
    <aside className="md:pt-2 flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex-1 max-w-[584px] md:pb-7">
        {isPending ? (
          <>
            <h2 className="mb-2 h3">{content.title[verifyState]}</h2>
            <p className="mb-3 text-gray-300">{content.body[verifyState]}</p>
          </>
        ) : (
          <>
            <h2 className="mb-2 h3">{content.title[verifyState]}</h2>
            <p className="mb-3 text-gray-300">{content.body[verifyState]}</p>
          </>
        )}
        {!isPending && !isCompleted && (
          <div className="flex flex-col md:items-start lg:flex-row gap-3">
            <Button theme="rainbow" onClick={handleAction}>
              {content.button[verifyState]}
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 flex-shrink-0 max-w-[412px] relative max-md:-mt-6">
        <div className="md:absolute bottom-0 left-0 right-0">
          <div className="relative w-full aspect-1">
            <CloudinaryImage
              layout="fill"
              imageId="verify-identity"
              path={CLOUDINARY_WALLET_PATH}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

const content = {
  title: {
    [IdentityVerificationState.New]: 'Droppp Marketplace Access',
    [IdentityVerificationState.Pending]: 'Identity Verification Pending',
    [IdentityVerificationState.Started]: 'Resume Identity Verification',
    [IdentityVerificationState.Failed]: 'Identity verification was unsuccessful'
  },
  body: {
    [IdentityVerificationState.New]:
      'Quickly & easily verify your identity to list items for sale, add or withdraw funds, and buy on the Droppp Marketplace. It usually only takes a few minutes.',
    [IdentityVerificationState.Pending]:
      'Thank you for taking the time to verify your identity. Once reviewed, you will receive an email with your verification results.',
    [IdentityVerificationState.Started]:
      'Complete your identity verification to list items for sale, add or withdraw funds, and buy on the Droppp Marketplace.',
    [IdentityVerificationState.Failed]:
      'Please contact Droppp Support for further assistance.'
  },
  button: {
    [IdentityVerificationState.New]: 'Verify Identity',
    [IdentityVerificationState.Started]: 'Resume Identity Verification',
    [IdentityVerificationState.Failed]: 'Contact Support'
  }
}

export default VerifyIdentityCta

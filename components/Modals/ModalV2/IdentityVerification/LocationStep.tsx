import Button from '@/components/Button'
import RegionFormField, {
  CountrySelection,
  DefaultRegionValues,
  StateSelection,
  VerifyInputs
} from '@/components/RegionFormField'
import Spinner from '@/components/Spinner'
import Toast from '@/components/Toast'
import {
  GLOBAL_CLOUDINARY_ADS_KYC_DROPS_CTA_DESKTOP_IMAGE_ID,
  GLOBAL_CLOUDINARY_ADS_KYC_DROPS_CTA_FOLDER,
  GLOBAL_CLOUDINARY_ADS_KYC_DROPS_CTA_MOBILE_IMAGE_ID
} from '@/constants/cloudinary'
import useBreakpoints from '@/hooks/useBreakpoints'
import useLocalStorage from '@/storage/useLocalStorage'
import { buildCloudinaryUrl } from '@/util/cloudinaryHelpers'
import { getRegionValues, setupRegionData } from '@/util/regionInfoHelpers'
import regionRestrictionErrorFormatter, {
  RegionRestrictionType
} from '@/util/regionRestrictionErrorFormatter'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { hideModal } from '..'
import { button, paragraphClasses } from '../shared/props'
import { MODAL_ID } from '@/constants/modalId'
import { StorageKey } from '@/storage/keys'
import { Content as IdentityVerificationContent } from '../content/identityVerification'
import useKyc from '@/hooks/useKyc'
import { useWalletQuery } from '@/api/resources/user/wallet/get'
import IdentityVerificationState from '@/types/identityVerificationState'
import { isEmpty } from 'lodash'
import React from 'react'

const LocationStep = ({ children, onContinue = undefined, redirectUri }) => {
  const router = useRouter()
  const [regionInfo, setRegionInfo] = useLocalStorage(StorageKey.RegionInfo)
  const [initialized, setInitialized] = useState(false)
  const [defaultRegionValues, setDefaultRegionValues] =
    useState<DefaultRegionValues>(null)

  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    ...formProps
  } = useForm({ mode: 'onChange' })

  const { kycVerifyUrl, isLoading } = useKyc(isValid)
  const { data: { identityVerificationState: verifyState } = {} } =
    useWalletQuery()

  const hasKycVerifyUrl = !!kycVerifyUrl
  const country: CountrySelection | undefined = watch(VerifyInputs.country)
  const state: StateSelection | undefined = watch(VerifyInputs.state)

  const regionError = regionRestrictionErrorFormatter(
    errors,
    country?.country,
    state
  )

  const isSanctioned = regionError?.type === RegionRestrictionType.sanctioned
  const isUnsupported = regionError?.type === RegionRestrictionType.unsupported

  const handleRegionInfoStorage = () =>
    setRegionInfo(setupRegionData(country, state))

  const handleVerifyIdentity = () => {
    handleRegionInfoStorage()
    if (redirectUri !== router.asPath) router.push(redirectUri).then()
    hideModal(MODAL_ID.identityVerificationGate)
    if (hasKycVerifyUrl) window.open(kycVerifyUrl, '_blank')
  }

  const isLoadingOrSubmitting = isLoading || isSubmitting
  const hasStarted = verifyState === IdentityVerificationState.Started

  useEffect(() => {
    if (!initialized && verifyState && !isEmpty(defaultRegionValues))
      setInitialized(true)
  }, [verifyState])

  useEffect(() => {
    getRegionValues(regionInfo).then(r => {
      setDefaultRegionValues(r)
      if (!initialized && verifyState) setInitialized(true)
    })
  }, [regionInfo])

  const onSubmit = async () => {
    handleVerifyIdentity()
    onContinue?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({
        Body: (
          <>
            <p className={classNames(paragraphClasses, 'mb-3')}>
              In order to verify your identity, we need to know which area of
              the world you reside.
            </p>
            {!initialized && (
              <div className="relative box-content h-9 pb-half w-full">
                <Spinner />
              </div>
            )}
            {initialized && (
              <>
                <RegionFormField
                  inputs={VerifyInputs}
                  watch={watch}
                  defaultValues={defaultRegionValues}
                  {...formProps}
                />

                {!!regionError && (isSanctioned || isUnsupported) ? (
                  <>
                    <Toast
                      title={regionError.title}
                      type="warning"
                      inline
                      className="mb-2"
                    >
                      {regionError.message}
                    </Toast>
                    <ViewDropsCta />
                  </>
                ) : (
                  <p
                    className="modal-copy-xs leading-normal"
                    aria-label="Disclaimer"
                  >
                    {IdentityVerificationContent.disclaimer()}
                  </p>
                )}
              </>
            )}
          </>
        ),
        Footer: (
          <Button
            type="submit"
            theme="rainbow"
            loading={isLoadingOrSubmitting}
            disabled={!isValid}
            {...button}
          >
            {!!regionError
              ? 'Continue'
              : `${hasStarted ? 'Resume' : 'Start'} Verification`}
          </Button>
        )
      })}
    </form>
  )
}

export default LocationStep
const ViewDropsCta = () => {
  const router = useRouter()
  const { isMobile } = useBreakpoints(['sm'])

  const handleViewDrops = () => router.push('/drops').then()

  const imageId = isMobile
    ? GLOBAL_CLOUDINARY_ADS_KYC_DROPS_CTA_MOBILE_IMAGE_ID
    : GLOBAL_CLOUDINARY_ADS_KYC_DROPS_CTA_DESKTOP_IMAGE_ID

  const bgUrl = buildCloudinaryUrl(
    GLOBAL_CLOUDINARY_ADS_KYC_DROPS_CTA_FOLDER,
    imageId
  )

  return (
    <div
      className="px-3 py-4 -mx-[var(--modalPadding)] -mb-[var(--modalBodyBottomPadding)] bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgUrl})`
      }}
    >
      <div className="w-[170px] sm:w-[220px] flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h4 className="h4 leading-tight">WAIT, IT'S NOT OVER YET!</h4>
          <p className="body-md text-gray-300">
            You can still still join new drops without verification.
          </p>
        </div>
        <div>
          <Button size="xs" theme="white" onClick={handleViewDrops}>
            VIEW DROPS
          </Button>
        </div>
      </div>
    </div>
  )
}

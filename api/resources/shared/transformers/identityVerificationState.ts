import IdentityVerificationState from '@/types/identityVerificationState'
import { KycFlags } from '../account'

export const responseToIdentityVerificationState = <T extends KycFlags>(
  object: T
): IdentityVerificationState => {
  if (object.kyc_completed) return IdentityVerificationState.Completed
  if (object.kyc_pending) return IdentityVerificationState.Pending
  if (object.kyc_started) return IdentityVerificationState.Started
  if (object.kyc_failed) return IdentityVerificationState.Failed
  return IdentityVerificationState.New
}

export type IdentityVerificationStateResponse<Response> = Omit<
  Response,
  'kyc_completed' | 'kyc_pending' | 'kyc_started' | 'kyc_failed'
> & { identityVerificationState: IdentityVerificationState }

const identityVerificationStateTransformer = <Response extends KycFlags>(
  response: Response
): IdentityVerificationStateResponse<Response> => {
  return {
    ...response,
    identityVerificationState: responseToIdentityVerificationState(response)
  }
}

export default identityVerificationStateTransformer

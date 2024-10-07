import { useForm } from 'react-hook-form'
import {
  WithdrawalSequence,
  WithdrawalStepConfiguration,
  WithdrawalStepProps,
  WithdrawalSteps
} from '@/features/wallet/withdraw/types'
import Button from '@/components/Button'
import * as modalProps from '@/components/Modals/ModalV2/shared/props'
import { useWithdrawalContext } from '@/features/wallet/withdraw/WithdrawalProvider'
import { Separator, Toast } from '@/components'
import { formatUSDC } from '@/util/currencyHelpers'
import Tooltip from '@/components/Tooltip'
import { BreakdownItem } from '../components/BreakdownItem'
import { DetailItem } from '../components/DetailItem'
import { CryptoNetworkLogoAndTitle } from '../components/CryptoNetworkLogoAndTitle'
import { hideModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { useWithdrawalSubmit } from '@/features/wallet/withdraw/hooks/useWithdrawalSubmit'

const FinalizeStep = ({ ModalBody, ModalFooter }: WithdrawalStepProps) => {
  const {
    selectedNetwork,
    withdrawal: { amount, network, address }
  } = useWithdrawalContext()

  const { isSubmitting, submitWithdrawal } = useWithdrawalSubmit({
    input: { amount, address, chain: network },
    onWithdrawalSuccess: () => {
      hideModal(MODAL_ID.wallet.withdrawFunds)
      Toast({
        type: 'information',
        description: 'Your withdraw request is being processed'
      })
    }
  })

  const { handleSubmit } = useForm()

  const networkFee = selectedNetwork?.fee ?? 0
  const total = amount - networkFee || 0
  const shouldDisableSubmit = total <= 0

  return (
    <form onSubmit={handleSubmit(() => submitWithdrawal())}>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <DetailItem title="To" value={address} />

          <div className="grid grid-cols-2 gap-4 mb-1 [&>:not(:last-child)]:border-r [&>:not(:last-child)]:border-defaultBorder">
            <DetailItem
              title="Network"
              value={<CryptoNetworkLogoAndTitle network={network} />}
            />
            <DetailItem
              title={
                <Tooltip
                  trigger={({ DefaultTriggerComponent }) => (
                    <div className="flex items-center gap-1 relative">
                      <span>Est. Arrival of Funds</span>
                      <DefaultTriggerComponent className="outline" />
                    </div>
                  )}
                >
                  Sending a blockchain transaction may take a few minutes to
                  process.
                </Tooltip>
              }
              value="5–15 minutes"
            />
          </div>

          <Separator className="-mx-[var(--modalPadding)] !border-gray-900" />

          <div>
            <h3 className="h7 mb-2">Breakdown</h3>
            <ul className="flex flex-col gap-1">
              <li>
                <BreakdownItem title={'Withdraw Amount'} value={amount} />
              </li>
              <li>
                <BreakdownItem
                  title={
                    <Tooltip
                      trigger={({ DefaultTriggerComponent }) => (
                        <div className="flex gap-1 items-center">
                          Processing Fee
                          <DefaultTriggerComponent />
                        </div>
                      )}
                    >
                      A small amount paid by the person who sends a transaction
                      to ensure that the transaction gets processed by the
                      network.
                    </Tooltip>
                  }
                  value={networkFee}
                />
              </li>
            </ul>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <div className="flex justify-between mb-3">
          <p className="h5">Withdraw Total</p>
          <p className="pricing-xl">
            {formatUSDC(total)}&nbsp;
            <span className="pricing-sm text-gray-300">USDC</span>
          </p>
        </div>
        <Button
          {...modalProps.submit}
          loading={isSubmitting}
          theme="rainbow"
          disabled={shouldDisableSubmit}
        >
          WITHDRAW FUNDS
        </Button>
      </ModalFooter>
    </form>
  )
}

FinalizeStep.configure = (
  sequence: WithdrawalSequence
): WithdrawalStepConfiguration => {
  return {
    id: WithdrawalSteps.finalize,
    title: 'Confirm Withdraw',
    onRetreat: () => sequence.goTo(WithdrawalSteps.enterAmount),
    view: props => <FinalizeStep sequence={sequence} {...props}></FinalizeStep>
  }
}

export { FinalizeStep }

import React from 'react'
import AcknowledgeBox from '@/components/AcknowledgeBox'
import { ControlledConfirmation } from '@/components/AcknowledgeBox/Confirmation'
import { EULA_URL, WB_AFFILIAATE_URL, WB_PRIVACY_URL } from '@/constants'
import { PACK_SELECTION_FORM_INPUTS } from '.'

export const PackSelectionAcknowledge = ({
  control,
  isExclusiveDrop,
  licensor
}) => {
  return (
    <AcknowledgeBox
      confirm={
        <>
          <ControlledConfirmation
            name={PACK_SELECTION_FORM_INPUTS.ACCEPT_EULA}
            control={control}
            required
          >
            I acknowledge the EULA
          </ControlledConfirmation>

          {isExclusiveDrop && (
            <ControlledConfirmation
              required
              control={control}
              name={PACK_SELECTION_FORM_INPUTS.ACCEPT_EXCLUSIVE}
            >
              I acknowledge this is a Droppp Exclusive
            </ControlledConfirmation>
          )}

          {licensor === 'wb' && (
            <ControlledConfirmation
              control={control}
              name={PACK_SELECTION_FORM_INPUTS.ACCEPT_PARTNER_OPT_IN}
            >
              <span>
                I want to receive updates, ads and offers from Warner Bros.
                Consumer Products and its{' '}
                <a
                  className="inline-link"
                  target="_blank"
                  rel="noreferrer"
                  href={WB_AFFILIAATE_URL}
                >
                  WarnerMedia affiliates
                </a>
                . To withdraw your consent and to learn more about your rights
                and how to exercise them, see{' '}
                <a
                  className="inline-link"
                  href={WB_PRIVACY_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  WarnerMedia’s privacy policy
                </a>
                .
              </span>
            </ControlledConfirmation>
          )}
        </>
      }
    >
      <p className="body-sm">
        By proceeding with this purchase you acknowledge you have read and agree
        to the{' '}
        <a
          className="inline-link"
          target="_blank"
          href={EULA_URL}
          rel="noreferrer"
        >
          End User License Agreement
        </a>{' '}
        for the product that you are purchasing
        {isExclusiveDrop &&
          ' and that Droppp Exclusives can not be transferred outside of Droppp'}
        .
      </p>
    </AcknowledgeBox>
  )
}

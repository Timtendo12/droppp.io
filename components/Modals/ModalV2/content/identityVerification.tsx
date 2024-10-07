interface DisclaimerProps {
  privacyPolicyLinkClassName?: string
}

export const Content = {
  disclaimer({
    privacyPolicyLinkClassName = 'underline text-white'
  }: DisclaimerProps = {}) {
    return (
      <>
        Persona, Droppp’s identity verification provider, verifies your identity
        and helps prevent fraud. For this purpose, Persona will process scans of
        your facial geometry (“Face Data”) obtained from the identification
        documents and photos that you upload. Face Data may be biometric data in
        certain jurisdictions. For details about how Persona processes Face
        Data, see{' '}
        <a
          href="https://withpersona.com/legal/privacy-policy"
          className={privacyPolicyLinkClassName}
          target="_blank"
          rel="noreferrer"
        >
          Persona’s Privacy Policy
        </a>
        . By clicking the “Start Verification” button below, you consent to
        collection, storage, and use of Face Data as described here.
      </>
    )
  }
}

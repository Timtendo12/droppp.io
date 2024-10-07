import styles from './styles.module.scss'
import { SUPPORT_EMAIL } from '@/config'
import { showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { Button } from '@/components'
import Seo from '@/components/Seo'

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <Seo title="PRIVACY POLICY" />
      <h1>TOKENWAVE PRIVACY POLICY</h1>
      <p>
        <b>Last Updated: Aug 30th 2023</b>
      </p>
      <p>
        This Privacy Policy describes how TokenWave LLC (“<b>TokenWave</b>,” “
        <b>we</b>,” or “<b>us</b>”) collects, uses, discloses and otherwise
        processes information about you. This Privacy Policy applies to
        information we collect when you access or use our websites (such as
        www.tokenwave.io), mobile applications (such as TokenHead), our NFT
        marketplace Droppp, and other online products and services that link to
        this policy (collectively, our “Services”), or when you otherwise
        interact with us, such as through our customer support channels or on
        social media. We may provide different or additional notices of our
        privacy practices for certain products, services or activities, in which
        case those notices will supplement or replace the disclosures in this
        Privacy Policy. We may change this Privacy Policy from time to time. If
        we make changes, we will notify you by revising the date at the top of
        this policy. If we make material changes, we will provide you with
        additional notice (such as by adding a statement to our Services or
        sending you a notification). We encourage you to review this Privacy
        Policy regularly to stay informed about our information practices and
        the choices available to you.
      </p>
      <h1>CONTENT</h1>
      <p>
        <a href="#nfts-blockchain">NFTs AND BLOCKCHAIN</a>
        <br />
        <a href="#collection-information">COLLECTION OF INFORMATION</a>
        <br />
        <a href="#use-information">USE OF INFORMATION</a>
        <br />
        <a href="#disclosures-information">DISCLOSURES OF INFORMATION</a>
        <br />
        <a href="#processing-countries">
          PROCESSING IN THE UNITED STATES AND OTHER COUNTRIES
        </a>
        <br />
        <a href="#data-retention">DATA RETENTION</a>
        <br />
        <a href="#privacy-choices">YOUR PRIVACY CHOICES</a>
        <br />
        <a href="#children-privacy">CHILDREN’S PRIVACY</a>
        <br />
        <a href="#customers-residing-us">
          ADDITIONAL INFORMATION FOR CUSTOMERS RESIDING IN CERTAIN U.S. STATES
        </a>
        <br />
        <a href="#customers-residing-europe">
          ADDITIONAL INFORMATION FOR CUSTOMERS RESIDING IN EUROPE
        </a>
        <br />
        <a href="#contact-us">CONTACT US</a>
        <br />
      </p>
      <h1 id="nfts-blockchain">NFTs AND BLOCKCHAIN</h1>
      <p>
        Non-fungible tokens or NFTs are digital assets that let you easily
        demonstrate ownership and verify the authenticity of unique items.
        Often, NFTs are used to represent and track ownership of digital trading
        cards or game items, but there is no real limit to what they might be
        used to track. NFTs are powered by blockchain technology similar to
        Bitcoin—meaning a shared digital ledger is used to record NFT
        transactions and track NFT ownership. Our Services primarily
        leverage WAX, a prominent virtual item blockchain developed specifically
        for NFTs. Although we don’t own WAX or any other virtual item
        blockchain, we are able leverage public digital ledgers to provide our
        Services.
        <br />
        <b>
          Your NFT-related transactions are publicly visible because they are
          stored on the applicable blockchain (such as WAX) where they are
          associated with your WAX wallet addresses. Your TokenWave username is
          publicly identified with your WAX wallet address. Accordingly, when
          you use certain features of our Services, information about you may be
          stored on a publicly-searchable blockchain. Be aware that TokenWave
          has no ability to control, modify, or delete data published to the
          blockchain. By using these features of the Services, you consent to
          your information being cryptographically transmitted and stored on
          that blockchain.
        </b>
      </p>
      <h1 id="collection-information">COLLECTION OF INFORMATION</h1>
      <p>
        The information we collect about you depends on how you interact with us
        or use our Services. In this section, we describe the categories of
        information we collect and the sources of this information.
      </p>
      <h3>Information You Provide to Us</h3>
      <p>
        We collect information you provide directly to us. For example, we
        collect information directly from you when you create an account, make a
        purchase, communicate with us via third-party platforms, request
        customer support, or otherwise communicate with us. The types of
        information that we collect include your name, email address, postal
        address, phone number, and any other information you choose to provide.
        If you make a purchase from us, we work with a third-party payment
        processor to collect and process your payment information.{' '}
      </p>
      <h3>Information We Collect Automatically</h3>
      <p>
        We automatically collect certain information about your interactions
        with us or our Services, including:
      </p>
      <ul>
        <li>
          <b>Transactional Information:</b> When you make a purchase, we collect
          information about the transaction, such as product details, purchase
          price, and the date and location of the transaction.
        </li>
        <li>
          <b>Device and Usage Information:</b> We collect information about how
          you access our Services, including data about the device and network
          you use, such as your hardware model, operating system version, mobile
          network, IP address, unique device identifiers, browser type, and app
          version. We also collect information about your activity on our
          Services, such as access times, pages viewed, links clicked, and the
          page you visited before navigating to our Services.
        </li>
        <li>
          <b>
            Information Collected by Cookies and Similar Tracking Technologies:
          </b>{' '}
          We (and our service providers) use tracking technologies, such as
          cookies, pixels, and SDKs, to collect information about your
          interactions with the Services. These technologies help us improve our
          Services and your experience, see which areas and features of our
          Services are popular, and count visits. For more information about the
          cookies and other tracking technologies we use, and the choices
          available to you, see the{' '}
          <a href="#privacy-choices">Your Privacy Choices</a> section below.
        </li>
        <li>
          <b>Blockchain Information:</b> When buying or selling NFTs or similar
          digital assets that are tracked on a blockchain, or otherwise
          completing transactions using smart contract technology, we may
          collect the following types of personal information from the public
          blockchain ledger or from third-parties that offer their products
          and/or services for use in conjunction with our Services (e.g., crypto
          wallet providers or WAX): WAX address; wallet type; any personal
          information included as the content attached to, or referenced by, the
          NFT; any provenance data related to the prior ownership of that asset
          (i.e., from where it was minted, or from whom it was purchased); and
          transaction IDs that represents the unique events on the blockchain
          (minting, transfer, etc.).
        </li>
      </ul>
      <h3>Information We Collect from Other Sources</h3>
      <p>
        We obtain information from other sources. For example, we may collect
        information from identity verification services and data analytics
        providers or from third parties that offer their products and/or
        services for use in conjunction with our Services (e.g., crypto wallet
        providers). This information may include your name, email and IP address
        and your information connected to a third-party blockchain wallet, such
        as the associated wallet address and profile picture. Additionally, if
        you create or log into your TokenWave account through a third-party
        platform (such as Apple or Google), we will have access to certain
        information from that platform, such as your username, in accordance
        with the authorization procedures determined by such platform.
      </p>
      <h3>Information We Derive</h3>
      <p>
        We may derive information or draw inferences about you based on the
        information we collect. For example, we may make inferences about your
        approximate location based on your IP address.
      </p>
      <h1 id="use-information">USE OF INFORMATION</h1>
      <p>
        We use the categories of information we collect to provide, maintain and
        improve our products and Services and to provide customer support. We
        also use the information we collect to:
      </p>
      <ul>
        <li>Personalize your experience with us;</li>
        <li>
          Send you technical notices, security alerts, support messages and
          other transactional or relationship messages;
        </li>
        <li>
          Communicate with you about products, services, and events offered by
          TokenWave and others and provide news and information that we think
          will interest you (see the{' '}
          <a href="#privacy-choices">Your Privacy Choices</a> section below for
          information about how to opt out of these communications at any time);
        </li>
        <li>
          Monitor and analyze trends, usage, and activities in connection with
          our products and Services;
        </li>
        <li>
          Detect, investigate, and help prevent security incidents and other
          malicious, deceptive, fraudulent, or illegal activity and help protect
          the rights and property of TokenWave and others; and
        </li>
        <li>Comply with our legal and financial obligations.</li>
      </ul>
      <h1 id="disclosures-information">DISCLOSURES OF INFORMATION</h1>
      <p>
        In certain circumstances, we disclose (or permit others to directly
        collect) information about you. We disclose personal information as
        described in this Privacy Policy and in the following ways:
      </p>
      <ul>
        <li>
          Public Disclosures on the Blockchain and other NFT Partners. If you
          use certain features of our Services, information will be disclosed to
          other users of the Services or become permanently visible and
          searchable on the blockchain, such as your Droppp Wallet ID or WAX
          wallet ID when you make a transaction via the WAX blockchain. We also
          disclose information to WAX if you connect your Droppp account to your
          WAX cryptowallet, and to third party providers or platforms if you
          decide to transfer your NFTs to external services or platforms. See{' '}
          <a href="#nfts-blockchain">NFTs AND BLOCKCHAIN</a> section above for
          more information.
        </li>
        <li>
          Public Disclosures on Social Media or Third-Party Platforms. If you
          post content on our social media page or our channel on third-party
          platforms, such as Discord, the public will be able to see this
          information.
        </li>
        <li>
          Vendors and Service Providers. We make personal information available
          to our vendors, service providers, contractors and consultants who
          perform services on our behalf, such as companies that assist us with
          web hosting, operating systems and platforms, shipping and delivery,
          payment processing, financing, fraud prevention, identity
          verification, customer service, data enrichment, analytics, and
          marketing and advertising.
        </li>
        <li>
          Professional Advisors. We disclose personal information to our legal,
          financial, insurance and other professional advisors where necessary
          to obtain advice or otherwise protect and manage our business
          interests.
        </li>
        <li>
          Law Enforcement Authorities and Individuals Involved in Legal
          Proceedings. We disclose personal information in response to a request
          for information if we believe that disclosure is in accordance with,
          or required by, any applicable law, regulation or legal process,
          including lawful requests by public authorities to meet national
          security or law enforcement requirements.
        </li>
        <li>
          To Protect the Rights of TokenWave and Others. We disclose personal
          information if we believe that your actions are inconsistent with our
          user agreements or policies, if we believe that you have violated the
          law, or if we believe it is necessary to protect the rights, property,
          and safety of TokenWave, our users, the public, or others.
        </li>
        <li>
          Corporate Transactions. We disclose personal information in connection
          with, or during negotiations of certain corporate transactions,
          including the merger, sale of company assets, financing, or
          acquisition of all or a portion of our business by another company.
        </li>
        <li>
          Corporate Affiliates. Personal information is disclosed between and
          among TokenWave and our parents, affiliates, subsidiaries, and other
          companies under common control and ownership.
        </li>
        <li>
          With Your Consent or at Your Direction. We make personal information
          available to third parties when we have your consent or you
          intentionally direct us to do so (for example, if you opt in to
          receive marketing communications from select business partners). You
          can choose to not provide us your consent to disclose your personal
          information to third parties.
        </li>
      </ul>
      <p>
        We also disclose aggregated or de-identified information that cannot
        reasonably be used to identify you. TokenWave processes, maintains, and
        uses this information only in a de-identified fashion and will not
        attempt to re-identify such information, except as permitted by law.
      </p>
      <h1 id="processing-countries">
        PROCESSING IN THE UNITED STATES AND OTHER COUNTRIES
      </h1>
      <p>
        TokenWave is based in the United States and we process and store
        information on servers located in the United States. We also have
        service providers to process personal information, and they may be
        located in or have servers in the U.S. and other countries. Where
        required by law, we provide adequate protection for the transfer of
        personal information in accordance with applicable law, such as by
        obtaining your consent, relying on the European Commission’s adequacy
        decisions, or executing Standard Contractual Clauses. Where relevant,
        you may request a copy of these Standard Contractual Clauses by emailing
        us at{' '}
        <a href="mailto:support@droppp.io" rel="noreferrer">
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
      <h1 id="data-retention">DATA RETENTION</h1>
      <p>
        We store personal information associated with your account for as long
        as your account remains active. If you close your account, we will
        delete your account data within 90 days; otherwise, we will delete your
        account data after a period of inactivity. We store other personal
        information for as long as necessary to carry out the purposes for which
        we originally collected it and for other business purposes explained in
        this Privacy Policy. Due to the nature of blockchain technology, certain
        information such as your TokenWave Wallet ID that is involved in a
        blockchain transaction (an information about the transaction itself)
        will remain permanently visible and searchable on the applicable
        blockchain (e.g., WAX). This information will continue to be publicly
        available. See “<a href="#nfts-blockchain">NFTs AND BLOCKCHAIN</a>” for
        more detail.
      </p>
      <h1 id="privacy-choices">YOUR PRIVACY CHOICES</h1>
      <h3>Account Information</h3>
      <p>
        You can access and modify certain information stored with your TokenWave
        account by logging into your account at any time. Note that some
        information may not be subject to change or deletion. See NFTs and
        Blockchain section for more detail.
      </p>
      <h3>Cookies and Similar Tracking Technologies</h3>
      <p>
        We use cookies and similar tracking technologies to analyze and improve
        interactions with our Services. You can usually adjust your browser
        settings to remove or reject all or some browser cookies. Please follow
        your browser’s instructions to do so. Note that removing or rejecting
        cookies could affect the availability and functionality of our Services.
      </p>
      <h3>Communications Preferences</h3>
      <p>
        You may opt out of receiving promotional emails from us by following the
        instructions in those communications or by managing your communication
        preferences in your account settings menu. If you opt out, we may still
        send you non-promotional emails, such as those about your account or our
        ongoing business relations.
      </p>
      <h1 id="children-privacy">CHILDREN’S PRIVACY</h1>
      <p>
        We do not knowingly collect, sell, or share personal information about
        consumers under the age of 16. If you have any reason to believe that a
        child has provided personal information to us via the Services, please
        contact us and we will endeavor to delete that personal information from
        our databases.
      </p>
      <h1 id="customers-residing-us">
        ADDITIONAL INFORMATION FOR CUSTOMERS RESIDING IN CERTAIN U.S. STATES
      </h1>
      <p>
        Certain U.S. states, including California, Colorado, Connecticut, Utah,
        and Virginia, have enacted consumer privacy laws that grant their
        residents certain rights and require additional disclosures (“State
        Laws”). If you are a resident of one of these states, this section
        applies to you.
      </p>
      <h3>Additional Disclosures</h3>
      <p>
        Our Privacy Policy explains how we{' '}
        <a href="#collection-information">collect</a>,{' '}
        <a href="#use-information">use</a> and{' '}
        <a href="#disclosures-information">disclose</a> information about you.
        As required by certain State Laws, we use the table below to describe
        this same information, including the categories of personal information
        we collect (and have collected over the preceding 12 months), the types
        of entities to which we disclose such information, and the ways we use
        each category of information.
        <br />
        <br />
        <i>
          Collection, Use and Disclosure of Personal Information for Business
          Purposes
        </i>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Category of Personal Information</th>
            <th>Categories of Recipients</th>
            <th>Uses of Personal Information</th>
          </tr>
          <tr>
            <td>Identifiers (such as name and contact information)</td>
            <td>
              <ul>
                <li>
                  Service providers, contractors and consultants that assist us
                  with web hosting, shipping and delivery, payment processing,
                  financing, fraud prevention, customer service, data
                  enrichment, and analytics
                </li>
                <li>Advisors and consultants</li>
                <li>
                  Third parties when compelled by law, such as law enforcement
                  or other governmental authorities
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>
                  Provide, maintain, and improve our products and services;
                </li>
                <li>
                  Send you technical notices, security alerts, support messages
                  and other transactional or relationship messages;
                </li>
                <li>
                  Communicate with you about products, services, and events
                  offered by TokenWave and others and provide news and
                  information that we think will interest you;
                </li>
                <li>
                  Monitor and analyze trends, usage, and activities in
                  connection with our products and services;
                </li>
                <li>
                  Detect, investigate, and help prevent security incidents and
                  other malicious, deceptive, fraudulent, or illegal activity
                  and help protect the rights and property of TokenWave and
                  others; and
                </li>
                <li>Comply with our legal and financial obligations.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Commercial information (such as products purchased)</td>
            <td>Same as identifiers</td>
            <td>Same as identifiers</td>
          </tr>
          <tr>
            <td>
              Internet or other electronic network activity information (such as
              browsing behavior)
            </td>
            <td>Same as identifiers</td>
            <td>Same as identifiers</td>
          </tr>
          <tr>
            <td>Inferences (such as IP address)</td>
            <td>Same as identifiers</td>
            <td>Same as identifiers</td>
          </tr>
        </tbody>
      </table>
      <h3>Other Details about our Information Practices</h3>
      <ul>
        <li>
          We collect personal information directly from you (for example, when
          you create an account and make a purchase), automatically when you
          access or use our Services and from third-party sources such as crypto
          wallet providers, each described in more detail in the{' '}
          <a href="#collection-information">Collection of Information</a>{' '}
          section above.
        </li>
        <li>
          We do not sell or share or use personal information about consumers
          for targeted advertising.
        </li>
        <li>
          We generally do not collect information that is considered “sensitive”
          under State Laws. In the limited circumstances that we do, such as
          collection of your account username and password, which is designated
          as “sensitive” under the California Consumer Privacy Act, we do not
          use or disclose sensitive personal information for the purpose of
          inferring characteristics about you.
        </li>
      </ul>
      <h3>Your Privacy Rights</h3>
      <p>
        You have the right to (1) request to know more about and access your
        personal information, including in a portable format, (2) request
        deletion of your personal information, and (3) request correction of
        inaccurate personal information. Note that while TokenWave can delete
        records in TokenWave’s possession, information recorded on the
        blockchain (such as WAX) cannot be deleted by TokenWave. To request
        access, correction, or deletion of your personal information, please
        submit this{' '}
        <Button
          theme="clean"
          onClick={() => showModal(MODAL_ID.consumerRightsRequest)}
        >
          form
        </Button>
        .
        <br />
        <br />
        We will verify your request by asking you to provide information related
        to your recent interactions with us, such as your current Droppp wallet
        address or recent transaction history. If we deny your request, you may
        appeal our decision by emailing us at{' '}
        <a href="mailto:support@droppp.io" rel="noreferrer">
          {SUPPORT_EMAIL}
        </a>
        . If you have concerns about the results of an appeal, you may contact
        the attorney general in the state where you reside.
        <br />
        <br />
        We will not discriminate against you for exercising your privacy rights.
        <br />
        <br />
        If you reside in California, Colorado, or Connecticut, you can designate
        an authorized agent to submit a privacy rights request on your behalf.
        We may ask authorized agents to submit proof of their authority to make
        the request, such as a valid power of attorney or proof that they have
        signed permission from the individual who is the subject of the request.
        In some cases, we may contact the individual who is the subject of the
        request to verify his or her own identity or confirm the authorized
        agent has permission to submit the request. If you are an authorized
        agent seeking to make a request, please submit this{' '}
        <Button
          theme="clean"
          onClick={() => showModal(MODAL_ID.consumerRightsRequest)}
        >
          form
        </Button>
        .
      </p>
      <h1 id="customers-residing-europe">
        ADDITIONAL INFORMATION FOR CUSTOMERS RESIDING IN EUROPE
      </h1>
      <p>
        If you are located in the European Economic Area (“EEA”), the United
        Kingdom, or Switzerland, the following section applies to you.
      </p>
      <h3>Legal Basis for Processing</h3>
      <p>
        When we process your personal information as described above, we do so
        in reliance on the following lawful bases:
      </p>
      <ul>
        <li>
          To perform our responsibilities under our contract with you (e.g.,
          processing payments for and providing the products and services you
          requested).
        </li>
        <li>
          When we have a legitimate interest in processing your personal
          information to operate our business or protect our interests (e.g., to
          provide, maintain, and improve our products and services, conduct data
          analytics, and communicate with you).
        </li>
        <li>
          To comply with our legal obligations (e.g., to maintain a record of
          your consents and track those who have opted out of marketing
          communications).
        </li>
        <li>
          When we have your consent to do so (e.g., when you opt in to receive
          marketing communications from us). When consent is the legal basis for
          our processing your personal information, you may withdraw such
          consent at any time.
        </li>
      </ul>
      <h3> Data Subject Requests</h3>
      <p>
        You have the right to (1) request to know more about and access your
        personal information, including in a portable format, (2) request
        deletion of your personal information, (3) request correction of
        inaccurate personal information, (4) request restriction of processing
        of your personal information, and (5) object to the processing of your
        personal information for certain purposes or request we restrict certain
        processing. In addition, you may have the right to object to certain
        processing or request we restrict certain processing. To exercise any of
        these rights, please submit this{' '}
        <Button
          theme="clean"
          onClick={() => showModal(MODAL_ID.consumerRightsRequest)}
        >
          form
        </Button>
        .
        <br />
        <br />
        If you have a concern about our processing of personal information that
        we are not able to resolve, you have the right to lodge a complaint with
        the Data Protection Authority where you reside. Contact details for your
        Data Protection Authority can be found using the links below:
        <br />
        <br />
        For individuals in the EEA:{' '}
        <a
          href="https://edpb.europa.eu/about-edpb/board/members_en"
          target="_blank"
          rel="noreferrer"
        >
          https://edpb.europa.eu/about-edpb/board/members_en
        </a>
        <br />
        For individuals in the UK:{' '}
        <a
          href="https://ico.org.uk/global/contact-us/"
          target="_blank"
          rel="noreferrer"
        >
          https://ico.org.uk/global/contact-us/
        </a>
        <br /> For individuals in Switzerland:{' '}
        <a
          href="https://www.edoeb.admin.ch/edoeb/en/home/the-fdpic/contact.html"
          target="_blank"
          rel="noreferrer"
        >
          https://www.edoeb.admin.ch/edoeb/en/home/the-fdpic/contact.html
        </a>
      </p>
      <h1 id="contact-us">CONTACT US</h1>
      <p>
        If you have any questions about this Privacy Policy, please email us at{' '}
        <a href="mailto:support@droppp.io" rel="noreferrer">
          support@droppp.io
        </a>
        .
      </p>
    </div>
  )
}

import { Icon, RarityBadge } from '../components'
import Link from 'next/link'
import { RARITY_TYPES } from '@/enum'

const FAQ_QUESTIONS = {
  drop101: {
    id: 'drop101',
    shouldHideOnNomp: false,
    navLabel: 'Droppp 101',
    title: 'Droppp 101',
    items: {
      whatIsDroppp: {
        id: 'what-is-droppp',
        title: 'What is Droppp?',
        shouldHideOnNomp: false,
        answer: (
          <>
            <p className="mb-2">
              Droppp is the premier platform for buying and collecting pop
              culture digital collectibles (NFTs) with super-easy and secure
              purchase methods.
            </p>
            <p>
              We collaborate with some of the most widely-regarded pop culture
              brands to bring fans unique digital collectibles — some of which
              can also be redeemed for super-rare physical collectibles!
            </p>
          </>
        )
      },
      whatAreDrops: {
        id: 'what-are-drops',
        title: 'What are drops?',
        shouldHideOnNomp: false,
        answer: (
          <p>
            A drop is the initial sale for the purchase of digital packs. After
            purchase, packs will show up in your inventory where you can
            digitally open them. Once opened, digital collectibles will be
            deposited into your inventory from that pack. Opening a pack will
            instantly remove it from your inventory.
          </p>
        )
      },
      howDoIGetStartedCollecting: {
        id: 'how-do-i-get-started-collecting-here-on-droppp',
        title: 'How do I get started collecting here on Droppp?',
        shouldHideOnNomp: false,
        answer: (
          <p>
            <Link
              href="/auth"
              className="inline-link"
              target="_blank"
              rel="noreferrer"
            >
              Sign up
            </Link>{' '}
            with your email or by signing in with Apple or Google for a free
            Droppp account. All standard accounts are free, however you won't be
            assigned a wallet address (where your digital collectibles are
            stored on the blockchain) until your first pack purchase. If you'd
            like a wallet address sooner, you can upgrade to a{' '}
            <Link
              href="/wallet"
              className="inline-link"
              target="_blank"
              rel="noreferrer"
            >
              custom Droppp address
            </Link>
            , or by funding your Droppp Balance with at least 5 USDC.
          </p>
        )
      },
      howDoIPurchase: {
        id: 'how-do-i-purchase-digital-collectibles-on-droppp',
        title: 'How do I purchase digital collectibles on Droppp?',
        shouldHideOnNomp: false,
        answer: (
          <p>
            You can purchase packs by joining the queue when the drop starts.
            Packs may be purchased with{' '}
            <Link
              target="_blank"
              href="/faq?question=what-payments-are-accepted-to-purchase-items-on-droppp"
              className="inline-link"
              rel="noreferrer"
            >
              various payment methods
            </Link>
            . After the drop concludes, packs and digital collectibles will be
            available for purchase on the Droppp Marketplace by other Droppp
            users.
          </p>
        )
      },
      whyDoesMyProfileEndInDp: {
        id: 'why-does-my-profile-end-in-dp',
        shouldHideOnNomp: false,
        title: (
          <>
            Why does my profile end in&nbsp;<em>.dp</em>?
          </>
        ),
        answer: (
          <p>
            Your profile name is also an address on the WAX Blockchain that is
            used to hold and transfer your digital collectibles. All of our
            standard and custom addresses end with <em>.dp</em>. If you’d like
            to{' '}
            <Link
              href="/wallet"
              className="inline-link"
              target="_blank"
              rel="noreferrer"
            >
              upgrade
            </Link>{' '}
            your free <em>.dp</em> address to a custom name, we offer this
            service for only $4.99.
          </p>
        )
      },
      whatPaymentsAreAccepted: {
        id: 'what-payments-are-accepted-to-purchase-items-on-droppp',
        title: 'What payments are accepted to purchase items on Droppp?',
        shouldHideOnNomp: false,
        answer: (
          <p>
            For pack sales, custom addresses and redemptions, acceptable payment
            methods include Apple Pay, Google Pay, and credit cards (see{' '}
            <a
              href="https://stripe.com/docs/payments/cards/supported-card-brands"
              className="inline-link"
              target="_blank"
              rel="noreferrer"
            >
              supported credit cards
            </a>
            ).
            <>
              {' '}
              Droppp Marketplace transactions use{' '}
              <Link
                target="_blank"
                href="/faq?question=what-is-usdc"
                className="inline-link"
                rel="noreferrer"
              >
                USDC
              </Link>{' '}
              .
            </>
          </p>
        )
      },
      whatDoesDropppExclusiveMean: {
        id: 'what-does-droppp-exclusive-mean',
        title: 'What does Droppp Exclusive mean?',
        shouldHideOnNomp: false,
        answer: (
          <>
            <div>
              <span>
                Droppp Exclusive refers to Digital Pop! collections that you can
                only buy, sell, and trade on Droppp. Look for the{' '}
              </span>
              <Icon
                name="exclusiveBadgeTextWhiteSmall"
                className="inline-block mx-[6px]"
              />
              <span>
                {' '}
                badge to know which collections are Droppp Exclusives.
              </span>
            </div>
          </>
        )
      },
      canITransferDropppExclusivesToAnotherAddress: {
        shouldHideOnNomp: false,
        id: 'can-i-transfer-droppp-exclusives-to-another-address',
        title: 'Can I transfer Droppp Exclusives to another address?',
        answer: (
          <p>
            You may transfer Droppp Exclusive items to another Droppp address
            (ending in .dp), but may not transfer to other WAX blockchain
            addresses.
          </p>
        )
      },
      willAllDropsMovingForwardBeDropppExclusiveCollections: {
        id: 'will-all-drops-moving-forward-be-droppp-exclusive-collections',
        title: 'Will all drops moving forward be Droppp Exclusive collections?',
        shouldHideOnNomp: false,
        answer: (
          <>
            <div>
              <span>
                No, only certain collections are Droppp Exclusive. All Droppp
                Exclusive collections and items will be marked by the{' '}
              </span>
              <Icon
                name="exclusiveBadgeTextWhiteSmall"
                className="inline-block mx-[6px]"
              />
              <span>
                {' '}
                badge on the drop landing page and throughout the marketplace.
              </span>
            </div>
          </>
        )
      }
    }
  },
  initialpacksale: {
    id: 'initialpacksale',
    navLabel: 'Drop',
    shouldHideOnNomp: false,
    title: 'Drop',
    items: {
      canIUseACreditCard: {
        shouldHideOnNomp: false,
        id: 'can-i-use-a-credit-card-on-droppp-to-buy-items-in-the-initial-pack-sale',
        title: 'Can I use a credit card to buy items in the drop?',
        answer: (
          <p>
            Droppp accepts most major credit cards along with Apple Pay and
            Google Pay for all drops.
          </p>
        )
      },
      howDoesJoiningAQueueWork: {
        shouldHideOnNomp: false,
        id: 'how-does-joining-a-queue-for-a-new-drop-work',
        title: 'How does joining a queue for a new drop work?',
        answer: (
          <p>
            A drop's queue opens roughly 10 minutes before the scheduled drop
            time. We use the Queue-It system for our queues. Joining the queue
            allows you to reserve a random spot before the drop opens. When the
            drop goes live, the Queue-It system randomizes everyone that had
            joined the queue. Joining the queue after the drop has gone live,
            will place you at the back of the queue. It’s important to note that
            checking out and rejoining the queue will place you at the back of
            the queue.
          </p>
        )
      }
    }
  },
  wallet: {
    id: 'wallet',
    navLabel: 'Wallet',
    shouldHideOnNomp: false,
    title: 'Wallet',
    items: {
      canIUseMyExistingWaxWallet: {
        shouldHideOnNomp: false,
        id: 'can-i-use-my-existing-wax-wallet-on-droppp',
        title: 'Can I use my existing WAX Wallet on Droppp?',
        answer: (
          <p>
            No, you will need to{' '}
            <Link
              href="/auth"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              create
            </Link>{' '}
            a free or custom account on Droppp to use our platform.
          </p>
        )
      },
      addFunds: {
        shouldHideOnNomp: true,
        id: 'how-do-i-add-funds-to-my-droppp-balance',
        title: 'How do I add funds to my Droppp Balance?',
        answer: (
          <>
            <p className="mb-2">
              Adding funds to your Droppp Balance is easy. Transfer USDC from an
              external crypto wallet or buy it from an exchange like Coinbase
              and transfer it to your Droppp Balance.
            </p>
            <p className="mb-2">
              Note that your Droppp Balance, powered by Circle, only supports
              USDC amounts out to two decimal places, so all USDC amounts will
              be rounded down to two decimal places.
            </p>
            <p className="mb-2">
              Remember to verify your identity to be able to use Droppp
              Marketplace features.
            </p>
            <p>
              Watch this tutorial on{' '}
              <a
                href="https://youtu.be/wU93uY2ANek"
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                How to Use USDC on Droppp.
              </a>
            </p>
          </>
        )
      },
      withdrawFunds: {
        shouldHideOnNomp: true,
        id: 'how-do-i-withdraw-funds-from-my-droppp-balance',
        title: 'How do I withdraw funds from my Droppp Balance?',
        answer: (
          <p>
            When you're ready to withdraw your funds from your Droppp Balance,
            click on the WITHDRAW button in your{' '}
            <Link
              href="/wallet"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              Wallet
            </Link>{' '}
            to start the process.
          </p>
        )
      },
      usdcToPurchaseInitialPackSale: {
        shouldHideOnNomp: true,
        id: 'can-i-use-my-usdc-balance-to-purchase-packs-during-an-initial-pack-sale',
        title: 'Can I use my USDC balance to purchase packs during a drop?',
        answer: <p>Not at this time.</p>
      }
    }
  },
  marketplace: {
    id: 'marketplace',
    navLabel: 'Marketplace',
    shouldHideOnNomp: true,
    title: (
      <>
        Droppp <span className="uppercase inline-block">MarketPlace</span>
      </>
    ),
    items: {
      whatisTheMarketplace: {
        id: 'what-is-the-droppp-marketplace',
        title: 'What is Droppp Marketplace?',
        shouldHideOnNomp: true,
        answer: (
          <>
            <p className="mb-2">
              Droppp Marketplace is Droppp’s official secondary marketplace,
              where you can buy, sell, and collect digital collectibles like
              Funko Digital Pop!™ and Droppp Monsters.
            </p>
          </>
        )
      },
      canIListAndSellAnyDigitalCollectibles: {
        id: 'can-i-list-and-sell-any-digital-collectibles',
        title: 'Can I list and sell any digital collectibles?',
        shouldHideOnNomp: true,
        answer: (
          <p>
            Droppp Marketplace is currently limited to only Funko Digital Pop!™
            and other digital collectibles that were initially sold on Droppp,
            such as{' '}
            <Link
              href="/drop/93/droppp-monsters-series-1/"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              Droppp Monsters
            </Link>
            . All other items are currently unsupported. If you transfer any
            unsupported items to Droppp, you will need to{' '}
            <Link
              href="/support"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              contact support
            </Link>{' '}
            in order to transfer your items back to an external wallet.
          </p>
        )
      },
      canIListAndSellADigitalCollectibleDuringAnIntialPackSale: {
        id: 'can-i-list-and-sell-a-digital-collectible-during-an-initial-pack-sale',
        title: 'Can I list and sell a digital collectible during a drop?',
        shouldHideOnNomp: true,
        answer: (
          <p>
            Shortly after a drop starts, you can list its corresponding digital
            collectibles on Droppp Marketplace.
          </p>
        )
      },
      howDoIListAndSellADigitaCollectible: {
        shouldHideOnNomp: true,
        id: 'how-do-i-list-and-sell-a-digital-collectible-on-droppp-marketplace',
        title:
          'How do I list and sell a digital collectible on Droppp Marketplace?',
        answer: (
          <>
            <p className="mb-2">
              Go to your{' '}
              <Link
                href="/inventory"
                className="inline-link"
                rel="noreferrer"
                target="_blank"
              >
                Inventory
              </Link>{' '}
              to begin listing on the marketplace. From there, click any item to
              list it from the detail pane. Review your list price and fee
              breakdowns before confirming it for sale.
            </p>
            <p>
              If you wish to modify or cancel your listing, select the item from
              the{' '}
              <Link
                href="/inventory/?show_only_listings=true"
                className="inline-link"
                rel="noreferrer"
                target="_blank"
              >
                Listings
              </Link>{' '}
              tab in your inventory and adjust accordingly.
            </p>
          </>
        )
      },
      howDoIBuyADigitalCollectibleOnDropppMarketplace: {
        shouldHideOnNomp: true,
        id: 'how-do-i-buy-a-digital-collectible-on-droppp-marketplace',
        title: 'How do I buy a digital collectible on Droppp Marketplace?',
        answer: (
          <p>
            You must be signed in and have enough funds in order buy a digital
            collectible. Click BUY LOWEST LISTING on your favorite collectible
            and it will be reserved for you for 60 seconds. After the
            reservation expires, the listing will return to the open market.
          </p>
        )
      },
      whatIsAListingReservation: {
        shouldHideOnNomp: true,
        id: 'what-is-a-listing-reservation',
        title: 'What is a listing reservation?',
        answer: (
          <p>
            You can reserve a listing for 60 seconds. This is beneficial so
            other users can’t buy a listing out from under you. Once the
            reservation time is up, the listing will be available to other users
            to reserve and buy.
          </p>
        )
      },
      canIReserveMultipleListings: {
        shouldHideOnNomp: true,
        id: 'can-i-reserve-multiple-listings',
        title: 'Can I reserve multiple listings?',
        answer: (
          <p>
            No, only one listing can be reserved at a time. If you try to
            reserve another listing while one is active, the first reservation
            will be canceled.
          </p>
        )
      },
      listingsManagementOnMarketplace: {
        shouldHideOnNomp: true,
        id: 'how-do-i-view-and-manage-my-listings-on-droppp-marketplace',
        title: 'How do I view and manage my listings on Droppp Marketplace?',
        answer: (
          <p>
            Go to the{' '}
            <Link
              href="/inventory/?show_only_listings=true"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              Listings
            </Link>{' '}
            tab in your Inventory from the main navigation menu. From there,
            you’ll be able to view, modify, or cancel your listings.
          </p>
        )
      },
      checkAvailableFunds: {
        shouldHideOnNomp: true,
        id: 'how-do-i-check-my-available-funds',
        title: 'How do I check my available funds?',
        answer: (
          <p>
            Your Droppp Balance is always accessible from the primary navigation
            bar and in your{' '}
            <Link
              href="/wallet"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              Wallet
            </Link>
            .
          </p>
        )
      },
      whatIsUsdc: {
        shouldHideOnNomp: true,
        id: 'what-is-usdc',
        title: 'What is USDC?',
        answer: (
          <>
            <p>
              USDC is a stablecoin that is meant to work like a substitute for a
              U.S. dollar. Currently, Droppp only supports USDC for funding your
              Droppp Balance and making purchases on the marketplace.
            </p>
          </>
        )
      },
      otherPaymentMethods: {
        shouldHideOnNomp: true,
        id: 'does-droppp-support-other-payment-methods',
        title: 'Does Droppp Marketplace support other payment methods?',
        answer: <p>Currently, we only support USDC.</p>
      },
      marketplaceFees: {
        shouldHideOnNomp: true,
        id: 'what-are-the-droppp-marketplace-fees',
        title: 'What are the Droppp Marketplace fees?',
        answer: (
          <>
            <p className="mb-2">
              When your listing sells, a few fees will be collected. These fees
              are:
            </p>
            <ul className="list-disc pl-4 mb-2">
              <li className="mb-2">
                The <b className="text-white">Collection Fee</b> is a royalty
                paid to the original collection for every secondary sale of the
                digital item.
              </li>
              <li className="mb-2">
                The <b className="text-white">Blockchain Fee</b> is payment to
                execute permanent and secure transactions on the blockchain.
                This is FREE on Droppp Marketplace.
              </li>
              <li>
                The <b className="text-white">Marketplace Fee</b> is a selling
                fee that allows us to operate and manage the Droppp Marketplace.
              </li>
            </ul>
            <p className="mb-2">
              These fees will be shown in detail when you list an item.
            </p>
            <p>
              When you withdraw USDC from your Droppp Balance to an external
              wallet, you are subject to a{' '}
              <b className="text-white">Withdrawal Fee</b>. This fee fluctuates
              based on applicable current network fees and will be displayed at
              the time of the withdrawal.{' '}
            </p>
          </>
        )
      },
      usdcWithoutDropppWalletAddress: {
        shouldHideOnNomp: true,
        id: 'can-i-add-usdc-funds-without-a-droppp-wallet-address',
        title: 'Can I add USDC funds without a Droppp Wallet Address?',
        answer: (
          <p>
            Yes. Once your identity is verified, you may add USDC to your Droppp
            Balance. A basic Droppp Wallet Address will be granted to you once
            you deposit at least 5 USDC. To get an address sooner, you can{' '}
            <Link
              href="/wallet"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              upgrade
            </Link>{' '}
            to a custom Droppp Address.
          </p>
        )
      },
      whyIdentityVerification: {
        shouldHideOnNomp: true,
        id: 'why-do-i-have-to-verify-my-identity',
        title: 'Why do I have to verify my identity?',
        answer: (
          <>
            <p className="mb-2">
              In order to comply with U.S. regulations, you must verify your
              identity in order to participate in Droppp Marketplace. If you do
              not verify your identity, you will not be able to access and use
              Droppp Marketplace.
            </p>
            <p>
              Initiating the verification process only takes about 10 minutes
              and will require a valid photo I.D. (region restrictions apply).
            </p>
          </>
        )
      },
      regionRestrictions: {
        shouldHideOnNomp: true,
        id: 'what-are-the-droppp-marketplace-region-restrictions',
        title: 'What are the Droppp Marketplace region restrictions?',
        answer: (
          <>
            <p className="mb-2">
              The following countries are fully restricted and cannot
              participate in Droppp Marketplace: Central African Republic (the),
              Congo (the Democratic Republic of the), Cuba, Guinea-Bissau, Iran
              (Islamic Republic of), Iraq, Korea (the Democratic People's
              Republic of), Libya, Mali, Myanmar, Russia, Somalia, South Sudan,
              Sudan (the), Syrian Arab Republic, Ukraine, Venezuela (Bolivarian
              Republic of), and Yemen.
            </p>
            <p className="mb-2">
              Due to current regulations, the following US states are restricted
              at this time and cannot participate in Droppp Marketplace: Alaska,
              Hawaii, Minnesota, and New York. These restrictions do not apply
              to drops.
            </p>
            <p>An announcement will be made when new regions are supported.</p>
          </>
        )
      },
      howDoIVerifyMyIdentity: {
        shouldHideOnNomp: true,
        id: 'how-do-i-verify-my-identity',
        title: 'How do I verify my identity?',
        answer: (
          <p>
            To verify your identity, go to your Wallet page and click on Verify
            Identity. You will confirm your location and be redirected to our
            third-party identity verification provider, Persona, to complete
            your verification process. Initiating the verification process only
            takes about 10 minutes and will require a valid photo I.D.
          </p>
        )
      },
      identityVerificationStatus: {
        shouldHideOnNomp: true,
        id: 'i-am-waiting-for-my-id-verification-to-be-approved-how-do-i-check-on-the-status',
        title:
          'I am waiting for my I.D. verification to be approved. How do I checkon the status?',
        answer: (
          <p>
            You will receive an email with your verification results once your
            identity has been reviewed.
          </p>
        )
      }
    }
  },
  redemptions: {
    shouldHideOnNomp: false,
    id: 'redemptions',
    navLabel: 'Redemptions',
    title: 'Redemptions',
    items: {
      howDoRedemptionTokensWork: {
        shouldHideOnNomp: false,
        id: 'what-are-redemption-tokens-and-how-do-they-work',
        title: 'What are redemption tokens and how do they work?',
        answer: (
          <>
            <p className="mb-2">
              Redemption Tokens are digital collectibles that are used to redeem
              for a physical collectible corresponding to the Mythic, Grail,
              Legendary, Ultra, and/or Royalty Set(s) for any given collection
              held in your inventory.
            </p>
            <p>
              Redemption Tokens are delivered to your inventory after a
              redemption snapshot occurs. To redeem a token, visit the{' '}
              <Link
                target="_blank"
                href="/redemptions/"
                className="inline-link"
                rel="noreferrer"
              >
                Redemptions
              </Link>{' '}
              page to claim your physical collectible before the Redemption
              window ends.
            </p>
          </>
        )
      },
      whatAreCollectionSnapshots: {
        shouldHideOnNomp: false,
        id: 'what-are-redemption-snapshots-and-when-are-they-taken',
        title: 'What are redemption snapshots and when are they taken?',
        answer: (
          <>
            <p className="mb-2">
              A redemption snapshot gives us the ability to see a complete list
              of all accounts at a given time that hold specific digital
              collectibles for a particular drop.
            </p>
            <p className="mb-2">
              We take a snapshot to find out which accounts hold a Mythic,
              Grail, Legendary, Ultra, and/or Royalty Set(s) so that we may then
              send Redemption Tokens to those owners.
            </p>
            <p>
              Snapshots are taken at exactly 11AM PT on the snapshot date
              provided on the drop page. We advise not opening packs or
              transferring items for at least one hour before or after the
              snapshot time to be certain they are included in the snapshot.
            </p>
          </>
        )
      },
      doYouNeedToHoldYourAssetsExclusivelyInDropppToReceiveARedemptionToken: {
        shouldHideOnNomp: false,
        id: 'do-you-need-to-hold-your-grail-legendary-or-royalty-set-exclusively-in-your-droppp-account-to-receive-a-redemption-token',
        title:
          'Do you need to hold your Mythic, Grail, Legendary, Ultra, or Royalty Set(s) exclusively in your Droppp account to receive a Redemption Token?',
        answer: (
          <p>
            When we take snapshots, any WAX Blockchain wallet that holds the
            Mythic, Grail, Legendary, Ultra, or Royalty Set(s) will receive a
            Redemption Token.{' '}
            <b className="text-white">
              It’s important to note you must hold all Royalty Set items in the
              same wallet/account to be rewarded with a Royalty Redemption Token
            </b>
            .
          </p>
        )
      },
      whatIsARoyaltySet: {
        shouldHideOnNomp: false,
        id: 'what-is-a-royalty-set',
        title: 'What is a Royalty Set?',
        answer: (
          <p>
            A Royalty Set is every single digital collectible that includes
            Common, Uncommon, Rare and Epic rarities of a specific collection.
            You can use the{' '}
            <Link
              href="/collection-tracker"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              Collection Tracker
            </Link>{' '}
            to help assist you in completing your Royalty Set(s).
          </p>
        )
      },
      whatDoDiamondsMean: {
        shouldHideOnNomp: false,
        id: 'what-do-the-diamonds-mean',
        title: 'What do the Diamonds mean?',
        answer: (
          <div>
            Diamonds <Icon name="diamond" className="inline text-white" />{' '}
            indicate that a particular digital collectible will be redeemable
            for a physical item. As long as you hold this digital collectible
            when the{' '}
            <Link
              href="/faq?question=what-are-redemption-snapshots-and-when-are-they-taken"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              snapshot
            </Link>{' '}
            is taken, you will receive a Redemption Token that can be redeemed
            for a physical collectible.
          </div>
        )
      },
      howCanIGetAPhysicalCollectible: {
        shouldHideOnNomp: false,
        id: 'how-can-i-get-a-physical-collectible',
        title: 'How can I get a physical collectible?',
        answer: (
          <p>
            With most Funko Digital Pop!™ drops you have the opportunity to
            collect a physical collectible. By collecting digital collectibles
            of certain rarities (including Mythic, Grail, Legendary, Ultra, or
            completing a full Royalty Set), you will receive a Redemption
            Token(s) that can be redeemed for a physical item.
          </p>
        )
      },
      redemptionCollectionEligibility: {
        shouldHideOnNomp: true,
        id: 'how-do-i-know-if-the-digital-collectible-i-would-like-to-purchase-will-be-eligible-for-a-redemption-token-and-then-a-physical-collectible',
        title:
          'How do I know if the digital collectible I would like to purchase will be eligible for a Redemption Token and then a physical collectible?',
        answer: (
          <div>
            <span>
              Keep an eye out for a diamond next to a rarity badge like{' '}
            </span>
            <RarityBadge
              rarity={RARITY_TYPES.Legendary}
              className="inline"
              redeemable={true}
            />
            <span>. If you see a diamond </span>
            <Icon name="diamond" className="inline text-white" />
            <span>
              , this means the digital collectible is still eligible for a
              Redemption Token which can later be redeemed for a physical
              collectible.
            </span>
          </div>
        )
      },
      redemptionTokenEligibility: {
        shouldHideOnNomp: true,
        id: 'how-do-i-know-if-the-redemption-token-i-would-like-to-purchase-will-be-eligible-to-redeem-for-a-physical-collectible',
        title:
          'How do I know if the Redemption Token I would like to purchase will be eligible to redeem for a physical collectible?',
        answer: (
          <div>
            <div className="mb-2">
              <span>The Redemption Token will have a redeemable badge </span>
              <RarityBadge
                rarity={RARITY_TYPES.Redeemable}
                className="inline text-white"
                redeemable={true}
              />
              .{' '}
              <span>
                If you see this, it indicates that the token can be redeemed for
                a physical collectible.
              </span>
            </div>
            <div>
              <span>
                Otherwise, the Redemption Token will show an expired badge{' '}
              </span>
              <RarityBadge
                rarity={RARITY_TYPES.Redeemable}
                className="inline"
                redeemable={false}
              />
              <span>
                {' '}
                which indicates that it is no longer eligible to be redeemed for
                a physical collectible. Droppp Marketplace will warn you if
                you're trying to purchase a Redemption Token that is expired.
              </span>
            </div>
          </div>
        )
      },
      physicalCollectibleRedemption: {
        shouldHideOnNomp: false,
        id: 'do-i-need-to-transfer-my-redemption-token-to-droppp-in-order-to-redeem-for-the-physical-collectible',
        title:
          'Do I need to transfer my Redemption Token to Droppp in order to redeem for the physical collectible?',
        answer: (
          <p>
            If you collect exclusively on Droppp, your Redemption Token will be
            automatically available in your inventory after the snapshot. If you
            received a Redemption Token in an external wallet, you must transfer
            it to Droppp and redeem the token for the respective physical
            collectible before the Redemption Token expires.
          </p>
        )
      },
      redemptionExpiration: {
        shouldHideOnNomp: false,
        id: 'do-redemption-tokens-expire',
        title: 'Do redemption tokens expire?',
        answer: (
          <p>
            Yes, Redemption Tokens expire 30 days after the Tokens drop
            following a snapshot.{' '}
            <b className="text-white">
              Once Redemption Tokens expire, they are no longer eligible to
              redeem for a physical collectible.
            </b>{' '}
            Redemption Tokens will remain in your wallet unless you sell or
            transfer them. Keep track of all current and upcoming Redemptions on
            the{' '}
            <Link
              href="/redemptions"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              Redemptions
            </Link>{' '}
            page.
          </p>
        )
      },
      redemptionUVPremium: {
        shouldHideOnNomp: false,
        id: 'are-uv-premium-pop-protectors-availble-for-purchase-when-redeeming-redemption-tokens-on-droppp',
        title:
          'Are UV Premium Pop! Protectors available for purchase when redeeming Redemption Tokens on Droppp?',
        answer: (
          <p>
            Yes, UV Premium Pop! Protectors are available for purchase when
            redeeming Redemption Tokens on Droppp. The optional UV Premium Pop!
            Protectors cost $8 per Pop! and are only available for standard size
            Pop! (4" size Pop!). UV Premium Pop! Protectors are not available
            for Pop! Deluxe (6" size Pop!) and larger items. We are unable to
            add protectors once your redemption order is complete.
          </p>
        )
      }
    }
  },
  shipping: {
    shouldHideOnNomp: false,
    navLabel: 'Shipping',
    id: 'shipping',
    title: 'Shipping',
    items: {
      fees: {
        shouldHideOnNomp: false,
        id: 'do-i-have-to-pay-shipping-fees',
        title: 'Do I have to pay shipping fees?',
        answer: (
          <p>
            Shipping costs will apply for both U.S. and international orders.
            Orders will be charged at a flat rate per individual item for both
            U.S. domestic and international orders. For Funko Digital Pop!™
            Redemptions, orders of 1 item or more qualify for a $5 USD shipping
            discount per Pop! Discount will be applied at check out.
          </p>
        )
      },
      shippingTimeline: {
        shouldHideOnNomp: false,
        id: 'how-long-will-it-take-to-receive-my-physical-collectible',
        title: 'How long will it take to receive my physical collectible?',
        answer: (
          <p>
            Check the important dates section at the bottom of the drop landing
            page on{' '}
            <a
              href="https://digital.funko.com/"
              className="inline-link"
              rel="noreferrer"
              target="_blank"
            >
              digital.funko.com
            </a>{' '}
            for the estimated shipping quarter. Shipping dates are subject to
            change based on global shipping and port delays.
          </p>
        )
      },
      noTrackingUpdates: {
        shouldHideOnNomp: false,
        id: 'why-am-i-not-seeing-any-tracking-updates-on-my-physical-collectible-order',
        title:
          'Why am I not seeing any tracking updates on my physical collectible order?',
        answer: (
          <p>
            Tracking updates typically start appearing within 2-3 business days
            from the time you receive your shipment confirmation email, though
            in some cases it may take up to 5 business days. If by this time you
            do not see updates, contact{' '}
            <a href="mailto:support@droppp.io" className="inline-link">
              support@droppp.io
            </a>
            .
          </p>
        )
      },
      physicalCollectibleQuestions: {
        shouldHideOnNomp: false,
        id: 'i-have-question-about-my-physical-collectible-order-who-should-i-reach-out-to',
        title:
          'I have questions about my physical collectible order–who should I reach out to?',
        answer: (
          <p>
            For questions related to your physical collectible order, contact
            Droppp Support at{' '}
            <a href="mailto:support@droppp.io" className="inline-link">
              support@droppp.io
            </a>
            .
          </p>
        )
      }
    }
  },
  misc: {
    id: 'misc',
    navLabel: 'Miscellaneous',
    shouldHideOnNomp: false,
    title: 'MISCELLANEOUS',
    items: {
      purchaseRamOrCpu: {
        id: 'do-i-need-to-buy-or-stake-resources-like-ram-or-cpu-to-use-my-droppp-account',
        title:
          'Do I need to buy or stake resources like RAM or CPU to use my Droppp account?',
        answer: (
          <p>
            No, all WAX blockchain resources are completely managed by Droppp
            for your benefit.
          </p>
        )
      },
      canITransferToSellElsewhere: {
        shouldHideOnNomp: false,
        id: 'can-i-transfer-items-out-of-droppp-to-sell-on-other-marketplaces',
        title:
          'Can I transfer items out of Droppp to sell on other marketplaces?',
        answer: (
          <p>
            <span>
              Yes, you can transfer items to other wallets on the WAX blockchain
              from your Droppp account to sell on other marketplaces.
            </span>{' '}
            {/* <span className="text-alert">
              Please keep in mind any “Droppp Exclusive” assets can only be
              transferred to other Droppp accounts.
            </span> */}
          </p>
        )
      }
    }
  }
}

export default FAQ_QUESTIONS

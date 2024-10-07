import Link from 'next/link'

export const Content = {
  title: 'Unsupported Pack',
  image: {
    path: 'global/modals/',
    id: 'unsupported-pack',
    alt: 'header image',
    width: 480,
    height: 300,
    className: 'aspect-[16/10]'
  },
  body: (
    <div className="flex flex-col gap-2 modal-copy">
      <p>
        This is a pack that was created before Droppp. Unfortunately, the pack
        cannot be opened on our site.
      </p>
      <p className="text-white">Don’t worry you can still open it.</p>
      <ol className="list-decimal pl-3">
        <li>
          Transfer this to a WAX-based wallet outside of Droppp like the{' '}
          <Link
            href="https://www.mycloudwallet.com"
            className="inline-link"
            target="_blank"
          >
            WAX Cloud Wallet
          </Link>
          .
        </li>
        <li>Open the pack by navigating to the Legacy Pack Drop Site.</li>
        <li>Transfer the new NFTs back to your Droppp account.</li>
      </ol>
    </div>
  )
}

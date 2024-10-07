export type ModalId = (typeof MODAL_ID)[keyof typeof MODAL_ID]

export const MODAL_ID = {
  accountLocked: 'accountLocked',
  boolean: 'boolean',
  confirm: 'confirm',
  transfer: {
    review: 'transferReview',
    confirm: 'transferConfirm',
    transferableAssets: 'transferableAssets',
    nonTransferableAssets: 'nonTransferableAssets'
  },
  redemption: {
    redemptionTokens: 'redemptionTokens',
    summary: {
      default: 'redemptionSummary',
      cart: 'redemptionCartSummary'
    }
  },
  marketplace: {
    publishCatalogItem: 'publishCatalogItem',
    productBuy: 'productBuy',
    listItem: 'listItem',
    mintListings: 'mintListings',
    salesHistory: 'salesHistory'
  },
  wallet: {
    customWaxAddress: 'customWaxAddress',
    newWalletAlert: 'newWalletAlert',
    waxPurchaseSuccess: 'waxPurchaseSuccess',
    addFunds: 'addFunds',
    withdrawFunds: 'withdrawFunds'
  },
  howMonsterPromoWorks: 'howMonsterPromoWorks',
  openingSoon: 'openingSoon',
  changeEmail: 'changeEmail',
  success: 'success',
  changePassword: 'changePassword',
  subscribeNewsletter: 'subscribeNewsletter',
  editShipping: 'editShipping',
  addressWarning: 'addressWarning',
  addressSuggestion: 'addressSuggestion',
  identityVerificationGate: 'identityVerificationGate',
  unsupportedRegion: 'unsupportedRegion',
  twoFA: 'twoFA',
  enable2FA: 'enable2FA',
  disable2FA: 'disable2FA',
  challenge: 'challenge',
  queueItModal: 'queueItModal',
  otherMarketplaceOptions: 'otherMarketplaceOptions',
  minimumDepositNotMet: 'minimumDepositNotMet',
  verifyIdentity: 'verifyIdentity',
  inventoryPreview: 'inventoryPreview',
  claimSuccess: 'claimSuccess',
  unsupportedPackOpen: 'unsupportedPackOpen',
  consumerRightsRequest: 'consumerRightsRequest',
  howItWorks: 'howItWorks',
  sortOptions: 'sortOptions',
  notifyMe: 'notifyMe',

  devOnly: {
    dropSettings: 'dropSettings'
  }
}

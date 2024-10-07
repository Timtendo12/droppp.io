export enum VerifyType {
  List = 'List',
  AddFunds = 'AddFunds',
  Purchase = 'Purchase'
}

const partials = {
  title: 'Verify your identity',
  body: "Before you can start listing items, adding or withdrawing funds, and making purchases on the Droppp Marketplace, you'll need to verify your identity. This process is quick and easy and requires only a photo I.D. and a few minutes of your time."
}

export const VerifyTitle = {
  [VerifyType.List]: `${partials.title} to list`,
  [VerifyType.AddFunds]: `${partials.title} to add funds`,
  [VerifyType.Purchase]: `${partials.title} to make a purchase`
}

export const VerifyBody = partials.body

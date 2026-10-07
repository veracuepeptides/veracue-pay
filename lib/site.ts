// Single source of truth for who VeracuePay is and what it says about itself. VeracuePay is a
// hosted payment page used by many independent businesses. Every checkout names the business
// being paid, so nothing here is specific to any one of them.

export const SITE = {
  name: 'VeracuePay',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://veracuepay.com',
  // The registered business that operates VeracuePay (the Stripe Connect platform).
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || 'VeracuePay',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@veracuepay.com',
  businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'merchants@veracuepay.com',
} as const;

export const STEPS = [
  {
    tag: 'Step one',
    title: 'Check out',
    body: 'Build your order on the business’s own website and continue to payment. Your total, shipping included, is fixed the moment the order is created.',
  },
  {
    tag: 'Step two',
    title: 'Pay here',
    body: 'You arrive with a one-time payment reference and the name of the business you are paying. Choose a card or a wallet and complete any verification your bank asks for.',
  },
  {
    tag: 'Step three',
    title: 'Back to the shop',
    body: 'Once the payment clears you are sent straight back to the business with your confirmation. Their order email follows.',
  },
] as const;

export const SECURITY_POINTS = [
  {
    title: 'Card data stays with Stripe',
    tag: 'PCI DSS Level 1 provider',
    body: 'The card fields you type into are served by Stripe in a secure frame. The number never passes through our own servers, or the business’s.',
  },
  {
    title: 'Your bank can step in',
    tag: '3-D Secure supported',
    body: 'Extra verification runs whenever your card issuer asks for it, so a stolen card number alone is not enough.',
  },
  {
    title: 'The amount can’t be edited',
    tag: 'Set by the order',
    body: 'The business’s server sets the total when your order is created. Nothing in the page address or in your browser can change what you are charged.',
  },
  {
    title: 'Only verified businesses',
    tag: 'Registered merchants',
    body: 'Every business is registered and verified before it can take a payment, and you can only ever be returned to that business’s own website.',
  },
] as const;

export const BUSINESS_POINTS = [
  {
    title: 'Your own Stripe account',
    body: 'Each business is onboarded and verified on its own account. Payments settle to you, not to us.',
  },
  {
    title: 'Your name on every payment',
    body: 'Customers see your business name on the checkout page and your descriptor on their statement.',
  },
  {
    title: 'Three calls to integrate',
    body: 'Create the payment, redirect the customer, verify the result. Webhooks cover the cases where the browser never comes back.',
  },
] as const;

export const TROUBLESHOOTING = [
  {
    problem: 'My card was declined',
    answer:
      'Banks decline for plenty of reasons, and an unfamiliar online merchant is a common one. Try a different card, or ask your bank to approve the charge, then retry from the same payment link.',
  },
  {
    problem: 'I was charged but saw no confirmation',
    answer:
      'Give it a few minutes and check your inbox and spam folder. A pending hold can appear on your statement before the order is confirmed. If nothing arrives, contact the business you paid with your order number.',
  },
  {
    problem: 'I think I paid twice',
    answer:
      'Contact the business you paid with your order number, or email us and we will help trace it. A duplicate charge is theirs to refund, and we will work with them to get it done.',
  },
  {
    problem: 'I need a refund',
    answer:
      'Refunds follow the policy of the business you bought from, and go back to the original payment method. Banks usually need several business days to show the credit.',
  },
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is VeracuePay a shop?',
    answer: `No. It is a hosted payment page, operated by ${SITE.legalName}, that independent businesses use to take card payments. It does not sell anything itself.`,
  },
  {
    question: 'Who exactly am I paying?',
    answer:
      'The business named at the top of the payment page, and the same name appears on your order summary. If a payment page does not clearly name a business, do not pay and contact us.',
  },
  {
    question: 'Why did checkout send me to another address?',
    answer:
      'Card entry lives on its own page so it is kept apart from the shop. It is the same reason most online stores hand off to a dedicated payment screen.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No. Everything here is tied to the order you just placed. There is nothing to sign up for and nothing to remember afterwards.',
  },
  {
    question: 'Which payment methods can I use?',
    answer:
      'The available options appear on the payment page itself. Cards are supported, and wallets such as Apple Pay or Google Pay show up when your device and bank support them.',
  },
  {
    question: 'Do you keep my card details?',
    answer:
      'No. They are entered into Stripe’s secure fields and handled by Stripe. Neither we nor the business ever see the full number.',
  },
  {
    question: 'Can I change my order from here?',
    answer:
      'Not on this page. Your total is fixed when the order is created. If something needs to change, go back to the business’s website and start the order again.',
  },
  {
    question: 'My payment link says it is unavailable',
    answer:
      'Each link belongs to a single order and stops working once that order is paid or cancelled. Return to the business and begin checkout again, or contact support if you think it is a mistake.',
  },
];

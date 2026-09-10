export type PaymentCategory =
  | 'all'
  | 'pakistan'
  | 'cards'
  | 'wallets'
  | 'middle-east'
  | 'wire-swift'
  | 'remittance'
  | 'crypto';

export interface PaymentMethodItem {
  id: string;
  name: string;
  urduName: string;
  category: 'pakistan' | 'cards' | 'wallets' | 'middle-east' | 'wire-swift' | 'remittance' | 'crypto';
  badge: string;
  tagline: string;
  logoType: string;
  color: string;
  popular?: boolean;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
    type: 'text' | 'tel' | 'number' | 'select' | 'email';
    required: boolean;
    helperText?: string;
  }>;
  instructions: string[];
  accountDetails?: Record<string, string>;
  supportedCurrencies: string[];
}

export interface FeePurposeOption {
  id: string;
  label: string;
  urduLabel: string;
  defaultPkr: number;
  defaultUsd: number;
  category: string;
}

export const FEE_PURPOSES: FeePurposeOption[] = [
  {
    id: 'degree-semester',
    label: 'Degree Semester Tuition Fee (BS / MS / MPhil / PhD)',
    urduLabel: 'ڈگری سمسٹر ٹیوشن فیس (BS / MS / PhD)',
    defaultPkr: 95000,
    defaultUsd: 340,
    category: 'Tuition'
  },
  {
    id: 'diploma-full',
    label: "Professional Diploma Total Fee (1-Year & 2-Year Programs)",
    urduLabel: 'پروفیشنل ڈپلوما کورس کی مکمل فیس',
    defaultPkr: 45000,
    defaultUsd: 160,
    category: 'Tuition'
  },
  {
    id: 'admission-processing',
    label: 'New Admission Application & Prospectus Fee',
    urduLabel: 'نئے داخلے کا پراسپیکٹس و پراسیسنگ فیس',
    defaultPkr: 2500,
    defaultUsd: 15,
    category: 'Admissions'
  },
  {
    id: 'verification-fee',
    label: 'Online Credential & Degree Verification Clearance Fee',
    urduLabel: 'آن لائن ڈگری تصدیق و تصدیقی فیس',
    defaultPkr: 1500,
    defaultUsd: 10,
    category: 'Verification'
  },
  {
    id: 'exam-fee',
    label: 'Semester Examination & Final Transcript Fee',
    urduLabel: 'سمسٹر امتحانی فیس و آفیشل ٹرانسکرپٹ',
    defaultPkr: 3500,
    defaultUsd: 25,
    category: 'Examinations'
  },
  {
    id: 'hostel-security',
    label: 'Student Hostel Admission & Security Deposit',
    urduLabel: 'ہاسٹل داخلہ فیس و سیکیورٹی ڈپازٹ',
    defaultPkr: 18000,
    defaultUsd: 65,
    category: 'Hostel'
  },
  {
    id: 'international-equivalence',
    label: 'International Student Equivalence & HEC/IBCC Attestation',
    urduLabel: 'انٹرنیشنل سٹوڈنٹ ایکویلنس و تصدیق',
    defaultPkr: 28000,
    defaultUsd: 100,
    category: 'International'
  },
  {
    id: 'custom-amount',
    label: 'Custom Amount / Scholarship Installment / Partial Payment',
    urduLabel: 'اپنی مرضی کی رقم / بقایا اقساط',
    defaultPkr: 10000,
    defaultUsd: 50,
    category: 'Custom'
  }
];

export const PAYMENT_METHODS: PaymentMethodItem[] = [
  // 1. JazzCash
  {
    id: 'jazzcash',
    name: 'JazzCash Mobile Account & Retail OTC',
    urduName: 'جاز کیش موبائل اکاؤنٹ و ایجنٹ شاپ',
    category: 'pakistan',
    badge: 'Pakistan #1 Wallet',
    tagline: 'Instant Zero-Fee Mobile Account Debit & 120,000+ Retail Shops',
    logoType: 'jazzcash',
    color: '#E11D48',
    popular: true,
    supportedCurrencies: ['PKR'],
    fields: [
      {
        id: 'mobileNumber',
        label: 'JazzCash Registered Mobile Number',
        placeholder: '0300-1234567',
        type: 'tel',
        required: true,
        helperText: 'You will receive an instant MPIN prompt on your mobile screen'
      },
      {
        id: 'cnicLast6',
        label: 'Sender CNIC Last 6 Digits (Optional)',
        placeholder: '123456',
        type: 'number',
        required: false,
        helperText: 'Required if paying via biometric retail agent shop'
      }
    ],
    accountDetails: {
      'Official Merchant Till ID': '984521',
      'Merchant Mobile Number': '0344-7956085',
      'Account Title': 'ZAITOON ROOTS ACADEMY',
      'Processing Fee': '0% (Completely Free)'
    },
    instructions: [
      'Enter your registered JazzCash mobile number below.',
      'Click "Authorize & Pay". You will receive an instant flash prompt on your mobile handset asking for your 4-digit MPIN.',
      'Enter your MPIN to authorize. Your official ZRA fee receipt will be instantly generated.',
      'Or visit any JazzCash retailer and deposit against Merchant Till ID: 984521.'
    ]
  },

  // 2. EasyPaisa
  {
    id: 'easypaisa',
    name: 'EasyPaisa Wallet & QR Payment',
    urduName: 'ایزی پیسہ اکاؤنٹ و کیو آر کوڈ',
    category: 'pakistan',
    badge: 'Instant Transfer',
    tagline: 'Pay via EasyPaisa App, USSD *786# or 150,000+ EasyPaisa Outlets',
    logoType: 'easypaisa',
    color: '#10B981',
    popular: true,
    supportedCurrencies: ['PKR'],
    fields: [
      {
        id: 'mobileNumber',
        label: 'EasyPaisa Mobile Number',
        placeholder: '0345-1234567',
        type: 'tel',
        required: true,
        helperText: 'Check your EasyPaisa app notification to approve payment'
      },
      {
        id: 'accountTitle',
        label: 'Account Holder Name',
        placeholder: 'Muhammad Ali',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Merchant Till ID': '652190',
      'Account Number': '0344-7956085',
      'Account Title': 'ZAITOON ROOTS ACADEMY',
      'Channel': 'EasyPaisa Merchant Direct'
    },
    instructions: [
      'Enter your active EasyPaisa number and account title.',
      'You will receive an in-app approval notification or SMS token.',
      'Approve the payment inside your EasyPaisa application.',
      'For over-the-counter payments, provide Merchant Till ID 652190 at any EasyPaisa shop.'
    ]
  },

  // 3. Raast Instant Payment (State Bank of Pakistan)
  {
    id: 'raast',
    name: 'Raast (State Bank of Pakistan Instant P2M / P2P)',
    urduName: 'راست فوری ادائیگی (اسٹیٹ بینک آف پاکستان)',
    category: 'pakistan',
    badge: 'SBP Zero-Fee',
    tagline: 'Instant settlement via Raast ID or IBAN from any Pakistani Bank',
    logoType: 'raast',
    color: '#0284C7',
    popular: true,
    supportedCurrencies: ['PKR'],
    fields: [
      {
        id: 'senderRaastId',
        label: 'Sender Mobile Number / Raast ID',
        placeholder: '03001234567',
        type: 'tel',
        required: true,
        helperText: 'Your registered Raast phone number or bank IBAN'
      },
      {
        id: 'senderBank',
        label: 'Remitting Bank Name',
        placeholder: 'Meezan Bank, HBL, Bank Alfalah...',
        type: 'text',
        required: true
      },
      {
        id: 'raastRef',
        label: 'Raast 12-Digit Reference No.',
        placeholder: 'RST-987654321012',
        type: 'text',
        required: true,
        helperText: 'From your bank app successful transfer screen'
      }
    ],
    accountDetails: {
      'Raast ID (Phone)': '03447956085',
      'Raast Alias': 'RAAST-ZRA-EDU',
      'Beneficiary IBAN': 'PK82MEZN0001020104789521',
      'Bank': 'Meezan Bank Limited',
      'Account Title': 'ZAITOON ROOTS ACADEMY'
    },
    instructions: [
      'Open any Pakistani banking app (HBL, Meezan, UBL, Alfalah, Standard Chartered, etc.).',
      'Select "Raast Transfer" and enter Raast ID: 03447956085 (or Beneficiary IBAN).',
      'Verify account title displays "ZAITOON ROOTS ACADEMY" and transfer the exact fee.',
      'Copy the 12-digit Raast Reference Number and paste it below to confirm.'
    ]
  },

  // 4. Credit & Debit Cards (Visa / Mastercard / Amex / UnionPay)
  {
    id: 'card',
    name: 'Visa, Mastercard & American Express (Global Cards)',
    urduName: 'کریڈٹ کارڈ و ڈیبٹ کارڈ (ویزہ، ماسٹر کارڈ، ایمیکس)',
    category: 'cards',
    badge: 'Worldwide 3D Secure',
    tagline: 'International & Domestic Credit / Debit Cards with 256-bit SSL Encryption',
    logoType: 'cards',
    color: '#4F46E5',
    popular: true,
    supportedCurrencies: ['USD', 'PKR', 'AED', 'SAR', 'GBP', 'EUR'],
    fields: [
      {
        id: 'cardNumber',
        label: '16-Digit Card Number',
        placeholder: '4532 •••• •••• 8912',
        type: 'text',
        required: true,
        helperText: 'Visa, MasterCard, Amex, UnionPay accepted'
      },
      {
        id: 'cardholderName',
        label: 'Cardholder Full Name',
        placeholder: 'As on front of the card',
        type: 'text',
        required: true
      },
      {
        id: 'cardExpiry',
        label: 'Expiry Date (MM/YY)',
        placeholder: '08/29',
        type: 'text',
        required: true
      },
      {
        id: 'cardCvv',
        label: 'CVV / Security Code',
        placeholder: '123',
        type: 'number',
        required: true,
        helperText: '3 or 4 digits on back of your card'
      }
    ],
    accountDetails: {
      'Payment Gateway': 'Verified by Visa & MasterCard Identity Check',
      'Encryption': '256-Bit Military Grade SSL',
      'Currencies Accepted': 'PKR, USD, GBP, EUR, AED, SAR, CAD, AUD'
    },
    instructions: [
      'Enter your 16-digit debit or credit card number and details.',
      'Your issuing bank will prompt for a 3D-Secure One-Time Password (OTP) via SMS or mobile app.',
      'Once verified, your payment is processed immediately and your fee receipt is released.'
    ]
  },

  // 5. 1Bill & Kuickpay (1Link - 30+ Banks & ATMs)
  {
    id: '1bill',
    name: '1Bill & Kuickpay (30+ Pakistani Banks & ATMs)',
    urduName: 'ون بل و کوئیک پے (تمام بینکس و اے ٹی ایمز)',
    category: 'pakistan',
    badge: '1Link Official',
    tagline: 'Pay using 1Bill Consumer PSID Number via ANY Internet Banking or ATM',
    logoType: '1bill',
    color: '#059669',
    supportedCurrencies: ['PKR'],
    fields: [
      {
        id: 'consumerPsid',
        label: 'Generated 1Bill PSID / Consumer No.',
        placeholder: '1004859012345678',
        type: 'text',
        required: true,
        helperText: 'Select "Bill Payment > 1Bill / Kuickpay" in your bank app'
      },
      {
        id: 'bankName',
        label: 'Your Bank Name Used',
        placeholder: 'MCB, Allied Bank, Faysal Bank, Askari...',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      '1Bill Biller ID': '100485 (Zaitoon Roots Academy)',
      'Institution Code': 'ZRA-EDU-01',
      'Supported Channels': 'All 38 1Link Banks, ATMs, Internet Banking & OTC'
    },
    instructions: [
      'Log in to any Pakistani mobile banking app (HBL, Alfalah, Meezan, MCB, UBL, etc.).',
      'Go to "Bill Payment" > "1Bill / 1Link Invoices".',
      'Enter the Biller Code 100485 followed by your Student Application ID.',
      'The exact fee will appear automatically. Confirm payment.'
    ]
  },

  // 6. Direct Bank Transfer (IBFT) & Branch Challan
  {
    id: 'bank-transfer',
    name: 'Direct Bank Wire (Meezan, HBL, UBL) & Bank Challan',
    urduName: 'براہ راست بینک ٹرانسفر و آفیشل بینک چالان',
    category: 'pakistan',
    badge: 'Official 4-Copy Challan',
    tagline: 'Deposit cash at any branch across Pakistan or transfer via online IBFT',
    logoType: 'bank',
    color: '#B91C1C',
    popular: true,
    supportedCurrencies: ['PKR'],
    fields: [
      {
        id: 'transactionId',
        label: 'Bank Transaction ID / Deposit Slip No.',
        placeholder: 'FT26090812345678',
        type: 'text',
        required: true,
        helperText: 'Found on your paper deposit slip or banking app receipt'
      },
      {
        id: 'depositBranch',
        label: 'Bank Name & Branch Name/City',
        placeholder: 'Meezan Bank Blue Area, Islamabad',
        type: 'text',
        required: true
      },
      {
        id: 'paymentDate',
        label: 'Date of Payment',
        placeholder: 'YYYY-MM-DD',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Bank 1 (Islamic)': 'Meezan Bank Limited',
      'Meezan Account Title': 'ZAITOON ROOTS ACADEMY (PVT) LTD',
      'Meezan Acc No': '0102-0104789521',
      'Meezan IBAN': 'PK82MEZN0001020104789521',
      'Bank 2 (Commercial)': 'Habib Bank Limited (HBL)',
      'HBL Acc No': '0042-7991823103',
      'HBL IBAN': 'PK64HABB0000427991823103'
    },
    instructions: [
      'Transfer via online banking (IBFT) or download the 4-Copy Bank Challan.',
      'Deposit cash or cheque at any Meezan Bank, HBL, or UBL branch in Pakistan.',
      'Upload a clear picture of your stamped deposit slip or screenshot of your IBFT.',
      'Verification department matches transaction within 30 minutes.'
    ]
  },

  // 7. PayPal (Global Students)
  {
    id: 'paypal',
    name: 'PayPal (Global International Student Checkout)',
    urduName: 'پے پال (عالمی طلباء کے لیے)',
    category: 'wallets',
    badge: 'Global Students',
    tagline: 'Secure checkout with PayPal balance, linked bank account, or PayPal credit',
    logoType: 'paypal',
    color: '#0070BA',
    popular: true,
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
    fields: [
      {
        id: 'paypalEmail',
        label: 'Your PayPal Account Email',
        placeholder: 'student@example.com',
        type: 'email',
        required: true,
        helperText: 'Used to send payment confirmation and invoice receipt'
      },
      {
        id: 'studentCountry',
        label: 'Your Country of Residence',
        placeholder: 'United States, UK, Canada, Australia...',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Official Merchant PayPal': 'payments@zaitoonroots.edu',
      'PayPal.Me Link': 'paypal.me/zaitoonroots',
      'Currencies': 'USD, GBP, EUR, CAD, AUD',
      'Buyer Protection': 'Full Educational Invoice Assurance'
    },
    instructions: [
      'Click "Proceed with PayPal" to launch the official PayPal checkout gateway.',
      'Log into your PayPal account and authorize the tuition or admission fee.',
      'Upon completion, you will be redirected with your verified ZRA fee receipt.'
    ]
  },

  // 8. Apple Pay & Google Pay
  {
    id: 'digital-wallets',
    name: 'Apple Pay & Google Pay (One-Touch Biometric)',
    urduName: 'ایپل پے و گوگل پے (بائیو میٹرک چیک آؤٹ)',
    category: 'wallets',
    badge: '1-Touch Express',
    tagline: 'Fast and secure contactless payment using FaceID, TouchID, or Android fingerprint',
    logoType: 'apple-google',
    color: '#000000',
    supportedCurrencies: ['USD', 'GBP', 'EUR', 'AED', 'SAR'],
    fields: [
      {
        id: 'walletType',
        label: 'Select Wallet',
        placeholder: 'Apple Pay / Google Wallet',
        type: 'select',
        required: true
      },
      {
        id: 'deviceOwner',
        label: 'Device Account Name',
        placeholder: 'John Doe',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Security': 'Biometric Tokenization (FaceID / Fingerprint)',
      'Merchant ID': 'merchant.edu.zaitoonroots.academy',
      'Instant Clearance': 'Under 5 Seconds'
    },
    instructions: [
      'Select Apple Pay or Google Pay.',
      'Authenticate with Face ID, Touch ID, or your device passcode.',
      'The payment is processed instantly with zero card numbers exposed.'
    ]
  },

  // 9. Middle East Direct (UAE, Saudi Mada, STC Pay, Qatar, Oman)
  {
    id: 'middle-east',
    name: 'Middle East & GCC Gateways (Mada, STC Pay, UAE FAB / ENBD)',
    urduName: 'مشرق وسطیٰ گیٹ ویز (مدى، ایس ٹی سی پے، یو اے ای)',
    category: 'middle-east',
    badge: 'GCC & Gulf Scholars',
    tagline: 'Saudi Mada, STC Pay, UAE Bank Direct, Al Ansari & Lulu Exchange Tokens',
    logoType: 'middle-east',
    color: '#0D9488',
    popular: true,
    supportedCurrencies: ['SAR', 'AED', 'QAR', 'OMR', 'KWD', 'BHD'],
    fields: [
      {
        id: 'gccMethod',
        label: 'Select GCC Service',
        placeholder: 'Mada / STC Pay / Al Ansari / UAE Bank',
        type: 'select',
        required: true
      },
      {
        id: 'gccPhoneOrIban',
        label: 'Sender Phone / Reference / IBAN',
        placeholder: '+971 50 •••• or +966 5 ••••',
        type: 'text',
        required: true
      },
      {
        id: 'gccTxnRef',
        label: 'Exchange / Bank Transaction Ref #',
        placeholder: 'UAE-987654321',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'UAE Representative Office': 'Dubai Academic City, Block 4, UAE',
      'Saudi Arabia Desk Helpline': '+966-50-7890123',
      'Exchange Partner Code': 'AL-ANSARI-ZRA-789 / LULU-ZRA-901',
      'Direct GCC IBAN': 'Provided upon voucher generation'
    },
    instructions: [
      'Students in UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, or Oman can pay via Saudi Mada, STC Pay, or visit any Al Ansari / Lulu Exchange branch.',
      'Mention Student ID and institution code "ZAITOON ROOTS ACADEMY".',
      'Enter the receipt reference number below to clear admissions.'
    ]
  },

  // 10. International Wire Transfer (SWIFT / BIC / IBAN)
  {
    id: 'swift-wire',
    name: 'International SWIFT Wire Transfer (Global Banks)',
    urduName: 'انٹرنیشنل سوئفٹ وائر ٹرانسفر (عالمی بینکنگ)',
    category: 'wire-swift',
    badge: 'Worldwide SWIFT',
    tagline: 'Official institutional wire transfer via global banking network for overseas scholars',
    logoType: 'swift',
    color: '#1E3A8A',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY'],
    fields: [
      {
        id: 'remittingBank',
        label: 'Remitting Bank Name & Country',
        placeholder: 'Barclays Bank London, Chase USA, Deutsche Bank...',
        type: 'text',
        required: true
      },
      {
        id: 'swiftReference',
        label: 'SWIFT MT103 / UETR Reference No.',
        placeholder: 'SWIFT-103-987654321',
        type: 'text',
        required: true,
        helperText: 'Found on your international wire confirmation document'
      },
      {
        id: 'senderName',
        label: 'Remitter Full Name',
        placeholder: 'Father / Sponsor / Student Name',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Beneficiary Name': 'ZAITOON ROOTS ACADEMY (PVT) LTD',
      'Beneficiary Account No': '01020104789521',
      'Beneficiary IBAN': 'PK82MEZN0001020104789521',
      'Bank Name': 'Meezan Bank Limited',
      'Bank SWIFT / BIC Code': 'MEZNPKKA',
      'Branch Address': 'Main Boulevard Blue Area, Islamabad, Pakistan',
      'Intermediary / Correspondent Bank': 'Citibank N.A. New York (SWIFT: CITIUS33)'
    },
    instructions: [
      'Instruct your bank to execute an international wire transfer using the SWIFT details provided.',
      'Include your Student Full Name and Application ID in field 70 (Remittance Information).',
      'Upload the wire MT103 confirmation slip or enter the UETR reference.'
    ]
  },

  // 11. Western Union & MoneyGram
  {
    id: 'remittance',
    name: 'Western Union & MoneyGram (Education Remittance)',
    urduName: 'ویسٹرن یونین و منی گرام (تعلیمی ترسیلات)',
    category: 'remittance',
    badge: 'Instant Cash Pickup',
    tagline: 'Submit 10-Digit MTCN (Western Union) or 8-Digit MoneyGram Reference',
    logoType: 'western-union',
    color: '#CA8A04',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'AED', 'SAR'],
    fields: [
      {
        id: 'serviceType',
        label: 'Remittance Service',
        placeholder: 'Western Union / MoneyGram / Ria',
        type: 'select',
        required: true
      },
      {
        id: 'mtcnNumber',
        label: 'MTCN / Transfer Reference Number',
        placeholder: '10-Digit MTCN (e.g. 123-456-7890)',
        type: 'text',
        required: true,
        helperText: 'Ensure the sender name matches the student/sponsor records'
      },
      {
        id: 'senderCountry',
        label: 'Sender Country & City',
        placeholder: 'London, UK / New York, USA...',
        type: 'text',
        required: true
      },
      {
        id: 'senderFullName',
        label: 'Sender Full Legal Name',
        placeholder: 'As on passport / ID',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Official Receiver Name': 'Prof. Dr. Tariq Mahmood Zaitoon',
      'Receiver City & Country': 'Islamabad, Pakistan',
      'Academy Verification Desk': '+92-344-7956085',
      'Accepted Services': 'Western Union, MoneyGram, Ria Money Transfer'
    },
    instructions: [
      'Visit any Western Union or MoneyGram agent or mobile app.',
      'Send tuition payment to the authorized academy receiver in Islamabad, Pakistan.',
      'Enter the 10-digit MTCN (Money Transfer Control Number) below.',
      'Our treasury desk verifies MTCN within 60 minutes and releases official admission status.'
    ]
  },

  // 12. Wise (TransferWise) & Payoneer
  {
    id: 'wise-payoneer',
    name: 'Wise (TransferWise) & Payoneer Student Checkout',
    urduName: 'وائز و پیونیئر سٹوڈنٹ ٹرانسفر',
    category: 'wire-swift',
    badge: 'Low Exchange Fee',
    tagline: 'Pay using your Wise balance or local bank transfer in USD, GBP, EUR, CAD, AUD',
    logoType: 'wise',
    color: '#16A34A',
    supportedCurrencies: ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'NZD', 'SGD'],
    fields: [
      {
        id: 'wiseEmailOrTag',
        label: 'Your Wise / Payoneer Email or Tag',
        placeholder: '@studentwise or student@email.com',
        type: 'text',
        required: true
      },
      {
        id: 'wiseTransferId',
        label: 'Wise Transfer ID / Batch #',
        placeholder: '#P-987654321',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'Wise Tag': '@zaitoonroots',
      'Wise Email': 'admissions@zaitoonroots.edu',
      'Payoneer Recipient': 'finance@zaitoonroots.edu',
      'Exchange Rates': 'Real mid-market Google exchange rate'
    },
    instructions: [
      'Open your Wise app or website.',
      'Send tuition fee to @zaitoonroots or admissions@zaitoonroots.edu.',
      'Paste the Wise Transfer ID below for instant clearance.'
    ]
  },

  // 13. Cryptocurrency (USDT / BTC / ETH)
  {
    id: 'crypto',
    name: 'Cryptocurrency & Web3 (USDT, BTC, ETH)',
    urduName: 'کرپٹو کرنسی ادائیگی (USDT, بٹ کوائن، ایتھریم)',
    category: 'crypto',
    badge: 'Web3 Global',
    tagline: 'Decentralized tuition payment for international distance learning and AI scholars',
    logoType: 'crypto',
    color: '#F97316',
    supportedCurrencies: ['USDT', 'BTC', 'ETH'],
    fields: [
      {
        id: 'cryptoAsset',
        label: 'Select Crypto Asset',
        placeholder: 'USDT (TRC-20) / USDT (ERC-20) / BTC / ETH',
        type: 'select',
        required: true
      },
      {
        id: 'txHash',
        label: 'Blockchain Transaction Hash (TxID)',
        placeholder: '0x8f23... or 4b9a...',
        type: 'text',
        required: true,
        helperText: 'Copy from your Binance, TrustWallet, or MetaMask transfer history'
      },
      {
        id: 'senderWallet',
        label: 'Sender Wallet Address',
        placeholder: 'Your wallet public address',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'USDT (TRC-20 Network)': 'TY7w9XzQ2eK8nL5p4B1m9V8a7c6x5Z4W3R',
      'USDT / ETH (ERC-20 Network)': '0x94B73eC12e62F485b59740520AcdaB3798935c1D',
      'Bitcoin (BTC SegWit)': 'bc1q4e92z8m2v873a4m9l87g6f5d4s3a2q1w0e9r8t',
      'Confirmation Requirement': '12 Network Confirmations'
    },
    instructions: [
      'Select your cryptocurrency (USDT on TRC-20 recommended for zero gas fees).',
      'Send the exact converted USD tuition amount to the official academy wallet address.',
      'Paste the Blockchain Transaction Hash (TxID) below.',
      'Our automated Web3 node will confirm on-chain within 5 minutes.'
    ]
  },

  // 14. SadaPay & NayaPay (Pakistan FinTech)
  {
    id: 'sadapay-nayapay',
    name: 'SadaPay & NayaPay (Modern Digital Wallets)',
    urduName: 'سادہ پے و نیا پے (ڈیجیٹل اکاؤنٹس)',
    category: 'pakistan',
    badge: 'Pakistan FinTech',
    tagline: 'Instant zero-fee transfer via SadaBiz or NayaPay User ID',
    logoType: 'sadapay',
    color: '#FF6B6B',
    supportedCurrencies: ['PKR'],
    fields: [
      {
        id: 'walletChoice',
        label: 'Select FinTech App',
        placeholder: 'SadaPay / NayaPay',
        type: 'select',
        required: true
      },
      {
        id: 'senderHandle',
        label: 'Your SadaPay / NayaPay Handle or Mobile #',
        placeholder: '@yourhandle or 0300-1234567',
        type: 'text',
        required: true
      },
      {
        id: 'referenceId',
        label: 'Payment Reference / TID',
        placeholder: 'SP-987654321',
        type: 'text',
        required: true
      }
    ],
    accountDetails: {
      'SadaPay Handle': '@zaitoonroots',
      'SadaBiz Merchant Link': 'sadabiz.me/zaitoonroots',
      'NayaPay ID': 'nayapay.me/zra',
      'Instant Alert Desk': '0344-7956085'
    },
    instructions: [
      'Open your SadaPay or NayaPay app.',
      'Send funds to handle @zaitoonroots or search mobile 0344-7956085.',
      'Copy the in-app transaction reference number and paste below.'
    ]
  }
];

export interface PaymentSubmission {
  receiptId: string;
  timestamp: string;
  studentName: string;
  studentId: string;
  email: string;
  phone: string;
  program: string;
  feePurpose: string;
  amountPkr: number;
  amountUsd: number;
  methodId: string;
  methodName: string;
  transactionRef: string;
  status: 'Verified & Cleared' | 'Pending Bank Reconciliation';
  receiptQrCodeUrl: string;
}

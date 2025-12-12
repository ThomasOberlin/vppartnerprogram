export interface FormData {
  // Personal
  firstName: string;
  email: string;
  phone: string;
  country: string;
  linkedin: string;
  website: string;

  // Business
  businessType: 'individual' | 'company';
  companyName: string;
  regNumber: string;
  vatNumber: string;
  taxCountry: string;
  businessDescription: string;

  // Experience
  roles: string[];
  otherRole: string;
  audienceSize: string;
  channels: string[];
  otherChannel: string;

  // Payment
  paymentMethod: 'wise' | 'paypal' | 'bank_sepa' | 'bank_swift';
  bankHolderName: string;
  iban: string;
  swift: string;
  bankName: string;
  bankAddress: string;
  paypalEmail: string;

  // Program
  referralSource: string;
  motivation: string;
  commissionReviewed: 'yes' | 'no';
  expectedReferrals: string;

  // Legal
  agreedAuthority: boolean;
  agreedContractor: boolean;
  agreedTaxes: boolean;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
}

export const INITIAL_DATA: FormData = {
  firstName: '',
  email: '',
  phone: '',
  country: '',
  linkedin: '',
  website: '',
  businessType: 'individual',
  companyName: '',
  regNumber: '',
  vatNumber: '',
  taxCountry: '',
  businessDescription: '',
  roles: [],
  otherRole: '',
  audienceSize: '',
  channels: [],
  otherChannel: '',
  paymentMethod: 'wise',
  bankHolderName: '',
  iban: '',
  swift: '',
  bankName: '',
  bankAddress: '',
  paypalEmail: '',
  referralSource: '',
  motivation: '',
  commissionReviewed: 'yes',
  expectedReferrals: '',
  agreedAuthority: false,
  agreedContractor: false,
  agreedTaxes: false,
  agreedTerms: false,
  agreedPrivacy: false,
};

export type StepProps = {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
};

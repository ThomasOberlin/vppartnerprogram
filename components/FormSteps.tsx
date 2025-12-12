import React, { useState } from 'react';
import { StepProps } from '../types';
import { Input, Select, Checkbox, RadioGroup, TextArea, Button } from './UI';
import { COUNTRIES, ROLES, AUDIENCE_SIZES, CHANNELS, REFERRAL_ESTIMATES } from '../constants';
import { generateTextAssistance } from '../services/gemini';
import { ShieldCheck, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

// --- Step 1: Welcome ---
export const WelcomeStep: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center py-8 space-y-6 animate-fadeIn">
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-veripura-100 rounded-full flex items-center justify-center text-veripura-600">
         <ShieldCheck className="w-8 h-8" />
      </div>
    </div>
    <h1 className="text-3xl font-bold text-slate-900">VeriPura Partner Program</h1>
    <div className="bg-veripura-50 border border-veripura-100 rounded-lg p-4 inline-block">
        <span className="text-veripura-800 font-semibold text-sm">BETA ACCESS • LIMITED AVAILABILITY</span>
    </div>
    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
      Welcome to the VeriPura Partner Application. We are looking for a select group of partners to join our beta program promoting our industry-leading food compliance software.
    </p>
    
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8 text-left">
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <TrendingUp className="w-6 h-6 text-veripura-500 mb-3" />
        <h3 className="font-semibold text-slate-900">High Commission</h3>
        <p className="text-sm text-slate-500 mt-1">Earn up to 40% on subscriptions and bonuses for high performance.</p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <Users className="w-6 h-6 text-veripura-500 mb-3" />
        <h3 className="font-semibold text-slate-900">Beta Access</h3>
        <p className="text-sm text-slate-500 mt-1">Join our exclusive group of initial 5-10 partners with direct support.</p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <CheckCircle2 className="w-6 h-6 text-veripura-500 mb-3" />
        <h3 className="font-semibold text-slate-900">Quick Apply</h3>
        <p className="text-sm text-slate-500 mt-1">Takes just 5-7 minutes to complete. We review within 48 hours.</p>
      </div>
    </div>

    <div className="pt-8">
      <Button onClick={onStart} className="text-lg px-10 py-3">Start Application</Button>
    </div>
  </div>
);

// --- Step 2: Personal Information ---
export const PersonalInfoStep: React.FC<StepProps> = ({ data, updateData, errors }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="mb-6 border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
      <p className="text-slate-500">Let's get to know you better.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <Input
        label="Full Legal Name"
        value={data.firstName}
        onChange={(e) => updateData({ firstName: e.target.value })}
        placeholder="Jane Doe"
        required
        error={errors.firstName}
      />
      <Input
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(e) => updateData({ email: e.target.value })}
        placeholder="jane@example.com"
        required
        error={errors.email}
      />
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <Input
        label="Phone Number (Optional)"
        type="tel"
        value={data.phone}
        onChange={(e) => updateData({ phone: e.target.value })}
        placeholder="+1 (555) 000-0000"
        error={errors.phone}
      />
      <Select
        label="Country of Residence"
        options={COUNTRIES}
        value={data.country}
        onChange={(e) => updateData({ country: e.target.value })}
        required
        error={errors.country}
      />
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <Input
        label="LinkedIn Profile (Optional)"
        value={data.linkedin}
        onChange={(e) => updateData({ linkedin: e.target.value })}
        placeholder="https://linkedin.com/in/..."
        error={errors.linkedin}
      />
      <Input
        label="Website (Optional)"
        value={data.website}
        onChange={(e) => updateData({ website: e.target.value })}
        placeholder="https://example.com"
        error={errors.website}
      />
    </div>
  </div>
);

// --- Step 3: Business Information ---
export const BusinessInfoStep: React.FC<StepProps> = ({ data, updateData, errors }) => {
    const [aiLoading, setAiLoading] = useState(false);

    const handleAiAssist = async () => {
        if (!data.businessDescription) return;
        setAiLoading(true);
        const refined = await generateTextAssistance('business_description', data.businessDescription);
        if (refined) {
            updateData({ businessDescription: refined });
        }
        setAiLoading(false);
    };

    return (
  <div className="space-y-6 animate-fadeIn">
    <div className="mb-6 border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-bold text-slate-900">Business Information</h2>
      <p className="text-slate-500">Tell us about your professional entity.</p>
    </div>

    <RadioGroup
      label="Are you applying as:"
      name="businessType"
      options={[
        { label: 'Individual / Sole Proprietor', value: 'individual' },
        { label: 'Registered Company', value: 'company' }
      ]}
      value={data.businessType}
      onChange={(val) => updateData({ businessType: val as any })}
      required
    />

    {data.businessType === 'company' && (
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 animate-slideDown">
        <Input
          label="Company Name"
          value={data.companyName}
          onChange={(e) => updateData({ companyName: e.target.value })}
          required
          error={errors.companyName}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Business Registration Number"
            value={data.regNumber}
            onChange={(e) => updateData({ regNumber: e.target.value })}
            error={errors.regNumber}
          />
          <Input
            label="VAT / Tax ID (Optional)"
            value={data.vatNumber}
            onChange={(e) => updateData({ vatNumber: e.target.value })}
            error={errors.vatNumber}
          />
        </div>
      </div>
    )}

    <Select
      label="Country of Tax Residence"
      options={COUNTRIES}
      value={data.taxCountry}
      onChange={(e) => updateData({ taxCountry: e.target.value })}
      required
      error={errors.taxCountry}
    />
    <p className="text-xs text-slate-500 -mt-3 mb-4">
      This is where you pay income taxes. Usually same as residence.
    </p>

    <TextArea
      label="Brief description of your business/expertise"
      value={data.businessDescription}
      onChange={(e) => updateData({ businessDescription: e.target.value })}
      placeholder="E.g. I run a food safety consulting firm helping SMEs in the EU..."
      aiAssist={handleAiAssist}
      isAiLoading={aiLoading}
      error={errors.businessDescription}
    />
  </div>
)};

// --- Step 4: Experience & Audience ---
export const ExperienceStep: React.FC<StepProps> = ({ data, updateData, errors }) => {
  const toggleRole = (role: string) => {
    const newRoles = data.roles.includes(role)
      ? data.roles.filter(r => r !== role)
      : [...data.roles, role];
    updateData({ roles: newRoles });
  };

  const toggleChannel = (channel: string) => {
    const newChannels = data.channels.includes(channel)
      ? data.channels.filter(c => c !== channel)
      : [...data.channels, channel];
    updateData({ channels: newChannels });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Experience & Audience</h2>
        <p className="text-slate-500">Help us understand your reach.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Which best describes you? (Select all that apply) <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-2 gap-2">
          {ROLES.map(role => (
            <Checkbox
              key={role}
              label={role}
              checked={data.roles.includes(role)}
              onChange={() => toggleRole(role)}
            />
          ))}
        </div>
        {errors.roles && <p className="text-sm text-red-600 mt-1">{errors.roles}</p>}
        {data.roles.includes("Other") && (
          <Input
            label="Please specify"
            value={data.otherRole}
            onChange={(e) => updateData({ otherRole: e.target.value })}
            className="mt-2"
            required
            error={errors.otherRole}
          />
        )}
      </div>

      <Select
        label="How many potential customers do you reach?"
        options={AUDIENCE_SIZES}
        value={data.audienceSize}
        onChange={(e) => updateData({ audienceSize: e.target.value })}
        required
        error={errors.audienceSize}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Primary promotion channels <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-2 gap-2">
          {CHANNELS.map(channel => (
            <Checkbox
              key={channel}
              label={channel}
              checked={data.channels.includes(channel)}
              onChange={() => toggleChannel(channel)}
            />
          ))}
        </div>
        {errors.channels && <p className="text-sm text-red-600 mt-1">{errors.channels}</p>}
      </div>
    </div>
  );
};

// --- Step 5: Payment Information ---
export const PaymentStep: React.FC<StepProps> = ({ data, updateData, errors }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="mb-6 border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-bold text-slate-900">Payment Information</h2>
      <p className="text-slate-500">How would you like to receive commissions?</p>
    </div>

    <RadioGroup
      label="Preferred Payment Method"
      name="paymentMethod"
      options={[
        { label: 'Wise (Recommended for International)', value: 'wise' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank Transfer (SEPA - EU Only)', value: 'bank_sepa' },
        { label: 'Bank Transfer (SWIFT - International)', value: 'bank_swift' }
      ]}
      value={data.paymentMethod}
      onChange={(val) => updateData({ paymentMethod: val as any })}
      required
    />

    {data.paymentMethod === 'paypal' ? (
      <Input
        label="PayPal Email Address"
        type="email"
        value={data.paypalEmail}
        onChange={(e) => updateData({ paypalEmail: e.target.value })}
        required
        error={errors.paypalEmail}
      />
    ) : (
      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-4 animate-slideDown">
        <h4 className="font-medium text-slate-800 border-b border-slate-200 pb-2">Bank Details</h4>
        <Input
          label="Bank Account Holder Name"
          value={data.bankHolderName}
          onChange={(e) => updateData({ bankHolderName: e.target.value })}
          required
          error={errors.bankHolderName}
        />
        <Input
          label="Bank Name"
          value={data.bankName}
          onChange={(e) => updateData({ bankName: e.target.value })}
          required
          error={errors.bankName}
        />
        <Input
          label="Bank Address"
          value={data.bankAddress}
          onChange={(e) => updateData({ bankAddress: e.target.value })}
          required
          error={errors.bankAddress}
        />
        {(data.paymentMethod === 'bank_sepa' || data.country.includes('(EU)')) && (
           <Input
           label="IBAN"
           value={data.iban}
           onChange={(e) => updateData({ iban: e.target.value })}
           placeholder="XX00 0000 0000 0000 0000 00"
           required
           error={errors.iban}
           helperText="Required for SEPA transfers."
         />
        )}
        {data.paymentMethod === 'bank_swift' && (
           <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="SWIFT/BIC Code"
                value={data.swift}
                onChange={(e) => updateData({ swift: e.target.value })}
                required
                error={errors.swift}
              />
               <Input
                label="Account Number" // Fallback if IBAN not applicable
                value={data.iban}
                onChange={(e) => updateData({ iban: e.target.value })}
                required
                error={errors.iban}
              />
           </div>
        )}
      </div>
    )}
  </div>
);

// --- Step 6: Program Understanding ---
export const ProgramStep: React.FC<StepProps> = ({ data, updateData, errors }) => {
    const [aiLoading, setAiLoading] = useState(false);

    const handleAiAssist = async () => {
        if (!data.motivation) return;
        setAiLoading(true);
        const refined = await generateTextAssistance('motivation', data.motivation);
        if (refined) {
            updateData({ motivation: refined });
        }
        setAiLoading(false);
    };

    return (
  <div className="space-y-6 animate-fadeIn">
    <div className="mb-6 border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-bold text-slate-900">Program Understanding</h2>
      <p className="text-slate-500">Alignment on goals and expectations.</p>
    </div>

    <Input
        label="How did you hear about the VeriPura Partner Program?"
        value={data.referralSource}
        onChange={(e) => updateData({ referralSource: e.target.value })}
    />

    <TextArea
      label="Why do you want to become a VeriPura partner?"
      value={data.motivation}
      onChange={(e) => updateData({ motivation: e.target.value })}
      rows={4}
      placeholder="I believe my audience of food safety managers..."
      aiAssist={handleAiAssist}
      isAiLoading={aiLoading}
    />

    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
        <h4 className="text-blue-900 font-semibold mb-2">Commission Structure</h4>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li><strong>40%</strong> of first month for monthly subscriptions</li>
            <li><strong>0.75 month</strong> value for annual subscriptions</li>
            <li><strong>6%</strong> of sale price for lifetime deals</li>
        </ul>
    </div>

    <RadioGroup
      label="Have you reviewed the commission structure?"
      name="commissionReviewed"
      options={[
        { label: 'Yes, I understand the terms', value: 'yes' },
        { label: 'No, please send me more information', value: 'no' }
      ]}
      value={data.commissionReviewed}
      onChange={(val) => updateData({ commissionReviewed: val as any })}
      required
    />

    {data.commissionReviewed === 'no' && (
      <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm animate-fadeIn">
        We'll send you a detailed breakdown via email.
      </div>
    )}

    <Select
        label="How many referrals do you expect to make per month?"
        options={REFERRAL_ESTIMATES}
        value={data.expectedReferrals}
        onChange={(e) => updateData({ expectedReferrals: e.target.value })}
    />
  </div>
)};

// --- Step 7: Legal Agreements ---
export const LegalStep: React.FC<StepProps> = ({ data, updateData, errors }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="mb-6 border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-bold text-slate-900">Legal Agreements</h2>
      <p className="text-slate-500">Please review and confirm the following.</p>
    </div>

    <div className="space-y-4 bg-slate-50 p-6 rounded-lg border border-slate-200">
      <Checkbox
        label="I confirm I have authority to enter into this agreement."
        checked={data.agreedAuthority}
        onChange={(e) => updateData({ agreedAuthority: e.target.checked })}
        error={errors.agreedAuthority}
      />
      <Checkbox
        label="I understand I will be an independent contractor, not an employee."
        checked={data.agreedContractor}
        onChange={(e) => updateData({ agreedContractor: e.target.checked })}
        error={errors.agreedContractor}
      />
      <Checkbox
        label="I understand I am responsible for all taxes in my jurisdiction."
        checked={data.agreedTaxes}
        onChange={(e) => updateData({ agreedTaxes: e.target.checked })}
        error={errors.agreedTaxes}
      />
       <div className="h-px bg-slate-200 my-2"></div>
      <Checkbox
        label={<span>I agree to the <a href="#" className="text-veripura-600 underline">Beta Partner Agreement</a> terms.</span>}
        checked={data.agreedTerms}
        onChange={(e) => updateData({ agreedTerms: e.target.checked })}
        error={errors.agreedTerms}
      />
      <Checkbox
        label={<span>I consent to VeriPura processing my data per GDPR. <a href="#" className="text-veripura-600 underline">Privacy Policy</a>.</span>}
        checked={data.agreedPrivacy}
        onChange={(e) => updateData({ agreedPrivacy: e.target.checked })}
        error={errors.agreedPrivacy}
      />
    </div>
  </div>
);

// --- Success Step ---
export const SuccessStep: React.FC = () => (
  <div className="text-center py-12 animate-fadeIn">
    <div className="flex justify-center mb-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
         <CheckCircle2 className="w-10 h-10" />
      </div>
    </div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
    <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
      Thank you for applying to the VeriPura Partner Program. We have sent a confirmation email to your inbox.
    </p>
    
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-lg mx-auto text-left space-y-4">
      <h3 className="font-semibold text-slate-900">What happens next?</h3>
      <ul className="space-y-3 text-slate-600 text-sm">
        <li className="flex gap-2">
            <span className="font-bold text-slate-400">1.</span>
            <span>Our team will review your application within 2 business days.</span>
        </li>
        <li className="flex gap-2">
            <span className="font-bold text-slate-400">2.</span>
            <span>If approved, you'll receive an onboarding email with your dashboard access.</span>
        </li>
        <li className="flex gap-2">
            <span className="font-bold text-slate-400">3.</span>
            <span>In the meantime, feel free to explore our product documentation.</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-8">
        <p className="text-sm text-slate-500">Questions? Contact us at <a href="mailto:partners@veripura.com" className="text-veripura-600 hover:underline">partners@veripura.com</a></p>
    </div>
  </div>
);

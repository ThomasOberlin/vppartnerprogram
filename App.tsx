import React, { useState, useEffect } from 'react';
import { 
  WelcomeStep, 
  PersonalInfoStep, 
  BusinessInfoStep, 
  ExperienceStep, 
  PaymentStep, 
  ProgramStep, 
  LegalStep, 
  SuccessStep 
} from './components/FormSteps';
import { Button } from './components/UI';
import { INITIAL_DATA, FormData } from './types';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

const STEPS = [
  'Welcome',
  'Personal',
  'Business',
  'Experience',
  'Payment',
  'Program',
  'Legal'
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, isSuccess]);

  const updateData = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    // Clear errors for modified fields
    const newErrors = { ...errors };
    Object.keys(fields).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    const d = formData;

    if (stepIndex === 1) { // Personal
      if (!d.firstName) newErrors.firstName = "Name is required";
      if (!d.email || !/^\S+@\S+\.\S+$/.test(d.email)) newErrors.email = "Valid email is required";
      if (!d.country) newErrors.country = "Country is required";
    }
    
    if (stepIndex === 2) { // Business
      if (d.businessType === 'company' && !d.companyName) newErrors.companyName = "Company name is required";
      if (!d.taxCountry) newErrors.taxCountry = "Tax country is required";
    }

    if (stepIndex === 3) { // Experience
      if (d.roles.length === 0) newErrors.roles = "Select at least one role";
      if (d.roles.includes('Other') && !d.otherRole) newErrors.otherRole = "Please specify";
      if (!d.audienceSize) newErrors.audienceSize = "Required";
      if (d.channels.length === 0) newErrors.channels = "Select at least one channel";
    }

    if (stepIndex === 4) { // Payment
      if (d.paymentMethod === 'paypal' && !d.paypalEmail) newErrors.paypalEmail = "PayPal email is required";
      if (['wise', 'bank_sepa', 'bank_swift'].includes(d.paymentMethod)) {
        if (!d.bankHolderName) newErrors.bankHolderName = "Required";
        if (!d.bankName) newErrors.bankName = "Required";
        if (!d.bankAddress) newErrors.bankAddress = "Required";
      }
      
      // Strict IBAN check for SEPA
      if (d.paymentMethod === 'bank_sepa') {
         if (!d.iban) {
            newErrors.iban = "IBAN is required for SEPA";
         } else {
            const cleanIban = d.iban.replace(/\s+/g, '').toUpperCase();
            // IBAN Regex: 2 letters (country), 2 digits (checksum), followed by alphanumeric
            const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,}$/;
            
            if (!ibanRegex.test(cleanIban)) {
               newErrors.iban = "Invalid IBAN format. Must start with 2-letter country code (e.g., DE, FR).";
            } else if (cleanIban.length < 15 || cleanIban.length > 34) {
               newErrors.iban = "Invalid IBAN length.";
            }
         }
      }

      if (d.paymentMethod === 'bank_swift') {
         if (!d.swift) newErrors.swift = "SWIFT code is required";
         if (!d.iban) newErrors.iban = "Account number is required";
      }
    }

    if (stepIndex === 6) { // Legal
      if (!d.agreedAuthority) newErrors.agreedAuthority = "Required";
      if (!d.agreedContractor) newErrors.agreedContractor = "Required";
      if (!d.agreedTaxes) newErrors.agreedTaxes = "Required";
      if (!d.agreedTerms) newErrors.agreedTerms = "Required";
      if (!d.agreedPrivacy) newErrors.agreedPrivacy = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8 border border-slate-100">
           <SuccessStep />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-veripura-600 rounded-md flex items-center justify-center text-white font-bold text-lg">V</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">VeriPura</span>
          </div>
          <div className="text-sm text-slate-500 font-medium">Partner Portal</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 mt-8">
        {currentStep > 0 && (
            <div className="mb-8">
                <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    <span>Step {currentStep} of {STEPS.length - 1}</span>
                    <span>{Math.round((currentStep / (STEPS.length - 1)) * 100)}% Completed</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-veripura-500 transition-all duration-500 ease-out" 
                        style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                    />
                </div>
            </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 min-h-[400px]">
          {currentStep === 0 && <WelcomeStep onStart={() => setCurrentStep(1)} />}
          {currentStep === 1 && <PersonalInfoStep data={formData} updateData={updateData} errors={errors} />}
          {currentStep === 2 && <BusinessInfoStep data={formData} updateData={updateData} errors={errors} />}
          {currentStep === 3 && <ExperienceStep data={formData} updateData={updateData} errors={errors} />}
          {currentStep === 4 && <PaymentStep data={formData} updateData={updateData} errors={errors} />}
          {currentStep === 5 && <ProgramStep data={formData} updateData={updateData} errors={errors} />}
          {currentStep === 6 && <LegalStep data={formData} updateData={updateData} errors={errors} />}
          
          {/* Navigation */}
          {currentStep > 0 && (
             <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
                <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                   <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                </Button>
                
                {currentStep < STEPS.length - 1 ? (
                   <Button onClick={handleNext}>
                      Next <ChevronRight className="w-4 h-4 inline ml-1" />
                   </Button>
                ) : (
                   <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[140px]">
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Submit Application'}
                   </Button>
                )}
             </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-4 mt-12 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} VeriPura Oü. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
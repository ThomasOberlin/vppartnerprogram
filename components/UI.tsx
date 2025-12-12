import React from 'react';
import { Loader2 } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <input
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-veripura-500 focus:border-veripura-500 transition-colors ${
        error ? 'border-red-500' : 'border-slate-300'
      } ${className}`}
      {...props}
    />
    {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  aiAssist?: () => void;
  isAiLoading?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, aiAssist, isAiLoading, className = '', ...props }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <label className="block text-sm font-medium text-slate-700">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      {aiAssist && (
        <button
          type="button"
          onClick={aiAssist}
          disabled={isAiLoading}
          className="text-xs flex items-center gap-1 text-veripura-600 hover:text-veripura-700 font-medium transition-colors"
        >
          {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : '✨ AI Assist'}
        </button>
      )}
    </div>
    <textarea
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-veripura-500 focus:border-veripura-500 transition-colors ${
        error ? 'border-red-500' : 'border-slate-300'
      } ${className}`}
      rows={4}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, children, className = '', ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <select
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-veripura-500 focus:border-veripura-500 bg-white transition-colors ${
        error ? 'border-red-500' : 'border-slate-300'
      } ${className}`}
      {...props}
    >
      <option value="">Select an option...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
      {children}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = '', ...props }) => (
  <div className="mb-3">
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className={`focus:ring-veripura-500 h-4 w-4 text-veripura-600 border-slate-300 rounded cursor-pointer ${className}`}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium text-slate-700 cursor-pointer">{label}</label>
      </div>
    </div>
    {error && <p className="ml-8 mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

interface RadioGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, error, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={name}
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="focus:ring-veripura-500 h-4 w-4 text-veripura-600 border-slate-300 cursor-pointer"
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-3 block text-sm font-medium text-slate-700 cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-veripura-600 hover:bg-veripura-700 text-white focus:ring-veripura-500 shadow-sm hover:shadow-md",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-500",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-veripura-500"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

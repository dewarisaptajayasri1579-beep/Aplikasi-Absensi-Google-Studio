import React, { ForwardedRef, useState, useId } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const PasswordInput = React.forwardRef(function PasswordInput(
  { label, error, className = '', ...props }: PasswordInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div id={`password-field-container-${id}`} className="flex flex-col gap-2 w-full text-left">
      <label
        htmlFor={id}
        id={`password-label-${id}`}
        className="text-[14px] font-medium text-[#0F1F3D] select-none"
      >
        {label}
      </label>
      <div id={`password-wrapper-${id}`} className="relative flex items-center">
        <div
          id={`password-lock-icon-${id}`}
          className="absolute left-4 text-[#66738D] pointer-events-none flex items-center justify-center"
        >
          <Lock size={20} strokeWidth={1.8} />
        </div>
        <input
          ref={ref}
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`w-full h-[56px] pl-12 pr-12 bg-white text-[#0F1F3D] placeholder-[#66738D]/60 border ${
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-[#DCE4F0] focus:border-[#0F5FEA] focus:ring-[#0F5FEA]/20'
          } rounded-[8px] text-[15px] outline-none transition-all duration-200 focus:ring-4`}
          {...props}
        />
        <button
          id={`password-toggle-btn-${id}`}
          type="button"
          onClick={toggleVisibility}
          className="absolute right-4 text-[#66738D] hover:text-[#0F1F3D] focus:outline-none flex items-center justify-center"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>
      {error && (
        <span
          id={`password-error-${id}`}
          className="text-[13px] font-normal text-red-500 animate-fade-in"
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default PasswordInput;

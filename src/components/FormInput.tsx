import React, { ForwardedRef, useId } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  className?: string;
}

const FormInput = React.forwardRef(function FormInput(
  { label, icon: Icon, error, className = '', ...props }: FormInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();

  return (
    <div id={`field-container-${id}`} className="flex flex-col gap-2 w-full text-left">
      <label
        htmlFor={id}
        id={`label-${id}`}
        className="text-[14px] font-medium text-[#0F1F3D] select-none"
      >
        {label}
      </label>
      <div id={`wrapper-${id}`} className="relative flex items-center">
        {Icon && (
          <div
            id={`icon-container-${id}`}
            className="absolute left-4 text-[#66738D] pointer-events-none flex items-center justify-center"
          >
            <Icon size={20} strokeWidth={1.8} />
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full h-[56px] ${
            Icon ? 'pl-12' : 'px-4'
          } pr-4 bg-white text-[#0F1F3D] placeholder-[#66738D]/60 border ${
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-[#DCE4F0] focus:border-[#0F5FEA] focus:ring-[#0F5FEA]/20'
          } rounded-[8px] text-[15px] outline-none transition-all duration-200 focus:ring-4`}
          {...props}
        />
      </div>
      {error && (
        <span
          id={`error-${id}`}
          className="text-[13px] font-normal text-red-500 animate-fade-in"
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default FormInput;

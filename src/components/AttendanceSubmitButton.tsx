/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface AttendanceSubmitButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
  isLoading?: boolean;
}

export default function AttendanceSubmitButton({ 
  label, 
  onClick, 
  disabled, 
  isLoading 
}: AttendanceSubmitButtonProps) {
  return (
    <div id="submit-button-wrapper" className="w-full pb-8 pt-2">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`w-full h-[54px] rounded-[14px] font-bold text-[15px] flex items-center justify-center gap-2 transition-all shadow-[0_8px_18px_rgba(15,95,234,0.22)] active:scale-[0.98] ${
          disabled || isLoading
            ? 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed border border-slate-300/10'
            : 'bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white cursor-pointer'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengirim Data...
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            {label}
          </>
        )}
      </button>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';

interface AttendanceSuccessToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function AttendanceSuccessToast({ message, isVisible, onClose }: AttendanceSuccessToastProps) {
  if (!isVisible) return null;

  return (
    <div 
      id="attendance-success-toast" 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B1F44]/50 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-[24px] border border-[#DCE4F0] p-6 max-w-[340px] w-full text-center shadow-[0_16px_40px_rgba(15,31,61,0.15)] animate-scale-up">
        <div className="w-16 h-16 bg-[#EAFBF4] text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#10B981]/20">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        
        <h3 className="text-[#0B1F44] text-[18px] font-bold mb-1.5">Berhasil</h3>
        <p className="text-[#66738D] text-[13px] leading-relaxed mb-6 font-medium">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full h-[46px] bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white font-bold text-[14px] rounded-[10px] shadow-md shadow-blue-100 transition-all cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

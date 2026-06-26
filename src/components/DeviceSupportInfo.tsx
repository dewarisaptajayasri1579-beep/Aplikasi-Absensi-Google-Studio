import React from 'react';
import { Laptop, Tablet, Smartphone } from 'lucide-react';

interface DeviceSupportInfoProps {
  variant: 'desktop' | 'mobile';
}

export default function DeviceSupportInfo({ variant }: DeviceSupportInfoProps) {
  if (variant === 'desktop') {
    return (
      <div
        id="device-support-desktop"
        className="flex flex-col items-center justify-center gap-2 mt-8 py-2 animate-fade-in"
      >
        <div id="desktop-icons-container" className="flex items-center gap-3">
          <div
            id="laptop-icon-wrapper"
            className="w-10 h-10 rounded-full border border-[#DCE4F0] bg-[#F8FAFD] text-[#0F5FEA] flex items-center justify-center shadow-sm"
          >
            <Laptop size={18} strokeWidth={1.8} />
          </div>
          <div
            id="phone-icon-wrapper"
            className="w-10 h-10 rounded-full border border-[#DCE4F0] bg-[#F8FAFD] text-[#0F5FEA] flex items-center justify-center shadow-sm"
          >
            <Smartphone size={18} strokeWidth={1.8} />
          </div>
        </div>
        <p
          id="desktop-support-text"
          className="text-[13px] font-normal text-[#66738D] text-center"
        >
          Bisa digunakan di laptop dan HP
        </p>
      </div>
    );
  }

  return (
    <div
      id="device-support-mobile"
      className="w-full flex flex-col items-center justify-center gap-3 mt-10 px-4 animate-fade-in"
    >
      <div id="mobile-divider-row" className="w-full flex items-center gap-4">
        <div id="mobile-divider-left" className="flex-1 h-[1px] bg-[#DCE4F0]" />
        <div
          id="mobile-icon-wrapper"
          className="w-11 h-11 rounded-full bg-[#EEF5FF] text-[#0F5FEA] flex items-center justify-center shrink-0 border border-[#EEF5FF]"
        >
          <Smartphone size={20} strokeWidth={1.8} />
        </div>
        <div id="mobile-divider-right" className="flex-1 h-[1px] bg-[#DCE4F0]" />
      </div>
      <p
        id="mobile-support-text"
        className="text-[13px] font-medium text-[#66738D] tracking-wide text-center"
      >
        Akses mudah melalui HP
      </p>
    </div>
  );
}

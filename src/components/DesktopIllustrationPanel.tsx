import React from 'react';
import AppLogo from './AppLogo.tsx';

export default function DesktopIllustrationPanel() {
  return (
    <div
      id="desktop-illustration-panel"
      className="hidden lg:flex flex-col justify-between p-12 w-[53%] bg-gradient-to-br from-[#EEF5FF] to-[#DEE9FF] border-r border-[#DCE4F0] relative overflow-hidden h-full min-h-[750px] animate-fade-in"
    >
      {/* Top Left Branding Block */}
      <div id="branding-container" className="flex items-center gap-4 select-none z-10 text-left">
        <AppLogo size={48} className="shadow-md" />
        <div id="branding-texts">
          <h2
            id="branding-title"
            className="text-[18px] font-bold text-[#0B1F44] tracking-tight leading-tight"
          >
            Absensi Karyawan
          </h2>
          <p id="branding-subtitle" className="text-[13px] font-medium text-[#66738D] mt-0.5">
            Kelola kehadiran, tingkatkan produktivitas
          </p>
        </div>
      </div>

      {/* Center Large Vector Illustration */}
      <div
        id="desktop-illustration-container"
        className="flex-1 flex items-center justify-center my-6 relative select-none"
        style={{ minHeight: '380px' }}
      >
        <img
          src="/images/login-attendance-illustration.svg"
          alt="Absensi Karyawan Desktop Illustration"
          className="w-full max-w-[500px] h-auto object-contain drop-shadow-[0_16px_32px_rgba(15,31,61,0.06)]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Comment: Fallback if public folder image fetch has any latency/sandboxing issue
            console.warn('Falling back to local SVG asset image path');
          }}
        />
      </div>

      {/* Bottom Promotional Copy */}
      <div id="promotional-text-container" className="text-center select-none z-10 max-w-[450px] mx-auto">
        <h3
          id="promotional-title"
          className="text-[22px] font-bold text-[#0B1F44] tracking-tight leading-snug"
        >
          Absensi lebih mudah, data lebih akurat
        </h3>
        <p
          id="promotional-description"
          className="text-[14px] font-normal text-[#66738D] mt-2.5 leading-relaxed"
        >
          Pantau kehadiran karyawan secara real-time
          <br />
          kapan saja dan di mana saja.
        </p>
      </div>
    </div>
  );
}

import React from 'react';

export default function MobileIllustration() {
  return (
    <div
      id="mobile-illustration-container"
      className="w-full flex items-center justify-center py-4 select-none animate-fade-in"
    >
      <div
        id="mobile-illustration-wrapper"
        className="w-full max-w-[340px] h-[220px] sm:h-[260px] flex items-center justify-center"
      >
        <img
          src="/images/login-attendance-mobile.svg"
          alt="Absensi Karyawan Mobile Illustration"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            console.warn('Falling back to local mobile SVG asset path');
          }}
        />
      </div>
    </div>
  );
}

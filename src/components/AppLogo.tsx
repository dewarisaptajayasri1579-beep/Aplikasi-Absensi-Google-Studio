import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number; // size in pixels
}

export default function AppLogo({ className = '', size = 48 }: AppLogoProps) {
  return (
    <div
      id="app-logo-wrapper"
      className={`relative select-none flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${(size * 14) / 72}px`, // Maintains proportional border-radius
        backgroundColor: '#0F5FEA',
      }}
    >
      <svg
        id="app-logo-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-4/5 h-4/5 text-white fill-current"
      >
        <circle cx="50" cy="30" r="10" />
        <path d="M22 48 L42 68 L78 32 L68 22 L42 48 L32 38 Z" />
      </svg>
    </div>
  );
}

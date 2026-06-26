import React, { useState } from 'react';
import AppLogo from './AppLogo.tsx';
import LoginForm from './LoginForm.tsx';
import DesktopIllustrationPanel from './DesktopIllustrationPanel.tsx';
import MobileIllustration from './MobileIllustration.tsx';
import DeviceSupportInfo from './DeviceSupportInfo.tsx';
import { LogOut, CheckCircle2, User } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess?: (username: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const handleLoginSuccess = (username: string) => {
    if (onLoginSuccess) {
      onLoginSuccess(username);
    }
  };

  return (
    <div
      id="login-page-root"
      className="min-h-screen bg-[#F8FAFD] flex items-center justify-center p-0 md:p-6 lg:p-8"
    >
      {/* ========================================== */}
      {/* DESKTOP & TABLET TWO-COLUMN WRAPPER         */}
      {/* ========================================== */}
      <div
        id="desktop-main-container"
        className="hidden lg:flex w-full max-w-[1440px] h-[90vh] min-h-[750px] max-h-[960px] bg-white rounded-[20px] shadow-[0_16px_40px_rgba(15,31,61,0.08)] border border-[#DCE4F0] overflow-hidden select-none"
      >
        {/* Left Column (Promotional / Illustrations) */}
        <DesktopIllustrationPanel />

        {/* Right Column (Login Card and Info) */}
        <div
          id="desktop-right-column"
          className="flex-1 flex flex-col justify-between p-12 bg-[#F8FAFD] h-full"
        >
          {/* Spacer to push card to center */}
          <div id="right-panel-spacer-top" className="flex-1" />

          {/* Centered Login Card */}
          <div
            id="desktop-login-card"
            className="w-full max-w-[640px] mx-auto bg-white rounded-[20px] shadow-[0_12px_32px_rgba(15,31,61,0.05)] border border-[#DCE4F0] p-12 flex flex-col items-center animate-fade-in"
          >
            {/* Logo */}
            <AppLogo size={78} className="shadow-md" />

            {/* Title & Subtitle */}
            <div id="card-header-texts" className="text-center mt-6 mb-8 select-none">
              <h1
                id="card-title"
                className="text-[36px] font-bold text-[#0B1F44] tracking-tight leading-tight"
              >
                Seven Smarts Indonesia
              </h1>
              <p
                id="card-subtitle"
                className="text-[14px] font-medium text-[#66738D] mt-2.5 max-w-[340px] mx-auto leading-relaxed"
              >
                Masuk untuk melakukan absensi dan melihat data kehadiran
              </p>
              
              {/* Credentials tip for demo logins */}
              <div className="mt-4 px-4 py-2 bg-[#EEF5FF] text-[#0F5FEA] rounded-xl text-xs font-semibold border border-[#DEE9FF] inline-block space-y-1 text-left">
                <div>🔑 <strong>Karyawan:</strong> <span className="underline">budi</span> / <span className="underline">password123</span></div>
                <div>👑 <strong>Admin:</strong> <span className="underline">admin</span> / <span className="underline">password123</span></div>
              </div>
            </div>

            {/* Login Form Component */}
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          {/* Spacer to push footer to bottom */}
          <div id="right-panel-spacer-bottom" className="flex-1" />

          {/* Footer Support Info */}
          <DeviceSupportInfo variant="desktop" />
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE VERTICAL FLOW PAGE (below lg breakpoint) */}
      {/* ========================================== */}
      <div
        id="mobile-main-container"
        className="lg:hidden w-full min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#EEF5FF] px-6 py-8 flex flex-col justify-between max-w-[430px] mx-auto overflow-x-hidden"
      >
        {/* Top Header Block */}
        <div id="mobile-header-block" className="flex flex-col items-center text-center mt-4">
          <AppLogo size={72} className="shadow-md" />
          <h1
            id="mobile-title"
            className="text-[32px] font-bold text-[#0B1F44] tracking-tight mt-5 leading-none"
          >
            Seven Smarts Indonesia
          </h1>
          <p
            id="mobile-subtitle"
            className="text-[14px] font-semibold text-[#66738D] mt-2.5 text-center"
          >
            Masuk untuk melakukan absensi
          </p>

          {/* Mobile Credentials Tip */}
          <div className="mt-4 px-4 py-2 bg-[#EEF5FF] text-[#0F5FEA] rounded-xl text-[11px] font-bold border border-[#DEE9FF] inline-block space-y-1 text-left">
            <div>🔑 <strong>Karyawan:</strong> <span className="underline">budi</span> / <span className="underline">password123</span></div>
            <div>👑 <strong>Admin:</strong> <span className="underline">admin</span> / <span className="underline">password123</span></div>
          </div>
        </div>

        {/* Central Illustration Area */}
        <MobileIllustration />

        {/* Login Form Box */}
        <div id="mobile-form-box" className="w-full bg-white/45 p-1 rounded-[12px] backdrop-blur-sm">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>

        {/* Footer Device Support Info */}
        <DeviceSupportInfo variant="mobile" />
      </div>
    </div>
  );
}

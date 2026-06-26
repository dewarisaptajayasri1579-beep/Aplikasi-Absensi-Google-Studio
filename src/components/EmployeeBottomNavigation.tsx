/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, User } from 'lucide-react';

interface EmployeeBottomNavigationProps {
  activeTab: 'beranda' | 'akun';
  onTabChange: (tab: 'beranda' | 'akun') => void;
}

export default function EmployeeBottomNavigation({ activeTab, onTabChange }: EmployeeBottomNavigationProps) {
  return (
    <div 
      id="employee-bottom-nav" 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#DCE4F0] px-8 py-3.5 flex items-center justify-around z-50 shadow-[0_-4px_16px_rgba(15,31,61,0.04)] pb-safe"
    >
      {/* Tab Beranda */}
      <button 
        id="bottom-nav-beranda"
        onClick={() => onTabChange('beranda')}
        className="flex flex-col items-center gap-1 focus:outline-none group cursor-pointer transition-all"
      >
        <Home className={`w-5 h-5 transition-colors ${
          activeTab === 'beranda' 
            ? 'text-[#0F5FEA]' 
            : 'text-[#66738D] group-hover:text-[#0B1F44]'
        }`} />
        <span className={`text-[11px] font-bold ${
          activeTab === 'beranda' 
            ? 'text-[#0F5FEA]' 
            : 'text-[#66738D] group-hover:text-[#0B1F44]'
        }`}>
          Beranda
        </span>
      </button>

      {/* Tab Akun */}
      <button 
        id="bottom-nav-akun"
        onClick={() => onTabChange('akun')}
        className="flex flex-col items-center gap-1 focus:outline-none group cursor-pointer transition-all"
      >
        <User className={`w-5 h-5 transition-colors ${
          activeTab === 'akun' 
            ? 'text-[#0F5FEA]' 
            : 'text-[#66738D] group-hover:text-[#0B1F44]'
        }`} />
        <span className={`text-[11px] font-bold ${
          activeTab === 'akun' 
            ? 'text-[#0F5FEA]' 
            : 'text-[#66738D] group-hover:text-[#0B1F44]'
        }`}>
          Akun
        </span>
      </button>
    </div>
  );
}

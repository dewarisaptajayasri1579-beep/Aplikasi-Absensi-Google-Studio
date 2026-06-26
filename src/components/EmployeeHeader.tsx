/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface EmployeeHeaderProps {
  name: string;
  dateString: string;
}

export default function EmployeeHeader({ name, dateString }: EmployeeHeaderProps) {
  return (
    <div id="employee-header-container" className="w-full pt-6 pb-4 select-none">
      <div id="employee-header-top" className="flex items-center justify-between mb-5">
        <div id="employee-header-brand" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F5FEA] rounded-[11px] flex items-center justify-center text-white shadow-md shadow-blue-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" className="w-5 h-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="m16 11 2 2 4-4" />
            </svg>
          </div>
          <span className="text-[#0B1F44] text-[17px] font-bold tracking-tight">Absensi Karyawan</span>
        </div>
        <div id="employee-header-avatar" className="w-10 h-10 rounded-full border border-[#DCE4F0] overflow-hidden bg-[#EEF5FF]">
          <img 
            src="/images/employee-face-placeholder.svg" 
            alt="Profile Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div id="employee-header-greeting" className="text-left">
        <h2 className="text-[#0B1F44] text-[22px] font-bold tracking-tight flex items-center gap-1.5">
          Selamat Pagi, {name} <span className="animate-bounce">👋</span>
        </h2>
        <p className="text-[#66738D] text-[14px] mt-1 font-medium">{dateString}</p>
      </div>
    </div>
  );
}

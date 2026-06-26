/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Menu, LogOut, User } from 'lucide-react';

interface AdminTopbarProps {
  title: string;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onLogout: () => void;
  onToggleMobileSidebar?: () => void;
}

export default function AdminTopbar({
  title,
  searchQuery = '',
  onSearchChange,
  onLogout,
  onToggleMobileSidebar
}: AdminTopbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header id="admin-topbar" className="w-full h-[80px] bg-white border-b border-[#E3EAF3] flex items-center justify-between px-6 sticky top-0 z-20 select-none">
      
      {/* Page Title & Hamburger for Mobile */}
      <div className="flex items-center gap-4">
        {onToggleMobileSidebar && (
          <button 
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-[#0B1F44] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-[#0B1F44] text-[22px] lg:text-[24px] font-extrabold tracking-tight">
          {title}
        </h1>
      </div>

      {/* Center & Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Search Bar - Hidden on very small screens, visible on md+ */}
        {onSearchChange !== undefined && (
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3.5 w-[16px] h-[16px] text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari karyawan..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-[240px] h-[44px] pl-10 pr-4 rounded-[10px] border border-[#DCE4F0] bg-white text-[13px] font-semibold text-[#0B1F44] placeholder-gray-400 focus:outline-none focus:border-[#0F5FEA] focus:ring-2 focus:ring-[#EEF5FF] transition-all"
            />
          </div>
        )}

        {/* Date Selector Display */}
        <div className="hidden sm:flex items-center gap-2 h-[44px] px-3.5 rounded-[10px] border border-[#DCE4F0] bg-white text-[13px] font-bold text-[#0B1F44] cursor-pointer hover:bg-slate-50 transition-colors">
          <Calendar className="w-4.5 h-4.5 text-gray-400" />
          <span>21 Mei 2025 - 21 Mei 2025</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* User Account Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3.5 pl-3 py-1 rounded-full hover:bg-slate-50 transition-colors text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Admin Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-[#0B1F44] text-[13px] font-extrabold leading-tight">Admin</h4>
              <span className="text-gray-400 text-[11px] font-semibold">Administrator</span>
            </div>

            <ChevronDown className="hidden md:block w-4 h-4 text-gray-400 ml-1" />
          </button>

          {/* Profile Dropdown Menu */}
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 mt-2.5 w-[180px] bg-white rounded-[12px] border border-[#E3EAF3] shadow-[0_12px_32px_rgba(15,31,61,0.12)] z-50 py-1.5 animate-scale-up">
                <div className="px-4 py-2 border-b border-[#F0F4F8] md:hidden">
                  <h4 className="text-[#0B1F44] text-[13px] font-bold">Admin</h4>
                  <span className="text-[#66738D] text-[11px]">Administrator</span>
                </div>
                
                <button 
                  onClick={() => setShowDropdown(false)}
                  className="w-full h-[40px] px-4 flex items-center gap-2.5 text-[#0B1F44] hover:bg-slate-50 transition-colors text-left text-[13px] font-semibold cursor-pointer"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  Profil Saya
                </button>
                
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                  className="w-full h-[40px] px-4 flex items-center gap-2.5 text-red-500 hover:bg-red-50 transition-colors text-left text-[13px] font-bold cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

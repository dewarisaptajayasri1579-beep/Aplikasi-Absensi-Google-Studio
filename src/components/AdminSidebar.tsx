/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, ClipboardList, Users, Settings, HelpCircle, ChevronRight } from 'lucide-react';

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ currentPath, onNavigate, onCloseMobile }: AdminSidebarProps) {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: Home,
    },
    {
      name: 'Laporan Absensi',
      path: '/admin/laporan-absensi',
      icon: ClipboardList,
    },
    {
      name: 'Data Karyawan',
      path: '/admin/data-karyawan',
      icon: Users,
    },
    {
      name: 'Pengaturan',
      path: '/admin/pengaturan',
      icon: Settings,
    },
  ];

  const handleMenuClick = (path: string) => {
    onNavigate(path);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside id="admin-sidebar" className="w-[280px] h-screen bg-white border-r border-[#E3EAF3] flex flex-col justify-between sticky top-0 left-0 z-30 select-none">
      {/* Branding Section */}
      <div className="h-[80px] px-6 border-b border-[#F0F4F8] flex items-center gap-3">
        <div className="w-9 h-9 bg-[#0F5FEA] rounded-[10px] flex items-center justify-center text-white">
          <svg className="w-5.5 h-5.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span className="text-[#0B1F44] text-[17px] font-extrabold tracking-tight">
          Absensi Karyawan
        </span>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full h-[48px] rounded-[10px] px-4 flex items-center gap-3.5 transition-all text-left relative cursor-pointer group ${
                isActive
                  ? 'bg-[#EEF5FF] text-[#0F5FEA] font-bold'
                  : 'text-[#66738D] hover:text-[#0F5FEA] hover:bg-slate-50 font-semibold'
              }`}
            >
              {/* Vertical blue indicator on active menu */}
              {isActive && (
                <div className="absolute left-0 top-[25%] bottom-[25%] w-1 bg-[#0F5FEA] rounded-r-md" />
              )}
              
              <Icon className={`w-5 h-5 transition-colors shrink-0 ${
                isActive ? 'text-[#0F5FEA]' : 'text-[#66738D] group-hover:text-[#0F5FEA]'
              }`} />
              
              <span className="text-[14px] leading-none pt-0.5">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Section: Bantuan */}
      <div className="p-4 border-t border-[#F0F4F8]">
        <button className="w-full h-[48px] rounded-[10px] px-4 flex items-center justify-between text-[#66738D] hover:text-[#0F5FEA] hover:bg-slate-50 transition-colors font-semibold text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#66738D]" />
            <span className="text-[14px]">Bantuan</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </aside>
  );
}

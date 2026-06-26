/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LogOut, User, Building2, Calendar, ShieldCheck, Mail, MapPin } from 'lucide-react';
import EmployeeHeader from './EmployeeHeader';
import AttendanceStatusCard from './AttendanceStatusCard';
import AttendanceActionCard from './AttendanceActionCard';
import LocationStatusCard from './LocationStatusCard';
import InfoReminderCard from './InfoReminderCard';
import EmployeeBottomNavigation from './EmployeeBottomNavigation';
import { AttendanceRecord, AttendanceStatus } from '../types';

interface KaryawanDashboardProps {
  attendance: AttendanceRecord;
  status: AttendanceStatus;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function KaryawanDashboard({ attendance, status, onNavigate, onLogout }: KaryawanDashboardProps) {
  const [activeTab, setActiveTab] = useState<'beranda' | 'akun'>('beranda');

  // Human date string for greeting
  const getTodayDateString = () => {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  return (
    <div 
      id="karyawan-dashboard-viewport" 
      className="w-full max-w-[430px] mx-auto min-h-screen bg-[#F8FAFD] flex flex-col justify-between relative pb-[80px] px-5 select-none"
    >
      {activeTab === 'beranda' ? (
        /* TAB BERANDA */
        <div id="beranda-tab-content" className="w-full flex-1 flex flex-col pt-2 animate-fade-in">
          {/* Header */}
          <EmployeeHeader name="Budi" dateString={getTodayDateString()} />

          {/* Status Hari Ini */}
          <AttendanceStatusCard 
            status={status} 
            checkInTime={attendance.checkInTime} 
            checkOutTime={attendance.checkOutTime} 
          />

          {/* Menu Utama / Absen Actions */}
          <AttendanceActionCard 
            status={status}
            onCheckInClick={() => onNavigate('/karyawan/absen-berangkat')}
            onCheckOutClick={() => onNavigate('/karyawan/absen-pulang')}
          />

          {/* Lokasi Aktif */}
          <LocationStatusCard 
            coords={
              attendance.checkInLat && attendance.checkInLng 
                ? { latitude: attendance.checkInLat, longitude: attendance.checkInLng } 
                : null
            } 
          />

          {/* Card Informasi */}
          <InfoReminderCard />
        </div>
      ) : (
        /* TAB AKUN */
        <div id="akun-tab-content" className="w-full flex-1 flex flex-col pt-8 animate-fade-in text-left">
          {/* Cover Avatar Block */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#EEF5FF] mb-4">
              <img 
                src="/images/employee-face-placeholder.svg" 
                alt="Budi Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-[#0B1F44] text-[20px] font-extrabold tracking-tight">Budi Setiawan</h3>
            <p className="text-[#66738D] text-[13px] font-semibold">Staff Operasional</p>
          </div>

          {/* Account Detail List */}
          <div className="bg-white rounded-[18px] border border-[#E3EAF3] p-5 shadow-[0_8px_24px_rgba(15,31,61,0.06)] space-y-4 mb-6">
            <div className="flex items-center gap-3.5 pb-3 border-b border-[#F0F4F8]">
              <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-[#0F5FEA] flex items-center justify-center">
                <User className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[#66738D] text-[11px] font-semibold">Username / NIP</p>
                <p className="text-[#0B1F44] text-[13px] font-bold">budi / NIP20268801</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pb-3 border-b border-[#F0F4F8]">
              <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-[#0F5FEA] flex items-center justify-center">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[#66738D] text-[11px] font-semibold">Email Resmi</p>
                <p className="text-[#0B1F44] text-[13px] font-bold">budi@perusahaan.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pb-3 border-b border-[#F0F4F8]">
              <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-[#0F5FEA] flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[#66738D] text-[11px] font-semibold">Departemen</p>
                <p className="text-[#0B1F44] text-[13px] font-bold">Logistik & Distribusi</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-[#0F5FEA] flex items-center justify-center">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[#66738D] text-[11px] font-semibold">Kantor Kerja</p>
                <p className="text-[#0B1F44] text-[13px] font-bold">Kantor Pusat Jakarta</p>
              </div>
            </div>
          </div>

          {/* Logout Action Button */}
          <button
            onClick={onLogout}
            className="w-full h-[50px] bg-[#FDECEC] text-[#EF4444] rounded-[14px] border border-[#EF4444]/10 font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#EF4444]/10 transition-colors cursor-pointer mb-6"
          >
            <LogOut className="w-4.5 h-4.5" />
            Keluar dari Akun
          </button>
        </div>
      )}

      {/* Sticky Bottom Navigation */}
      <EmployeeBottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

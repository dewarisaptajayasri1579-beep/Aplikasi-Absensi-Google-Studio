/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AttendanceStatus } from '../types';

interface AttendanceStatusCardProps {
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
}

export default function AttendanceStatusCard({ status, checkInTime, checkOutTime }: AttendanceStatusCardProps) {
  // Configs based on current status
  let badgeText = 'Belum Absen Berangkat';
  let badgeBg = 'bg-[#FDECEC]';
  let badgeTextColor = 'text-[#EF4444]';
  let BadgeIcon = AlertCircle;

  if (status === 'SUDAH_BERANGKAT') {
    badgeText = 'Sudah Absen Berangkat';
    badgeBg = 'bg-[#EEF5FF]';
    badgeTextColor = 'text-[#0F5FEA]';
    BadgeIcon = Clock;
  } else if (status === 'SUDAH_PULANG') {
    badgeText = 'Absensi Selesai';
    badgeBg = 'bg-[#EAFBF4]';
    badgeTextColor = 'text-[#10B981]';
    BadgeIcon = CheckCircle2;
  }

  return (
    <div 
      id="attendance-status-card" 
      className="w-full bg-white rounded-[18px] border border-[#E3EAF3] p-5 shadow-[0_8px_24px_rgba(15,31,61,0.06)] mb-5 select-none text-left"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[#0B1F44] text-[15px] font-bold">Status Hari Ini</span>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badgeBg} ${badgeTextColor}`}>
          <BadgeIcon className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold tracking-tight">{badgeText}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#DCE4F0] text-center">
        {/* Kolom 1 */}
        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0F5FEA]" />
            <span className="text-[#66738D] text-[11px] font-semibold">Jam Masuk</span>
          </div>
          <span className="text-[#0B1F44] text-[18px] font-extrabold tracking-tight">
            {checkInTime || '08:00'}
          </span>
        </div>

        {/* Kolom 2 */}
        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center gap-1 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0F5FEA]" />
            <span className="text-[#66738D] text-[11px] font-semibold">Jam Pulang</span>
          </div>
          <span className="text-[#0B1F44] text-[18px] font-extrabold tracking-tight">
            {checkOutTime || '17:00'}
          </span>
        </div>

        {/* Kolom 3 */}
        <div className="flex flex-col items-center justify-center py-1 px-1">
          <span className="text-[#66738D] text-[11px] font-semibold mb-1.5">Status</span>
          <span className={`text-[11px] font-bold leading-tight ${
            status === 'BELUM_ABSEN' ? 'text-[#EF4444]' :
            status === 'SUDAH_BERANGKAT' ? 'text-[#0F5FEA]' : 'text-[#10B981]'
          }`}>
            {status === 'BELUM_ABSEN' && 'Belum Absen Berangkat'}
            {status === 'SUDAH_BERANGKAT' && 'Sudah Absen Berangkat'}
            {status === 'SUDAH_PULANG' && 'Absensi Selesai'}
          </span>
        </div>
      </div>
    </div>
  );
}

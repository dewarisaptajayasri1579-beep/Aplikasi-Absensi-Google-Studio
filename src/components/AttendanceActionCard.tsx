/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, LogOut, CheckCircle2 } from 'lucide-react';
import { AttendanceStatus } from '../types';

interface AttendanceActionCardProps {
  status: AttendanceStatus;
  onCheckInClick: () => void;
  onCheckOutClick: () => void;
}

export default function AttendanceActionCard({ status, onCheckInClick, onCheckOutClick }: AttendanceActionCardProps) {
  const isCheckInDisabled = status !== 'BELUM_ABSEN';
  const isCheckOutDisabled = status !== 'SUDAH_BERANGKAT';

  return (
    <div id="attendance-actions" className="grid grid-cols-2 gap-4 mb-5 select-none">
      {/* Card Absen Berangkat */}
      <div 
        id="card-absen-berangkat" 
        className="bg-white rounded-[18px] border border-[#E3EAF3] p-4 flex flex-col justify-between shadow-[0_8px_24px_rgba(15,31,61,0.06)] text-left"
      >
        <div>
          <div className="w-full aspect-[4/3] mb-3 flex items-center justify-center overflow-hidden rounded-[12px] bg-slate-50">
            <img 
              src="/images/dashboard-checkin.svg" 
              alt="Dashboard Checkin" 
              className="w-full h-full object-contain p-2"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-[#0B1F44] text-[15px] font-bold mb-1">Absen Berangkat</h3>
          <p className="text-[#66738D] text-[11px] leading-relaxed mb-4 min-h-[32px]">
            Mulai aktivitas harimu dengan absen berangkat.
          </p>
        </div>

        {status === 'SUDAH_BERANGKAT' || status === 'SUDAH_PULANG' ? (
          <button
            disabled
            className="w-full h-[40px] bg-[#EAFBF4] text-[#10B981] rounded-[10px] font-bold text-[11px] px-1 flex items-center justify-center gap-1 border border-[#10B981]/10"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selesai
          </button>
        ) : (
          <button
            onClick={onCheckInClick}
            disabled={isCheckInDisabled}
            className={`w-full h-[40px] rounded-[10px] font-bold text-[11px] px-1 flex items-center justify-center gap-1 transition-all shadow-sm ${
              isCheckInDisabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200/50' 
                : 'bg-[#0F5FEA] text-white hover:bg-[#0F5FEA]/90 active:scale-[0.98] shadow-blue-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Absen Berangkat
          </button>
        )}
      </div>

      {/* Card Absen Pulang */}
      <div 
        id="card-absen-pulang" 
        className="bg-white rounded-[18px] border border-[#E3EAF3] p-4 flex flex-col justify-between shadow-[0_8px_24px_rgba(15,31,61,0.06)] text-left"
      >
        <div>
          <div className="w-full aspect-[4/3] mb-3 flex items-center justify-center overflow-hidden rounded-[12px] bg-slate-50">
            <img 
              src="/images/dashboard-checkout.svg" 
              alt="Dashboard Checkout" 
              className="w-full h-full object-contain p-2"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-[#0B1F44] text-[15px] font-bold mb-1">Absen Pulang</h3>
          <p className="text-[#66738D] text-[11px] leading-relaxed mb-4 min-h-[32px]">
            Akhiri aktivitas harimu dengan absen pulang.
          </p>
        </div>

        {status === 'SUDAH_PULANG' ? (
          <button
            disabled
            className="w-full h-[40px] bg-[#EAFBF4] text-[#10B981] rounded-[10px] font-bold text-[11px] px-1 flex items-center justify-center gap-1 border border-[#10B981]/10"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selesai
          </button>
        ) : (
          <button
            onClick={onCheckOutClick}
            disabled={isCheckOutDisabled}
            className={`w-full h-[40px] rounded-[10px] font-bold text-[11px] px-1 flex items-center justify-center gap-1 transition-all shadow-sm ${
              isCheckOutDisabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200/50' 
                : 'bg-[#0FAF8F] text-white hover:bg-[#0FAF8F]/90 active:scale-[0.98] shadow-emerald-200'
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            Absen Pulang
          </button>
        )}
      </div>
    </div>
  );
}

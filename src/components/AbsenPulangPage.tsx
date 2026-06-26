/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert, Clock, AlertCircle } from 'lucide-react';
import CameraCapture from './CameraCapture';
import AttendanceInfoCard from './AttendanceInfoCard';
import AttendanceSubmitButton from './AttendanceSubmitButton';
import AttendanceSuccessToast from './AttendanceSuccessToast';
import { AttendanceRecord } from '../types';

interface AbsenPulangPageProps {
  onBack: () => void;
  onSave: (record: Partial<AttendanceRecord>) => void;
  checkInTime?: string;
}

export default function AbsenPulangPage({ onBack, onSave, checkInTime }: AbsenPulangPageProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const hasCheckedIn = !!checkInTime;

  const handleLocationFetched = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const handleSave = () => {
    if (!photo || !coords || !hasCheckedIn) return;

    setIsLoading(true);

    // Simulate submission delay
    setTimeout(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');

      const record: Partial<AttendanceRecord> = {
        checkOutTime: `${hours}:${mins}`,
        checkOutDate: now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        checkOutPhoto: photo,
        checkOutLat: coords.lat,
        checkOutLng: coords.lng
      };

      onSave(record);
      setIsLoading(false);
      setShowToast(true);
    }, 1200);
  };

  return (
    <div id="absen-pulang-page" className="w-full max-w-[430px] mx-auto min-h-screen bg-[#F8FAFD] px-5 pt-6 pb-8 flex flex-col justify-between select-none">
      {/* Top Bar with Back Button */}
      <div id="absen-pulang-header" className="flex items-start gap-4 mb-5 text-left">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-[#DCE4F0] bg-white flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shrink-0 mt-1"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B1F44]" />
        </button>
        <div>
          <h1 className="text-[#0B1F44] text-[20px] font-extrabold tracking-tight">Absen Pulang</h1>
          <p className="text-[#66738D] text-[13px] font-medium mt-0.5">Lakukan check-out untuk mengakhiri kerja</p>
        </div>
      </div>

      {!hasCheckedIn ? (
        /* BLOCKED: If hasn't checked in yet */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4 border border-red-200/50">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-[#0B1F44] text-[16px] font-bold mb-2">Belum Absen Berangkat</h3>
          <p className="text-[#66738D] text-[13px] leading-relaxed max-w-[280px] mb-6">
            Anda harus mencatat absen berangkat terlebih dahulu sebelum dapat melakukan absen pulang.
          </p>
          <button
            onClick={onBack}
            className="px-6 h-[46px] bg-[#0F5FEA] text-white font-bold text-[13px] rounded-[10px] shadow-md shadow-blue-100 transition-all cursor-pointer"
          >
            Kembali ke Dashboard
          </button>
        </div>
      ) : (
        /* MAIN FORM: If already checked in */
        <>
          {/* Absen Berangkat Tercatat Summary Card */}
          <div className="w-full bg-white rounded-[18px] border border-[#E3EAF3] p-4 flex items-center justify-between shadow-[0_8px_24px_rgba(15,31,61,0.04)] mb-4 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#EAFBF4] text-[#10B981] flex items-center justify-center border border-[#10B981]/15">
                <CheckCircle2 className="w-5.5 h-5.5" />
              </div>
              <div>
                <h4 className="text-[#0B1F44] text-[13px] font-bold leading-tight">Absen Berangkat Tercatat</h4>
                <p className="text-[#66738D] text-[11px] font-semibold mt-0.5">Jam berangkat</p>
                <p className="text-[#0B1F44] text-[18px] font-extrabold tracking-tight mt-0.5">{checkInTime}</p>
              </div>
            </div>
            
            {/* Clock outline decoration on right */}
            <Clock className="w-10 h-10 text-[#0FAF8F]/15 shrink-0 stroke-[1.5]" />
          </div>

          {/* Camera Capture Section */}
          <div className="text-left mb-1.5">
            <span className="text-[#0B1F44] text-[14px] font-bold block">Foto untuk Absen Pulang</span>
            <span className="text-[#66738D] text-[11px] font-medium block mt-0.5 mb-2.5">Pastikan wajah terlihat jelas</span>
          </div>
          <CameraCapture onCapture={setPhoto} capturedPhoto={photo} />

          {/* Geolocation Info Card */}
          <AttendanceInfoCard 
            onLocationFetched={handleLocationFetched} 
            lat={coords ? coords.lat : null} 
            lng={coords ? coords.lng : null} 
          />

          {/* Reminder Alert Badge */}
          <div className="w-full bg-[#EEF5FF] rounded-[12px] border border-[#DEE9FF] px-4 py-3 flex items-center gap-2.5 text-left mb-6">
            <ShieldAlert className="w-4.5 h-4.5 text-[#0F5FEA] shrink-0" />
            <span className="text-[#0B1F44] text-[11px] font-bold">
              Pastikan foto jelas sebelum menyimpan absen pulang.
            </span>
          </div>

          {/* Big Submit Button */}
          <AttendanceSubmitButton 
            label="Simpan Absen Pulang" 
            onClick={handleSave} 
            disabled={!photo || !coords}
            isLoading={isLoading}
          />

          {/* Success Toast Overlay */}
          <AttendanceSuccessToast 
            message="Absen Pulang Anda berhasil dicatat hari ini." 
            isVisible={showToast} 
            onClose={onBack}
          />
        </>
      )}
    </div>
  );
}

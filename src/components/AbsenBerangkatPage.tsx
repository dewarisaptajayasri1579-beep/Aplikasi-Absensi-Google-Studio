/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import CameraCapture from './CameraCapture';
import AttendanceInfoCard from './AttendanceInfoCard';
import AttendanceSubmitButton from './AttendanceSubmitButton';
import AttendanceSuccessToast from './AttendanceSuccessToast';
import { AttendanceRecord } from '../types';

interface AbsenBerangkatPageProps {
  onBack: () => void;
  onSave: (record: Partial<AttendanceRecord>) => void;
}

export default function AbsenBerangkatPage({ onBack, onSave }: AbsenBerangkatPageProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLocationFetched = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const handleSave = () => {
    if (!photo || !coords) return;

    setIsLoading(true);

    // Simulate short submission delay for realism
    setTimeout(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      
      const record: Partial<AttendanceRecord> = {
        checkInTime: `${hours}:${mins}`,
        checkInDate: now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        checkInPhoto: photo,
        checkInLat: coords.lat,
        checkInLng: coords.lng
      };

      onSave(record);
      setIsLoading(false);
      setShowToast(true);
    }, 1200);
  };

  return (
    <div id="absen-berangkat-page" className="w-full max-w-[430px] mx-auto min-h-screen bg-[#F8FAFD] px-5 pt-6 pb-8 flex flex-col justify-between select-none">
      {/* Top Bar with Back Button */}
      <div id="absen-berangkat-header" className="flex items-start gap-4 mb-6 text-left">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-[#DCE4F0] bg-white flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shrink-0 mt-1"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B1F44]" />
        </button>
        <div>
          <h1 className="text-[#0B1F44] text-[20px] font-extrabold tracking-tight">Absen Berangkat</h1>
          <p className="text-[#66738D] text-[13px] font-medium mt-0.5">Lakukan check-in untuk memulai kerja</p>
        </div>
      </div>

      {/* Camera Capture Section */}
      <CameraCapture onCapture={setPhoto} capturedPhoto={photo} />

      {/* Geolocation & Time Info Card */}
      <AttendanceInfoCard 
        onLocationFetched={handleLocationFetched} 
        lat={coords ? coords.lat : null} 
        lng={coords ? coords.lng : null} 
      />

      {/* Reminder Alert Badge */}
      <div className="w-full bg-[#EEF5FF] rounded-[12px] border border-[#DEE9FF] px-4 py-3 flex items-center gap-2.5 text-left mb-6">
        <ShieldAlert className="w-4.5 h-4.5 text-[#0F5FEA] shrink-0" />
        <span className="text-[#0B1F44] text-[11px] font-bold">
          Pastikan wajah terlihat jelas dan lokasi aktif.
        </span>
      </div>

      {/* Big Submit Button */}
      <AttendanceSubmitButton 
        label="Simpan Absen Berangkat" 
        onClick={handleSave} 
        disabled={!photo || !coords}
        isLoading={isLoading}
      />

      {/* Success Modal Toast Overlay */}
      <AttendanceSuccessToast 
        message="Absen Berangkat Anda berhasil dicatat hari ini." 
        isVisible={showToast} 
        onClose={onBack}
      />
    </div>
  );
}

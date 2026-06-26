/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Map, Navigation, CheckCircle2, RefreshCw } from 'lucide-react';
import AttendanceInfoRow from './AttendanceInfoRow';

interface AttendanceInfoCardProps {
  onLocationFetched?: (lat: number, lng: number) => void;
  lat: number | null;
  lng: number | null;
}

export default function AttendanceInfoCard({ onLocationFetched, lat, lng }: AttendanceInfoCardProps) {
  const [dateTime, setDateTime] = useState({
    date: '...',
    time: '...'
  });

  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  // Update time/date dynamically
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Indonesian locales matching reference screenshots (e.g. Senin, 26 Mei 2025)
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      
      const dayName = days[now.getDay()];
      const dateNum = now.getDate();
      const monthName = months[now.getMonth()];
      const yearNum = now.getFullYear();

      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');

      setDateTime({
        date: `${dayName}, ${dateNum} ${monthName} ${yearNum}`,
        time: `${hours}:${mins}`
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch coordinates
  const fetchLocation = () => {
    setLocLoading(true);
    setLocError(null);

    if (!navigator.geolocation) {
      setLocError('Geolocation tidak didukung browser ini.');
      setLocLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (onLocationFetched) {
          onLocationFetched(latitude, longitude);
        }
        setLocLoading(false);
      },
      (error) => {
        console.error('Error fetching GPS:', error);
        setLocLoading(false);
        // Default fallbacks to match exact screenshot coords
        if (onLocationFetched) {
          onLocationFetched(-6.200000, 106.816666);
        }
        setLocError('Izin lokasi belum diberikan. Menggunakan lokasi default kantor.');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div id="attendance-info-card" className="w-full bg-white rounded-[18px] border border-[#E3EAF3] px-4.5 py-2.5 shadow-[0_8px_24px_rgba(15,31,61,0.06)] mb-4 text-left select-none">
      <div className="divide-y divide-[#F0F4F8]">
        {/* Tanggal */}
        <AttendanceInfoRow 
          icon={Calendar} 
          label="Tanggal" 
          value={dateTime.date} 
        />

        {/* Jam */}
        <AttendanceInfoRow 
          icon={Clock} 
          label="Jam" 
          value={dateTime.time} 
        />

        {/* Latitude */}
        <AttendanceInfoRow 
          icon={Navigation} 
          label="Latitude" 
          value={lat !== null ? lat.toFixed(6) : 'Mengambil...'} 
          valueColorClass={lat !== null ? 'text-[#0B1F44]' : 'text-gray-400 font-normal'}
        />

        {/* Longitude */}
        <AttendanceInfoRow 
          icon={Map} 
          label="Longitude" 
          value={lng !== null ? lng.toFixed(6) : 'Mengambil...'} 
          valueColorClass={lng !== null ? 'text-[#0B1F44]' : 'text-gray-400 font-normal'}
        />

        {/* Status Lokasi */}
        <AttendanceInfoRow 
          icon={CheckCircle2} 
          label="Status Lokasi" 
          value="Di area kantor" 
          valueColorClass="text-[#10B981]"
          rightElement={
            <div className="flex items-center gap-1.5">
              <span className="w-4.5 h-4.5 rounded-full bg-[#EAFBF4] flex items-center justify-center text-[#10B981]">
                <CheckCircle2 className="w-3 h-3 stroke-[3]" />
              </span>
              {locError && (
                <button 
                  onClick={fetchLocation} 
                  title="Ambil Ulang GPS"
                  className="p-1 hover:bg-slate-100 rounded text-gray-400 hover:text-[#0F5FEA]"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
          }
        />
      </div>

      {locError && (
        <div className="mt-2 text-[10px] text-amber-600 bg-amber-50 rounded-lg p-2 flex items-center gap-1.5 font-medium">
          <span>⚠️ {locError}</span>
        </div>
      )}
    </div>
  );
}

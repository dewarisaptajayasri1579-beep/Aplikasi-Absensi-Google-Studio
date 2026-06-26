/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

interface LocationStatusCardProps {
  onClick?: () => void;
  isLoading?: boolean;
  coords?: { latitude: number; longitude: number } | null;
}

export default function LocationStatusCard({ onClick, isLoading, coords }: LocationStatusCardProps) {
  return (
    <div 
      id="location-status-card"
      onClick={onClick}
      className="w-full bg-white rounded-[18px] border border-[#E3EAF3] p-4 flex items-center justify-between shadow-[0_8px_24px_rgba(15,31,61,0.06)] mb-4 cursor-pointer hover:bg-slate-50/50 active:scale-[0.99] transition-all select-none text-left"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#EEF5FF] flex items-center justify-center text-[#0F5FEA]">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-[#0B1F44] text-[14px] font-bold">Lokasi Aktif</h4>
          <p className="text-[#66738D] text-[12px] font-medium mt-0.5">
            {isLoading 
              ? 'Mengambil lokasi GPS...' 
              : coords 
                ? `GPS Aktif: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}` 
                : 'Siap ambil lokasi'}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-[#66738D]" />
    </div>
  );
}

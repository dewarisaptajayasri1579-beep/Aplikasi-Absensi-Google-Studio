/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface InfoReminderCardProps {
  text?: string;
}

export default function InfoReminderCard({ text = 'Pastikan GPS dan kamera aktif sebelum absen.' }: InfoReminderCardProps) {
  return (
    <div 
      id="info-reminder-card"
      className="w-full bg-[#EEF5FF] rounded-[18px] border border-[#DEE9FF] p-4 flex items-center justify-between relative overflow-hidden select-none text-left mb-6"
    >
      <div className="flex items-start gap-3 max-w-[65%] z-10">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0F5FEA] shrink-0 mt-0.5 shadow-sm">
          <ShieldCheck className="w-4.5 h-4.5" />
        </div>
        <p className="text-[#0B1F44] text-[12px] font-semibold leading-relaxed">
          {text}
        </p>
      </div>
      
      {/* Absolute background illustration on the right */}
      <div className="absolute right-0 bottom-0 top-0 w-[40%] flex items-center justify-end select-none pointer-events-none">
        <img 
          src="/images/location-reminder.svg" 
          alt="Location Reminder Illustration" 
          className="h-[120%] object-contain object-right"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AttendanceInfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  valueColorClass?: string;
  rightElement?: React.ReactNode;
}

export default function AttendanceInfoRow({ 
  icon: Icon, 
  label, 
  value, 
  valueColorClass = 'text-[#0B1F44]',
  rightElement
}: AttendanceInfoRowProps) {
  return (
    <div className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-[#E3EAF3] flex items-center justify-center text-[#0F5FEA]">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[#66738D] text-[13px] font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[13px] font-bold ${valueColorClass}`}>
          {value}
        </span>
        {rightElement}
      </div>
    </div>
  );
}

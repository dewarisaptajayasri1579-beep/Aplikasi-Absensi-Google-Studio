/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  colorType: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  colorType
}: StatCardProps) {
  
  // Custom theme variables matching reference system
  const colors = {
    blue: {
      bg: 'bg-[#EEF5FF]',
      text: 'text-[#0F5FEA]',
      border: 'border-[#DEE9FF]/70',
      sparkline: '#0F5FEA'
    },
    green: {
      bg: 'bg-[#EAFBF4]',
      text: 'text-[#10B981]',
      border: 'border-[#10B981]/10',
      sparkline: '#10B981'
    },
    orange: {
      bg: 'bg-[#FFF4DF]',
      text: 'text-[#F59E0B]',
      border: 'border-[#F59E0B]/10',
      sparkline: '#F59E0B'
    },
    red: {
      bg: 'bg-[#FDECEC]',
      text: 'text-[#EF4444]',
      border: 'border-[#EF4444]/10',
      sparkline: '#EF4444'
    },
    purple: {
      bg: 'bg-[#F1EAFE]',
      text: 'text-[#7C3AED]',
      border: 'border-[#7C3AED]/10',
      sparkline: '#7C3AED'
    }
  };

  const currentTheme = colors[colorType] || colors.blue;

  // Render a beautiful custom path based on colorType for exact mockup aesthetic
  const getSparklinePath = () => {
    switch(colorType) {
      case 'green':
        return "M2,18 C15,14 25,24 40,18 C55,12 65,4 78,2";
      case 'orange':
        return "M2,20 C15,20 25,10 40,12 C55,14 65,4 78,2";
      case 'red':
        return "M2,15 C15,10 25,22 40,20 C55,18 65,2 78,12";
      case 'purple':
        return "M2,18 C15,14 25,4 40,18 C55,20 65,10 78,5";
      case 'blue':
      default:
        return "M2,18 C15,22 25,8 40,12 C55,16 65,2 78,2";
    }
  };

  return (
    <div id={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white rounded-[14px] border border-[#E3EAF3] p-5.5 flex items-center justify-between shadow-[0_6px_20px_rgba(15,31,61,0.03)] select-none">
      
      {/* Left side: Information */}
      <div className="flex items-center gap-4">
        {/* Soft circle background with custom theme icon */}
        <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0 border ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text}`}>
          <Icon className="w-6 h-6 stroke-[2]" />
        </div>
        
        <div className="text-left">
          <p className="text-[#66738D] text-[13px] font-semibold tracking-tight">{title}</p>
          <p className="text-[#0B1F44] text-[30px] font-extrabold leading-none mt-1.5">{value}</p>
          <p className="text-[#66738D] text-[11px] font-semibold mt-2">{subtext}</p>
        </div>
      </div>

      {/* Right side: Mockup-precise mini Sparkline graph */}
      <div className="w-[80px] h-[36px] self-end mb-2.5 hidden sm:block">
        <svg className="w-full h-full" viewBox="0 0 80 24" fill="none">
          <path
            d={getSparklinePath()}
            stroke={currentTheme.sparkline}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

    </div>
  );
}

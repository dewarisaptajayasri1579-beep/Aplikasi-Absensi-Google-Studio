/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, 
  CircleCheck, 
  Clock, 
  AlarmClock, 
  ChevronDown, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import StatCard from './StatCard';
import { 
  WEEKLY_ATTENDANCE_DATA, 
  LATE_EMPLOYEES_TODAY, 
  RECENT_ACTIVITIES 
} from '../lib/dummy-data';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
  totalEmployees: number;
  activeCount: number;
  inactiveCount: number;
}

export default function DashboardPage({ 
  onNavigate, 
  totalEmployees,
  activeCount,
  inactiveCount
}: DashboardPageProps) {

  // Donut data breakdown:
  // Hadir: 19 (which is Tepat Waktu 15 + Terlambat 4)
  // Terlambat: 4
  // Belum Absen Pulang: 5
  // Total listed in mockup: Hadir: 19, Terlambat: 4, Belum Absen Pulang: 5 (sums to 28 represented or overlapping conceptually)
  // Let's use the exact chart values: Hadir (19), Terlambat (4), Belum Absen Pulang (5)
  const pieData = [
    { name: 'Hadir', value: 19, color: '#0F5FEA' },
    { name: 'Terlambat', value: 4, color: '#EF4444' },
    { name: 'Belum Absen Pulang', value: 5, color: '#F59E0B' },
  ];

  return (
    <div id="dashboard-page-content" className="space-y-6">
      
      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Total Karyawan" 
          value={totalEmployees} 
          subtext="Semua karyawan terdaftar" 
          icon={Users} 
          colorType="blue" 
        />
        <StatCard 
          title="Hadir Hari Ini" 
          value={19} 
          subtext="82.61% dari total karyawan" 
          icon={CircleCheck} 
          colorType="green" 
        />
        <StatCard 
          title="Belum Absen Pulang" 
          value={5} 
          subtext="21.74% dari total karyawan" 
          icon={Clock} 
          colorType="orange" 
        />
        <StatCard 
          title="Terlambat" 
          value={4} 
          subtext="17.39% dari total karyawan" 
          icon={AlarmClock} 
          colorType="red" 
        />
      </div>

      {/* Graphs & Charts Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left/Center: Weekly Attendance Bar Chart (takes 2 cols on xl) */}
        <div className="xl:col-span-2 bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#0B1F44] text-[16px] font-extrabold tracking-tight">
              Grafik Kehadiran Mingguan
            </h3>
            
            <button className="h-[36px] px-3.5 rounded-[8px] border border-[#DCE4F0] bg-white text-[12px] font-bold text-[#0B1F44] flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer">
              <span>7 Hari Terakhir</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Bar Chart Container */}
          <div className="w-full h-[280px] text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={WEEKLY_ATTENDANCE_DATA}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F8" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#66738D" 
                  dy={10} 
                  fontSize={10}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#66738D" 
                  dx={-5} 
                  fontSize={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '10px', 
                    borderColor: '#E3EAF3', 
                    boxShadow: '0 4px 12px rgba(15,31,61,0.05)',
                    fontFamily: 'sans-serif' 
                  }} 
                />
                <Bar 
                  dataKey="Hadir" 
                  fill="#0F5FEA" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={16}
                />
                <Bar 
                  dataKey="Tidak Hadir" 
                  fill="#DCE4F0" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Area */}
          <div className="flex justify-start gap-5 mt-4 pt-4 border-t border-[#F0F4F8] text-[12px] font-bold text-[#66738D]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0F5FEA]" />
              <span>Hadir</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DCE4F0]" />
              <span>Tidak Hadir</span>
            </div>
          </div>
        </div>

        {/* Right: Today's Status Donut Chart */}
        <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.03)] flex flex-col justify-between">
          <h3 className="text-[#0B1F44] text-[16px] font-extrabold tracking-tight mb-4">
            Status Kehadiran Hari Ini
          </h3>

          <div className="relative w-full h-[220px] flex items-center justify-center">
            {/* Center Label */}
            <div className="absolute flex flex-col items-center justify-center text-center select-none">
              <span className="text-[#0B1F44] text-[34px] font-extrabold leading-none tracking-tight">23</span>
              <span className="text-gray-400 text-[11px] font-bold tracking-wider mt-1 uppercase">Total</span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={88}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Table Panel */}
          <div className="space-y-2.5 mt-2.5 pt-4 border-t border-[#F0F4F8]">
            {pieData.map((item, idx) => {
              const percentages = ['82.61%', '17.39%', '21.74%']; // Conceptually matching mockups
              return (
                <div key={idx} className="flex items-center justify-between text-[12px] font-bold">
                  <div className="flex items-center gap-2.5 text-[#66738D]">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[#0B1F44]">
                    {item.value} <span className="text-gray-400 font-semibold ml-1">({percentages[idx]})</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Lower Summary Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Karyawan Terlambat Hari Ini */}
        <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.03)] flex flex-col justify-between">
          <div>
            <h3 className="text-[#0B1F44] text-[16px] font-extrabold tracking-tight mb-4">
              Karyawan Terlambat Hari Ini
            </h3>
            
            {/* Minimalist Late Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F0F4F8] text-[#66738D] text-[11px] font-extrabold tracking-wider uppercase">
                    <th className="py-3 font-semibold">Nama Karyawan</th>
                    <th className="py-3 font-semibold">Jabatan</th>
                    <th className="py-3 font-semibold">Jam Masuk</th>
                    <th className="py-3 font-semibold text-right">Terlambat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFD]">
                  {LATE_EMPLOYEES_TODAY.map((emp, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF]">
                          <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-[#0B1F44] text-[13px] font-extrabold">{emp.name}</span>
                      </td>
                      <td className="py-3 text-[#66738D] text-[12px] font-semibold">{emp.role}</td>
                      <td className="py-3 text-[#0B1F44] text-[12px] font-bold">{emp.time}</td>
                      <td className="py-3 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-[6px] bg-[#FDECEC] text-[#EF4444] text-[11px] font-bold">
                          {emp.duration}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/admin/laporan-absensi')}
            className="w-full mt-4 pt-4 border-t border-[#F0F4F8] text-[12px] font-extrabold text-[#0F5FEA] flex items-center justify-between hover:underline group cursor-pointer"
          >
            <span>Lihat semua karyawan terlambat</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Aktivitas Absensi Terbaru */}
        <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.03)] flex flex-col justify-between">
          <div>
            <h3 className="text-[#0B1F44] text-[16px] font-extrabold tracking-tight mb-4">
              Aktivitas Absensi Terbaru
            </h3>

            {/* Recent Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F0F4F8] text-[#66738D] text-[11px] font-extrabold tracking-wider uppercase">
                    <th className="py-3 font-semibold">Nama Karyawan</th>
                    <th className="py-3 font-semibold">Aktivitas</th>
                    <th className="py-3 font-semibold">Waktu</th>
                    <th className="py-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFD]">
                  {RECENT_ACTIVITIES.map((act, i) => {
                    const statusColors: Record<string, string> = {
                      'Hadir': 'bg-[#EAFBF4] text-[#10B981]',
                      'Terlambat': 'bg-[#FDECEC] text-[#EF4444]',
                      'Pulang': 'bg-[#FFF4DF] text-[#F59E0B]',
                    };
                    const badgeClass = statusColors[act.status] || 'bg-slate-100 text-slate-600';

                    return (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF]">
                            <img src={act.avatar} alt={act.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="text-[#0B1F44] text-[13px] font-extrabold">{act.name}</span>
                        </td>
                        <td className="py-3 text-[#66738D] text-[12px] font-semibold">{act.activity}</td>
                        <td className="py-3 text-[#0B1F44] text-[12px] font-bold">{act.time}</td>
                        <td className="py-3 text-right">
                          <span className={`inline-block px-2.5 py-1 rounded-[6px] text-[11px] font-bold ${badgeClass}`}>
                            {act.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/admin/laporan-absensi')}
            className="w-full mt-4 pt-4 border-t border-[#F0F4F8] text-[12px] font-extrabold text-[#0F5FEA] flex items-center justify-between hover:underline group cursor-pointer"
          >
            <span>Lihat semua aktivitas</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

    </div>
  );
}

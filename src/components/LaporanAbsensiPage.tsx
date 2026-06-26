/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  AlarmClock, 
  CircleCheck, 
  Calendar, 
  MapPin, 
  Download, 
  Eye, 
  X,
  ExternalLink
} from 'lucide-react';
import StatCard from './StatCard';
import { INITIAL_ATTENDANCE } from '../lib/dummy-data';
import { AdminAttendanceRecord } from '../types';

interface LaporanAbsensiPageProps {
  searchQuery: string;
}

export default function LaporanAbsensiPage({ searchQuery }: LaporanAbsensiPageProps) {
  const [records, setRecords] = useState<AdminAttendanceRecord[]>(INITIAL_ATTENDANCE);
  
  // Filters
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState<string>('Semua');

  // Modals
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; title: string } | null>(null);
  const [previewLocation, setPreviewLocation] = useState<{
    record: AdminAttendanceRecord;
    type: 'Masuk' | 'Pulang';
  } | null>(null);

  // Apply search query from Topbar & local dropdown filters
  const filteredRecords = records.filter(rec => {
    // Topbar search filter
    const matchesSearch = rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status Filter
    const matchesStatus = selectedStatus === 'Semua' || 
      (selectedStatus === 'Hadir' && rec.status === 'Hadir') ||
      (selectedStatus === 'Terlambat' && rec.status === 'Terlambat') ||
      (selectedStatus === 'Belum Absen Pulang' && rec.status === 'Belum Absen Pulang');

    // Employee Filter dropdown
    const matchesEmployee = selectedEmployeeFilter === 'Semua' || rec.employeeName === selectedEmployeeFilter;

    return matchesSearch && matchesStatus && matchesEmployee;
  });

  // Export to CSV function
  const handleExportCSV = () => {
    // Headers matching table
    const headers = ['Nama Karyawan', 'Tanggal Absensi', 'Jam Berangkat', 'Jam Pulang', 'Status', 'Lokasi Berangkat', 'Lokasi Pulang'];
    
    const rows = filteredRecords.map(rec => [
      rec.employeeName,
      rec.date,
      rec.checkInTime || '-',
      rec.checkOutTime || '-',
      rec.status,
      rec.addressIn || '-',
      rec.addressOut || '-'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan-absensi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="laporan-absensi-page-content" className="space-y-6 select-none">
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Total Karyawan Hadir" 
          value={23} 
          subtext="Dari 23 karyawan" 
          icon={Users} 
          colorType="blue" 
        />
        <StatCard 
          title="Belum Absen Pulang" 
          value={5} 
          subtext="17.86% dari total karyawan" 
          icon={Clock} 
          colorType="orange" 
        />
        <StatCard 
          title="Terlambat" 
          value={4} 
          subtext="14.29% dari total karyawan" 
          icon={AlarmClock} 
          colorType="red" 
        />
        <StatCard 
          title="Tepat Waktu" 
          value={19} 
          subtext="67.86% dari total karyawan" 
          icon={CircleCheck} 
          colorType="green" 
        />
      </div>

      {/* Filter Row Section */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_6px_20px_rgba(15,31,61,0.02)]">
        
        {/* Dropdown Filters Left */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Tanggal Filter (mimicked as disabled range picker indicator) */}
          <div className="h-[40px] px-3.5 rounded-[8px] border border-[#DCE4F0] bg-[#F8FAFD] text-[12px] font-bold text-gray-400 flex items-center gap-2 cursor-not-allowed">
            <Calendar className="w-4 h-4" />
            <span>21 Mei 2025</span>
          </div>

          {/* Karyawan Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedEmployeeFilter}
              onChange={(e) => setSelectedEmployeeFilter(e.target.value)}
              className="h-[40px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] bg-white text-[12px] font-bold text-[#0B1F44] focus:outline-none focus:border-[#0F5FEA] appearance-none cursor-pointer"
            >
              <option value="Semua">👤 Semua Karyawan</option>
              {Array.from(new Set(records.map(r => r.employeeName))).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-[40px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] bg-white text-[12px] font-bold text-[#0B1F44] focus:outline-none focus:border-[#0F5FEA] appearance-none cursor-pointer"
            >
              <option value="Semua">📋 Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Belum Absen Pulang">Belum Absen Pulang</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>

        {/* Export Button Right */}
        <button
          onClick={handleExportCSV}
          className="h-[40px] px-4 rounded-[8px] border border-[#DCE4F0] hover:bg-slate-50 text-[12px] font-bold text-[#0B1F44] flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-gray-400" />
          <span>Export CSV</span>
        </button>

      </div>

      {/* Main Attendance Table */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] shadow-[0_6px_20px_rgba(15,31,61,0.03)] overflow-hidden">
        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#F0F4F8] bg-[#FAFBFD] text-[#66738D] text-[11px] font-extrabold tracking-wider uppercase">
                <th className="py-4.5 px-5 font-semibold">Nama Karyawan</th>
                <th className="py-4.5 px-5 font-semibold">Tanggal Absensi</th>
                <th className="py-4.5 px-5 font-semibold">Jam Berangkat</th>
                <th className="py-4.5 px-5 font-semibold">Jam Pulang</th>
                <th className="py-4.5 px-5 font-semibold text-center">Foto Berangkat</th>
                <th className="py-4.5 px-5 font-semibold text-center">Foto Pulang</th>
                <th className="py-4.5 px-5 font-semibold">Lokasi Berangkat</th>
                <th className="py-4.5 px-5 font-semibold">Lokasi Pulang</th>
                <th className="py-4.5 px-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F8]">
              {filteredRecords.map((rec) => {
                
                const statusColors: Record<string, string> = {
                  'Hadir': 'bg-[#EAFBF4] text-[#10B981]',
                  'Terlambat': 'bg-[#FFF4DF] text-[#F59E0B]',
                  'Belum Absen Pulang': 'bg-[#FFF4DF] text-[#F59E0B]',
                };

                return (
                  <tr key={rec.id} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* Nama Karyawan */}
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF] shrink-0">
                          <img 
                            src={rec.employeeAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'} 
                            alt={rec.employeeName} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="text-[#0B1F44] text-[13px] font-extrabold leading-tight">{rec.employeeName}</p>
                          <p className="text-[#66738D] text-[10px] font-semibold mt-0.5">{rec.employeeRole}</p>
                        </div>
                      </div>
                    </td>

                    {/* Tanggal Absensi */}
                    <td className="py-3 px-5 text-[#0B1F44] text-[13px] font-bold">{rec.date}</td>

                    {/* Jam Berangkat */}
                    <td className="py-3 px-5 text-[#0B1F44] text-[13px] font-extrabold">{rec.checkInTime || '-'}</td>

                    {/* Jam Pulang */}
                    <td className="py-3 px-5 text-[#0B1F44] text-[13px] font-extrabold">{rec.checkOutTime || '-'}</td>

                    {/* Foto Berangkat */}
                    <td className="py-3 px-5 text-center">
                      {rec.checkInPhoto ? (
                        <button
                          onClick={() => setPreviewPhoto({ url: rec.checkInPhoto!, title: `Foto Berangkat - ${rec.employeeName}` })}
                          className="inline-block w-8.5 h-11 rounded-[6px] overflow-hidden border border-[#DCE4F0] cursor-pointer hover:opacity-85 active:scale-95 transition-all relative group"
                        >
                          <img src={rec.checkInPhoto} alt="Berangkat" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-[#0B1F44]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>

                    {/* Foto Pulang */}
                    <td className="py-3 px-5 text-center">
                      {rec.checkOutPhoto ? (
                        <button
                          onClick={() => setPreviewPhoto({ url: rec.checkOutPhoto!, title: `Foto Pulang - ${rec.employeeName}` })}
                          className="inline-block w-8.5 h-11 rounded-[6px] overflow-hidden border border-[#DCE4F0] cursor-pointer hover:opacity-85 active:scale-95 transition-all relative group"
                        >
                          <img src={rec.checkOutPhoto} alt="Pulang" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-[#0B1F44]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ) : (
                        <div className="inline-flex w-8.5 h-11 items-center justify-center rounded-[6px] bg-slate-100 text-gray-400 text-xs font-bold border border-slate-200">
                          -
                        </div>
                      )}
                    </td>

                    {/* Lokasi Berangkat */}
                    <td className="py-3 px-5">
                      <button
                        onClick={() => setPreviewLocation({ record: rec, type: 'Masuk' })}
                        className="flex items-start gap-1.5 hover:text-[#0F5FEA] transition-colors text-left cursor-pointer group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#0F5FEA] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-[#0B1F44] text-[11px] font-extrabold leading-tight group-hover:text-[#0F5FEA]">{rec.locationNameIn || 'Kantor Pusat'}</p>
                          <p className="text-[#66738D] text-[10px] font-semibold mt-0.5 truncate max-w-[130px]">{rec.addressIn || 'Jl. Sudirman No. 1, Jakarta Pusat'}</p>
                        </div>
                      </button>
                    </td>

                    {/* Lokasi Pulang */}
                    <td className="py-3 px-5">
                      {rec.checkOutTime ? (
                        <button
                          onClick={() => setPreviewLocation({ record: rec, type: 'Pulang' })}
                          className="flex items-start gap-1.5 hover:text-[#0F5FEA] transition-colors text-left cursor-pointer group"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#0F5FEA] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-[#0B1F44] text-[11px] font-extrabold leading-tight group-hover:text-[#0F5FEA]">{rec.locationNameOut || 'Kantor Pusat'}</p>
                            <p className="text-[#66738D] text-[10px] font-semibold mt-0.5 truncate max-w-[130px]">{rec.addressOut || 'Jl. Sudirman No. 1, Jakarta'}</p>
                          </div>
                        </button>
                      ) : (
                        <div className="flex items-start gap-1.5 text-gray-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[11px] font-bold leading-tight">Belum Absen Pulang</p>
                            <p className="text-[10px] font-semibold mt-0.5">-</p>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-5">
                      <span className={`inline-block px-2.5 py-1 rounded-[6px] text-[11px] font-extrabold tracking-tight ${statusColors[rec.status] || 'bg-slate-100 text-slate-600'}`}>
                        {rec.status}
                      </span>
                    </td>

                  </tr>
                );
              })}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-400 font-semibold text-[13px]">
                    Tidak ada data laporan absensi yang sesuai filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredRecords.map(rec => (
            <div key={rec.id} className="p-4 rounded-xl border border-[#E3EAF3] bg-[#F8FAFD] space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF] shrink-0">
                    <img src={rec.employeeAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'} alt={rec.employeeName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-[#0B1F44] leading-tight">{rec.employeeName}</p>
                    <p className="text-[11px] font-semibold text-[#66738D] mt-0.5">{rec.employeeRole} • {rec.date}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${rec.status === 'Hadir' ? 'bg-[#EAFBF4] text-[#10B981]' : 'bg-[#FFF4DF] text-[#F59E0B]'}`}>
                    {rec.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#DCE4F0]">
                <div>
                  <p className="text-[10px] font-extrabold text-[#66738D] mb-1">JAM BERANGKAT</p>
                  <p className="text-[13px] font-extrabold text-[#0B1F44] mb-2">{rec.checkInTime || '-'}</p>
                  {rec.checkInPhoto && (
                    <img src={rec.checkInPhoto} alt="Berangkat" className="w-12 h-16 rounded-[6px] object-cover mb-2" />
                  )}
                  <p className="text-[11px] text-[#66738D] mt-1">{rec.locationNameIn || 'Kantor Pusat'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-[#66738D] mb-1">JAM PULANG</p>
                  <p className="text-[13px] font-extrabold text-[#0B1F44] mb-2">{rec.checkOutTime || '-'}</p>
                  {rec.checkOutPhoto && (
                    <img src={rec.checkOutPhoto} alt="Pulang" className="w-12 h-16 rounded-[6px] object-cover mb-2" />
                  )}
                  {rec.checkOutTime && (
                    <p className="text-[11px] text-[#66738D] mt-1">{rec.locationNameOut || 'Kantor Pusat'}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredRecords.length === 0 && (
            <div className="py-8 text-center text-gray-400 font-semibold text-[13px]">
              Tidak ada data laporan absensi yang sesuai filter.
            </div>
          )}
        </div>
      </div>

      {/* MODAL PREVIEW FOTO */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0B1F44]/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[20px] overflow-hidden max-w-[360px] w-full border border-[#DCE4F0] shadow-[0_16px_40px_rgba(15,31,61,0.2)] animate-scale-up relative">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute right-4.5 top-4.5 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center shadow-md text-[#0B1F44] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            
            <div className="aspect-square bg-slate-900 flex items-center justify-center">
              <img src={previewPhoto.url} alt="Snapshot" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            
            <div className="p-5 text-left bg-[#F8FAFD] border-t border-[#F0F4F8]">
              <h4 className="text-[#0B1F44] text-[14px] font-extrabold tracking-tight">
                {previewPhoto.title}
              </h4>
              <p className="text-gray-400 text-[11px] font-semibold mt-1">Verified Snapshot Absensi</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL LOKASI */}
      {previewLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0B1F44]/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[20px] overflow-hidden max-w-[380px] w-full border border-[#DCE4F0] shadow-[0_16px_40px_rgba(15,31,61,0.2)] animate-scale-up text-left p-6 relative">
            
            <button
              onClick={() => setPreviewLocation(null)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0B1F44] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#F0F4F8]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0F5FEA] flex items-center justify-center shrink-0">
                <MapPin className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="text-[#0B1F44] text-[15px] font-extrabold tracking-tight">Detail Lokasi GPS</h3>
                <p className="text-[#66738D] text-[11px] font-semibold">Absensi {previewLocation.type}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-[12px] font-semibold text-[#66738D]">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Nama Karyawan</span>
                <span className="text-[#0B1F44] text-[13px] font-extrabold block mt-0.5">{previewLocation.record.employeeName}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Jenis Absensi</span>
                <span className="text-[#0B1F44] text-[13px] font-bold block mt-0.5">Absen {previewLocation.type}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Latitude</span>
                  <span className="text-[#0B1F44] font-bold block mt-0.5 font-mono">
                    {previewLocation.type === 'Masuk' 
                      ? (previewLocation.record.checkInLat ? previewLocation.record.checkInLat.toFixed(6) : '-6.200000') 
                      : (previewLocation.record.checkOutLat ? previewLocation.record.checkOutLat.toFixed(6) : '-6.199800')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Longitude</span>
                  <span className="text-[#0B1F44] font-bold block mt-0.5 font-mono">
                    {previewLocation.type === 'Masuk' 
                      ? (previewLocation.record.checkInLng ? previewLocation.record.checkInLng.toFixed(6) : '106.816666') 
                      : (previewLocation.record.checkOutLng ? previewLocation.record.checkOutLng.toFixed(6) : '106.816900')}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Nama Lokasi / Kantor</span>
                <span className="text-[#0B1F44] font-bold block mt-0.5">
                  {previewLocation.type === 'Masuk' ? previewLocation.record.locationNameIn || 'Kantor Pusat' : previewLocation.record.locationNameOut || 'Kantor Pusat'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Alamat Lengkap</span>
                <span className="text-[#0B1F44] font-bold block mt-0.5 leading-relaxed">
                  {previewLocation.type === 'Masuk' ? previewLocation.record.addressIn || 'Jl. Sudirman No. 1, Jakarta Pusat' : previewLocation.record.addressOut || 'Jl. Sudirman No. 1, Jakarta Pusat'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setPreviewLocation(null)}
                className="w-full h-[44px] bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white font-bold rounded-[8px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[13px]"
              >
                Tutup Detail
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

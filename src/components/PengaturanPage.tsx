/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings, 
  Clock, 
  MapPin, 
  Bell, 
  Navigation, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { DEFAULT_SETTINGS } from '../lib/dummy-data';
import { AttendanceSettings } from '../types';

export default function PengaturanPage() {
  const [settings, setSettings] = useState<AttendanceSettings>(() => {
    const saved = localStorage.getItem('employee_attendance_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [showToast, setShowToast] = useState<boolean>(false);

  const handleToggleHariKerja = (hari: string) => {
    const currentHari = settings.hariKerja || [];
    let updated: string[];
    if (currentHari.includes(hari)) {
      updated = currentHari.filter(h => h !== hari);
    } else {
      updated = [...currentHari, hari];
    }
    setSettings({ ...settings, hariKerja: updated });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('employee_attendance_settings', JSON.stringify(settings));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  return (
    <div id="pengaturan-page-content" className="space-y-6 select-none text-left font-sans">
      
      {/* Toast Notification for Save Success */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 p-4.5 rounded-[12px] bg-[#EAFBF4] border border-[#10B981]/20 shadow-[0_12px_32px_rgba(16,185,129,0.12)] flex items-center gap-3 animate-slide-left max-w-[340px]">
          <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
            <CheckCircle className="w-4.5 h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-[#0B1F44] text-[13px] font-extrabold leading-tight">Pengaturan Disimpan</h4>
            <p className="text-gray-400 text-[11px] font-semibold mt-0.5">Berhasil memperbarui aturan absensi</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: Jam Kerja & Hari Kerja */}
        <div className="space-y-6">
          
          {/* Jam Kerja Card */}
          <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.02)] space-y-4">
            
            <div className="flex items-center gap-2.5 pb-4.5 border-b border-[#F0F4F8]">
              <div className="w-9 h-9 rounded-lg bg-[#EEF5FF] text-[#0F5FEA] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[#0B1F44] text-[15px] font-extrabold tracking-tight">Aturan Jam Kerja</h3>
                <p className="text-[#66738D] text-[11px] font-semibold">Tentukan rentang operasional absensi</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[12px] font-bold">
              <div>
                <label className="text-[#66738D] text-[10px] block uppercase font-extrabold tracking-wider mb-1.5">Jam Masuk (Check-in)</label>
                <input
                  type="time"
                  required
                  value={settings.jamMasuk}
                  onChange={(e) => setSettings({ ...settings, jamMasuk: e.target.value })}
                  className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] transition-all text-[13px]"
                />
              </div>

              <div>
                <label className="text-[#66738D] text-[10px] block uppercase font-extrabold tracking-wider mb-1.5">Jam Pulang (Check-out)</label>
                <input
                  type="time"
                  required
                  value={settings.jamPulang}
                  onChange={(e) => setSettings({ ...settings, jamPulang: e.target.value })}
                  className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] transition-all text-[13px]"
                />
              </div>
            </div>

            <div className="text-[12px] font-bold pt-1">
              <label className="text-[#66738D] text-[10px] block uppercase font-extrabold tracking-wider mb-1.5">Toleransi Keterlambatan (Menit)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={settings.toleransiKeterlambatan}
                  onChange={(e) => setSettings({ ...settings, toleransiKeterlambatan: parseInt(e.target.value) || 0 })}
                  className="w-full h-[44px] pl-3.5 pr-14 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] transition-all text-[13px]"
                />
                <span className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] font-bold">menit</span>
              </div>
            </div>

          </div>

          {/* Hari Kerja Card */}
          <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.02)] space-y-4">
            
            <div className="flex items-center gap-2.5 pb-4.5 border-b border-[#F0F4F8]">
              <div className="w-9 h-9 rounded-lg bg-[#EAFBF4] text-[#10B981] flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[#0B1F44] text-[15px] font-extrabold tracking-tight">Aturan Hari Kerja</h3>
                <p className="text-[#66738D] text-[11px] font-semibold">Aktifkan hari kerja bagi seluruh staf</p>
              </div>
            </div>

            {/* List of checkboxes styled neatly */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-[13px] font-bold text-[#0B1F44]">
              {daysOfWeek.map((day) => {
                const isChecked = settings.hariKerja?.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleToggleHariKerja(day)}
                    className={`h-[44px] px-3.5 rounded-[8px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked 
                        ? 'border-[#0F5FEA] bg-[#EEF5FF] text-[#0F5FEA]' 
                        : 'border-[#DCE4F0] hover:bg-slate-50 text-gray-600'
                    }`}
                  >
                    <span>{day}</span>
                    <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all ${
                      isChecked ? 'bg-[#0F5FEA] text-white' : 'border-2 border-gray-300'
                    }`}>
                      {isChecked && (
                        <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Lokasi & Notifikasi Pengingat */}
        <div className="space-y-6">
          
          {/* Geolocation Kantor Card */}
          <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.02)] space-y-4">
            
            <div className="flex items-center gap-2.5 pb-4.5 border-b border-[#F0F4F8]">
              <div className="w-9 h-9 rounded-lg bg-[#FFF4DF] text-[#F59E0B] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[#0B1F44] text-[15px] font-extrabold tracking-tight">Radius & Koordinat Kantor</h3>
                <p className="text-[#66738D] text-[11px] font-semibold">Kunci batasan absensi fisik karyawan</p>
              </div>
            </div>

            {/* GPS Lock toggle */}
            <div className="flex items-center justify-between h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] bg-[#F8FAFD] text-[13px] font-bold text-[#0B1F44] select-none">
              <span>Wajib Kunci Lokasi GPS</span>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, gpsWajibAktif: !settings.gpsWajibAktif })}
                className={`w-[44px] h-[24px] rounded-full relative transition-colors cursor-pointer shrink-0 ${
                  settings.gpsWajibAktif ? 'bg-[#0F5FEA]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all shadow-[0_2px_4px_rgba(15,31,61,0.1)] ${
                  settings.gpsWajibAktif ? 'left-[23px]' : 'left-[3px]'
                }`} />
              </button>
            </div>

            {/* Lokasi Kantor Select Dropdown */}
            <div className="text-[12px] font-bold">
              <label className="text-[#66738D] text-[10px] block uppercase font-extrabold tracking-wider mb-1.5">Lokasi Kantor Resmi</label>
              <div className="relative">
                <select
                  value={settings.lokasiKantor}
                  onChange={(e) => setSettings({ ...settings, lokasiKantor: e.target.value })}
                  className="w-full h-[44px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] appearance-none bg-white transition-all text-[13px]"
                >
                  <option value="Kantor Pusat">Kantor Pusat (Sudirman, JKT)</option>
                  <option value="Kantor Cabang A">Kantor Cabang A (Bandung)</option>
                  <option value="Kantor Cabang B">Kantor Cabang B (Surabaya)</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Pengingat Notifikasi Card */}
          <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-5 lg:p-6 shadow-[0_6px_20px_rgba(15,31,61,0.02)] space-y-4">
            
            <div className="flex items-center gap-2.5 pb-4.5 border-b border-[#F0F4F8]">
              <div className="w-9 h-9 rounded-lg bg-[#F1EAFE] text-[#7C3AED] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[#0B1F44] text-[15px] font-extrabold tracking-tight">Notifikasi Pengingat PWA</h3>
                <p className="text-[#66738D] text-[11px] font-semibold">Kirim notifikasi push ke handphone staf</p>
              </div>
            </div>

            {/* Reminder Berangkat Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] bg-white text-[13px] font-bold text-[#0B1F44] select-none">
                <span>Pengingat Absen Berangkat</span>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, reminderBerangkat: !settings.reminderBerangkat })}
                  className={`w-[44px] h-[24px] rounded-full relative transition-colors cursor-pointer shrink-0 ${
                    settings.reminderBerangkat ? 'bg-[#0F5FEA]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all shadow-[0_2px_4px_rgba(15,31,61,0.1)] ${
                    settings.reminderBerangkat ? 'left-[23px]' : 'left-[3px]'
                  }`} />
                </button>
              </div>

              {settings.reminderBerangkat && (
                <div className="text-[12px] font-bold animate-slide-down">
                  <div className="relative">
                    <select
                      value={settings.reminderBerangkatMenit}
                      onChange={(e) => setSettings({ ...settings, reminderBerangkatMenit: parseInt(e.target.value) || 15 })}
                      className="w-full h-[40px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] bg-white focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] appearance-none cursor-pointer text-[12px]"
                    >
                      <option value="5">5 menit sebelum jam masuk</option>
                      <option value="15">15 menit sebelum jam masuk</option>
                      <option value="30">30 menit sebelum jam masuk</option>
                      <option value="60">1 jam sebelum jam masuk</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reminder Pulang Toggle */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] bg-white text-[13px] font-bold text-[#0B1F44] select-none">
                <span>Pengingat Absen Pulang</span>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, reminderPulang: !settings.reminderPulang })}
                  className={`w-[44px] h-[24px] rounded-full relative transition-colors cursor-pointer shrink-0 ${
                    settings.reminderPulang ? 'bg-[#0F5FEA]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all shadow-[0_2px_4px_rgba(15,31,61,0.1)] ${
                    settings.reminderPulang ? 'left-[23px]' : 'left-[3px]'
                  }`} />
                </button>
              </div>

              {settings.reminderPulang && (
                <div className="text-[12px] font-bold animate-slide-down">
                  <div className="relative">
                    <select
                      value={settings.reminderPulangMenit}
                      onChange={(e) => setSettings({ ...settings, reminderPulangMenit: parseInt(e.target.value) || 15 })}
                      className="w-full h-[40px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] bg-white focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] appearance-none cursor-pointer text-[12px]"
                    >
                      <option value="5">5 menit sebelum jam pulang</option>
                      <option value="15">15 menit sebelum jam pulang</option>
                      <option value="30">30 menit sebelum jam pulang</option>
                      <option value="60">1 jam sebelum jam pulang</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Global Action Save Button spanning across full width at the bottom */}
        <div className="xl:col-span-2 pt-2">
          <button
            type="submit"
            className="w-full h-[52px] rounded-[10px] bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white font-extrabold text-[14px] shadow-[0_8px_24px_rgba(15,95,234,0.18)] transition-all flex items-center justify-center cursor-pointer select-none"
          >
            Simpan Pengaturan
          </button>
        </div>

      </form>

    </div>
  );
}

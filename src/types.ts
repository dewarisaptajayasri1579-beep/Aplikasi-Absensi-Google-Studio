/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AttendanceRecord {
  checkInTime?: string;
  checkInDate?: string;
  checkInPhoto?: string;
  checkInLat?: number;
  checkInLng?: number;
  checkOutTime?: string;
  checkOutDate?: string;
  checkOutPhoto?: string;
  checkOutLat?: number;
  checkOutLng?: number;
}

export type AttendanceStatus = 'BELUM_ABSEN' | 'SUDAH_BERANGKAT' | 'SUDAH_PULANG';

export interface Employee {
  id: string;
  name: string;
  phone: string;
  role: string;
  status: 'Aktif' | 'Nonaktif';
  avatar?: string;
}

export interface AdminAttendanceRecord {
  id: string;
  employeeName: string;
  employeeAvatar?: string;
  employeeRole: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInPhoto?: string;
  checkOutPhoto?: string;
  checkInLat?: number;
  checkInLng?: number;
  checkOutLat?: number;
  checkOutLng?: number;
  status: 'Hadir' | 'Terlambat' | 'Belum Absen Pulang' | 'Pulang';
  locationNameIn?: string;
  locationNameOut?: string;
  addressIn?: string;
  addressOut?: string;
}

export interface AttendanceSettings {
  jamMasuk: string;
  jamPulang: string;
  toleransiKeterlambatan: number;
  hariKerja: string[];
  reminderBerangkat: boolean;
  reminderBerangkatMenit: number;
  reminderPulang: boolean;
  reminderPulangMenit: number;
  gpsWajibAktif: boolean;
  lokasiKantor: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  role: 'admin' | 'karyawan';
  name: string;
  username: string;
}


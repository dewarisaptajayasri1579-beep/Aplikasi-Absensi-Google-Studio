/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Employee, AdminAttendanceRecord, AttendanceSettings } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Budi Santoso', phone: '0812-3456-7890', role: 'Staff Admin', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '2', name: 'Siti Rahma', phone: '0813-2345-6789', role: 'Sales', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { id: '3', name: 'Andi Pratama', phone: '0812-8765-4321', role: 'Supervisor', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { id: '4', name: 'Rina Wulandari', phone: '0813-9876-5432', role: 'Finance', status: 'Nonaktif', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: '5', name: 'Dimas Saputra', phone: '0812-6543-2109', role: 'Operator', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face' },
  { id: '6', name: 'Nadia Putri', phone: '0813-1122-3344', role: 'HRD', status: 'Nonaktif', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  // Extra 17 items to match total "23" total employees with 19 Aktif, 4 Nonaktif (so far we have 4 Aktif, 2 Nonaktif)
  // Need 15 more Aktif, 2 more Nonaktif
  { id: '7', name: 'Eko Wijaya', phone: '0812-1111-2222', role: 'Staff Admin', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face' },
  { id: '8', name: 'Hendra Wijaya', phone: '0812-2222-3333', role: 'Sales', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
  { id: '9', name: 'Indah Lestari', phone: '0813-3333-4444', role: 'Finance', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face' },
  { id: '10', name: 'Joko Susilo', phone: '0812-4444-5555', role: 'Operator', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: '11', name: 'Kartika Sari', phone: '0813-5555-6666', role: 'Sales', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face' },
  { id: '12', name: 'Lukas Nugroho', phone: '0812-6666-7777', role: 'Supervisor', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&h=150&fit=crop&crop=face' },
  { id: '13', name: 'Maya Amelia', phone: '0813-7777-8888', role: 'HRD', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=face' },
  { id: '14', name: 'Nugroho Adi', phone: '0812-8888-9999', role: 'Operator', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { id: '15', name: 'Olivia Putri', phone: '0813-9999-0000', role: 'Finance', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  { id: '16', name: 'Pratama Putra', phone: '0812-0000-1111', role: 'Staff Admin', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face' },
  { id: '17', name: 'Rizky Amalia', phone: '0813-1111-3333', role: 'Sales', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face' },
  { id: '18', name: 'Syarif Hidayat', phone: '0812-2222-4444', role: 'Operator', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face' },
  { id: '19', name: 'Tuti Handayani', phone: '0813-3333-5555', role: 'Sales', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face' },
  { id: '20', name: 'Umar Faruq', phone: '0812-4444-6666', role: 'Staff Admin', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=150&h=150&fit=crop&crop=face' },
  { id: '21', name: 'Vina Panduwinata', phone: '0813-5555-7777', role: 'HRD', status: 'Aktif', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face' },
  // Nonaktif
  { id: '22', name: 'Wawan Gunawan', phone: '0812-6666-8888', role: 'Operator', status: 'Nonaktif', avatar: 'https://images.unsplash.com/photo-1504257401700-1a14c9d9d17d?w=150&h=150&fit=crop&crop=face' },
  { id: '23', name: 'Yulia Ningsih', phone: '0813-7777-9999', role: 'Sales', status: 'Nonaktif', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' }
];

export const DEFAULT_SETTINGS: AttendanceSettings = {
  jamMasuk: '08:00',
  jamPulang: '17:00',
  toleransiKeterlambatan: 15,
  hariKerja: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  reminderBerangkat: true,
  reminderBerangkatMenit: 15,
  reminderPulang: true,
  reminderPulangMenit: 15,
  gpsWajibAktif: true,
  lokasiKantor: 'Kantor Pusat'
};

export const INITIAL_ATTENDANCE: AdminAttendanceRecord[] = [
  {
    id: 'att-1',
    employeeName: 'Budi Santoso',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    employeeRole: 'Staff Admin',
    date: '21 Mei 2025',
    checkInTime: '08:02',
    checkOutTime: '17:18',
    checkInPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    checkOutPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    checkInLat: -6.200000,
    checkInLng: 106.816666,
    checkOutLat: -6.199800,
    checkOutLng: 106.816900,
    status: 'Hadir',
    locationNameIn: 'Kantor Pusat',
    locationNameOut: 'Kantor Pusat',
    addressIn: 'Jl. Sudirman No. 1, Jakarta Pusat',
    addressOut: 'Jl. Sudirman No. 1, Jakarta Pusat'
  },
  {
    id: 'att-2',
    employeeName: 'Siti Rahma',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    employeeRole: 'Sales',
    date: '21 Mei 2025',
    checkInTime: '08:45',
    checkOutTime: '17:30',
    checkInPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    checkOutPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    checkInLat: -6.200100,
    checkInLng: 106.816500,
    checkOutLat: -6.200200,
    checkOutLng: 106.816400,
    status: 'Hadir',
    locationNameIn: 'Kantor Pusat',
    locationNameOut: 'Kantor Pusat',
    addressIn: 'Jl. Sudirman No. 1, Jakarta Pusat',
    addressOut: 'Jl. Sudirman No. 1, Jakarta Pusat'
  },
  {
    id: 'att-3',
    employeeName: 'Andi Pratama',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    employeeRole: 'Supervisor',
    date: '21 Mei 2025',
    checkInTime: '09:15',
    checkOutTime: '17:42',
    checkInPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    checkOutPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    checkInLat: -6.199500,
    checkInLng: 106.817000,
    checkOutLat: -6.199600,
    checkOutLng: 106.817200,
    status: 'Terlambat',
    locationNameIn: 'Kantor Pusat',
    locationNameOut: 'Kantor Pusat',
    addressIn: 'Jl. Sudirman No. 1, Jakarta Pusat',
    addressOut: 'Jl. Sudirman No. 1, Jakarta Pusat'
  },
  {
    id: 'att-4',
    employeeName: 'Rina Wulandari',
    employeeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    employeeRole: 'Finance',
    date: '21 Mei 2025',
    checkInTime: '07:55',
    checkInPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    checkInLat: -6.200050,
    checkInLng: 106.816600,
    status: 'Belum Absen Pulang',
    locationNameIn: 'Kantor Pusat',
    addressIn: 'Jl. Sudirman No. 1, Jakarta Pusat'
  },
  {
    id: 'att-5',
    employeeName: 'Dimas Saputra',
    employeeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    employeeRole: 'Operator',
    date: '21 Mei 2025',
    checkInTime: '08:05',
    checkOutTime: '17:05',
    checkInPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
    checkOutPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
    checkInLat: -6.199900,
    checkInLng: 106.816700,
    checkOutLat: -6.200100,
    checkOutLng: 106.816800,
    status: 'Hadir',
    locationNameIn: 'Kantor Pusat',
    locationNameOut: 'Kantor Pusat',
    addressIn: 'Jl. Sudirman No. 1, Jakarta Pusat',
    addressOut: 'Jl. Sudirman No. 1, Jakarta Pusat'
  },
  {
    id: 'att-6',
    employeeName: 'Nadia Putri',
    employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    employeeRole: 'HRD',
    date: '21 Mei 2025',
    checkInTime: '09:20',
    checkOutTime: '17:10',
    checkInPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    checkOutPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    checkInLat: -6.200150,
    checkInLng: 106.816450,
    checkOutLat: -6.200050,
    checkOutLng: 106.816550,
    status: 'Terlambat',
    locationNameIn: 'Kantor Pusat',
    locationNameOut: 'Kantor Pusat',
    addressIn: 'Jl. Sudirman No. 1, Jakarta Pusat',
    addressOut: 'Jl. Sudirman No. 1, Jakarta Pusat'
  }
];

export const WEEKLY_ATTENDANCE_DATA = [
  { name: 'Sen, 15 Mei', Hadir: 20, 'Tidak Hadir': 3, dateLabel: '15 Mei' },
  { name: 'Sel, 16 Mei', Hadir: 18, 'Tidak Hadir': 5, dateLabel: '16 Mei' },
  { name: 'Rab, 17 Mei', Hadir: 21, 'Tidak Hadir': 2, dateLabel: '17 Mei' },
  { name: 'Kam, 18 Mei', Hadir: 19, 'Tidak Hadir': 4, dateLabel: '18 Mei' },
  { name: 'Jum, 19 Mei', Hadir: 20, 'Tidak Hadir': 3, dateLabel: '19 Mei' },
  { name: 'Sab, 20 Mei', Hadir: 14, 'Tidak Hadir': 9, dateLabel: '20 Mei' },
  { name: 'Min, 21 Mei', Hadir: 16, 'Tidak Hadir': 7, dateLabel: '21 Mei' }
];

export const LATE_EMPLOYEES_TODAY = [
  { name: 'Budi Santoso', role: 'Staff Admin', time: '08:25', duration: '25 menit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Siti Rahma', role: 'Sales', time: '08:30', duration: '30 menit', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Andi Pratama', role: 'Supervisor', time: '08:15', duration: '15 menit', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rina Wulandari', role: 'Finance', time: '08:10', duration: '10 menit', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
];

export const RECENT_ACTIVITIES = [
  { name: 'Dimas Saputra', activity: 'Absen Masuk', time: '08:05', status: 'Hadir', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face' },
  { name: 'Nadia Putri', activity: 'Absen Masuk', time: '08:02', status: 'Hadir', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Budi Santoso', activity: 'Absen Masuk', time: '08:25', status: 'Terlambat', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rina Wulandari', activity: 'Absen Pulang', time: '17:42', status: 'Pulang', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Andi Pratama', activity: 'Absen Pulang', time: '17:30', status: 'Pulang', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
];

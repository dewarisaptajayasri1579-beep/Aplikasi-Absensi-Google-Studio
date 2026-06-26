/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage.tsx';
import KaryawanDashboard from './components/KaryawanDashboard.tsx';
import AbsenBerangkatPage from './components/AbsenBerangkatPage.tsx';
import AbsenPulangPage from './components/AbsenPulangPage.tsx';

// Admin Page Imports
import AdminLayout from './components/AdminLayout.tsx';
import DashboardPage from './components/DashboardPage.tsx';
import LaporanAbsensiPage from './components/LaporanAbsensiPage.tsx';
import DataKaryawanPage from './components/DataKaryawanPage.tsx';
import PengaturanPage from './components/PengaturanPage.tsx';

import { AttendanceRecord, AttendanceStatus, Employee } from './types.ts';
import { INITIAL_EMPLOYEES } from './lib/dummy-data.ts';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'admin' | 'karyawan' | null>(null);
  
  // State for Karyawan attendance
  const [attendance, setAttendance] = useState<AttendanceRecord>({});
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('BELUM_ABSEN');

  // Search filter for admin panel
  const [adminSearchQuery, setAdminSearchQuery] = useState<string>('');

  // Local state for administrative counts
  const [employeesList, setEmployeesList] = useState<Employee[]>([]);

  // Load state from localStorage on startup
  useEffect(() => {
    const loginSession = localStorage.getItem('employee_is_logged_in');
    const storedRole = localStorage.getItem('employee_user_role') as 'admin' | 'karyawan' | null;
    
    if (loginSession === 'true') {
      setIsLoggedIn(true);
      setUserRole(storedRole || 'karyawan');
    }

    const attendanceData = localStorage.getItem('employee_attendance_today');
    if (attendanceData) {
      try {
        const parsed = JSON.parse(attendanceData) as AttendanceRecord;
        setAttendance(parsed);
        
        // Derive attendance status
        if (parsed.checkInTime) {
          if (parsed.checkOutTime) {
            setAttendanceStatus('SUDAH_PULANG');
          } else {
            setAttendanceStatus('SUDAH_BERANGKAT');
          }
        } else {
          setAttendanceStatus('BELUM_ABSEN');
        }
      } catch (e) {
        console.error('Failed to parse attendance data from localStorage:', e);
      }
    }

    // Load employees database to sync count across views
    const savedEmps = localStorage.getItem('employee_attendance_all_employees');
    if (savedEmps) {
      try {
        setEmployeesList(JSON.parse(savedEmps));
      } catch (e) {
        setEmployeesList(INITIAL_EMPLOYEES);
      }
    } else {
      setEmployeesList(INITIAL_EMPLOYEES);
    }
  }, []);

  useEffect(() => {
    // Sync employees list from local storage periodically in case of modifications
    const syncEmployees = () => {
      const savedEmps = localStorage.getItem('employee_attendance_all_employees');
      if (savedEmps) {
        try {
          setEmployeesList(JSON.parse(savedEmps));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', syncEmployees);
    return () => window.removeEventListener('storage', syncEmployees);
  }, []);

  useEffect(() => {
    // Basic history navigation listener for routing support
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Auto-register PWA service worker if available in browser
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('PWA ServiceWorker registered with scope: ', registration.scope);
          })
          .catch((error) => {
            console.error('PWA ServiceWorker registration failed: ', error);
          });
      });
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Custom router helper
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleLoginSuccess = (username: string) => {
    const cleanUsername = username.trim().toLowerCase();
    const role = cleanUsername.includes('admin') ? 'admin' : 'karyawan';
    
    localStorage.setItem('employee_is_logged_in', 'true');
    localStorage.setItem('employee_user_role', role);
    
    setIsLoggedIn(true);
    setUserRole(role);

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/karyawan/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employee_is_logged_in');
    localStorage.removeItem('employee_user_role');
    localStorage.removeItem('employee_attendance_today');
    setIsLoggedIn(false);
    setUserRole(null);
    setAttendance({});
    setAttendanceStatus('BELUM_ABSEN');
    navigate('/login');
  };

  const handleSaveCheckIn = (checkInRecord: Partial<AttendanceRecord>) => {
    const updated = { ...attendance, ...checkInRecord };
    setAttendance(updated);
    setAttendanceStatus('SUDAH_BERANGKAT');
    localStorage.setItem('employee_attendance_today', JSON.stringify(updated));
  };

  const handleSaveCheckOut = (checkOutRecord: Partial<AttendanceRecord>) => {
    const updated = { ...attendance, ...checkOutRecord };
    setAttendance(updated);
    setAttendanceStatus('SUDAH_PULANG');
    localStorage.setItem('employee_attendance_today', JSON.stringify(updated));
  };

  // -------------------------------------------------------------
  // ROUTING DEVIATIONS AND GUARDS
  // -------------------------------------------------------------

  // Force redirect `/` to login or correct dashboard on load
  if (currentPath === '/') {
    if (isLoggedIn) {
      if (userRole === 'admin') {
        setTimeout(() => navigate('/admin/dashboard'), 50);
      } else {
        setTimeout(() => navigate('/karyawan/dashboard'), 50);
      }
    } else {
      setTimeout(() => navigate('/login'), 50);
    }
    return null;
  }

  // Route: /login
  if (currentPath === '/login') {
    if (isLoggedIn) {
      if (userRole === 'admin') {
        setTimeout(() => navigate('/admin/dashboard'), 50);
      } else {
        setTimeout(() => navigate('/karyawan/dashboard'), 50);
      }
      return null;
    }

    return (
      <div id="app-viewport-wrapper" className="min-h-screen bg-[#F8FAFD] antialiased">
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // =============================================================
  // KARYAWAN (MOBILE PORTAL) ROUTING & GUARDS
  // =============================================================
  if (currentPath.startsWith('/karyawan')) {
    if (!isLoggedIn) {
      setTimeout(() => navigate('/login'), 50);
      return null;
    }
    
    if (userRole !== 'karyawan') {
      setTimeout(() => navigate('/admin/dashboard'), 50);
      return null;
    }

    // Sub-route: /karyawan/dashboard
    if (currentPath === '/karyawan/dashboard') {
      return (
        <div id="app-viewport-wrapper" className="min-h-screen bg-[#F8FAFD] antialiased">
          <KaryawanDashboard 
            attendance={attendance} 
            status={attendanceStatus} 
            onNavigate={navigate} 
            onLogout={handleLogout} 
          />
        </div>
      );
    }

    // Sub-route: /karyawan/absen-berangkat
    if (currentPath === '/karyawan/absen-berangkat') {
      return (
        <div id="app-viewport-wrapper" className="min-h-screen bg-[#F8FAFD] antialiased">
          <AbsenBerangkatPage 
            onBack={() => navigate('/karyawan/dashboard')} 
            onSave={handleSaveCheckIn} 
          />
        </div>
      );
    }

    // Sub-route: /karyawan/absen-pulang
    if (currentPath === '/karyawan/absen-pulang') {
      return (
        <div id="app-viewport-wrapper" className="min-h-screen bg-[#F8FAFD] antialiased">
          <AbsenPulangPage 
            onBack={() => navigate('/karyawan/dashboard')} 
            checkInTime={attendance.checkInTime}
            onSave={handleSaveCheckOut} 
          />
        </div>
      );
    }
  }

  // =============================================================
  // ADMIN (DESKTOP MANAGER) ROUTING & GUARDS
  // =============================================================
  if (currentPath.startsWith('/admin')) {
    if (!isLoggedIn) {
      setTimeout(() => navigate('/login'), 50);
      return null;
    }

    if (userRole !== 'admin') {
      setTimeout(() => navigate('/karyawan/dashboard'), 50);
      return null;
    }

    const totalEmployeesCount = employeesList.length || 23;
    const activeCount = employeesList.filter(e => e.status === 'Aktif').length || 19;
    const inactiveCount = employeesList.filter(e => e.status === 'Nonaktif').length || 4;

    // Sub-route: /admin/dashboard
    if (currentPath === '/admin/dashboard') {
      return (
        <AdminLayout
          title="Dashboard Admin"
          currentPath={currentPath}
          onNavigate={navigate}
          onLogout={handleLogout}
        >
          <DashboardPage 
            onNavigate={navigate} 
            totalEmployees={totalEmployeesCount}
            activeCount={activeCount}
            inactiveCount={inactiveCount}
          />
        </AdminLayout>
      );
    }

    // Sub-route: /admin/laporan-absensi
    if (currentPath === '/admin/laporan-absensi') {
      return (
        <AdminLayout
          title="Laporan Absensi"
          currentPath={currentPath}
          searchQuery={adminSearchQuery}
          onSearchChange={setAdminSearchQuery}
          onNavigate={navigate}
          onLogout={handleLogout}
        >
          <LaporanAbsensiPage searchQuery={adminSearchQuery} />
        </AdminLayout>
      );
    }

    // Sub-route: /admin/data-karyawan
    if (currentPath === '/admin/data-karyawan') {
      return (
        <AdminLayout
          title="Data Karyawan"
          currentPath={currentPath}
          searchQuery={adminSearchQuery}
          onSearchChange={setAdminSearchQuery}
          onNavigate={navigate}
          onLogout={handleLogout}
        >
          <DataKaryawanPage searchQuery={adminSearchQuery} />
        </AdminLayout>
      );
    }

    // Sub-route: /admin/pengaturan
    if (currentPath === '/admin/pengaturan') {
      return (
        <AdminLayout
          title="Pengaturan"
          currentPath={currentPath}
          onNavigate={navigate}
          onLogout={handleLogout}
        >
          <PengaturanPage />
        </AdminLayout>
      );
    }
  }

  // Fallback / Redirect to /login if anything else
  return (
    <div id="app-redirect-container" className="min-h-screen bg-[#F8FAFD] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="flex flex-col items-center gap-4">
        <p className="text-[#66738D] font-medium text-[15px]">Halaman tidak ditemukan.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 h-[48px] bg-[#0F5FEA] text-white font-semibold rounded-[8px] hover:bg-[#0F5FEA]/90 transition-all shadow-md text-[14px] cursor-pointer"
        >
          Masuk ke Halaman Login
        </button>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Plus, 
  Edit2, 
  Trash2, 
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import StatCard from './StatCard';
import { INITIAL_EMPLOYEES } from '../lib/dummy-data';
import { Employee } from '../types';

interface DataKaryawanPageProps {
  searchQuery: string;
}

export default function DataKaryawanPage({ searchQuery }: DataKaryawanPageProps) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('employee_attendance_all_employees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_EMPLOYEES;
      }
    }
    return INITIAL_EMPLOYEES;
  });

  // Filters
  const [selectedRole, setSelectedRole] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');

  // Form Modal States
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'Tambah' | 'Edit'>('Tambah');
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee> | null>(null);

  // Error/Success Notification state
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Delete Confirm modal
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Save employees to local storage when mutated
  useEffect(() => {
    localStorage.setItem('employee_attendance_all_employees', JSON.stringify(employees));
  }, [employees]);

  // Handle pagination and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'Semua' || emp.role === selectedRole;
    const matchesStatus = selectedStatus === 'Semua' || emp.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate stats dynamically
  const totalEmployeesCount = employees.length;
  const activeCount = employees.filter(e => e.status === 'Aktif').length;
  const inactiveCount = employees.filter(e => e.status === 'Nonaktif').length;
  const distinctRoles = Array.from(new Set(employees.map(e => e.role))).length;

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredEmployees.length);
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Ensure currentPage is valid after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredEmployees.length, totalPages, currentPage]);

  const handleOpenTambahModal = () => {
    setModalType('Tambah');
    setCurrentEmployee({
      id: '',
      name: '',
      phone: '',
      role: 'Staff Admin',
      status: 'Aktif',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleOpenEditModal = (emp: Employee) => {
    setModalType('Edit');
    setCurrentEmployee({ ...emp });
    setErrorMessage('');
    setShowModal(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmployee || !currentEmployee.name || !currentEmployee.phone) {
      setErrorMessage('Harap isi semua kolom wajib!');
      return;
    }

    if (modalType === 'Tambah') {
      const newId = (Math.max(...employees.map(e => parseInt(e.id) || 0)) + 1).toString();
      const newEmp: Employee = {
        id: newId,
        name: currentEmployee.name,
        phone: currentEmployee.phone,
        role: currentEmployee.role || 'Staff Admin',
        status: (currentEmployee.status as 'Aktif' | 'Nonaktif') || 'Aktif',
        avatar: currentEmployee.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
      };
      setEmployees([newEmp, ...employees]);
    } else {
      // Edit
      setEmployees(employees.map(e => e.id === currentEmployee.id ? (currentEmployee as Employee) : e));
    }

    setShowModal(false);
    setCurrentEmployee(null);
  };

  const handleDeleteEmployee = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter(e => e.id !== employeeToDelete.id));
      setEmployeeToDelete(null);
    }
  };

  return (
    <div id="data-karyawan-page-content" className="space-y-6 select-none text-left">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Total Karyawan" 
          value={totalEmployeesCount} 
          subtext="Semua karyawan terdaftar" 
          icon={Users} 
          colorType="blue" 
        />
        <StatCard 
          title="Karyawan Aktif" 
          value={activeCount} 
          subtext="Berstatus aktif kerja" 
          icon={UserCheck} 
          colorType="green" 
        />
        <StatCard 
          title="Nonaktif" 
          value={inactiveCount} 
          subtext="Berstatus dirumahkan/cuti" 
          icon={UserX} 
          colorType="red" 
        />
        <StatCard 
          title="Jabatan Terdaftar" 
          value={distinctRoles} 
          subtext="Jenis peran di kantor" 
          icon={Shield} 
          colorType="purple" 
        />
      </div>

      {/* Filter and Tambah Row */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_6px_20px_rgba(15,31,61,0.02)]">
        
        {/* Left filters */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Role Filter dropdown */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-[40px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] bg-white text-[12px] font-bold text-[#0B1F44] focus:outline-none focus:border-[#0F5FEA] appearance-none cursor-pointer"
            >
              <option value="Semua">💼 Semua Jabatan</option>
              <option value="Staff Admin">Staff Admin</option>
              <option value="Sales">Sales</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Finance">Finance</option>
              <option value="Operator">Operator</option>
              <option value="HRD">HRD</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Status Filter dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-[40px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] bg-white text-[12px] font-bold text-[#0B1F44] focus:outline-none focus:border-[#0F5FEA] appearance-none cursor-pointer"
            >
              <option value="Semua">📋 Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>

        {/* Tambah Karyawan Button Right */}
        <button
          onClick={handleOpenTambahModal}
          className="h-[40px] px-4 rounded-[8px] bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karyawan</span>
        </button>

      </div>

      {/* Employee List Table */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] shadow-[0_6px_20px_rgba(15,31,61,0.03)] overflow-hidden">
        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#F0F4F8] bg-[#FAFBFD] text-[#66738D] text-[11px] font-extrabold tracking-wider uppercase">
                <th className="py-4.5 px-5 font-semibold">Nama Karyawan</th>
                <th className="py-4.5 px-5 font-semibold">Jabatan</th>
                <th className="py-4.5 px-5 font-semibold">No. Telepon</th>
                <th className="py-4.5 px-5 font-semibold">Status</th>
                <th className="py-4.5 px-5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F8]">
              {paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/40 transition-colors">
                  
                  {/* Avatar and name */}
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF] shrink-0">
                        <img 
                          src={emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'} 
                          alt={emp.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-[#0B1F44] text-[13px] font-extrabold leading-tight">{emp.name}</p>
                        <p className="text-[#66738D] text-[11px] font-semibold mt-0.5">ID: EMP-{emp.id.padStart(3, '0')}</p>
                      </div>
                    </div>
                  </td>

                  {/* Jabatan / Peran */}
                  <td className="py-3 px-5 text-[#0B1F44] text-[13px] font-bold">{emp.role}</td>

                  {/* No Telepon */}
                  <td className="py-3 px-5 text-[#0B1F44] text-[13px] font-semibold font-mono">{emp.phone}</td>

                  {/* Status */}
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2.5 py-1 rounded-[6px] text-[11px] font-extrabold ${
                      emp.status === 'Aktif' ? 'bg-[#EAFBF4] text-[#10B981]' : 'bg-[#FDECEC] text-[#EF4444]'
                    }`}>
                      {emp.status}
                    </span>
                  </td>

                  {/* Actions buttons */}
                  <td className="py-3 px-5 text-right">
                    <div className="inline-flex items-center gap-1">
                      
                      {/* Edit button */}
                      <button
                        onClick={() => handleOpenEditModal(emp)}
                        className="w-8 h-8 rounded-[6px] border border-[#DCE4F0] bg-white text-gray-500 hover:text-[#0F5FEA] hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit Karyawan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => setEmployeeToDelete(emp)}
                        className="w-8 h-8 rounded-[6px] border border-[#FDECEC] bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus Karyawan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 font-semibold text-[13px]">
                    Tidak ada data karyawan yang sesuai filter atau pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {paginatedEmployees.map((emp) => (
            <div key={emp.id} className="p-4 rounded-xl border border-[#E3EAF3] bg-[#F8FAFD] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF] shrink-0">
                    <img src={emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'} alt={emp.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-[#0B1F44] leading-tight">{emp.name}</p>
                    <p className="text-[11px] font-semibold text-[#66738D] mt-0.5">{emp.role}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${emp.status === 'Aktif' ? 'bg-[#EAFBF4] text-[#10B981]' : 'bg-[#FDECEC] text-[#EF4444]'}`}>
                  {emp.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-[#DCE4F0]">
                <div>
                  <p className="text-[10px] font-extrabold text-[#66738D] mb-0.5">NOMOR HP</p>
                  <p className="text-[13px] font-extrabold text-[#0B1F44]">{emp.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEditModal(emp)} className="w-8 h-8 rounded-[6px] border border-[#DCE4F0] bg-white text-gray-500 hover:text-[#0F5FEA] hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setEmployeeToDelete(emp)} className="w-8 h-8 rounded-[6px] border border-[#FDECEC] bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {paginatedEmployees.length === 0 && (
            <div className="py-8 text-center text-gray-400 font-semibold text-[13px]">
              Tidak ada data karyawan yang sesuai filter atau pencarian.
            </div>
          )}
        </div>

        {/* Pagination Controls Footer */}
        {filteredEmployees.length > 0 && (
          <div className="px-5 py-4 border-t border-[#F0F4F8] bg-[#FAFBFD] flex items-center justify-between text-[12px] font-bold text-[#66738D]">
            <span>
              Menampilkan <span className="text-[#0B1F44]">{startIndex + 1}-{endIndex}</span> dari <span className="text-[#0B1F44]">{filteredEmployees.length}</span> karyawan
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-8.5 h-8.5 rounded-[6px] border border-[#DCE4F0] bg-white text-gray-500 hover:bg-slate-50 flex items-center justify-center disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="w-8.5 h-8.5 rounded-[6px] border border-[#DCE4F0] bg-white text-gray-500 hover:bg-slate-50 flex items-center justify-center disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FORM DIALOG: TAMBAH / EDIT KARYAWAN */}
      {showModal && currentEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0B1F44]/60 backdrop-blur-xs animate-fade-in">
          <form 
            onSubmit={handleSaveEmployee}
            className="bg-white rounded-[20px] overflow-hidden max-w-[400px] w-full border border-[#DCE4F0] shadow-[0_16px_40px_rgba(15,31,61,0.2)] animate-scale-up text-left"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#F0F4F8] flex items-center justify-between">
              <h3 className="text-[#0B1F44] text-[16px] font-extrabold tracking-tight">
                {modalType} Data Karyawan
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-4 text-[13px] font-semibold">
              
              {errorMessage && (
                <div className="p-3.5 rounded-[8px] bg-red-50 border border-red-100 text-red-500 font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nama Karyawan */}
              <div>
                <label className="text-[#66738D] text-[11px] block uppercase font-extrabold tracking-wider mb-1.5">Nama Karyawan *</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  required
                  value={currentEmployee.name || ''}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                  className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] placeholder-gray-400 transition-all text-[13px]"
                />
              </div>

              {/* Jabatan */}
              <div>
                <label className="text-[#66738D] text-[11px] block uppercase font-extrabold tracking-wider mb-1.5">Jabatan *</label>
                <div className="relative">
                  <select
                    value={currentEmployee.role || 'Staff Admin'}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, role: e.target.value })}
                    className="w-full h-[44px] pl-3.5 pr-8 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] appearance-none bg-white transition-all text-[13px]"
                  >
                    <option value="Staff Admin">Staff Admin</option>
                    <option value="Sales">Sales</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Finance">Finance</option>
                    <option value="Operator">Operator</option>
                    <option value="HRD">HRD</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* No. Telepon */}
              <div>
                <label className="text-[#66738D] text-[11px] block uppercase font-extrabold tracking-wider mb-1.5">No. Telepon *</label>
                <input
                  type="text"
                  placeholder="Contoh: 0812-3456-7890"
                  required
                  value={currentEmployee.phone || ''}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
                  className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#DCE4F0] focus:outline-none focus:border-[#0F5FEA] font-bold text-[#0B1F44] placeholder-gray-400 font-mono transition-all text-[13px]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-[#66738D] text-[11px] block uppercase font-extrabold tracking-wider mb-1.5">Status Karyawan</label>
                <div className="flex gap-4 mt-1.5">
                  <label className="flex items-center gap-2 text-[#0B1F44] cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={currentEmployee.status === 'Aktif'}
                      onChange={() => setCurrentEmployee({ ...currentEmployee, status: 'Aktif' })}
                      className="w-4.5 h-4.5 accent-[#0F5FEA]"
                    />
                    <span>Aktif</span>
                  </label>
                  <label className="flex items-center gap-2 text-[#0B1F44] cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={currentEmployee.status === 'Nonaktif'}
                      onChange={() => setCurrentEmployee({ ...currentEmployee, status: 'Nonaktif' })}
                      className="w-4.5 h-4.5 accent-[#0F5FEA]"
                    />
                    <span>Nonaktif</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4.5 bg-[#F8FAFD] border-t border-[#F0F4F8] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="h-[40px] px-4 rounded-[8px] border border-[#DCE4F0] hover:bg-slate-50 text-[#0B1F44] font-bold text-[12px] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="h-[40px] px-5 rounded-[8px] bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white font-bold text-[12px] transition-colors cursor-pointer"
              >
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {employeeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0B1F44]/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[20px] max-w-[360px] w-full border border-[#DCE4F0] shadow-[0_16px_40px_rgba(15,31,61,0.2)] animate-scale-up p-6 text-center">
            
            <div className="w-[60px] h-[60px] rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mx-auto mb-4 shrink-0">
              <Trash2 className="w-6 h-6 stroke-[2]" />
            </div>

            <h3 className="text-[#0B1F44] text-[16px] font-extrabold tracking-tight">Hapus Karyawan?</h3>
            <p className="text-gray-400 text-[12px] font-semibold mt-2.5 leading-relaxed">
              Apakah Anda yakin ingin menghapus data karyawan <span className="text-[#0B1F44] font-extrabold">{employeeToDelete.name}</span>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEmployeeToDelete(null)}
                className="flex-1 h-[44px] rounded-[8px] border border-[#DCE4F0] hover:bg-slate-50 text-[#0B1F44] font-bold text-[13px] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteEmployee}
                className="flex-1 h-[44px] rounded-[8px] bg-red-500 hover:bg-red-600 text-white font-bold text-[13px] transition-colors cursor-pointer"
              >
                Hapus
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

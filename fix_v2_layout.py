import os

def patch_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Warning: String not found in {filepath}: {old[:50]}...")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        print(f"Patched: {filepath}")

# 1. LaporanAbsensiPage.tsx
patch_file(r'd:\SEMINAR\APLIKASI ABSEN\V2 GOOGLESTUDIO\src\components\LaporanAbsensiPage.tsx', [
    (
'''      {/* Main Attendance Table */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] shadow-[0_6px_20px_rgba(15,31,61,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">''',
'''      {/* Main Attendance Table */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] shadow-[0_6px_20px_rgba(15,31,61,0.03)] overflow-hidden">
        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">'''
    ),
    (
'''                ))}
            </tbody>
          </table>
        </div>
      </div>''',
'''                ))}
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
                  <p className="text-[11px] text-[#66738D]">{rec.checkInLocation}</p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-[#66738D] mb-1">JAM PULANG</p>
                  <p className="text-[13px] font-extrabold text-[#0B1F44] mb-2">{rec.checkOutTime || '-'}</p>
                  {rec.checkOutPhoto && (
                    <img src={rec.checkOutPhoto} alt="Pulang" className="w-12 h-16 rounded-[6px] object-cover mb-2" />
                  )}
                  <p className="text-[11px] text-[#66738D]">{rec.checkOutLocation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>'''
    )
])

# 2. DataKaryawanPage.tsx
patch_file(r'd:\SEMINAR\APLIKASI ABSEN\V2 GOOGLESTUDIO\src\components\DataKaryawanPage.tsx', [
    (
'''      {/* Table Area */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] shadow-[0_6px_20px_rgba(15,31,61,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">''',
'''      {/* Table Area */}
      <div className="bg-white rounded-[14px] border border-[#E3EAF3] shadow-[0_6px_20px_rgba(15,31,61,0.02)] overflow-hidden">
        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">'''
    ),
    (
'''                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}''',
'''                ))}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {paginatedEmployees.map(emp => (
            <div key={emp.id} className="p-4 rounded-xl border border-[#E3EAF3] bg-[#F8FAFD] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#DCE4F0] bg-[#EEF5FF] shrink-0">
                    <img src={emp.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'} alt={emp.name} className="w-full h-full object-cover" />
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
                  <button onClick={() => setEditingEmployee(emp)} className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-white border border-[#DCE4F0] text-[#0F5FEA] hover:bg-[#EEF5FF] transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => setConfirmDeleteId(emp.id)} className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-white border border-[#DCE4F0] text-[#EF4444] hover:bg-[#FDECEC] transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}'''
    )
])

# 3. PengaturanPage.tsx
patch_file(r'd:\SEMINAR\APLIKASI ABSEN\V2 GOOGLESTUDIO\src\components\PengaturanPage.tsx', [
    (
'''      {/* First Row: Jam & Reminder */}
      <div className="grid grid-cols-2 gap-6">''',
'''      {/* First Row: Jam & Reminder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">'''
    ),
    (
'''          {/* Time Inputs */}
          <div className="grid grid-cols-2 gap-5 mb-6">''',
'''          {/* Time Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">'''
    ),
    (
'''        {/* Location Wrapper */}
        <div className="grid grid-cols-2 gap-8">''',
'''        {/* Location Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">'''
    )
])

# 4. DashboardPage.tsx
patch_file(r'd:\SEMINAR\APLIKASI ABSEN\V2 GOOGLESTUDIO\src\components\DashboardPage.tsx', [
    (
'''            {/* Minimalist Late Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">''',
'''            {/* Minimalist Late Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">'''
    ),
    (
'''                  ))}
                </tbody>
              </table>
            </div>
            
            <a href="#" className="inline-block mt-4 text-[12px] font-bold text-[#0F5FEA] hover:underline self-start">
              Lihat semua yang terlambat &rarr;
            </a>''',
'''                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards (Mobile) */}
            <div className="grid grid-cols-1 gap-3 md:hidden mt-3">
              {LATE_EMPLOYEES_TODAY.map((emp, i) => (
                <div key={i} className="p-3 rounded-xl border border-[#E3EAF3] bg-[#F8FAFD]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EEF5FF] shrink-0 border border-[#DCE4F0]">
                      <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#0B1F44]">{emp.name}</p>
                      <p className="text-[10px] font-semibold text-[#66738D]">{emp.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#DCE4F0]">
                    <div>
                      <p className="text-[10px] font-bold text-[#66738D]">JAM MASUK</p>
                      <p className="text-[12px] font-extrabold text-[#0B1F44]">{emp.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex rounded-[6px] bg-[#FFF4DF] px-2 py-0.5 text-[10px] font-extrabold text-[#F59E0B]">
                        Terlambat {emp.lateMinutes} menit
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#" className="inline-block mt-4 text-[12px] font-bold text-[#0F5FEA] hover:underline self-start">
              Lihat semua yang terlambat &rarr;
            </a>'''
    ),
    (
'''            {/* Modern Activity List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">''',
'''            {/* Modern Activity List */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">'''
    ),
    (
'''                  ))}
                </tbody>
              </table>
            </div>

            <a href="#" className="inline-block mt-4 text-[12px] font-bold text-[#0F5FEA] hover:underline self-start">
              Lihat riwayat lengkap &rarr;
            </a>''',
'''                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards (Mobile) */}
            <div className="grid grid-cols-1 gap-3 md:hidden mt-3">
              {RECENT_ACTIVITIES.map((act, i) => (
                <div key={i} className="p-3 rounded-xl border border-[#E3EAF3] bg-[#F8FAFD]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EEF5FF] shrink-0 border border-[#DCE4F0]">
                        <img src={act.avatar} alt={act.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[13px] font-extrabold text-[#0B1F44]">{act.name}</p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${act.status === 'Hadir' ? 'bg-[#EAFBF4] text-[#10B981]' : 'bg-[#FFF4DF] text-[#F59E0B]'}`}>
                      {act.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#DCE4F0]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#66738D]">
                      {act.type === 'check-in' ? (
                        <div className="w-4 h-4 rounded-full bg-[#EAFBF4] text-[#10B981] flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-[#FFF4DF] text-[#F59E0B] flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                        </div>
                      )}
                      <span>{act.type === 'check-in' ? 'Absen Masuk' : 'Absen Pulang'}</span>
                    </div>
                    <p className="text-[12px] font-extrabold text-[#0B1F44]">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#" className="inline-block mt-4 text-[12px] font-bold text-[#0F5FEA] hover:underline self-start">
              Lihat riwayat lengkap &rarr;
            </a>'''
    )
])

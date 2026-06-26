/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function AdminLayout({
  children,
  title,
  currentPath,
  searchQuery,
  onSearchChange,
  onNavigate,
  onLogout
}: AdminLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div id="admin-layout" className="w-full min-h-screen bg-[#F8FAFD] flex text-left relative overflow-x-hidden font-sans">
      
      {/* Desktop Sidebar (visible >= 1024px) */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar 
          currentPath={currentPath} 
          onNavigate={onNavigate} 
        />
      </div>

      {/* Mobile Drawer Sidebar (hidden >= 1024px) */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#0B1F44]/40 backdrop-blur-xs z-40 lg:hidden transition-all animate-fade-in"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Drawer Wrapper */}
          <div className="fixed top-0 left-0 bottom-0 z-50 lg:hidden animate-slide-right shadow-[12px_0_32px_rgba(15,31,61,0.15)]">
            <AdminSidebar 
              currentPath={currentPath} 
              onNavigate={onNavigate} 
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </>
      )}

      {/* Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* Topbar Header */}
        <AdminTopbar 
          title={title} 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onLogout={onLogout}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Content Wrapper */}
        <main className="flex-1 p-4 lg:p-7 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}

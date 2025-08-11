'use client'
// app/dashboard/layout.js
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'; // Optional
import './css/adminlte.css';
import Script from 'next/script';
import ProtectedRoute from '@/app/auth/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <>
    <ProtectedRoute  blockedRoles={[3]}>
      <div className='layout-fixed sidebar-expand-lg sidebar-mini sidebar-collapse bg-body-tertiary'>
        <div className="app-wrapper">
          <Navbar />
          <Sidebar />

          {/* Main Content */}
          <main className="app-main">
            <div className="app-content">
              <div className="container-fluid">
                {children}
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>

      {/* AdminLTE Dependencies */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />
      <Script src="/js/adminlte.js" />
      </ProtectedRoute>
    </>
  );
}

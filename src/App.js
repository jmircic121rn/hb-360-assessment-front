import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public
import LandingPage from './pages/public/LandingPage';
import AssessPage from './pages/public/AssessPage';

// Auth
import { UnifiedLogin, ManagerLogin, EmployeeLogin, AdminLogin } from './pages/auth/LoginPages';

// Manager portal
import {
  ManagerDashboard, ManagerEmployees, EmployeeForm,
  NewCampaign, CampaignDetail, ManagerReports
} from './pages/manager/ManagerPages';

// Employee portal
import { EmployeeDashboard, EmployeeReports } from './pages/employee/EmployeePages';

// Admin portal
import { AdminCampaigns, GroupReport } from './pages/admin/AdminPages';

// ── Auth guard ─────────────────────────────────────────────────────────────
function RequireAuth({ role, children }) {
  const token = localStorage.getItem(`compass_token_${role}`);
  if (!token) return <Navigate to={`/${role}/login`} replace />;
  return children;
}

// Redirect logged-in users away from login pages
function RedirectIfAuth({ role, redirectTo, children }) {
  const token = localStorage.getItem(`compass_token_${role}`);
  if (token) return <Navigate to={redirectTo} replace />;
  return children;
}

// Redirect from unified login if already logged in as any role
function RedirectIfAnyAuth({ children }) {
  if (localStorage.getItem('compass_token_manager')) return <Navigate to="/manager/dashboard" replace />;
  if (localStorage.getItem('compass_token_employee')) return <Navigate to="/employee/dashboard" replace />;
  return children;
}

// Redirect any logged-in user away from the landing page
function LandingGuard() {
  if (localStorage.getItem('compass_token_manager')) return <Navigate to="/manager/dashboard" replace />;
  if (localStorage.getItem('compass_token_employee')) return <Navigate to="/employee/dashboard" replace />;
  if (localStorage.getItem('compass_token_admin')) return <Navigate to="/admin/campaigns" replace />;
  return <LandingPage />;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingGuard />} />
        <Route path="/assess/:token" element={<AssessPage />} />

        {/* Auth */}
        <Route path="/login" element={<RedirectIfAnyAuth><UnifiedLogin /></RedirectIfAnyAuth>} />
        <Route path="/manager/login" element={<Navigate to="/login" replace />} />
        <Route path="/employee/login" element={<Navigate to="/login" replace />} />
        <Route path="/admin/login" element={<RedirectIfAuth role="admin" redirectTo="/admin/campaigns"><AdminLogin /></RedirectIfAuth>} />

        {/* Manager portal */}
        <Route path="/manager/dashboard" element={<RequireAuth role="manager"><ManagerDashboard /></RequireAuth>} />
        <Route path="/manager/employees" element={<RequireAuth role="manager"><ManagerEmployees /></RequireAuth>} />
        <Route path="/manager/employees/new" element={<RequireAuth role="manager"><EmployeeForm /></RequireAuth>} />
        <Route path="/manager/employees/:id/edit" element={<RequireAuth role="manager"><EmployeeForm editMode /></RequireAuth>} />
        <Route path="/manager/campaigns/new" element={<RequireAuth role="manager"><NewCampaign /></RequireAuth>} />
        <Route path="/manager/campaigns/:id" element={<RequireAuth role="manager"><CampaignDetail /></RequireAuth>} />
        <Route path="/manager/reports" element={<RequireAuth role="manager"><ManagerReports /></RequireAuth>} />
        <Route path="/manager" element={<Navigate to="/manager/dashboard" replace />} />

        {/* Employee portal */}
        <Route path="/employee/dashboard" element={<RequireAuth role="employee"><EmployeeDashboard /></RequireAuth>} />
        <Route path="/employee/reports" element={<RequireAuth role="employee"><EmployeeReports /></RequireAuth>} />
        <Route path="/employee" element={<Navigate to="/employee/dashboard" replace />} />

        {/* Admin portal */}
        <Route path="/admin/campaigns" element={<RequireAuth role="admin"><AdminCampaigns /></RequireAuth>} />
        <Route path="/admin/group-report" element={<RequireAuth role="admin"><GroupReport /></RequireAuth>} />
        <Route path="/admin" element={<Navigate to="/admin/campaigns" replace />} />

        {/* 404 */}
        <Route path="*" element={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', background: 'var(--canvas)' }}>
            <div style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', color: 'var(--ink-faint)' }}>404</div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Page not found</h2>
            <a href="/" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>← Back to home</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

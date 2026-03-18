import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public
import LandingPage from './pages/public/LandingPage';
import AssessPage from './pages/public/AssessPage';

// Auth
import { UnifiedLogin } from './pages/auth/LoginPages';

// Manager portal
import {
  ManagerWelcome, ManagerDashboard, ManagerEmployees, EmployeeForm,
  NewCampaign, CampaignEdit, CampaignDetail, ManagerCompanies
} from './pages/manager/ManagerPages';

// Employee portal
import { EmployeeDashboard, EmployeeReports } from './pages/employee/EmployeePages';

import FAQ from './pages/manager/FAQ';

// ── Auth guard ─────────────────────────────────────────────────────────────
function RequireAuth({ role, children }) {
  const token = localStorage.getItem(`compass_token_${role}`);
  if (!token) return <Navigate to={`/${role}/login`} replace />;
  return children;
}

// Redirect from unified login if already logged in as any role
function RedirectIfAnyAuth({ children }) {
  if (localStorage.getItem('compass_token_admin')) return <Navigate to="/manager/welcome" replace />;
  if (localStorage.getItem('compass_token_employee')) return <Navigate to="/employee/dashboard" replace />;
  return children;
}

// Redirect any logged-in user away from the landing page
function LandingGuard() {
  if (localStorage.getItem('compass_token_admin')) return <Navigate to="/manager/welcome" replace />;
  if (localStorage.getItem('compass_token_employee')) return <Navigate to="/employee/dashboard" replace />;
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
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />

        {/* Manager portal */}
        <Route path="/manager/welcome" element={<RequireAuth role="admin"><ManagerWelcome /></RequireAuth>} />
        <Route path="/manager/dashboard" element={<RequireAuth role="admin"><ManagerDashboard /></RequireAuth>} />
        <Route path="/manager/employees" element={<RequireAuth role="admin"><ManagerEmployees /></RequireAuth>} />
        <Route path="/manager/employees/new" element={<RequireAuth role="admin"><EmployeeForm /></RequireAuth>} />
        <Route path="/manager/employees/:id/edit" element={<RequireAuth role="admin"><EmployeeForm editMode /></RequireAuth>} />
        <Route path="/manager/companies" element={<RequireAuth role="admin"><ManagerCompanies /></RequireAuth>} />
        <Route path="/manager/campaigns/new" element={<RequireAuth role="admin"><NewCampaign /></RequireAuth>} />
        <Route path="/manager/campaigns/:id/edit" element={<RequireAuth role="admin"><CampaignEdit /></RequireAuth>} />
        <Route path="/manager/campaigns/:id" element={<RequireAuth role="admin"><CampaignDetail /></RequireAuth>} />
        <Route path="/manager" element={<Navigate to="/manager/welcome" replace />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Employee portal */}
        <Route path="/employee/dashboard" element={<RequireAuth role="employee"><EmployeeDashboard /></RequireAuth>} />
        <Route path="/employee/reports" element={<RequireAuth role="employee"><EmployeeReports /></RequireAuth>} />
        <Route path="/employee" element={<Navigate to="/employee/dashboard" replace />} />

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

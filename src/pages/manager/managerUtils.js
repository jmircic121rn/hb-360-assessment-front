import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PortalLayout } from '../../components/Layout';

// ── Action dropdown menu ───────────────────────────────────────────────────
export function ActionMenu({ items }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onScroll() { setOpen(false); }
    document.addEventListener('mousedown', handler);
    window.addEventListener('scroll', onScroll, true);
    return () => { document.removeEventListener('mousedown', handler); window.removeEventListener('scroll', onScroll, true); };
  }, [open]);
  function handleOpen(e) {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(o => !o);
  }
  const visible = items.filter(Boolean);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        ref={btnRef}
        onClick={handleOpen}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '5px 11px', borderRadius: '999px',
          border: '1px solid rgba(0,0,0,0.11)',
          background: open ? 'var(--canvas-warm)' : '#fff',
          cursor: 'pointer', color: 'var(--ink-soft)', fontFamily: 'var(--font-body)',
          transition: 'all 0.15s', lineHeight: 1,
        }}
        title="Actions"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
          <circle cx="5" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/>
        </svg>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.45, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'fixed', top: pos.top, right: pos.right,
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '12px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05)',
          zIndex: 1000, minWidth: 168, padding: '5px',
        }}>
          {visible.map((item, i) => {
            const isDanger = item.danger;
            const showDivider = isDanger && i > 0 && !visible[i - 1].danger;
            const base = {
              display: 'flex', alignItems: 'center', gap: '8px',
              width: '100%', padding: '9px 13px', textAlign: 'left',
              background: 'none', border: 'none', borderRadius: '8px',
              cursor: item.loading ? 'default' : 'pointer', fontFamily: 'var(--font-body)',
              fontSize: '0.84rem', fontWeight: 400,
              color: isDanger ? '#dc2626' : 'var(--ink)',
              opacity: item.loading ? 0.5 : 1, textDecoration: 'none',
            };
            const hover = e => { if (!item.loading) e.currentTarget.style.background = isDanger ? '#fef2f2' : 'var(--canvas)'; };
            const unhover = e => { e.currentTarget.style.background = 'none'; };
            return (
              <React.Fragment key={i}>
                {showDivider && <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', margin: '3px 6px' }} />}
                {item.href ? (
                  <Link to={item.href} onClick={() => setOpen(false)} style={base} onMouseEnter={hover} onMouseLeave={unhover}>
                    {item.icon && <span style={{ opacity: 0.45, flexShrink: 0, display: 'flex' }}>{item.icon}</span>}
                    {item.label}
                  </Link>
                ) : (
                  <button disabled={item.loading} onClick={() => { if (!item.loading) { item.onClick(); setOpen(false); } }} style={base} onMouseEnter={hover} onMouseLeave={unhover}>
                    {item.icon && <span style={{ opacity: 0.45, flexShrink: 0, display: 'flex' }}>{item.icon}</span>}
                    {item.loading ? 'Please wait…' : item.label}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Icon Components ────────────────────────────────────────────────────────
export const IcHome = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
export const IcChart = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
export const IcArchive = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
export const IcPlus = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
export const IcBuilding = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
export const IcPeople = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
export const IcQuestion = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
export const IcLayers = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
export const IcShield = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

// ── Navigation ────────────────────────────────────────────────────────────
export const NAV = [
  { href: '/manager/welcome', icon: <IcHome />, label: 'Home' },
  { group: 'HB Ideal Profiles', href: '/manager/profiles', icon: <IcLayers />, label: 'My Ideal Profiles' },
  { group: 'HB Ideal Profiles', href: '/manager/profiles/new', icon: <IcPlus />, label: 'Create New Ideal Profile' },
  { group: 'Campaigns', href: '/manager/dashboard', icon: <IcChart />, label: 'Active Campaigns' },
  { group: 'Campaigns', href: '/manager/archived', icon: <IcArchive />, label: 'Archived Campaigns' },
  { group: 'Campaigns', href: '/manager/campaigns/new', icon: <IcPlus />, label: 'New Campaign' },
  { group: 'Management', href: '/manager/companies', icon: <IcBuilding />, label: 'My Companies' },
  { group: 'Management', href: '/manager/people', icon: <IcPeople />, label: 'Employees' },
  { group: 'Support', href: '/faq', icon: <IcQuestion />, label: 'FAQ' },
  { group: 'Administration', href: '/manager/admin-access', icon: <IcShield />, label: 'Profile Access', superAdminOnly: true },
];

// ── Layout Wrapper ────────────────────────────────────────────────────────
export function Layout({ children }) {
  return <PortalLayout role="admin" navItems={NAV}>{children}</PortalLayout>;
}

// ── Report PDF Download ───────────────────────────────────────────────────
export function downloadReportPdf(cycleId, reportType, reportId, firstName, lastName) {
  const token = localStorage.getItem('compass_token_admin');
  const BASE = process.env.REACT_APP_API_URL || 'https://api.hansenbeck.com';
  // Route by report type: report1 (self PDF), report2 (AI Report 2), report2_360 (AI Report 2 — 360)
  const url = reportType === 'report2_360'
    ? `${BASE}/api/360/manager/reports/${reportId}/ai-pdf-360`
    : reportType === 'report2'
      ? `${BASE}/api/360/manager/reports/${reportId}/ai-pdf`
      : `${BASE}/api/360/manager/cycles/${cycleId}/report/1/pdf`;
  fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.blob(); })
    .then(blob => {
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(pdfBlob);
      const name = [firstName, lastName].filter(Boolean).join('_') || reportId || cycleId;
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `Report_${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    })
    .catch(e => alert(`Download failed: ${e.message}`));
}

// ── Constants ──────────────────────────────────────────────────────────────
export const JOB_TITLES = [
  'CEO', 'COO', 'CTO', 'CFO', 'Director', 'Senior Manager', 'Manager',
  'Team Lead', 'Senior Engineer', 'Engineer', 'Analyst', 'Consultant',
  'HR Manager', 'Marketing Manager', 'Sales Manager', 'Product Manager',
  'Designer', 'Other',
];

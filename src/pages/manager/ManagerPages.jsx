import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { api } from '../../utils/api';
import { PortalLayout } from '../../components/Layout';
import {
  Btn, Card, Badge, Alert, PageHeader, EmptyState,
  Table, Modal, FormField, Input, Select, Spinner
} from '../../components/UI';

// ── Action dropdown menu ───────────────────────────────────────────────────
function ActionMenu({ items }) {
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

const IcHome = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcChart = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcArchive = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
const IcPlus = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcBuilding = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const IcPeople = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcQuestion = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcLayers = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IcShield = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

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

function Layout({ children }) {
  return <PortalLayout role="admin" navItems={NAV}>{children}</PortalLayout>;
}

const JOB_TITLES = [
  'CEO', 'COO', 'CTO', 'CFO', 'Director', 'Senior Manager', 'Manager',
  'Team Lead', 'Senior Engineer', 'Engineer', 'Analyst', 'Consultant',
  'HR Manager', 'Marketing Manager', 'Sales Manager', 'Product Manager',
  'Designer', 'Other',
];

// ── Welcome Page ──────────────────────────────────────────────────────────
function WelcomeNavCard({ icon, title, desc, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fafafa' : 'var(--canvas-white)',
        border: `1.5px solid ${hovered ? '#bbb' : 'var(--canvas-warm)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '22px 24px',
        textAlign: 'left',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.09)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: '10px',
        background: hovered ? '#000' : 'var(--canvas-warm)',
        color: hovered ? '#fff' : 'var(--ink-soft)',
        transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', marginBottom: '5px', fontFamily: 'var(--font-body)' }}>
          {title}
        </div>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.81rem', lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>
    </button>
  );
}

export function ManagerWelcome() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    api.getMe('admin').then(d => setName(d?.firstName || d?.name || '')).catch(() => {});
  }, []);


  const steps = [
    {
      num: '01',
      title: 'Define your ideal',
      body: 'Create an HB Ideal Profile for a role — pick the competency dimensions and proficiency levels that describe what "great" really looks like.',
      action: { label: 'Build a profile', href: '/manager/profiles/new' },
    },
    {
      num: '02',
      title: 'Run a 360° campaign',
      body: 'Launch an assessment cycle. Assign participants, pick who gives feedback (self, peers, managers), and set your deadline.',
      action: { label: 'Start a campaign', href: '/manager/campaigns/new' },
    },
    {
      num: '03',
      title: 'See the gap — act on it',
      body: 'Results land as clear gap reports: where each person stands against the ideal, what to develop, and where they already shine.',
      action: { label: 'View campaigns', href: '/manager/dashboard' },
    },
  ];

  const quickLinks = [
    {
      icon: <IcLayers />,
      title: 'My Ideal Profiles',
      desc: 'Browse all the competency profiles you\'ve built — dimensions, pillars, facets, and proficiency levels.',
      href: '/manager/profiles',
    },
    {
      icon: <IcChart />,
      title: 'Active Campaigns',
      desc: 'Check progress, send reminders, and manage ongoing 360° assessment cycles.',
      href: '/manager/dashboard',
    },
    {
      icon: <IcBuilding />,
      title: 'My Companies',
      desc: 'Manage organisations, add employees, and keep your people data up to date.',
      href: '/manager/companies',
    },
    {
      icon: <IcPeople />,
      title: 'Employees',
      desc: 'View every person\'s profile, campaign history, and download their reports.',
      href: '/manager/people',
    },
  ];

  return (
    <Layout>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>

        {/* ── Hero ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '32px', marginBottom: '56px',
          paddingBottom: '40px', borderBottom: '1px solid var(--canvas-warm)',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.71rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '12px' }}>
              HB Compass
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', lineHeight: 1.12, marginBottom: '16px' }}>
              Great Conquests<br />Are Won in the Backseat
            </h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 480, marginBottom: '28px' }}>
              You're looking at a tool built around one idea: know what great looks like, then measure how close your people are to it. Start by defining an ideal profile for a role, run a 360° campaign, and get a clear picture of where each person stands.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/manager/profiles/new')}
                style={{
                  background: '#000', color: '#fff', border: 'none',
                  borderRadius: 'var(--radius-md)', padding: '10px 20px',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  cursor: 'pointer', transition: 'opacity 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Create a profile
              </button>
              <button
                onClick={() => navigate('/manager/campaigns/new')}
                style={{
                  background: 'transparent', color: 'var(--ink)', border: '1.5px solid #ddd',
                  borderRadius: 'var(--radius-md)', padding: '10px 20px',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  cursor: 'pointer', transition: 'border-color 150ms, background 150ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#999'; e.currentTarget.style.background = '#f9f9f9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.background = 'transparent'; }}
              >
                Start a campaign
              </button>
            </div>
          </div>
          <img
            src="/compass.png"
            alt="HB Compass"
            style={{ width: 170, height: 'auto', opacity: 0.88, flexShrink: 0 }}
          />
        </div>

        {/* ── How it works ── */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '0.71rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '6px' }}>
            How it works
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '28px' }}>
            Three steps to meaningful insight
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  background: '#000', color: '#fff', borderRadius: '10px',
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700,
                  flexShrink: 0, letterSpacing: '0.04em',
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{step.title}</div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '10px' }}>{step.body}</p>
                  <button
                    onClick={() => navigate(step.action.href)}
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      color: 'var(--ink)', fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      textDecoration: 'underline', textUnderlineOffset: '3px',
                    }}
                  >
                    {step.action.label}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick access ── */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '0.71rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '6px' }}>
            Quick access
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '20px' }}>
            Jump to what you need
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {quickLinks.map(link => (
              <WelcomeNavCard
                key={link.href}
                icon={link.icon}
                title={link.title}
                desc={link.desc}
                onClick={() => navigate(link.href)}
              />
            ))}
          </div>
        </div>

        {/* ── Support strip ── */}
        <div style={{
          borderTop: '1px solid var(--canvas-warm)', paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Got questions? The FAQ covers campaigns, profiles, scoring, and more.
          </p>
          <button
            onClick={() => navigate('/faq')}
            style={{
              background: 'none', border: '1.5px solid #ddd', borderRadius: 'var(--radius-md)',
              padding: '8px 16px', fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '0.82rem', cursor: 'pointer', color: 'var(--ink)',
              transition: 'border-color 150ms',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#999'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd'}
          >
            <IcQuestion />
            Visit FAQ
          </button>
        </div>

      </div>
    </Layout>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────
export function ManagerDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCompany, setFilterCompany] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterCampaignName, setFilterCampaignName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  async function handleDeleteCampaign() {
    setDeleting(true);
    try {
      await api.manager.deleteCampaign(deleteId);
      setCampaigns(prev => prev.filter(c => c.CycleID !== deleteId));
      setDeleteId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleComplete(id) {
    setActionLoading(id + '-complete');
    try {
      await api.manager.completeCampaign(id);
      setCampaigns(prev => prev.map(c => c.CycleID === id ? { ...c, Status: 'completed' } : c));
    } catch (e) {
      setError(e.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleArchive(id) {
    setActionLoading(id + '-archive');
    try {
      await api.manager.archiveCampaign(id);
      setCampaigns(prev => prev.filter(c => c.CycleID !== id));
    } catch (e) {
      setError(e.message);
    } finally {
      setActionLoading(null);
    }
  }

  useEffect(() => {
    Promise.all([
      api.manager.getCampaigns(),
      api.manager.getEmployees(),
      api.manager.getCompanies().catch(() => []),
    ]).then(([cData, empData, compData]) => {
      const compList = Array.isArray(compData) ? compData : [];
      setCompanies(compList);
      // Build employeeId → company lookup
      const empMap = {};
      (Array.isArray(empData) ? empData : []).forEach(e => {
        if (e.CompanyID) empMap[e.EmployeeID] = { CompanyID: e.CompanyID, CompanyName: e.CompanyName || `Company #${e.CompanyID}` };
      });
      // Enrich campaigns with company info from employee map
      const enriched = (Array.isArray(cData) ? cData : []).map(c => ({
        ...c,
        CompanyID: c.CompanyID ?? empMap[c.EmployeeID]?.CompanyID,
        CompanyName: c.CompanyName ?? empMap[c.EmployeeID]?.CompanyName,
      }));
      // Show all non-archived campaigns on dashboard
      setCampaigns(enriched.filter(c => c.Status !== 'archived'));
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const empName = c => c.FullName || `${c.FirstName || ''} ${c.LastName || ''}`.trim();
  const fmtDeadline = c => {
    const d = c.Deadline || c.deadline;
    if (!d) return <span style={{ color: 'var(--ink-faint)' }}>—</span>;
    const date = new Date(d);
    return isNaN(date) ? <span style={{ color: 'var(--ink-faint)' }}>—</span> : date.toLocaleDateString();
  };

  // Cascading filters: each step narrows options for the next dropdown
  const filteredByCompany = campaigns.filter(c =>
    filterCompany ? String(c.CompanyID) === filterCompany : true
  );
  const filteredByEmployee = filteredByCompany.filter(c =>
    filterEmployee ? empName(c) === filterEmployee : true
  );
  const filteredByCampaignName = filteredByEmployee.filter(c =>
    filterCampaignName ? (c.Name || 'Unnamed Campaign') === filterCampaignName : true
  );
  const filteredByStatus = filteredByCampaignName.filter(c =>
    filterStatus ? c.Status === filterStatus : true
  );
  const filtered = filteredByStatus.filter(c => {
    if (!searchTerm) return true;
    const s = `${c.Name} ${empName(c)} ${c.CompanyName}`.toLowerCase();
    return s.includes(searchTerm.toLowerCase());
  });

  // Dropdown options derived from the upstream filtered set
  const uniqueEmployees = [...new Set(filteredByCompany.map(c => empName(c)).filter(Boolean))].sort();
  const uniqueCampaignNames = [...new Set(filteredByEmployee.map(c => c.Name || 'Unnamed Campaign').filter(Boolean))].sort();

  const active = filtered.filter(c => c.Status === 'in_progress').length;

  const stats = [
    { label: 'Active Campaigns', value: loading ? '—' : active },
    { label: 'Total Active', value: loading ? '—' : filtered.length },
  ];

  return (
    <Layout>
      <PageHeader title="Dashboard" subtitle="Overview of your HB Compass campaigns" />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <>
          <Card style={{ padding: '24px' }}>
            {/* Filter Bar */}
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Assessment Campaigns</h3>
                <Link to="/manager/campaigns/new"><Btn size="sm" variant="teal">+ New Campaign</Btn></Link>
              </div>

              {/* Grid sa filterima */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '12px',
                background: '#f8f8f8',
                padding: '16px',
                borderRadius: 'var(--radius-sm)'
              }}>
                {/* Search */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Search</label>
                  <input 
                    type="text"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.85rem' }}
                  />
                </div>

                {/* Company Dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Company</label>
                  <Select value={filterCompany} onChange={e => { setFilterCompany(e.target.value); setFilterEmployee(''); setFilterCampaignName(''); }}>
                    <option value="">All Companies</option>
                    {companies.map(c => <option key={c.CompanyID || c.id} value={String(c.CompanyID || c.id)}>{c.CompanyName || c.name}</option>)}
                  </Select>
                </div>

                {/* Employee Dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Employee</label>
                  <Select value={filterEmployee} onChange={e => { setFilterEmployee(e.target.value); setFilterCampaignName(''); }}>
                    <option value="">All Employees</option>
                    {uniqueEmployees.map(name => <option key={name} value={name}>{name}</option>)}
                  </Select>
                </div>

                {/* Campaign Name Dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Campaign Name</label>
                  <Select value={filterCampaignName} onChange={e => setFilterCampaignName(e.target.value)}>
                    <option value="">All Campaign Names</option>
                    {uniqueCampaignNames.map(name => <option key={name} value={name}>{name}</option>)}
                  </Select>
                </div>

                {/* Status Dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Status</label>
                  <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </div>
              </div>
            </div>
            {/* Group campaigns by GroupID; ungrouped appear individually */}
            {(() => {
              const groupMap = {};
              const rows = [];
              filtered.forEach(c => {
                if (c.GroupID) {
                  if (!groupMap[c.GroupID]) {
                    groupMap[c.GroupID] = { groupId: c.GroupID, name: c.Name, company: c.CompanyName, createdAt: c.CreatedAt, deadline: c.Deadline, campaigns: [] };
                    rows.push({ type: 'group', data: groupMap[c.GroupID] });
                  }
                  groupMap[c.GroupID].campaigns.push(c);
                } else {
                  rows.push({ type: 'single', data: c });
                }
              });

              const thStyle = { padding: '10px 14px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: '1px solid var(--canvas-warm)', whiteSpace: 'nowrap' };
              const tdStyle = { padding: '12px 14px', fontSize: '0.86rem', color: 'var(--ink)', borderBottom: '1px solid var(--canvas-warm)', verticalAlign: 'middle' };
              const tdSubStyle = { ...tdStyle, background: 'var(--canvas-warm)', fontSize: '0.83rem' };

              const campaignRow = (c, sub = false) => {
                const td = sub ? tdSubStyle : tdStyle;
                return (
                  <tr key={c.CycleID}>
                    <td style={{ ...td, paddingLeft: sub ? 32 : 14 }}>{sub ? <span style={{ color: 'var(--ink-faint)', marginRight: 6 }}>↳</span> : null}<strong>{sub ? `${c.FirstName} ${c.LastName}` : c.Name}</strong></td>
                    <td style={td}>{sub ? <span style={{ color: 'var(--ink-faint)', fontSize: '0.78rem' }}>—</span> : <span>{c.FirstName} {c.LastName}</span>}</td>
                    <td style={{ ...td, color: 'var(--ink-soft)' }}>{c.CompanyName || '—'}</td>
                    <td style={td}><Badge status={c.Status === 'in_progress' ? 'active' : c.Status}>{c.Status}</Badge></td>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 60, height: 4, borderRadius: 999, background: 'var(--canvas-warm)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${c.TotalLinks > 0 ? Math.round((c.CompletedLinks / c.TotalLinks) * 100) : 0}%`, background: 'var(--ink)', borderRadius: 999 }} />
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{c.CompletedLinks}/{c.TotalLinks}</span>
                      </div>
                    </td>
                    <td style={{ ...td, color: 'var(--ink-soft)' }}>{new Date(c.CreatedAt).toLocaleDateString()}</td>
                    <td style={td}>{fmtDeadline(c)}</td>
                    <td style={td}>
                      <ActionMenu items={[
                        { label: 'View', href: `/manager/campaigns/${c.CycleID}` },
                        c.Status === 'in_progress' ? { label: 'Edit', href: `/manager/campaigns/${c.CycleID}/edit` } : null,
                        c.Status === 'in_progress' ? { label: 'Complete', onClick: () => handleComplete(c.CycleID), loading: actionLoading === c.CycleID + '-complete' } : null,
                        c.Status === 'completed' ? { label: 'Archive', onClick: () => handleArchive(c.CycleID), loading: actionLoading === c.CycleID + '-archive' } : null,
                        { label: 'Delete', onClick: () => setDeleteId(c.CycleID), danger: true },
                      ].filter(Boolean)} />
                    </td>
                  </tr>
                );
              };

              return (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {['Campaign', 'Employee', 'Company', 'Status', 'Progress', 'Started', 'Deadline', 'Actions'].map(h => (
                          <th key={h} style={thStyle}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center', color: 'var(--ink-faint)', padding: '40px' }}>No campaigns yet. Start your first assessment campaign.</td></tr>
                      ) : rows.map((row) => {
                        if (row.type === 'single') return campaignRow(row.data);
                        const grp = row.data;
                        const isOpen = !!expandedGroups[grp.groupId];
                        const total = grp.campaigns.reduce((s, c) => s + (c.TotalLinks || 0), 0);
                        const completed = grp.campaigns.reduce((s, c) => s + (c.CompletedLinks || 0), 0);
                        const anyInProgress = grp.campaigns.some(c => c.Status === 'in_progress');
                        const groupStatus = anyInProgress ? 'in_progress' : 'completed';
                        return (
                          <React.Fragment key={grp.groupId}>
                            <tr
                              onClick={() => setExpandedGroups(prev => ({ ...prev, [grp.groupId]: !isOpen }))}
                              style={{ cursor: 'pointer', background: isOpen ? '#f0f0f0' : '#fafafa' }}
                            >
                              <td style={{ ...tdStyle, background: 'inherit' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--ink-faint)', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                  <strong>{grp.name}</strong>
                                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: 'var(--ink)', color: '#fff', letterSpacing: '0.04em' }}>{grp.campaigns.length} sub</span>
                                </div>
                              </td>
                              <td style={{ ...tdStyle, background: 'inherit', color: 'var(--ink-faint)', fontSize: '0.8rem' }}>Group campaign</td>
                              <td style={{ ...tdStyle, background: 'inherit', color: 'var(--ink-soft)' }}>{grp.company || '—'}</td>
                              <td style={{ ...tdStyle, background: 'inherit' }}><Badge status={groupStatus === 'in_progress' ? 'active' : groupStatus}>{groupStatus}</Badge></td>
                              <td style={{ ...tdStyle, background: 'inherit' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: 60, height: 4, borderRadius: 999, background: 'var(--canvas-warm)', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${total > 0 ? Math.round((completed / total) * 100) : 0}%`, background: 'var(--ink)', borderRadius: 999 }} />
                                  </div>
                                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{completed}/{total}</span>
                                </div>
                              </td>
                              <td style={{ ...tdStyle, background: 'inherit', color: 'var(--ink-soft)' }}>{new Date(grp.createdAt).toLocaleDateString()}</td>
                              <td style={{ ...tdStyle, background: 'inherit' }}>{fmtDeadline({ Deadline: grp.deadline })}</td>
                              <td style={{ ...tdStyle, background: 'inherit' }} onClick={e => e.stopPropagation()}>—</td>
                            </tr>
                            {isOpen && grp.campaigns.map(c => campaignRow(c, true))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </Card>

          <Modal open={!!deleteId} title="Delete Campaign" onClose={() => setDeleteId(null)}>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
                Are you sure you want to delete this campaign? This will permanently remove all responses and assessment links.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
                <Btn onClick={handleDeleteCampaign} loading={deleting} style={{ background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' }}>
                  Yes, Delete
                </Btn>
              </div>
            </Modal>
        </>
      )}
    </Layout>
  );
}

// ── Archived Campaigns ─────────────────────────────────────────────────────
export function ArchivedCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCompany, setFilterCompany] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterCampaignName, setFilterCampaignName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteCampaign() {
    setDeleting(true);
    try {
      await api.manager.deleteCampaign(deleteId);
      setCampaigns(prev => prev.filter(c => c.CycleID !== deleteId));
      setDeleteId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    Promise.all([
      api.manager.getCampaigns(),
      api.manager.getEmployees(),
      api.manager.getCompanies().catch(() => []),
    ]).then(([cData, empData, compData]) => {
      const compList = Array.isArray(compData) ? compData : [];
      setCompanies(compList);
      const empMap = {};
      (Array.isArray(empData) ? empData : []).forEach(e => {
        if (e.CompanyID) empMap[e.EmployeeID] = { CompanyID: e.CompanyID, CompanyName: e.CompanyName || `Company #${e.CompanyID}` };
      });
      const enriched = (Array.isArray(cData) ? cData : []).map(c => ({
        ...c,
        CompanyID: c.CompanyID ?? empMap[c.EmployeeID]?.CompanyID,
        CompanyName: c.CompanyName ?? empMap[c.EmployeeID]?.CompanyName,
      }));
      // Only archived campaigns
      setCampaigns(enriched.filter(c => c.Status === 'archived'));
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const empName = c => c.FullName || `${c.FirstName || ''} ${c.LastName || ''}`.trim();
  const fmtDeadline = c => {
    const d = c.Deadline || c.deadline;
    if (!d) return <span style={{ color: 'var(--ink-faint)' }}>—</span>;
    const date = new Date(d);
    return isNaN(date) ? <span style={{ color: 'var(--ink-faint)' }}>—</span> : date.toLocaleDateString();
  };

  const filteredByCompany = campaigns.filter(c =>
    filterCompany ? String(c.CompanyID) === filterCompany : true
  );
  const filteredByEmployee = filteredByCompany.filter(c =>
    filterEmployee ? empName(c) === filterEmployee : true
  );
  const filteredByCampaignName = filteredByEmployee.filter(c =>
    filterCampaignName ? (c.Name || 'Unnamed Campaign') === filterCampaignName : true
  );
  const filtered = filteredByCampaignName.filter(c => {
    if (!searchTerm) return true;
    const s = `${c.Name} ${empName(c)} ${c.CompanyName}`.toLowerCase();
    return s.includes(searchTerm.toLowerCase());
  });

  const uniqueEmployees = [...new Set(filteredByCompany.map(c => empName(c)).filter(Boolean))].sort();
  const uniqueCampaignNames = [...new Set(filteredByEmployee.map(c => c.Name || 'Unnamed Campaign').filter(Boolean))].sort();

  return (
    <Layout>
      <PageHeader title="Archived Campaigns" subtitle="Completed assessment campaigns" />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <>
          <Card style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                  Completed Campaigns
                  <span style={{ marginLeft: '10px', fontSize: '0.82rem', color: 'var(--ink-faint)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                    {filtered.length} total
                  </span>
                </h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                background: '#f8f8f8',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Search</label>
                  <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Company</label>
                  <Select value={filterCompany} onChange={e => { setFilterCompany(e.target.value); setFilterEmployee(''); setFilterCampaignName(''); }}>
                    <option value="">All Companies</option>
                    {companies.map(c => <option key={c.CompanyID || c.id} value={String(c.CompanyID || c.id)}>{c.CompanyName || c.name}</option>)}
                  </Select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Employee</label>
                  <Select value={filterEmployee} onChange={e => { setFilterEmployee(e.target.value); setFilterCampaignName(''); }}>
                    <option value="">All Employees</option>
                    {uniqueEmployees.map(name => <option key={name} value={name}>{name}</option>)}
                  </Select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Campaign Name</label>
                  <Select value={filterCampaignName} onChange={e => setFilterCampaignName(e.target.value)}>
                    <option value="">All Campaign Names</option>
                    {uniqueCampaignNames.map(name => <option key={name} value={name}>{name}</option>)}
                  </Select>
                </div>
              </div>
            </div>
            <Table
              headers={['Campaign', 'Employee', 'Company', 'Progress', 'Started', 'Deadline', 'Actions']}
              rows={filtered.map(c => [
                <strong>{c.Name}</strong>,
                <strong>{c.FirstName} {c.LastName}</strong>,
                <span style={{ color: 'var(--ink-soft)', fontSize: '0.84rem' }}>{c.CompanyName || '—'}</span>,
                `${c.CompletedLinks}/${c.TotalLinks}`,
                new Date(c.CreatedAt).toLocaleDateString(),
                fmtDeadline(c),
                <ActionMenu items={[
                  { label: 'View', href: `/manager/campaigns/${c.CycleID}` },
                  { label: 'Delete', onClick: () => setDeleteId(c.CycleID), danger: true },
                ]} />,
              ])}
              emptyMessage="No archived campaigns yet."
            />
          </Card>
          <Modal open={!!deleteId} title="Delete Campaign" onClose={() => setDeleteId(null)}>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
              Are you sure you want to delete this campaign? This will permanently remove all responses and assessment links.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
              <Btn onClick={handleDeleteCampaign} loading={deleting} style={{ background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' }}>
                Yes, Delete
              </Btn>
            </div>
          </Modal>
        </>
      )}
    </Layout>
  );
}

// ── Employees ──────────────────────────────────────────────────────────────
export function ManagerEmployees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filterCompany, setFilterCompany] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.manager.getEmployees()
      .then(setEmployees).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await api.manager.deleteEmployee(deleteId);
      setDeleteId(null);
      load();
    } catch (e) { setError(e.message); }
    finally { setDeleting(false); }
  }

  // Derive unique companies from employee data
  const empCompanies = [...new Map(
    employees.filter(e => e.CompanyID)
      .map(e => [String(e.CompanyID), { id: e.CompanyID, name: e.CompanyName || `Company #${e.CompanyID}` }])
  ).values()];

  // Group employees by company, applying filter
  const grouped = employees
    .filter(e => !filterCompany || String(e.CompanyID) === filterCompany)
    .reduce((acc, e) => {
      const key = e.CompanyID ? String(e.CompanyID) : '__none__';
      const label = e.CompanyName || (e.CompanyID ? `Company #${e.CompanyID}` : 'No Company');
      if (!acc[key]) acc[key] = { label, rows: [] };
      acc[key].rows.push(e);
      return acc;
    }, {});
  const groups = Object.values(grouped);

  return (
    <Layout>
      <PageHeader
        title="Employees"
        subtitle="Manage your team members"
        action={<Link to="/manager/employees/new" state={{ from: '/manager/people' }}><Btn variant="teal">+ Add Employee</Btn></Link>}
      />
      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {empCompanies.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <Select value={filterCompany} onChange={e => setFilterCompany(e.target.value)} style={{ maxWidth: 240 }}>
            <option value="">All companies</option>
            {empCompanies.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
          </Select>
        </div>
      )}
      {loading ? (
        <Card><div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div></Card>
      ) : employees.length === 0 ? (
        <Card><EmptyState icon="👥" title="No employees yet" message="Add your first employee to get started." action={<Link to="/manager/employees/new" state={{ from: '/manager/people' }}><Btn variant="teal">Add Employee</Btn></Link>} /></Card>
      ) : groups.length === 0 ? (
        <Card><EmptyState icon="👥" title="No employees found" message="No employees match the selected company." /></Card>
      ) : (
        groups.map(group => (
          <div key={group.label} style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '8px', padding: '0 2px' }}>
              🏢 {group.label}
            </div>
            <Card>
              <Table
                headers={['Name', 'Email', 'Job Title', 'Language', 'Actions']}
                rows={group.rows.map(e => [
                  <strong>{e.FirstName} {e.LastName}</strong>,
                  <span style={{ color: 'var(--ink-soft)' }}>{e.Email}</span>,
                  e.JobTitle || '—',
                  <Badge status="default">{e.Lang || 'EN'}</Badge>,
                  <ActionMenu items={[
                    { label: 'Edit', onClick: () => navigate(`/manager/employees/${e.EmployeeID}/edit`, { state: { from: '/manager/people' } }) },
                    { label: 'Delete', onClick: () => setDeleteId(e.EmployeeID), danger: true },
                  ]} />,
                ])}
              />
            </Card>
          </div>
        ))
      )}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Employee">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting} onClick={handleDelete}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}

// ── Employee Form ──────────────────────────────────────────────────────────
export function EmployeeForm({ editMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const returnTo = location.state?.from || '/manager/people';
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    jobTitle: '', jobTitleCustom: '',
    lang: 'en',
    managerId: '',
    companyId: location.state?.companyId || '',
  });
  const [managerList, setManagerList] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddManager, setShowAddManager] = useState(false);
  const [addManagerForm, setAddManagerForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
  const [addManagerLoading, setAddManagerLoading] = useState(false);
  const [addManagerError, setAddManagerError] = useState(null);

  // Initial load: companies + employee data for edit mode
  useEffect(() => {
    Promise.all([
      api.manager.getEmployees(),
      api.manager.getCompanies().catch(() => []),
    ]).then(([list, comps]) => {
      setCompanies(Array.isArray(comps) ? comps : []);
      if (editMode && id) {
        const emp = list.find(e => String(e.EmployeeID) === id);
        if (emp) {
          const knownTitle = JOB_TITLES.slice(0, -1).includes(emp.JobTitle);
          const companyId = emp.CompanyID ? String(emp.CompanyID) : '';
          setForm({
            firstName: emp.FirstName, lastName: emp.LastName, email: emp.Email,
            jobTitle: knownTitle ? emp.JobTitle : (emp.JobTitle ? 'Other' : ''),
            jobTitleCustom: knownTitle ? '' : (emp.JobTitle || ''),
            lang: emp.Lang || 'en',
            managerId: emp.ManagerID ? String(emp.ManagerID) : '',
            companyId,
          });
          // Load managers scoped to this company
          const filtered = companyId ? list.filter(e => String(e.CompanyID) === companyId && String(e.EmployeeID) !== id) : list.filter(e => String(e.EmployeeID) !== id);
          setManagerList(filtered);
        }
      } else {
        setManagerList(list);
      }
    }).catch(() => {});
  }, [editMode, id]);

  // Re-fetch manager list when company changes
  useEffect(() => {
    if (!form.companyId) {
      setManagerList([]);
      setForm(f => ({ ...f, managerId: '' }));
      return;
    }
    api.manager.getEmployees(form.companyId)
      .then(list => {
        setManagerList(list.filter(e => String(e.EmployeeID) !== id));
        // Clear manager if no longer in list
        setForm(f => ({
          ...f,
          managerId: list.some(e => String(e.EmployeeID) === f.managerId) ? f.managerId : '',
        }));
      })
      .catch(() => {});
  }, [form.companyId, id]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleAddManager(e) {
    e.preventDefault();
    setAddManagerLoading(true); setAddManagerError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: addManagerForm.firstName, lastName: addManagerForm.lastName,
        email: addManagerForm.email,
        jobTitle: addManagerForm.jobTitle || undefined,
        lang: addManagerForm.lang,
        companyId: addManagerForm.companyId ? Number(addManagerForm.companyId) : null,
      });
      const newId = String(created.employeeId || created.id || created.EmployeeID);
      const newEntry = {
        EmployeeID: newId,
        FirstName: addManagerForm.firstName,
        LastName: addManagerForm.lastName,
        Email: addManagerForm.email,
        JobTitle: addManagerForm.jobTitle,
        CompanyID: addManagerForm.companyId ? Number(addManagerForm.companyId) : null,
      };
      setManagerList(prev => [...prev, newEntry]);
      setForm(f => ({ ...f, managerId: newId }));
      setShowAddManager(false);
      setAddManagerForm({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
    } catch (err) { setAddManagerError(err.message); }
    finally { setAddManagerLoading(false); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const payload = {
        firstName: form.firstName, lastName: form.lastName, email: form.email,
        jobTitle: form.jobTitle === 'Other' ? form.jobTitleCustom : form.jobTitle,
        lang: form.lang,
        managerEmployeeId: form.managerId ? Number(form.managerId) : null,
        companyId: form.companyId ? Number(form.companyId) : null,
      };
      if (editMode) await api.manager.updateEmployee(id, payload);
      else await api.manager.createEmployee(payload);
      navigate(returnTo);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <Layout>
      <PageHeader title={editMode ? 'Edit Employee' : 'Add Employee'} subtitle={editMode ? 'Update employee information' : 'Add a new team member'} />
      <Card style={{ padding: '32px', maxWidth: 560 }}>
        {error && <div style={{ marginBottom: '20px' }}><Alert type="error">{error}</Alert></div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="grid-2col" style={{ gap: '16px' }}>
            <FormField label="First Name" required><Input value={form.firstName} onChange={set('firstName')} required /></FormField>
            <FormField label="Last Name" required><Input value={form.lastName} onChange={set('lastName')} required /></FormField>
          </div>
          <FormField label="Email" required><Input type="email" value={form.email} onChange={set('email')} required /></FormField>

          <FormField label="Company" required>
            <Select value={form.companyId} onChange={set('companyId')} required>
              <option value="">— Select company —</option>
              {companies.map(c => (
                <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>
                  {c.CompanyName || c.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Job Title">
            <Select value={form.jobTitle} onChange={set('jobTitle')}>
              <option value="">— Select job title —</option>
              {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            {form.jobTitle === 'Other' && (
              <Input style={{ marginTop: '8px' }} value={form.jobTitleCustom} onChange={set('jobTitleCustom')} placeholder="Enter job title..." />
            )}
          </FormField>

          <FormField label="Manager / Mentor" hint="Select the employee's direct manager or mentor (optional)">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Select value={form.managerId} onChange={set('managerId')} style={{ flex: 1 }} disabled={!form.companyId}>
                <option value="">{form.companyId ? '— No manager —' : '— Select company first —'}</option>
                {managerList.map(e => (
                  <option key={e.EmployeeID} value={e.EmployeeID}>
                    {e.FirstName} {e.LastName}
                  </option>
                ))}
              </Select>
              <Btn type="button" variant="outline" size="sm" onClick={() => setShowAddManager(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }} disabled={!form.companyId}>+ Add New</Btn>
            </div>
          </FormField>

          <FormField label="Language" required>
            <Select value={form.lang} onChange={set('lang')}>
              <option value="en">English</option>
              <option value="sr">Serbian</option>
            </Select>
          </FormField>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
            <Btn type="submit" variant="teal" loading={loading}>{editMode ? 'Save Changes' : 'Add Employee'}</Btn>
            <Btn variant="outline" type="button" onClick={() => navigate(returnTo)}>Cancel</Btn>
          </div>
        </form>
      </Card>

      <Modal open={showAddManager} onClose={() => { setShowAddManager(false); setAddManagerError(null); }} title="Add New Manager">
        {addManagerError && <div style={{ marginBottom: '16px' }}><Alert type="error">{addManagerError}</Alert></div>}
        <form onSubmit={handleAddManager} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="First Name" required>
              <Input value={addManagerForm.firstName} onChange={e => setAddManagerForm(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
            </FormField>
            <FormField label="Last Name" required>
              <Input value={addManagerForm.lastName} onChange={e => setAddManagerForm(f => ({ ...f, lastName: e.target.value }))} required />
            </FormField>
          </div>
          <FormField label="Email" required>
            <Input type="email" value={addManagerForm.email} onChange={e => setAddManagerForm(f => ({ ...f, email: e.target.value }))} required />
          </FormField>
          {companies.length > 0 && (
            <FormField label="Company">
              <Select value={addManagerForm.companyId} onChange={e => setAddManagerForm(f => ({ ...f, companyId: e.target.value }))}>
                <option value="">— Select company —</option>
                {companies.map(c => <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>)}
              </Select>
            </FormField>
          )}
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="Job Title">
              <Select value={addManagerForm.jobTitle} onChange={e => setAddManagerForm(f => ({ ...f, jobTitle: e.target.value }))}>
                <option value="">— Select —</option>
                {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Language">
              <Select value={addManagerForm.lang} onChange={e => setAddManagerForm(f => ({ ...f, lang: e.target.value }))}>
                <option value="en">English</option>
                <option value="sr">Serbian</option>
              </Select>
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <Btn variant="outline" type="button" onClick={() => { setShowAddManager(false); setAddManagerError(null); }}>Cancel</Btn>
            <Btn type="submit" variant="teal" loading={addManagerLoading}>Add & Select</Btn>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}

// ── People Picker (Peers / Direct Reports) ─────────────────────────────────
// Uvek generiše I shared link I individualne linkove za izabrane iz baze
function PeoplePicker({ label, employees, selected, onToggle, onSelectAll, newPersons, onAddPerson, onRemovePerson, addModalOpen, setAddModalOpen, managerEmployeeId, companies }) {
  const [newPerson, setNewPerson] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);

  async function handleAdd(e) {
    e.preventDefault();
    setAddLoading(true); setAddError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: newPerson.firstName, lastName: newPerson.lastName,
        email: newPerson.email, jobTitle: newPerson.jobTitle || undefined, lang: newPerson.lang,
        companyId: newPerson.companyId ? Number(newPerson.companyId) : null,
        ...(managerEmployeeId ? { managerEmployeeId } : {}),
      });
      const createdId = created.employeeId || created.id || created.EmployeeID;
      onAddPerson({ id: createdId, firstName: newPerson.firstName, lastName: newPerson.lastName, email: newPerson.email });
      setNewPerson({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
      setAddModalOpen(false);
    } catch (err) { setAddError(err.message); }
    finally { setAddLoading(false); }
  }

  const totalSelected = selected.length + newPersons.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Deo 1 — picker iz baze (individualni linkovi + email) */}
      <div style={{ border: '1.5px solid var(--canvas-warm)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', background: 'var(--canvas-warm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              style={{ accentColor: 'var(--ink)' }}
              checked={employees.length > 0 && selected.length === employees.length}
              onChange={() => {
                const allSelected = selected.length === employees.length;
                onSelectAll(allSelected ? [] : employees.map(e => e.EmployeeID));
              }}
            />
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>From database</span>
            <span style={{ fontSize: '0.76rem', color: 'var(--ink-soft)' }}>
              {totalSelected > 0 ? `${totalSelected} selected` : 'individual link + email per person'}
            </span>
          </label>
          <Btn type="button" size="sm" variant="outline" onClick={() => setAddModalOpen(true)}>+ Add New</Btn>
        </div>

        <div style={{ maxHeight: 190, overflowY: 'auto', padding: '6px' }}>
          {employees.length === 0 ? (
            <div style={{ padding: '10px', fontSize: '0.83rem', color: 'var(--ink-faint)', textAlign: 'center' }}>No employees in database yet.</div>
          ) : employees.map(emp => (
            <label key={emp.EmployeeID} style={{
              display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 10px',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              background: selected.includes(emp.EmployeeID) ? 'rgba(0,0,0,0.04)' : 'transparent',
            }}>
              <input type="checkbox" checked={selected.includes(emp.EmployeeID)}
                onChange={() => onToggle(emp.EmployeeID)} style={{ accentColor: 'var(--ink)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: '0.87rem' }}>{emp.FirstName} {emp.LastName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {emp.Email}{emp.JobTitle ? ` · ${emp.JobTitle}` : ''}
                </div>
              </div>
              {selected.includes(emp.EmployeeID) && (
                <span style={{ fontSize: '0.71rem', color: '#0a9', fontWeight: 600, flexShrink: 0 }}>✉ email</span>
              )}
            </label>
          ))}
        </div>

        {/* Novo dodati */}
        {newPersons.length > 0 && (
          <div style={{ borderTop: '1px solid var(--canvas-warm)', padding: '6px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', padding: '4px 10px 4px' }}>Newly added</div>
            {newPersons.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,160,120,0.06)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.87rem' }}>{p.firstName} {p.lastName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{p.email}</div>
                </div>
                <span style={{ fontSize: '0.71rem', color: '#0a9', fontWeight: 600, flexShrink: 0 }}>✉ email</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.76rem', color: 'var(--ink-soft)', padding: '2px 4px', lineHeight: 1.5 }}>
        A shared link will also be generated after launch — visible on the campaign page.
      </div>

      {/* Add new person modal */}
      <Modal open={addModalOpen} onClose={() => { setAddModalOpen(false); setAddError(null); }} title={`Add New ${label}`}>
        {addError && <div style={{ marginBottom: '14px' }}><Alert type="error">{addError}</Alert></div>}
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '16px', lineHeight: 1.6 }}>
          This person will be saved to the database and will receive an individual email with their assessment link.
        </p>
<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="First Name" required>
              <Input value={newPerson.firstName} onChange={e => setNewPerson(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
            </FormField>
            <FormField label="Last Name" required>
              <Input value={newPerson.lastName} onChange={e => setNewPerson(f => ({ ...f, lastName: e.target.value }))} required />
            </FormField>
          </div>
          <FormField label="Email" required hint="Invitation will be sent to this address">
            <Input type="email" value={newPerson.email} onChange={e => setNewPerson(f => ({ ...f, email: e.target.value }))} required />
          </FormField>
          {companies && companies.length > 0 && (
            <FormField label="Company">
              <Select value={newPerson.companyId} onChange={e => setNewPerson(f => ({ ...f, companyId: e.target.value }))}>
                <option value="">— Select company —</option>
                {companies.map(c => (
                  <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>
                ))}
              </Select>
            </FormField>
          )}
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="Job Title">
              <Select value={newPerson.jobTitle} onChange={e => setNewPerson(f => ({ ...f, jobTitle: e.target.value }))}>
                <option value="">— Select —</option>
                {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Language">
              <Select value={newPerson.lang} onChange={e => setNewPerson(f => ({ ...f, lang: e.target.value }))}>
                <option value="en">English</option>
                <option value="sr">Serbian</option>
              </Select>
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <Btn variant="outline" type="button" onClick={() => { setAddModalOpen(false); setAddError(null); }}>Cancel</Btn>
<Btn type="button" variant="teal" loading={addLoading} onClick={handleAdd}>Save & Add</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ── Shared Campaign Form ────────────────────────────────────────────────────
function CampaignForm({ initialData, onSubmit, submitLoading, submitError, lockMode, initialCompanyId, returnTo }) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [mode, setMode] = useState(initialData?.mode || 'individual');
  const [form, setForm] = useState({
    name: '', employeeId: '', employeeIds: [], profilId: '', lang: '',
    includeSelf: false, includeManager: false, includePeer: false,
    includeDirectReports: false, includeExternal: false,
    includeCrossPartisan: false, includeMentor: false,
    peerEmployeeIds: [],
    peerNewPersons: [],
    drEmployeeIds: [],
    drNewPersons: [],
    deadline: '',
    ...initialData,
  });
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [showAddPeer, setShowAddPeer] = useState(false);
  const [showAddDr, setShowAddDr] = useState(false);
  const [addEmpForm, setAddEmpForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '', managerId: '' });
  const [filterEmpCompany, setFilterEmpCompany] = useState(initialCompanyId || '');
  const [addEmpLoading, setAddEmpLoading] = useState(false);
  const [addEmpError, setAddEmpError] = useState(null);
  const [showAddEmpManager, setShowAddEmpManager] = useState(false);
  const [addEmpManagerForm, setAddEmpManagerForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
  const [addEmpManagerLoading, setAddEmpManagerLoading] = useState(false);
  const [addEmpManagerError, setAddEmpManagerError] = useState(null);
  // Odvojene liste za peer i DR pickere, učitane iz relationships tabele
  const [peerEmployees, setPeerEmployees] = useState([]);
  const [drEmployees, setDrEmployees] = useState([]);
  const [loadingRelationships, setLoadingRelationships] = useState(false);
  const [groupStyle, setGroupStyle] = useState('same');
  const EMPTY_SUBGROUP = { employeeIds: [], profilId: '', includeSelf: false, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false, includeCrossPartisan: false, includeMentor: false };
  const [subgroups, setSubgroups] = useState([{ ...EMPTY_SUBGROUP }]);
  const [cycleConfig, setCycleConfig] = useState(null);
  const [cycleConfigLoading, setCycleConfigLoading] = useState(false);
  const cycleConfigCacheRef = useRef({});
  const [sgTypeIntersections, setSgTypeIntersections] = useState([]);
  const [sgBlockReasons, setSgBlockReasons] = useState([]); // per subgroup: { [key]: blockMessage }
  const [groupSameIntersection, setGroupSameIntersection] = useState(null);
  const [groupSameBlockReasons, setGroupSameBlockReasons] = useState({}); // { [key]: blockMessage }

  useEffect(() => {
    api.manager.getEmployees().then(setEmployees).catch(() => {});
    api.manager.getProfiles().then(setProfiles).catch(() => {});
    api.manager.getCompanies().then(r => setCompanies(Array.isArray(r) ? r : [])).catch(() => {});
    if (!lockMode) {
      api.manager.getCampaigns()
        .then(campaigns => {
          const nextNum = (campaigns?.length || 0) + 1;
          setForm(f => ({ ...f, name: f.name || `HB Compass Campaign ${nextNum}` }));
        })
        .catch(() => {});
    }
  }, []);

  const selectedProfile = profiles.find(p => String(p.id || p.ProfilID) === String(form.profilId));

  // Map form keys → API questionType strings
  const Q_TYPE_MAP = {
    includeSelf: 'self',
    includeManager: 'manager',
    includePeer: 'peer',
    includeDirectReports: 'direct_report',
    includeExternal: 'external',
    includeCrossPartisan: 'crosspartisan',
    includeMentor: 'mentor',
  };
const normalizeCycleTypes = (types) => (types || []).map(t => ({ ...t, key: t.key }));

  // Which types are available for the selected profile (from DB)
  const profileQTypes = selectedProfile?.questionTypes || null;
  const isTypeAvailable = key => {
    // Profile-level check
    if (profileQTypes && !profileQTypes.some(t => t === Q_TYPE_MAP[key] || t === Q_TYPE_MAP[key]?.replace('_', ''))) return false;
    // Employee intersection check for "same for all" group mode
    if (mode === 'group' && groupStyle === 'same' && groupSameIntersection) return groupSameIntersection.has(key);
    return true;
  };
  // Backwards-compat: if profile name says employee, treat as self-only
  const isEmployeeProfile = profileQTypes
    ? profileQTypes.length === 1 && profileQTypes[0] === 'self'
    : (selectedProfile?.name || selectedProfile?.Name || '').toLowerCase().includes('employee');

  // When profile changes, clear assessment types that are no longer available
  useEffect(() => {
    if (!form.profilId) return;
    setForm(f => ({
      ...f,
      includeSelf: f.includeSelf && isTypeAvailable('includeSelf'),
      includeManager: f.includeManager && isTypeAvailable('includeManager'),
      includePeer: f.includePeer && isTypeAvailable('includePeer'),
      includeDirectReports: f.includeDirectReports && isTypeAvailable('includeDirectReports'),
      includeExternal: f.includeExternal && isTypeAvailable('includeExternal'),
      includeCrossPartisan: f.includeCrossPartisan && isTypeAvailable('includeCrossPartisan'),
      includeMentor: f.includeMentor && isTypeAvailable('includeMentor'),
    }));
    if (isEmployeeProfile) {
      setForm(f => ({ ...f, includeSelf: true, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false, includeCrossPartisan: false, includeMentor: false }));
    }
  }, [form.profilId]); // eslint-disable-line

  // Fetch cycle config when employee + profile selected (individual mode)
  useEffect(() => {
    if (!form.employeeId || !form.profilId || mode !== 'individual') {
      setCycleConfig(null);
      return;
    }
    setCycleConfigLoading(true);
    api.manager.getCycleConfig(form.employeeId, form.profilId)
      .then(cfg => {
        const normalized = { ...cfg, assessmentTypes: normalizeCycleTypes(cfg.assessmentTypes) };
        setCycleConfig(normalized);
        // Uncheck any types that are blocked for this employee
        setForm(f => {
          const updated = { ...f };
          (normalized.assessmentTypes || []).forEach(t => {
            if (t.blocked) updated[t.key] = false;
          });
          return updated;
        });
      })
      .catch(() => setCycleConfig(null))
      .finally(() => setCycleConfigLoading(false));
  }, [form.employeeId, form.profilId, mode]); // eslint-disable-line

  // For custom subgroups: fetch getCycleConfig per employee+profile, compute intersection of available types
  const sgSignature = subgroups.map(sg => `${sg.profilId}:${[...sg.employeeIds].sort().join(',')}`).join('|');
  useEffect(() => {
    if (mode !== 'group' || groupStyle !== 'custom') return;
    subgroups.forEach((sg, si) => {
      if (!sg.profilId || sg.employeeIds.length === 0) {
        setSgTypeIntersections(prev => { const next = [...prev]; next[si] = null; return next; });
        return;
      }
      const fetchOne = (empId) => {
        const cacheKey = `${empId}-${sg.profilId}`;
        if (cycleConfigCacheRef.current[cacheKey]) return Promise.resolve(cycleConfigCacheRef.current[cacheKey]);
        return api.manager.getCycleConfig(empId, sg.profilId)
          .then(cfg => {
            const normalized = normalizeCycleTypes(cfg.assessmentTypes || []);
            cycleConfigCacheRef.current[cacheKey] = normalized;
            return normalized;
          }).catch(() => null);
      };
      Promise.all(sg.employeeIds.map(fetchOne)).then(results => {
        const valid = results.filter(Boolean);
        if (valid.length === 0) {
          setSgTypeIntersections(prev => { const next = [...prev]; next[si] = null; return next; });
          setSgBlockReasons(prev => { const next = [...prev]; next[si] = {}; return next; });
          return;
        }
        const availSet = new Set();
        const blockReasons = {};
        for (const typeObj of valid[0]) {
          const key = typeObj.key;
          if (typeObj.blocked) {
            blockReasons[key] = typeObj.blockMessage || 'Not available for this employee';
            continue;
          }
          const allAvail = valid.every(r => { const found = r.find(rt => rt.key === key); return found && !found.blocked; });
          if (allAvail) availSet.add(key);
          else blockReasons[key] = 'Not available for all employees in this subgroup';
        }
        setSgTypeIntersections(prev => { const next = [...prev]; next[si] = availSet; return next; });
        setSgBlockReasons(prev => { const next = [...prev]; next[si] = blockReasons; return next; });
        // Uncheck any types that fell out of the intersection
        setSubgroups(prev => prev.map((g, i) => {
          if (i !== si) return g;
          return {
            ...g,
            includeSelf: g.includeSelf && availSet.has('includeSelf'),
            includeManager: g.includeManager && availSet.has('includeManager'),
            includePeer: g.includePeer && availSet.has('includePeer'),
            includeDirectReports: g.includeDirectReports && availSet.has('includeDirectReports'),
            includeExternal: g.includeExternal && availSet.has('includeExternal'),
            includeCrossPartisan: g.includeCrossPartisan && availSet.has('includeCrossPartisan'),
            includeMentor: g.includeMentor && availSet.has('includeMentor'),
          };
        }));
      });
    });
  }, [sgSignature, mode, groupStyle]); // eslint-disable-line

  // For "same for all" group mode: compute intersection of available types across all selected employees
  const groupSameSignature = `${form.profilId}:${[...form.employeeIds].sort().join(',')}`;
  useEffect(() => {
    if (mode !== 'group' || groupStyle !== 'same' || !form.profilId || form.employeeIds.length === 0) {
      setGroupSameIntersection(null);
      return;
    }
    const fetchOne = (empId) => {
      const cacheKey = `${empId}-${form.profilId}`;
      if (cycleConfigCacheRef.current[cacheKey]) return Promise.resolve(cycleConfigCacheRef.current[cacheKey]);
      return api.manager.getCycleConfig(empId, form.profilId)
        .then(cfg => {
          const normalized = normalizeCycleTypes(cfg.assessmentTypes || []);
          cycleConfigCacheRef.current[cacheKey] = normalized;
          return normalized;
        }).catch(() => null);
    };
    Promise.all(form.employeeIds.map(fetchOne)).then(results => {
      const valid = results.filter(Boolean);
      if (valid.length === 0) { setGroupSameIntersection(null); setGroupSameBlockReasons({}); return; }
      const availSet = new Set();
      const blockReasons = {};
      for (const typeObj of valid[0]) {
        const key = typeObj.key;
        if (typeObj.blocked) {
          // Blocked by backend for this employee — use backend's reason
          blockReasons[key] = typeObj.blockMessage || 'Not available for this employee';
          continue;
        }
        const allAvail = valid.every(r => { const found = r.find(rt => rt.key === key); return found && !found.blocked; });
        if (allAvail) {
          availSet.add(key);
        } else {
          blockReasons[key] = 'Not available for all selected employees';
        }
      }
      setGroupSameIntersection(availSet);
      setGroupSameBlockReasons(blockReasons);
      setForm(f => ({
        ...f,
        includeSelf: f.includeSelf && availSet.has('includeSelf'),
        includeManager: f.includeManager && availSet.has('includeManager'),
        includePeer: f.includePeer && availSet.has('includePeer'),
        includeDirectReports: f.includeDirectReports && availSet.has('includeDirectReports'),
        includeExternal: f.includeExternal && availSet.has('includeExternal'),
        includeCrossPartisan: f.includeCrossPartisan && availSet.has('includeCrossPartisan'),
        includeMentor: f.includeMentor && availSet.has('includeMentor'),
      }));
    });
  }, [groupSameSignature, mode, groupStyle]); // eslint-disable-line

  // Kada se promeni subject employee, učitaj njegove peers i DR iz baze
  useEffect(() => {
    const empId = form.employeeId;
    if (!empId || mode !== 'individual') {
      setPeerEmployees([]);
      setDrEmployees([]);
      return;
    }
    setLoadingRelationships(true);
    Promise.all([
      api.manager.getEmployeePeers(empId).catch(() => []),
      api.manager.getEmployeeDirectReports(empId).catch(() => []),
    ]).then(([peers, drs]) => {
      setPeerEmployees(Array.isArray(peers) ? peers : []);
      setDrEmployees(Array.isArray(drs) ? drs : []);
      // Pre-selektuj sve koji postoje u relationships
      setForm(f => ({
        ...f,
        peerEmployeeIds: (Array.isArray(peers) ? peers : []).map(p => p.EmployeeID),
        drEmployeeIds:   (Array.isArray(drs)   ? drs   : []).map(d => d.EmployeeID),
      }));
    }).finally(() => setLoadingRelationships(false));
  }, [form.employeeId, mode]);

  async function handleAddEmpManager(e) {
    e.preventDefault();
    setAddEmpManagerLoading(true); setAddEmpManagerError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: addEmpManagerForm.firstName, lastName: addEmpManagerForm.lastName,
        email: addEmpManagerForm.email, jobTitle: addEmpManagerForm.jobTitle || undefined,
        lang: addEmpManagerForm.lang,
        companyId: addEmpManagerForm.companyId ? Number(addEmpManagerForm.companyId) : null,
      });
      const newId = String(created.employeeId || created.id || created.EmployeeID);
      const newEntry = { EmployeeID: newId, FirstName: addEmpManagerForm.firstName, LastName: addEmpManagerForm.lastName };
      setEmployees(prev => [...prev, newEntry]);
      setAddEmpForm(f => ({ ...f, managerId: newId }));
      setShowAddEmpManager(false);
      setAddEmpManagerForm({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
    } catch (err) { setAddEmpManagerError(err.message); }
    finally { setAddEmpManagerLoading(false); }
  }

  async function handleAddEmployee(e) {
    e.preventDefault();
    setAddEmpLoading(true); setAddEmpError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: addEmpForm.firstName, lastName: addEmpForm.lastName,
        email: addEmpForm.email, jobTitle: addEmpForm.jobTitle || undefined, lang: addEmpForm.lang,
        companyId: addEmpForm.companyId ? Number(addEmpForm.companyId) : null,
        managerEmployeeId: addEmpForm.managerId ? Number(addEmpForm.managerId) : null,
      });
      const newEmp = { EmployeeID: created.employeeId || created.id || created.EmployeeID, FirstName: addEmpForm.firstName, LastName: addEmpForm.lastName, Email: addEmpForm.email, JobTitle: addEmpForm.jobTitle };
      setEmployees(prev => [...prev, newEmp]);
      setForm(f => ({ ...f, employeeId: String(newEmp.EmployeeID) }));
      setShowAddEmp(false);
      setAddEmpForm({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '', managerId: '' });
    } catch (err) { setAddEmpError(err.message); }
    finally { setAddEmpLoading(false); }
  }

  const toggle = key => setForm(f => ({ ...f, [key]: !f[key] }));

  function toggleId(listKey, id) {
    setForm(f => ({
      ...f,
      [listKey]: f[listKey].includes(id) ? f[listKey].filter(x => x !== id) : [...f[listKey], id],
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: form.name,
      mode,
      lang: form.lang || undefined,
      ...(mode === 'individual' ? { employeeId: Number(form.employeeId) } : { employeeIds: form.employeeIds }),
      profilId: form.profilId ? Number(form.profilId) : undefined,
      deadline: form.deadline || undefined,
      includeSelf: form.includeSelf, includeManager: form.includeManager,
      includePeer: form.includePeer, includeDirectReports: form.includeDirectReports,
      includeExternal: form.includeExternal,
      includeCrossPartisan: form.includeCrossPartisan, includeMentor: form.includeMentor,
      // Dynamic profile-specific types (e.g. includeClient, includeBusinessPartner for ice_pilot)
      ...Object.fromEntries(
        Object.entries(form)
          .filter(([k, v]) => k.startsWith('include') && v === true && !['includeSelf','includeManager','includePeer','includeDirectReports','includeExternal','includeCrossPartisan','includeMentor'].includes(k))
      ),
      // Peer — individualni + shared link uvek ide sa backenda
      peerEmployeeIds: form.peerEmployeeIds,
      peerNewPersonIds: form.peerNewPersons.map(p => p.id).filter(Boolean),
      // Direct reports — individualni + shared link uvek ide sa backenda
      drEmployeeIds: form.drEmployeeIds,
      drNewPersonIds: form.drNewPersons.map(p => p.id).filter(Boolean),
      // Group subgroups
      ...(mode === 'group' ? { groupStyle, subgroups } : {}),
    });
  }

  return (
    <>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {submitError && <Alert type="error">{submitError}</Alert>}

      {/* Campaign Name */}
      <FormField label="Campaign Name" required>
        <Input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="e.g. HB Compass Campaign 1"
          required
        />
      </FormField>

      {/* Company */}
      {!lockMode && companies.length > 0 && (
        <FormField label="Company" required>
          <Select
            value={filterEmpCompany}
            onChange={e => {
              const newCompId = e.target.value;
              setFilterEmpCompany(newCompId);
              const compObj = companies.find(c => String(c.CompanyID || c.id) === newCompId);
              const compProfs = compObj?.profiles;
              setForm(f => {
                const profilStillValid = !compProfs?.length || compProfs.some(cp => String(cp.id) === String(f.profilId));
                return { ...f, employeeId: '', employeeIds: [], profilId: profilStillValid ? f.profilId : '' };
              });
            }}
            required
          >
            <option value="">— Select company —</option>
            {companies.map(c => <option key={c.CompanyID || c.id} value={String(c.CompanyID || c.id)}>{c.CompanyName || c.name}</option>)}
          </Select>
        </FormField>
      )}

      {/* Mode — hidden in edit mode */}
      {!lockMode && (
        <FormField label="Campaign Mode" required>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[{ value: 'individual', label: 'For Individual', desc: 'One employee' }, { value: 'group', label: 'For Group', desc: 'Multiple employees at once' }].map(m => (
              <label key={m.value} style={{
                flex: 1, display: 'flex', gap: '10px', padding: '14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                border: `1.5px solid ${mode === m.value ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                background: mode === m.value ? 'var(--canvas-warm)' : 'var(--canvas)', transition: 'all var(--transition)',
              }}>
                <input type="radio" name="mode" value={m.value} checked={mode === m.value} onChange={() => setMode(m.value)} style={{ accentColor: 'var(--ink)', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{m.label}</div>
                  <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{m.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </FormField>
      )}

      {/* Deadline */}
      <FormField label="Deadline" hint="Assessors will receive reminder emails at 10, 5, 2 and 1 day(s) before the deadline">
        <Input
          type="date"
          value={form.deadline}
          onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      {/* Employee selection — hidden in edit mode */}
      {!lockMode && (() => {
        const filteredEmps = filterEmpCompany
          ? employees.filter(e => String(e.CompanyID) === filterEmpCompany)
          : employees;
          const isCompanySelected = !!filterEmpCompany;
        if (mode === 'individual') return (
          <FormField label="Select Employee" required>
            {isCompanySelected && filteredEmps.length === 0 ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1.5px solid var(--canvas-warm)', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
                  This company has no employees yet.
                </div>
                <Btn type="button" variant="outline" size="sm" onClick={() => { setAddEmpForm(prev => ({ ...prev, companyId: filterEmpCompany })); setShowAddEmp(true); }} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                  + Add New
                </Btn>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', opacity: isCompanySelected ? 1 : 0.6, transition: 'opacity 0.2s ease' }}>
                <Select
                  value={form.employeeId}
                  disabled={!isCompanySelected}
                  onChange={e => {
                    setForm(f => ({ ...f, employeeId: e.target.value, peerEmployeeIds: [], drEmployeeIds: [], peerNewPersons: [], drNewPersons: [] }));
                    setPeerEmployees([]);
                    setDrEmployees([]);
                  }}
                  required
                  style={{ flex: 1, cursor: !isCompanySelected ? 'not-allowed' : 'pointer' }}
                >
                  <option value="">{isCompanySelected ? '— Choose employee —' : 'Select company above first'}</option>
                  {filteredEmps.map(emp => <option key={emp.EmployeeID} value={emp.EmployeeID}>{emp.FirstName} {emp.LastName} ({emp.JobTitle || emp.Email})</option>)}
                </Select>
                <Btn type="button" variant="outline" size="sm" disabled={!isCompanySelected} onClick={() => { setAddEmpForm(prev => ({ ...prev, companyId: filterEmpCompany })); setShowAddEmp(true); }} style={{ whiteSpace: 'nowrap', flexShrink: 0, cursor: !isCompanySelected ? 'not-allowed' : 'pointer' }}>
                  + Add New
                </Btn>
              </div>
            )}
          </FormField>
        );
        const employeeListUI = (
          <div style={{
            opacity: isCompanySelected ? 1 : 0.6,
            pointerEvents: isCompanySelected ? 'auto' : 'none',
            transition: 'opacity 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{
                display: 'flex', gap: '8px', alignItems: 'center',
                cursor: isCompanySelected ? 'pointer' : 'not-allowed',
                fontSize: '0.85rem', color: 'var(--ink-soft)'
              }}>
                <input
                  type="checkbox"
                  disabled={!isCompanySelected}
                  checked={isCompanySelected && filteredEmps.length > 0 && filteredEmps.every(e => form.employeeIds.includes(e.EmployeeID))}
                  onChange={() => {
                    if (!isCompanySelected) return;
                    const allSelected = filteredEmps.every(e => form.employeeIds.includes(e.EmployeeID));
                    const filteredIds = filteredEmps.map(e => e.EmployeeID);
                    setForm(f => ({
                      ...f,
                      employeeIds: allSelected
                        ? f.employeeIds.filter(id => !filteredIds.includes(id))
                        : [...new Set([...f.employeeIds, ...filteredIds])],
                    }));
                  }}
                  style={{ accentColor: 'var(--ink)' }}
                />
                Select all in company
              </label>
              {form.employeeIds.length > 0 && <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{form.employeeIds.length} selected</div>}
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: 220, overflowY: 'auto',
              border: '1.5px solid var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '6px',
              background: !isCompanySelected ? 'var(--canvas)' : 'transparent'
            }}>
              {!isCompanySelected ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
                  Select a company above to see employees.
                </div>
              ) : filteredEmps.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
                  This company has no employees yet.
                </div>
              ) : filteredEmps.map(emp => (
                <label key={emp.EmployeeID} style={{
                  display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  background: form.employeeIds.includes(emp.EmployeeID) ? 'var(--canvas-warm)' : 'transparent',
                }}>
                  <input type="checkbox" checked={form.employeeIds.includes(emp.EmployeeID)}
                    onChange={() => toggleId('employeeIds', emp.EmployeeID)} style={{ accentColor: 'var(--ink)' }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{emp.FirstName} {emp.LastName}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--ink-soft)' }}>{emp.JobTitle || emp.Email}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

        const subgroupUI = (
          <div style={{ opacity: isCompanySelected ? 1 : 0.6, pointerEvents: isCompanySelected ? 'auto' : 'none' }}>
            {subgroups.map((sg, si) => (
              <div key={si} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '16px', marginBottom: '12px', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Subgroup {si + 1}</div>
                  {subgroups.length > 1 && (
                    <Btn type="button" size="sm" variant="outline" onClick={() => setSubgroups(prev => prev.filter((_, i) => i !== si))} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Remove</Btn>
                  )}
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Employees {sg.employeeIds.length > 0 ? `(${sg.employeeIds.length} selected)` : ''}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: 180, overflowY: 'auto', border: '1px solid #e5e5e5', borderRadius: 6, padding: '6px', background: '#fff', marginBottom: '12px' }}>
                  {filteredEmps.length === 0 ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.84rem' }}>Select a company above to see employees.</div>
                  ) : filteredEmps.map(emp => (
                    <label key={emp.EmployeeID} style={{
                      display: 'flex', gap: '8px', alignItems: 'center', padding: '6px 8px',
                      borderRadius: 4, cursor: 'pointer',
                      background: sg.employeeIds.includes(emp.EmployeeID) ? 'var(--canvas-warm)' : 'transparent',
                    }}>
                      <input type="checkbox" checked={sg.employeeIds.includes(emp.EmployeeID)}
                        onChange={() => setSubgroups(prev => prev.map((g, i) => i !== si ? g : {
                          ...g,
                          employeeIds: g.employeeIds.includes(emp.EmployeeID)
                            ? g.employeeIds.filter(id => id !== emp.EmployeeID)
                            : [...g.employeeIds, emp.EmployeeID],
                        }))}
                        style={{ accentColor: 'var(--ink)' }} />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{emp.FirstName} {emp.LastName}</div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--ink-soft)' }}>{emp.JobTitle || emp.Email}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {/* Per-subgroup profile */}
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Profile</div>
                {(() => {
                  const companyObj = companies.find(c => String(c.CompanyID || c.id) === filterEmpCompany);
                  const companyProfiles = companyObj?.profiles;
                  const availableProfiles = companyProfiles?.length
                    ? profiles.filter(p => companyProfiles.some(cp => String(cp.id) === String(p.id || p.ProfilID)))
                    : profiles;
                  return (
                    <Select
                      value={sg.profilId}
                      onChange={e => {
                        const newProfilId = e.target.value;
                        setSubgroups(prev => prev.map((g, i) => {
                          if (i !== si) return g;
                          const newProf = profiles.find(p => String(p.id || p.ProfilID) === String(newProfilId));
                          const qTypes = newProf?.questionTypes || null;
                          const clearIfUnavailable = key => {
                            if (!qTypes) return g[key];
                            return qTypes.some(t => t === Q_TYPE_MAP[key] || t === Q_TYPE_MAP[key]?.replace('_', '')) ? g[key] : false;
                          };
                          return {
                            ...g, profilId: newProfilId,
                            includeSelf: clearIfUnavailable('includeSelf'),
                            includeManager: clearIfUnavailable('includeManager'),
                            includePeer: clearIfUnavailable('includePeer'),
                            includeDirectReports: clearIfUnavailable('includeDirectReports'),
                            includeExternal: clearIfUnavailable('includeExternal'),
                            includeCrossPartisan: clearIfUnavailable('includeCrossPartisan'),
                            includeMentor: clearIfUnavailable('includeMentor'),
                          };
                        }));
                      }}
                      style={{ marginBottom: '12px' }}
                    >
                      <option value="">— Select profile —</option>
                      {availableProfiles.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
                    </Select>
                  );
                })()}

                {/* Assessment types — filtered by this subgroup's profile */}
                {sg.profilId ? (
                  <>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Assessment Types</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {[
                        { key: 'includeSelf', label: 'Self' },
                        { key: 'includeManager', label: 'Manager' },
                        { key: 'includePeer', label: 'Peer' },
                        { key: 'includeDirectReports', label: 'Direct Reports' },
                        { key: 'includeExternal', label: 'External' },
                        { key: 'includeCrossPartisan', label: 'Cross-Partisan' },
                        { key: 'includeMentor', label: 'Mentor' },
                      ].filter(t => {
                        const sgProf = profiles.find(p => String(p.id || p.ProfilID) === String(sg.profilId));
                        const qTypes = sgProf?.questionTypes || null;
                        return !qTypes || qTypes.some(q => q === Q_TYPE_MAP[t.key] || q === Q_TYPE_MAP[t.key]?.replace('_', ''));
                      }).map(t => {
                        const intersection = sgTypeIntersections[si];
                        const blocked = intersection && !intersection.has(t.key);
                        const blockMessage = (sgBlockReasons[si] && sgBlockReasons[si][t.key]) || 'Not available for the selected employees';
                        if (blocked) return (
                          <div key={t.key} style={{
                            display: 'flex', gap: '6px', alignItems: 'center', padding: '7px 11px',
                            borderRadius: 6, fontSize: '0.83rem', fontWeight: 500,
                            border: '1.5px solid #e0e0e0', background: '#f5f5f5', opacity: 0.6,
                            cursor: 'not-allowed', flexDirection: 'column', alignItems: 'flex-start',
                          }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <input type="checkbox" checked={false} disabled style={{ accentColor: 'var(--ink)' }} />
                              {t.label}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--danger)', marginLeft: '20px' }}>{blockMessage}</div>
                          </div>
                        );
                        return (
                          <label key={t.key} style={{
                            display: 'flex', gap: '6px', alignItems: 'center', padding: '7px 11px',
                            borderRadius: 6, cursor: 'pointer', fontSize: '0.83rem', fontWeight: 500,
                            border: `1.5px solid ${sg[t.key] ? 'var(--ink)' : '#e0e0e0'}`,
                            background: sg[t.key] ? 'var(--canvas-warm)' : '#fff',
                            transition: 'all 0.15s ease',
                          }}>
                            <input type="checkbox" checked={sg[t.key]}
                              onChange={() => setSubgroups(prev => prev.map((g, i) => i !== si ? g : { ...g, [t.key]: !g[t.key] }))}
                              style={{ accentColor: 'var(--ink)' }} />
                            {t.label}
                          </label>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '0.83rem', color: 'var(--ink-faint)', padding: '6px 0' }}>Select a profile above to see assessment types.</div>
                )}
              </div>
            ))}
            <Btn type="button" variant="outline" size="sm" onClick={() => setSubgroups(prev => [...prev, { ...EMPTY_SUBGROUP }])}>
              + Add Subgroup
            </Btn>
          </div>
        );

        return (
          <>
            <FormField label="Group Configuration">
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { v: 'same', l: 'Same for all', d: 'All employees get the same assessment types' },
                  { v: 'custom', l: 'Custom per subgroup', d: 'Different types for different groups of employees' },
                ].map(opt => (
                  <label key={opt.v} style={{
                    flex: 1, display: 'flex', gap: '10px', padding: '14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    border: `1.5px solid ${groupStyle === opt.v ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                    background: groupStyle === opt.v ? 'var(--canvas-warm)' : 'var(--canvas)', transition: 'all var(--transition)',
                  }}>
                    <input type="radio" name="groupStyle" value={opt.v} checked={groupStyle === opt.v} onChange={() => setGroupStyle(opt.v)} style={{ accentColor: 'var(--ink)', marginTop: '2px' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{opt.l}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{opt.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label={groupStyle === 'same' ? 'Select Employees' : 'Configure Subgroups'} hint={groupStyle === 'same' ? 'Select all employees for this batch campaign' : 'Each subgroup can have different employees and assessment types'} required>
              {groupStyle === 'same' ? employeeListUI : subgroupUI}
            </FormField>
          </>
        );
      })()}

      {/* Profile — only shown after company is selected; hidden in custom subgroup mode (each subgroup picks its own) */}
      {!(mode === 'group' && groupStyle === 'custom') && profiles.length > 0 && filterEmpCompany && (mode === 'group' || form.employeeId) && (() => {
        const companyObj = companies.find(c => String(c.CompanyID || c.id) === filterEmpCompany);
        const companyProfiles = companyObj?.profiles;
        if (!companyProfiles?.length) {
          return (
            <FormField label="Assessment Profile">
              <div style={{ padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1.5px solid var(--canvas-warm)', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
                This company has no profiles assigned. Go to My Companies to assign a profile before creating a campaign.
              </div>
            </FormField>
          );
        }
        const availableProfiles = profiles.filter(p => companyProfiles.some(cp => String(cp.id) === String(p.id || p.ProfilID)));
        return (
          <>
            <FormField label="Assessment Profile" hint="Select a profile for this campaign">
              <Select value={form.profilId} onChange={e => {
                const pid = e.target.value;
                const prof = availableProfiles.find(p => String(p.id || p.ProfilID) === String(pid));
                const langs = prof?.availableLangs || [];
                setForm(f => ({ ...f, profilId: pid, lang: langs.length >= 1 ? langs[0] : 'en' }));
              }}>
                <option value="">— Select profile —</option>
                {availableProfiles.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
              </Select>
            </FormField>

            {/* Language picker — shown when profile has multiple langs */}
            {(() => {
              const langs = selectedProfile?.availableLangs || [];
              if (langs.length <= 1) return null;
              const LANG_LABELS = { sr: 'Serbian', en: 'English', de: 'German', fr: 'French', es: 'Spanish' };
              return (
                <FormField label="Assessment Language" hint="Select the language for this campaign's questions">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {langs.map(l => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, lang: l }))}
                        style={{
                          padding: '8px 18px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600,
                          border: '1.5px solid',
                          borderColor: form.lang === l ? 'var(--ink)' : 'var(--canvas-warm)',
                          background: form.lang === l ? 'var(--ink)' : 'var(--canvas-white)',
                          color: form.lang === l ? '#fff' : 'var(--ink-soft)',
                          transition: 'all 150ms',
                        }}
                      >
                        {LANG_LABELS[l] || l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </FormField>
              );
            })()}
          </>
        );
      })()}

      {/* Assessment types — only shown when profile is selected */}
      {!(mode === 'group' && groupStyle === 'custom') && !form.profilId && filterEmpCompany && (
        <div style={{ padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1.5px solid var(--canvas-warm)', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
          Select a profile above to see available assessment types.
        </div>
      )}
      {!(mode === 'group' && groupStyle === 'custom') && form.profilId && (() => {
        // When cycleConfig is loaded (employee selected, individual mode): use backend types + labels
        // Otherwise: use profile-based hardcoded list
        const useCycleTypes = mode === 'individual' && cycleConfig;
        const visibleTypes = useCycleTypes
          ? normalizeCycleTypes(cycleConfig.assessmentTypes)
          : (() => {
              const allTypes = [
                { key: 'includeSelf', label: 'Self Assessment', desc: 'Employee rates themselves' },
                { key: 'includeManager', label: 'Manager Review', desc: 'Direct manager assessment' },
                { key: 'includePeer', label: 'Peer Review', desc: 'Individual links + shared link' },
                { key: 'includeDirectReports', label: 'Direct Reports', desc: 'Individual links + shared link' },
                { key: 'includeExternal', label: 'External', desc: 'One shared link for external assessors' },
                { key: 'includeCrossPartisan', label: 'Cross-Partisan', desc: 'Cross-partisan assessment' },
                { key: 'includeMentor', label: 'Mentor', desc: 'Mentor assessment' },
              ];
              return allTypes
                .filter(t => !profileQTypes || profileQTypes.some(q => q === Q_TYPE_MAP[t.key] || q === Q_TYPE_MAP[t.key]?.replace('_', '')))
                .map(t => {
                  if (mode === 'group' && groupStyle === 'same' && groupSameIntersection && !groupSameIntersection.has(t.key)) {
                    return { ...t, blocked: true, blockMessage: groupSameBlockReasons[t.key] || 'Not available for the selected employees' };
                  }
                  return t;
                });
            })();

        return (
          <FormField label="Assessment Types" required hint={isEmployeeProfile ? 'This profile only supports Self Assessment' : undefined}>
            {cycleConfigLoading && mode === 'individual' && form.employeeId && (
              <div style={{ padding: '8px 0', fontSize: '0.83rem', color: 'var(--ink-faint)' }}>Loading assessment types...</div>
            )}
            <div className="grid-2col" style={{ gap: '10px' }}>
              {visibleTypes.map(t => {
                const lockedOn = isEmployeeProfile && t.key === 'includeSelf';
                if (t.blocked) return (
                  <div key={t.key} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--canvas-warm)', background: 'var(--canvas-warm)', opacity: 0.6,
                    cursor: 'not-allowed',
                  }}>
                    <input type="checkbox" checked={false} disabled style={{ accentColor: 'var(--ink)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{t.label}</div>
                      {t.blockMessage
                        ? <div style={{ fontSize: '0.77rem', color: 'var(--danger)', marginTop: '2px' }}>{t.blockMessage}</div>
                        : <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{t.desc}</div>
                      }
                    </div>
                  </div>
                );
                return (
                  <label key={t.key} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)',
                    cursor: lockedOn ? 'not-allowed' : 'pointer',
                    border: `1.5px solid ${form[t.key] ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                    background: form[t.key] ? 'var(--canvas-warm)' : 'var(--canvas)',
                    transition: 'all var(--transition)',
                  }}>
                    <input type="checkbox" checked={!!form[t.key]} onChange={() => { if (!lockedOn) toggle(t.key); }} disabled={lockedOn} style={{ accentColor: 'var(--ink)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{t.label}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{t.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </FormField>
        );
      })()}

      {/* Peer picker — individual mode only */}
      {form.includePeer && mode === 'individual' && (
        <FormField label="Peer Review — Assessors">
          {loadingRelationships ? (
            <div style={{ padding: '12px', fontSize: '0.84rem', color: 'var(--ink-soft)' }}>Loading peers...</div>
          ) : (
          <PeoplePicker
            label="Peer"
            employees={peerEmployees}
            selected={form.peerEmployeeIds}
            onSelectAll={ids => setForm(f => ({ ...f, peerEmployeeIds: ids }))}
            onToggle={id => toggleId('peerEmployeeIds', id)}
            newPersons={form.peerNewPersons}
            onAddPerson={p => setForm(f => ({ ...f, peerNewPersons: [...f.peerNewPersons, p] }))}
            onRemovePerson={i => setForm(f => ({ ...f, peerNewPersons: f.peerNewPersons.filter((_, idx) => idx !== i) }))}
            addModalOpen={showAddPeer}
            setAddModalOpen={setShowAddPeer}
            managerEmployeeId={employees.find(e => String(e.EmployeeID) === String(form.employeeId))?.ManagerID || null}
            companies={companies}
          />
          )}
        </FormField>
      )}

      {form.includePeer && mode === 'group' && groupStyle === 'same' && (
        <div style={{ padding: '12px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>Peer Review:</strong> In group mode, one shared link per employee will be generated.
        </div>
      )}

      {/* Direct Reports picker — individual mode only */}
      {form.includeDirectReports && mode === 'individual' && (
        <FormField label="Direct Reports — Assessors">
          {loadingRelationships ? (
            <div style={{ padding: '12px', fontSize: '0.84rem', color: 'var(--ink-soft)' }}>Loading direct reports...</div>
          ) : (
          <PeoplePicker
            label="Direct Report"
            employees={drEmployees}
            selected={form.drEmployeeIds}
            onSelectAll={ids => setForm(f => ({ ...f, drEmployeeIds: ids }))}
            onToggle={id => toggleId('drEmployeeIds', id)}
            newPersons={form.drNewPersons}
            onAddPerson={p => setForm(f => ({ ...f, drNewPersons: [...f.drNewPersons, p] }))}
            onRemovePerson={i => setForm(f => ({ ...f, drNewPersons: f.drNewPersons.filter((_, idx) => idx !== i) }))}
            addModalOpen={showAddDr}
            setAddModalOpen={setShowAddDr}
            managerEmployeeId={form.employeeId ? Number(form.employeeId) : null}
            companies={companies}
          />
          )}
        </FormField>
      )}

      {form.includeDirectReports && mode === 'group' && groupStyle === 'same' && (
        <div style={{ padding: '12px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>Direct Reports:</strong> In group mode, one shared link per employee will be generated.
        </div>
      )}

      {form.includeExternal && (
        <div style={{ padding: '12px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>External link:</strong> One shared link will be generated. Anyone who opens it can complete the assessment — no individual invitation required.
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <Btn type="submit" loading={submitLoading} style={{ minWidth: 160, justifyContent: 'center' }}>Launch Campaign</Btn>
        <Btn variant="outline" type="button" onClick={() => navigate(returnTo || '/manager/dashboard')}>Cancel</Btn>
      </div>
    </form>

    {/* Quick Add Employee Modal — outside <form> to avoid nesting */}
    <Modal open={showAddEmp} onClose={() => { setShowAddEmp(false); setAddEmpError(null); }} title="Add New Employee">
      {addEmpError && <div style={{ marginBottom: '16px' }}><Alert type="error">{addEmpError}</Alert></div>}
      <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="grid-2col" style={{ gap: '12px' }}>
          <FormField label="First Name" required>
            <Input value={addEmpForm.firstName} onChange={e => setAddEmpForm(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
          </FormField>
          <FormField label="Last Name" required>
            <Input value={addEmpForm.lastName} onChange={e => setAddEmpForm(f => ({ ...f, lastName: e.target.value }))} required />
          </FormField>
        </div>
        <FormField label="Email" required>
          <Input type="email" value={addEmpForm.email} onChange={e => setAddEmpForm(f => ({ ...f, email: e.target.value }))} required />
        </FormField>
        {companies.length > 0 && (
          <FormField label="Company">
            <Select value={addEmpForm.companyId} onChange={e => setAddEmpForm(f => ({ ...f, companyId: e.target.value }))}>
              <option value="">— Select company —</option>
              {companies.map(c => (
                <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>
              ))}
            </Select>
          </FormField>
        )}
        <div className="grid-2col" style={{ gap: '12px' }}>
          <FormField label="Job Title">
            <Select value={addEmpForm.jobTitle} onChange={e => setAddEmpForm(f => ({ ...f, jobTitle: e.target.value }))}>
              <option value="">— Select —</option>
              {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </FormField>
          <FormField label="Language">
            <Select value={addEmpForm.lang} onChange={e => setAddEmpForm(f => ({ ...f, lang: e.target.value }))}>
              <option value="en">English</option>
              <option value="sr">Serbian</option>
            </Select>
          </FormField>
        </div>
        <FormField label="Manager / Mentor" hint="Optional — select or add the employee's direct manager or mentor">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Select value={addEmpForm.managerId} onChange={e => setAddEmpForm(f => ({ ...f, managerId: e.target.value }))} style={{ flex: 1 }} disabled={!addEmpForm.companyId}>
              <option value="">{addEmpForm.companyId ? '— No manager —' : '— Select company first —'}</option>
              {employees.filter(e => String(e.CompanyID) === String(addEmpForm.companyId)).map(e => (
                <option key={e.EmployeeID} value={e.EmployeeID}>{e.FirstName} {e.LastName}</option>
              ))}
            </Select>
            <Btn type="button" variant="outline" size="sm" onClick={() => setShowAddEmpManager(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }} disabled={!addEmpForm.companyId}>+ Add New</Btn>
          </div>
        </FormField>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <Btn variant="outline" type="button" onClick={() => { setShowAddEmp(false); setAddEmpError(null); }}>Cancel</Btn>
          <Btn type="submit" variant="teal" loading={addEmpLoading}>Add & Select</Btn>
        </div>
      </form>
    </Modal>

    {/* Nested modal — Add Manager from within Add Employee */}
    <Modal open={showAddEmpManager} onClose={() => { setShowAddEmpManager(false); setAddEmpManagerError(null); }} title="Add New Manager">
      {addEmpManagerError && <div style={{ marginBottom: '16px' }}><Alert type="error">{addEmpManagerError}</Alert></div>}
      <form onSubmit={handleAddEmpManager} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="grid-2col" style={{ gap: '12px' }}>
          <FormField label="First Name" required>
            <Input value={addEmpManagerForm.firstName} onChange={e => setAddEmpManagerForm(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
          </FormField>
          <FormField label="Last Name" required>
            <Input value={addEmpManagerForm.lastName} onChange={e => setAddEmpManagerForm(f => ({ ...f, lastName: e.target.value }))} required />
          </FormField>
        </div>
        <FormField label="Email" required>
          <Input type="email" value={addEmpManagerForm.email} onChange={e => setAddEmpManagerForm(f => ({ ...f, email: e.target.value }))} required />
        </FormField>
        {companies.length > 0 && (
          <FormField label="Company">
            <Select value={addEmpManagerForm.companyId} onChange={e => setAddEmpManagerForm(f => ({ ...f, companyId: e.target.value }))}>
              <option value="">— Select company —</option>
              {companies.map(c => <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>)}
            </Select>
          </FormField>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <Btn variant="outline" type="button" onClick={() => { setShowAddEmpManager(false); setAddEmpManagerError(null); }}>Cancel</Btn>
          <Btn type="submit" variant="teal" loading={addEmpManagerLoading}>Add & Select</Btn>
        </div>
      </form>
    </Modal>
    </>
  );
}

// ── New Campaign ────────────────────────────────────────────────────────────
export function NewCampaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompanyId = location.state?.companyId || '';
  const returnTo = location.state?.from || '/manager/dashboard';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(payload) {
    if (payload.mode === 'individual' && !payload.employeeId) { setError('Please select an employee.'); return; }
    if (payload.mode === 'group' && payload.groupStyle === 'custom') {
      if (!payload.subgroups || payload.subgroups.length === 0) { setError('Add at least one subgroup.'); return; }
      for (let i = 0; i < payload.subgroups.length; i++) {
        const sg = payload.subgroups[i];
        if (!sg.employeeIds || sg.employeeIds.length === 0) { setError(`Subgroup ${i + 1} has no employees selected.`); return; }
        if (!sg.profilId) { setError(`Subgroup ${i + 1} has no profile selected.`); return; }
        if (!Object.entries(sg).some(([k, v]) => k.startsWith('include') && v === true)) {
          setError(`Subgroup ${i + 1} has no assessment types selected.`); return;
        }
      }
    } else {
      if (payload.mode === 'group' && (!payload.employeeIds || payload.employeeIds.length < 2)) { setError('Select at least 2 employees for a group campaign.'); return; }
      if (!Object.entries(payload).some(([k, v]) => k.startsWith('include') && v === true)) {
        setError('Select at least one assessment type.'); return;
      }
    }
    setLoading(true); setError(null);
    try {
      if (payload.mode === 'group') {
        if (payload.groupStyle === 'custom') {
          const groupId = (typeof crypto !== 'undefined' && crypto.randomUUID)
            ? crypto.randomUUID()
            : `group-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
          for (const sg of payload.subgroups) {
            await api.manager.createCampaignBatch({
              name: payload.name,
              employeeIds: sg.employeeIds,
              profilId: sg.profilId,
              deadline: payload.deadline,
              groupId,
              lang: payload.lang,
              includeSelf: sg.includeSelf,
              includeManager: sg.includeManager,
              includePeer: sg.includePeer,
              includeDirectReports: sg.includeDirectReports,
              includeExternal: sg.includeExternal,
              includeCrossPartisan: sg.includeCrossPartisan,
              includeMentor: sg.includeMentor,
            });
          }
        } else {
          await api.manager.createCampaignBatch(payload);
        }
        navigate('/manager/dashboard');
      } else {
        const res = await api.manager.createCampaign(payload);
        navigate(`/manager/campaigns/${res.cycleId}`);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <Layout>
      <PageHeader title="New Assessment Campaign" subtitle="Configure and launch an HB Compass campaign" />
      <Card style={{ padding: '32px', maxWidth: 1000 }}>
        <CampaignForm onSubmit={handleSubmit} submitLoading={loading} submitError={error} initialCompanyId={initialCompanyId} returnTo={returnTo} />
      </Card>
    </Layout>
  );
}

// ── Campaign Edit ────────────────────────────────────────────────────────────
export function CampaignEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    api.manager.getCampaign(id)
      .then(data => {
        const cycle = data?.cycle;
        if (!cycle) return;
        setInitialData({
          name: cycle.Name || cycle.name || '',
          mode: 'individual',
          employeeId: String(cycle.EmployeeID || ''),
          employeeIds: [],
          profilId: String(cycle.ProfilId || ''),
          includeSelf: !!cycle.IncludeSelf,
          includeManager: !!cycle.IncludeManager,
          includePeer: !!cycle.IncludePeer,
          includeDirectReports: !!cycle.IncludeDirectReports,
          includeExternal: !!cycle.IncludeExternal,
          peerEmployeeIds: [], peerNewPersons: [],
          drEmployeeIds: [], drNewPersons: [],
          deadline: cycle.Deadline ? new Date(cycle.Deadline).toISOString().split('T')[0] : '',
        });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoadingData(false));
  }, [id]);

  async function handleSubmit(payload) {
    setLoading(true); setError(null);
    try {
      await api.manager.updateCampaign(id, payload);
      navigate(`/manager/campaigns/${id}`);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <Layout>
      <PageHeader title="Edit Campaign" subtitle="Update campaign settings" />
      <Card style={{ padding: '32px', maxWidth: 680 }}>
        {loadingData ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Spinner size={28} /></div>
        ) : initialData ? (
          <CampaignForm initialData={initialData} onSubmit={handleSubmit} submitLoading={loading} submitError={error} lockMode />
        ) : (
          <Alert type="error">{error || 'Campaign not found.'}</Alert>
        )}
      </Card>
    </Layout>
  );
}

// ── Pillar Score Chart ───────────────────────────────────────────────────────
function pillarDim(pillar) {
  const p = (pillar || '').toUpperCase().trim();
  if (p.includes('CILJEVI') || p.includes('PROMEN') || p.includes('SHORT-TERM') || p.includes('LONG-TERM') || p === 'STG' || p === 'LTC') return 'RESULTS';
  if (p.includes('PREMA') || p.includes('TOWARDS') || p === 'TO' || p === 'TOO' || p === 'TCP' || p === 'CP') return 'MINDSET';
  if (p.includes('EFIKASNOST') || p.includes('KOMUNIKACIJA') || p.includes('RAZVOJ TIMA') || p.includes('EFFICIENCY') || p.includes('COMMUNICATION') || p.includes('PEOPLE DEVELOPMENT') || p === 'PE' || p === 'CO' || p === 'TPD') return 'SKILLS';
  return 'INFLUENCE';
}

const PILLAR_EN_MAP = {
  'KRATKOROČNI CILJEVI': 'SHORT-TERM GOALS', 'DUGOROČNA PROMENA': 'LONG-TERM CHANGE',
  'DUGOROČNE PROMENE': 'LONG-TERM CHANGE', 'PREMA SEBI': 'TOWARDS ONESELF',
  'PREMA DRUGIMA': 'TOWARDS OTHERS', 'PREMA KOMPANIJI I POZICIJI': 'TOWARDS COMPANY & POSITION',
  'PREMA KOMPANIJI': 'TOWARDS COMPANY & POSITION', 'LIČNA EFIKASNOST': 'PERSONAL EFFICIENCY',
  'KOMUNIKACIJA': 'COMMUNICATION', 'RAZVOJ TIMA I LJUDI': 'TEAM & PEOPLE DEVELOPMENT',
  'KAKO SE MOJ TIM OSEĆA?': 'HOW DO I MAKE MY TEAM FEEL?', 'KAKO SE TIM OSEĆA': 'HOW DO I MAKE MY TEAM FEEL?',
  'KAKO POKREĆEM NA AKCIJU?': 'HOW DO I INDUCE ACTION?', 'KAKO PODSTIČEM AKCIJU': 'HOW DO I INDUCE ACTION?',
  STG: 'SHORT-TERM GOALS', LTC: 'LONG-TERM CHANGE', TO: 'TOWARDS ONESELF',
  TOO: 'TOWARDS OTHERS', TCP: 'TOWARDS COMPANY & POSITION', CP: 'TOWARDS COMPANY & POSITION',
  PE: 'PERSONAL EFFICIENCY', CO: 'COMMUNICATION', TPD: 'TEAM & PEOPLE DEVELOPMENT',
  MTF: 'HOW DO I MAKE MY TEAM FEEL?', HIA: 'HOW DO I INDUCE ACTION?',
};

const DIM_QUOTES = {
  RESULTS:   '"Knowing is not enough; we must apply. Willing is not enough; we must do." — Goethe',
  MINDSET:   '"He who knows others is wise; he who knows himself is enlightened." — Lao Tzu',
  SKILLS:    '"I hear and I forget. I see and I remember. I do and I understand." — Confucius',
  INFLUENCE: '"You can\'t win friends by trying to get them interested in you." — Dale Carnegie',
};

function PillarScoreChart({ data: chartData, selfDone }) {
  const byAssessorType = chartData?.byAssessorType || {};
  const selfScores = byAssessorType.self || [];

  if (selfScores.length === 0) {
    return (
      <Card style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Performance Overview</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0', lineHeight: 1.6 }}>
          {selfDone
            ? 'Score data is loading…'
            : 'Complete the self-assessment to see the competency profile.'}
        </p>
      </Card>
    );
  }

  // Aggregate scores by pillar
  const fMap = {};
  selfScores.forEach(r => {
    const dim = r.dimension && ['RESULTS','MINDSET','SKILLS','INFLUENCE'].includes(r.dimension)
      ? r.dimension : pillarDim(r.pillar || '');
    const k = `${dim}||${r.pillar}`;
    if (!fMap[k]) fMap[k] = { dim, pillar: r.pillar, sum: 0, count: 0 };
    if (typeof r.score === 'number') { fMap[k].sum += r.score; fMap[k].count++; }
  });

  const grouped = { RESULTS: [], MINDSET: [], SKILLS: [], INFLUENCE: [] };
  Object.values(fMap).forEach(({ dim, pillar, sum, count }) => {
    if (!grouped[dim] || !count) return;
    grouped[dim].push({ pillar, score: Math.max(1, Math.min(5, sum / count)) });
  });

  return (
    <Card style={{ padding: '24px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Performance Overview</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: 1.6 }}>
        Results by Dimensions and Pillars
      </p>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
        {['RESULTS', 'MINDSET', 'SKILLS', 'INFLUENCE'].map(dim => {
          const pillars = grouped[dim];
          return (
            <div key={dim} style={{
              flex: '1 1 0', minWidth: 160, minHeight: 300,
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              boxShadow: '3px 3px 0 rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{ padding: '10px 12px 0' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', color: '#222', marginBottom: '4px' }}>
                  HansenBeck
                </div>
                <div style={{ height: 1.5, background: '#222', marginBottom: '8px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400, color: '#000', lineHeight: 1.1, marginBottom: '8px' }}>
                  {dim}
                </div>
              </div>

              {/* Bar chart area */}
              <div style={{ flex: 1, padding: '0 12px', display: 'flex', alignItems: 'flex-end', gap: 0, minHeight: 120 }}>
                {pillars.length === 0 ? (
                  <div style={{ fontSize: '0.7rem', color: '#aaa', alignSelf: 'center', width: '100%', textAlign: 'center' }}>—</div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, width: '100%', height: 120, justifyContent: 'center' }}>
                    {pillars.map(({ pillar, score }) => {
                      const label = PILLAR_EN_MAP[pillar?.toUpperCase()] || pillar || '';
                      const barH = Math.max(4, (score / 5) * 96);
                      return (
                        <div key={pillar} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#222', marginBottom: 2 }}>
                            {score.toFixed(1)}
                          </div>
                          <div style={{
                            width: '100%', maxWidth: 36, height: barH,
                            background: '#222', borderRadius: '2px 2px 0 0',
                          }} />
                          <div style={{
                            marginTop: 5, fontSize: '0.55rem', fontWeight: 700,
                            color: '#333', textAlign: 'center', lineHeight: 1.2,
                            wordBreak: 'break-word', maxWidth: 54,
                          }}>
                            {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quote footer */}
              <div style={{ padding: '8px 12px 12px', borderTop: '0.5px solid #ddd', marginTop: 8 }}>
                <p style={{ fontSize: '0.6rem', color: '#555', lineHeight: 1.4, fontStyle: 'italic', margin: 0 }}>
                  {DIM_QUOTES[dim]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Campaign Detail ─────────────────────────────────────────────────────────
export function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(null);
  const [reportError, setReportError] = useState(null);
  const [peersExpanded, setPeersExpanded] = useState(false);
  const [drExpanded, setDrExpanded] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [reports, setReports] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const [aiError, setAiError] = useState(null);
  const [cycleData, setCycleData] = useState(null);

  function fetchReports() {
    api.manager.getReports()
      .then(all => setReports((all || []).filter(r => r.CycleID === Number(id))))
      .catch(() => {});
  }

  useEffect(() => {
    api.manager.getCampaign(id)
      .then(setData).catch(e => setError(e.message)).finally(() => setLoading(false));
    fetchReports();
    api.manager.getCycleData(id).then(setCycleData).catch(() => {});
  }, [id]);

  const campaign = data?.cycle;
  const links = data?.links || [];
  const typeLabels = data?.typeLabels || {};

  const selfLink = links.find(l => l.AssessmentType === 'self');
  const managerLink = links.find(l => l.AssessmentType === 'manager');
  const peerLinks = links.filter(l => l.AssessmentType === 'peer');
  const drLinks = links.filter(l => ['directreport', 'direct_report'].includes(l.AssessmentType));
  const otherLinks = links.filter(l => !['self', 'manager', 'peer', 'directreport', 'direct_report'].includes(l.AssessmentType));

  const selfDone = selfLink?.Status === 'completed';
  const completedCount = links.filter(l => l.Status === 'completed').length;

  async function generateFullReport() {
    setAiGenerating(true); setAiError(null); setAiStatus('Starting…');
    let jobId;
    try {
      ({ jobId } = await api.manager.generateAIReport(id));
      setAiStatus('AI is analyzing…');
    } catch (e) {
      setAiError(e.message); setAiGenerating(false); setAiStatus('');
      return;
    }
    const poll = async () => {
      try {
        const result = await api.manager.getAIReportStatus(id, jobId);
        if (result.status === 'done') {
          setAiStatus('Saving…');
          const saved = await api.manager.saveAIReport(id, result.report || '');
          const reportId = saved?.reportId || saved?.ReportID || saved?.id;
          setAiStatus('Downloading PDF…');
          const blob = await api.manager.downloadAIReportPdf(reportId);
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          const url = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Development_Report_${campaign.FirstName}_${campaign.LastName}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 30000);
          fetchReports();
          setAiGenerating(false); setAiStatus('');
        } else if (result.status === 'error') {
          setAiError(result.error || 'Report generation failed.');
          setAiGenerating(false); setAiStatus('');
        } else {
          setTimeout(poll, 5000);
        }
      } catch (e) {
        setAiError(e.message); setAiGenerating(false); setAiStatus('');
      }
    };
    poll();
  }

  async function doGenerateReport(type, force = false) {
    if (type === 2 && !force) {
      const incomplete = links.filter(l => l.Status !== 'completed');
      if (incomplete.length > 0) { setConfirmModal({ type, incomplete }); return; }
    }
    setGenerating(type); setReportSuccess(null); setReportError(null);
    try {
      await (type === 1 ? api.manager.generateReport1(id) : api.manager.generateReport2(id));
      const allReports = await api.manager.getReports();
      const cycleReports = (allReports || []).filter(r => r.CycleID === Number(id));
      setReports(cycleReports);
      const reportType = type === 1 ? 'report1' : 'report2';
      const newReport = cycleReports.find(r => r.ReportType === reportType);
      if (newReport) {
        downloadReportPdf(newReport.CycleID, newReport.ReportType, newReport.ReportID, campaign.FirstName, campaign.LastName);
      }
      setReportSuccess(type === 1 ? 'Self Assessment Report generated.' : 'HB Compass Development Report generated.');
      setConfirmModal(null);
    } catch (e) { setReportError(e.message); }
    finally { setGenerating(null); }
  }

  const TYPE_LABELS = {
    self: 'Self Assessment', manager: 'Manager Review',
    peer: 'Peer Review', directreport: 'Direct Report', direct_report: 'Direct Report',
    external: 'External', cross_partisan: 'Cross-Partisan', crosspartisan: 'Cross-Partisan',
    mentor: 'Mentor',
    ...typeLabels,
  };

  function LinkRow({ link, label }) {
    const resolvedLabel = label || TYPE_LABELS[link.AssessmentType?.toLowerCase()] || link.AssessmentType?.replace(/_/g, ' ');
    const publicUrl = link.Token ? `${window.location.origin}/assess/${link.Token}` : null;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
        <span style={{ fontWeight: 500, fontSize: '0.86rem', textTransform: 'capitalize' }}>{resolvedLabel}</span>
        {publicUrl ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.79rem', color: 'var(--ink-soft)', fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{publicUrl}</span>
            <Btn size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(publicUrl)}>Copy</Btn>
          </div>
        ) : (link.AssessorEmail || <em style={{ color: 'var(--ink-faint)' }}>—</em>)}
        {link.IsShared
          ? (link.ResponseCount > 0
              ? <Badge status="completed">{link.ResponseCount} {link.ResponseCount === 1 ? 'response' : 'responses'}</Badge>
              : <Badge status="pending">Pending</Badge>)
          : <Badge status={link.Status === 'completed' ? 'completed' : 'pending'}>{link.Status}</Badge>
        }
        <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{link.CompletedAt ? new Date(link.CompletedAt).toLocaleString() : ''}</span>
      </div>
    );
  }

  function GroupRow({ links: groupLinks, label, expanded, onToggle }) {
    const sharedLink = groupLinks.find(l => !l.AssessorEmail);
    const individualLinks = groupLinks.filter(l => !!l.AssessorEmail);
    const done = individualLinks.filter(l => l.Status === 'completed').length;
    const allDone = done === individualLinks.length && individualLinks.length > 0;
    const sharedPublicUrl = sharedLink?.Token ? `${window.location.origin}/assess/${sharedLink.Token}` : null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Shared link — uvek vidljiv */}
        {sharedPublicUrl && (
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
            <span style={{ fontWeight: 500, fontSize: '0.86rem' }}>{label} — shared</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <span style={{ fontSize: '0.79rem', color: 'var(--ink-soft)', fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sharedPublicUrl}</span>
              <Btn size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(sharedPublicUrl)}>Copy</Btn>
            </div>
            {sharedLink.ResponseCount > 0
              ? <Badge status="completed">{sharedLink.ResponseCount} {sharedLink.ResponseCount === 1 ? 'response' : 'responses'}</Badge>
              : <Badge status="pending">Pending</Badge>
            }
            <span />
          </div>
        )}
        {/* Individualni — collapsible, samo ime + status */}
        {individualLinks.length > 0 && (
          <div>
            <div onClick={onToggle} style={{
              display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center',
              padding: '12px 14px', background: 'var(--canvas-warm)',
              borderRadius: expanded ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
              border: '1px solid var(--canvas-warm)', cursor: 'pointer', userSelect: 'none',
            }}>
              <span style={{ fontWeight: 600, fontSize: '0.86rem' }}>{label}</span>
              <span style={{ fontSize: '0.83rem', color: 'var(--ink-soft)' }}>{done}/{individualLinks.length} completed</span>
              <Badge status={allDone ? 'completed' : 'pending'}>{allDone ? 'done' : 'in progress'}</Badge>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{expanded ? '▲ Hide' : '▼ Show all'}</span>
            </div>
            {expanded && (
              <div style={{ border: '1px solid var(--canvas-warm)', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)', overflow: 'hidden' }}>
                {individualLinks.map((l, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '10px 14px', background: i % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-white)', borderTop: i === 0 ? 'none' : '1px solid var(--canvas-warm)' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.86rem' }}>{l.AssessorName || l.AssessorEmail}</div>
                      {l.AssessorName && <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{l.AssessorEmail}</div>}
                    </div>
                    <Badge status={l.Status === 'completed' ? 'completed' : 'pending'}>{l.Status}</Badge>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{l.CompletedAt ? new Date(l.CompletedAt).toLocaleString() : ''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={campaign ? `${campaign.Name} for ${campaign.FirstName} ${campaign.LastName}` : 'Campaign Detail'}
        subtitle={campaign ? `Started ${new Date(campaign.CreatedAt).toLocaleDateString()}` : ''}
      />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : campaign && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status card */}
          <Card style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Status</div>
                <Badge status={campaign.Status === 'in_progress' ? 'active' : campaign.Status}>{campaign.Status}</Badge>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Progress</div>
                <div style={{ fontWeight: 600 }}>{completedCount}/{links.length} completed</div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ height: 6, background: 'var(--canvas-warm)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--ink)', width: `${links.length ? (completedCount / links.length) * 100 : 0}%`, transition: 'width 0.5s ease' }} />
                </div>
              </div>
              {campaign.JobTitle && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Job Title</div>
                  <div style={{ fontWeight: 500 }}>{campaign.JobTitle}</div>
                </div>
              )}
              {(campaign.ProfilName || campaign.ProfileName) && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Profile</div>
                  <div style={{ fontWeight: 500 }}>{campaign.ProfilName || campaign.ProfileName}</div>
                </div>
              )}
              {campaign.Status === 'in_progress' && (
                <Btn size="sm" variant="outline" onClick={() => navigate(`/manager/campaigns/${id}/edit`)}>Edit Campaign</Btn>
              )}
            </div>
          </Card>

          {/* Links */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '16px' }}>Assessment Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selfLink && <LinkRow link={selfLink} label={TYPE_LABELS['self']} />}
              {managerLink && <LinkRow link={managerLink} label={TYPE_LABELS['manager']} />}
              {peerLinks.length > 0 && <GroupRow links={peerLinks} label={TYPE_LABELS['peer']} expanded={peersExpanded} onToggle={() => setPeersExpanded(x => !x)} />}
              {drLinks.length > 0 && <GroupRow links={drLinks} label={TYPE_LABELS['direct_report']} expanded={drExpanded} onToggle={() => setDrExpanded(x => !x)} />}
              {otherLinks.map((l, i) => <LinkRow key={i} link={l} label={TYPE_LABELS[l.AssessmentType?.toLowerCase()]} />)}
            </div>
          </Card>

          {/* Reports — always visible */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Reports</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: 1.6 }}>
              Reports are visible to you and the employee.
              {!selfDone && <span style={{ color: 'var(--danger)', marginLeft: '4px' }}>Self assessment must be completed first.</span>}
            </p>
            {reportSuccess && <div style={{ marginBottom: '16px' }}><Alert type="success">{reportSuccess}</Alert></div>}
            {reportError && <div style={{ marginBottom: '16px' }}><Alert type="error">{reportError}</Alert></div>}
            {aiError && <div style={{ marginBottom: '16px' }}><Alert type="error">{aiError}</Alert></div>}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Btn variant={selfDone ? 'primary' : 'outline'} loading={generating === 1}
                  disabled={!selfDone || generating !== null} onClick={() => doGenerateReport(1)}
                  style={!selfDone ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                  Self Assessment Report
                </Btn>
                {!selfDone
                  ? <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Requires: self assessment complete</span>
                  : <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Downloads as PDF</span>
                }
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Btn variant={selfDone ? 'primary' : 'outline'} loading={aiGenerating}
                  disabled={!selfDone || aiGenerating || generating !== null} onClick={generateFullReport}
                  style={!selfDone ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                  {aiGenerating ? (aiStatus || 'Generating Personal Development Plan...') : 'Personal Development Plan'}
                </Btn>
                {!selfDone
                  ? <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Requires: self assessment complete</span>
                  : <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Downloads as PDF</span>
                }
              </div>
            </div>

            {/* 360 inclusions */}
            <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-soft)', marginBottom: '10px' }}>
                Will be included in Personal Development plan report
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '5px 12px', borderRadius: 'var(--radius-md)',
                  border: `1px solid ${selfDone ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                  background: selfDone ? 'var(--canvas-warm)' : 'var(--canvas)',
                  fontSize: '0.78rem', fontWeight: 500,
                  color: selfDone ? 'var(--ink)' : 'var(--ink-faint)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {selfDone
                    ? <span style={{ color: 'var(--success)', fontSize: '0.7rem' }}>●</span>
                    : <span style={{ color: 'var(--ink-faint)', fontSize: '0.7rem' }}>○</span>
                  }
                  Self Assessment
                </div>
                <div style={{
                  padding: '5px 12px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--canvas-warm)',
                  background: 'var(--canvas)',
                  fontSize: '0.78rem', fontWeight: 500,
                  color: 'var(--ink-faint)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ fontSize: '0.7rem' }}>◌</span>
                  360 feedback — in development
                </div>
              </div>
            </div>

            {/* Generated reports list */}
            {reports.length > 0 && (
              <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '20px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '12px' }}>Generated</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                  {reports.map(r => (
                    <div key={r.ReportID} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 500 }}>
                          {r.ReportType === 'report1' ? 'Self Assessment Report' : 'HB Compass Development Report'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: '2px' }}>
                          {new Date(r.GeneratedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <ActionMenu items={[
                        { label: 'Download PDF', onClick: () => downloadReportPdf(r.CycleID, r.ReportType, r.ReportID, campaign.FirstName, campaign.LastName) },
                        { label: 'Delete', onClick: () => setConfirmDeleteId(r.ReportID), danger: true },
                      ]} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <PillarScoreChart data={cycleData} selfDone={selfDone} />
        </div>
      )}

      {/* Delete report modal */}
      <Modal open={confirmDeleteId !== null} onClose={() => setConfirmDeleteId(null)} title="Delete Report">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Are you sure you want to delete this report? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting !== null} onClick={async () => {
            setDeleting(confirmDeleteId);
            try {
              await api.manager.deleteReport(confirmDeleteId);
              setReports(prev => prev.filter(r => r.ReportID !== confirmDeleteId));
              setConfirmDeleteId(null);
            } catch (e) { setError(e.message); }
            finally { setDeleting(null); }
          }}>Delete</Btn>
        </div>
      </Modal>

      {/* Incomplete confirm modal */}
      <Modal open={!!confirmModal} onClose={() => setConfirmModal(null)} title="Not everyone has completed">
        {confirmModal && <>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '16px', fontSize: '0.9rem', lineHeight: 1.6 }}>
            The following assessors haven't finished yet. Generate the report anyway?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', maxHeight: 200, overflowY: 'auto' }}>
            {confirmModal.incomplete.map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                <span style={{ textTransform: 'capitalize' }}>{l.AssessmentType?.replace('_', ' ')} — {l.AssessorEmail || 'link'}</span>
                <Badge status="pending">{l.Status}</Badge>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Btn variant="outline" onClick={() => setConfirmModal(null)}>Cancel</Btn>
            <Btn variant="primary" loading={generating !== null} onClick={() => doGenerateReport(confirmModal.type, true)}>Generate Anyway</Btn>
          </div>
        </>}
      </Modal>
    </Layout>
  );
}

// ── Companies ──────────────────────────────────────────────────────────────
export function ManagerCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.manager.getCompanies()
      .then(r => setCompanies(Array.isArray(r) ? r : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true); setActionError(null);
    try {
      await api.manager.createCompany({ companyName: newName.trim() });
      setNewName('');
      load();
    } catch (err) { setActionError(err.message); }
    finally { setCreating(false); }
  }

  async function handleRename(e) {
    e.preventDefault();
    if (!editName.trim()) return;
    setSaving(true); setActionError(null);
    try {
      await api.manager.updateCompany(editId, { companyName: editName.trim() });
      setEditId(null); setEditName('');
      load();
    } catch (err) { setActionError(err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    setDeleting(true); setActionError(null);
    try {
      await api.manager.deleteCompany(deleteId);
      setDeleteId(null);
      load();
    } catch (err) { setActionError(err.message); setDeleteId(null); }
    finally { setDeleting(false); }
  }

  return (
    <Layout>
      <PageHeader title="Companies" subtitle="Manage your client companies" />
      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {actionError && <div style={{ marginBottom: '16px' }}><Alert type="error">{actionError}</Alert></div>}

      <Card style={{ padding: '24px', maxWidth: 600, marginBottom: '24px' }}>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px' }}>Add New Company</div>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px' }}>
          <Input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Company name..."
            required
            style={{ flex: 1 }}
          />
          <Btn type="submit" variant="teal" loading={creating}>Add</Btn>
        </form>
      </Card>

      <Card style={{ maxWidth: 600 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size={28} /></div>
        ) : companies.length === 0 ? (
          <EmptyState icon="🏢" title="No companies yet" message="Add your first company above." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {companies.map(c => {
              const cId = c.CompanyID || c.id;
              const cName = c.CompanyName || c.name;
              return (
                <div key={cId} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--canvas)' }}>
                  {editId === cId ? (
                    <form onSubmit={handleRename} style={{ display: 'flex', gap: '8px', flex: 1 }}>
                      <Input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        required
                        autoFocus
                        style={{ flex: 1 }}
                      />
                      <Btn type="submit" size="sm" variant="teal" loading={saving}>Save</Btn>
                      <Btn type="button" size="sm" variant="outline" onClick={() => { setEditId(null); setEditName(''); }}>Cancel</Btn>
                    </form>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontWeight: 500 }}>{cName}</span>
                      <ActionMenu items={[
                        { label: 'Rename', onClick: () => { setEditId(cId); setEditName(cName); setActionError(null); } },
                        { label: 'Delete', onClick: () => { setDeleteId(cId); setActionError(null); }, danger: true },
                      ]} />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Company">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure? This will fail if the company has employees assigned to it.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting} onClick={handleDelete}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}

// ── Companies & Employees (combined) ───────────────────────────────────────
export function CompaniesAndEmployees() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Company CRUD
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  const [deletingCompany, setDeletingCompany] = useState(false);

  // Employee CRUD
  const [deleteEmpId, setDeleteEmpId] = useState(null);
  const [deletingEmp, setDeletingEmp] = useState(false);

  // Selection & tab
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [activeTab, setActiveTab] = useState('employees');

  const [actionError, setActionError] = useState(null);

  // Profiles
  const [allProfiles, setAllProfiles] = useState([]);
  const [newProfileIds, setNewProfileIds] = useState([]);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [addingProfileId, setAddingProfileId] = useState('');
  const [profileActionLoading, setProfileActionLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      api.manager.getCompanies().catch(() => []),
      api.manager.getEmployees().catch(() => []),
      api.manager.getCampaigns().catch(() => []),
      api.manager.getProfiles().catch(() => []),
    ]).then(([comps, emps, camps, profs]) => {
      setCompanies(Array.isArray(comps) ? comps : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setCampaigns(Array.isArray(camps) ? camps : []);
      setAllProfiles(Array.isArray(profs) ? profs : []);
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const fmtDeadline = c => {
    const d = c.Deadline || c.deadline;
    if (!d) return <span style={{ color: 'var(--ink-faint)' }}>—</span>;
    const date = new Date(d);
    return isNaN(date) ? <span style={{ color: 'var(--ink-faint)' }}>—</span> : date.toLocaleDateString();
  };

  async function handleCreateCompany(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true); setActionError(null);
    try {
      await api.manager.createCompany({ companyName: newName.trim(), profileIds: newProfileIds });
      setNewName(''); setNewProfileIds([]); setShowAddCompany(false);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setCreating(false); }
  }

  async function handleAddProfile() {
    if (!addingProfileId || !selectedCompanyId) return;
    const cId = selectedCompanyId;
    const currentIds = (selectedCompany?.profiles || []).map(p => p.id);
    if (currentIds.includes(Number(addingProfileId))) return;
    setProfileActionLoading(true); setActionError(null);
    try {
      await api.manager.updateCompany(cId, { companyName: selectedCompany.CompanyName || selectedCompany.name, profileIds: [...currentIds, Number(addingProfileId)] });
      setAddingProfileId(''); setShowAddProfile(false);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setProfileActionLoading(false); }
  }

  async function handleRemoveProfile(profileId) {
    if (!selectedCompanyId) return;
    const cId = selectedCompanyId;
    const currentIds = (selectedCompany?.profiles || []).map(p => p.id).filter(id => id !== profileId);
    setProfileActionLoading(true); setActionError(null);
    try {
      await api.manager.updateCompany(cId, { companyName: selectedCompany.CompanyName || selectedCompany.name, profileIds: currentIds });
      load();
    } catch (err) { setActionError(err.message); }
    finally { setProfileActionLoading(false); }
  }

  async function handleRenameCompany(e) {
    e.preventDefault();
    if (!editName.trim()) return;
    setSaving(true); setActionError(null);
    try {
      await api.manager.updateCompany(editId, { companyName: editName.trim() });
      setEditId(null); setEditName('');
      load();
    } catch (err) { setActionError(err.message); }
    finally { setSaving(false); }
  }

  async function handleDeleteCompany() {
    setDeletingCompany(true); setActionError(null);
    try {
      await api.manager.deleteCompany(deleteCompanyId);
      if (String(selectedCompanyId) === String(deleteCompanyId)) setSelectedCompanyId(null);
      setDeleteCompanyId(null);
      load();
    } catch (err) { setActionError(err.message); setDeleteCompanyId(null); }
    finally { setDeletingCompany(false); }
  }

  async function handleDeleteEmployee() {
    setDeletingEmp(true);
    try {
      await api.manager.deleteEmployee(deleteEmpId);
      setDeleteEmpId(null);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setDeletingEmp(false); }
  }

  const empsByCompany = employees.reduce((acc, e) => {
    const key = String(e.CompanyID || '__none__');
    if (!acc[key]) acc[key] = [];
    acc[key].push(e);
    return acc;
  }, {});

  const campsByCompany = campaigns.reduce((acc, c) => {
    const key = String(c.CompanyID || '__none__');
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  const selectedCompany = selectedCompanyId
    ? companies.find(c => String(c.CompanyID || c.id) === String(selectedCompanyId))
    : null;
  const selEmps = selectedCompanyId ? (empsByCompany[String(selectedCompanyId)] || []) : [];
  const selCamps = selectedCompanyId ? (campsByCompany[String(selectedCompanyId)] || []) : [];

  return (
    <Layout>
      <PageHeader
        title="My Companies"
        subtitle="Manage your companies and their team members"
      />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {actionError && <div style={{ marginBottom: '16px' }}><Alert type="error">{actionError}</Alert></div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

          {/* ── Left panel ── */}
          <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Card style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
                  Companies{companies.length > 0 ? ` (${companies.length})` : ''}
                </p>
                <button
                  onClick={() => setShowAddCompany(v => !v)}
                  style={{
                    fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', padding: '2px 4px',
                  }}
                >
                  {showAddCompany ? 'Cancel' : '+ Add'}
                </button>
              </div>

              {showAddCompany && (
                <form onSubmit={handleCreateCompany} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Company name…" required autoFocus />
                  {allProfiles.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-faint)', marginBottom: '5px' }}>Profiles</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {allProfiles.map(p => {
                          const pid = p.id || p.ProfilID;
                          const checked = newProfileIds.includes(pid);
                          return (
                            <label key={pid} style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                              <input type="checkbox" checked={checked} onChange={() => setNewProfileIds(prev => checked ? prev.filter(x => x !== pid) : [...prev, pid])} style={{ accentColor: 'var(--ink)' }} />
                              {p.name || p.Name}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <Btn type="submit" size="sm" variant="teal" loading={creating}>Add Company</Btn>
                </form>
              )}

              {companies.length === 0 ? (
                <p style={{ color: 'var(--ink-faint)', fontSize: '0.83rem', padding: '8px 0' }}>No companies yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  {companies.map(c => {
                    const cId = String(c.CompanyID || c.id);
                    const cName = c.CompanyName || c.name;
                    const empCount = (empsByCompany[cId] || []).length;
                    const active = String(selectedCompanyId) === cId;
                    return (
                      <button key={cId} onClick={() => { setSelectedCompanyId(cId); setEditId(null); setActiveTab('employees'); }} style={{
                        padding: '9px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: active ? 'rgba(0,0,0,0.06)' : 'transparent',
                        textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                      }}>
                        <div style={{ fontWeight: active ? 600 : 400, fontSize: '0.87rem', color: 'var(--ink)' }}>{cName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', marginTop: '1px' }}>
                          {empCount} employee{empCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* ── Right panel ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!selectedCompany ? (
              <Card style={{ padding: '64px 32px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--canvas-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--ink-faint)' }}>
                  <IcBuilding />
                </div>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Select a company to view details.</p>
              </Card>
            ) : (
              <>
                {/* Company header card */}
                <Card style={{ padding: '24px 28px' }}>
                  {editId === String(selectedCompany.CompanyID || selectedCompany.id) ? (
                    <form onSubmit={handleRenameCompany} style={{ display: 'flex', gap: '8px' }}>
                      <Input value={editName} onChange={e => setEditName(e.target.value)} required autoFocus style={{ flex: 1 }} />
                      <Btn type="submit" size="sm" variant="teal" loading={saving}>Save</Btn>
                      <Btn type="button" size="sm" variant="outline" onClick={() => { setEditId(null); setEditName(''); }}>Cancel</Btn>
                    </form>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: '50%',
                          background: 'var(--canvas-warm)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0, color: 'var(--ink-soft)',
                        }}>
                          <IcBuilding />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
                            {selectedCompany.CompanyName || selectedCompany.name}
                          </h2>
                          {/* Profiles */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', alignItems: 'center' }}>
                            {(selectedCompany.profiles || []).map(p => (
                              <span key={p.id} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                                fontSize: '0.75rem', fontWeight: 500, padding: '3px 10px 3px 10px',
                                borderRadius: '999px', background: 'var(--canvas-warm)',
                                color: 'var(--ink-soft)', border: '1px solid rgba(0,0,0,0.06)',
                              }}>
                                {p.name}
                                <button
                                  disabled={profileActionLoading}
                                  onClick={() => handleRemoveProfile(p.id)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', lineHeight: 1, color: 'var(--ink-faint)', display: 'flex', alignItems: 'center' }}
                                  title="Remove profile"
                                >
                                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                                </button>
                              </span>
                            ))}
                            {(() => {
                              const assigned = (selectedCompany.profiles || []).map(p => p.id);
                              const available = allProfiles.filter(p => !assigned.includes(p.id || p.ProfilID));
                              if (available.length === 0) return null;
                              return showAddProfile ? (
                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                  <Select
                                    value={addingProfileId}
                                    onChange={e => setAddingProfileId(e.target.value)}
                                    style={{ fontSize: '0.78rem', padding: '3px 8px', height: 'auto' }}
                                  >
                                    <option value="">— choose —</option>
                                    {available.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
                                  </Select>
                                  <Btn size="sm" variant="teal" loading={profileActionLoading} onClick={handleAddProfile}>Add</Btn>
                                  <Btn size="sm" variant="outline" onClick={() => { setShowAddProfile(false); setAddingProfileId(''); }}>✕</Btn>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setShowAddProfile(true)}
                                  style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', background: 'none', border: '1px dashed rgba(0,0,0,0.15)', borderRadius: '999px', padding: '3px 10px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                                >
                                  + Add Profile
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <Btn size="sm" variant="secondary" onClick={() => {
                          const cId = String(selectedCompany.CompanyID || selectedCompany.id);
                          setEditId(cId);
                          setEditName(selectedCompany.CompanyName || selectedCompany.name);
                          setActionError(null);
                        }}>Rename</Btn>
                        <Btn size="sm" variant="danger" onClick={() => {
                          setDeleteCompanyId(selectedCompany.CompanyID || selectedCompany.id);
                          setActionError(null);
                        }}>Delete</Btn>
                      </div>
                    </div>
                  )}

                  {/* Stats / tab switcher */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--canvas-warm)' }}>
                    {[
                      { key: 'employees', label: 'Employees', value: selEmps.length },
                      { key: 'campaigns', label: 'Campaigns', value: selCamps.length },
                    ].map(({ key, label, value }) => {
                      const active = activeTab === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          style={{
                            flex: 1, textAlign: 'center', padding: '10px 8px', borderRadius: '10px',
                            border: 'none', cursor: 'pointer',
                            background: active ? 'var(--ink)' : 'var(--canvas)',
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: active ? '#fff' : 'var(--ink)', lineHeight: 1 }}>{value}</div>
                          <div style={{ fontSize: '0.71rem', color: active ? 'rgba(255,255,255,0.7)' : 'var(--ink-faint)', marginTop: '4px', letterSpacing: '0.02em' }}>{label}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Tab content card */}
                <Card style={{ padding: 0 }}>
                  <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--canvas-warm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {activeTab === 'employees' ? 'Employees' : 'Campaigns'}
                    </h3>
                    {activeTab === 'employees' ? (
                      <Btn size="sm" variant="teal" onClick={() => navigate('/manager/employees/new', { state: { from: '/manager/companies', companyId: String(selectedCompanyId) } })}>+ Add Employee</Btn>
                    ) : (
                      <Link to="/manager/campaigns/new" state={{ companyId: String(selectedCompanyId), from: '/manager/companies' }}><Btn size="sm" variant="teal">+ New Campaign</Btn></Link>
                    )}
                  </div>

                  {activeTab === 'employees' && (
                    selEmps.length === 0 ? (
                      <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.88rem' }}>No employees in this company yet.</div>
                    ) : (
                      <Table
                        headers={['Name', 'Email', 'Job Title', 'Language', 'Actions']}
                        rows={selEmps.map(e => [
                          <strong>{e.FirstName} {e.LastName}</strong>,
                          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{e.Email}</span>,
                          e.JobTitle || '—',
                          <Badge status="default">{e.Lang?.toUpperCase() || 'EN'}</Badge>,
                          <ActionMenu items={[
                            { label: 'Edit', onClick: () => navigate(`/manager/employees/${e.EmployeeID}/edit`, { state: { from: '/manager/companies' } }) },
                            { label: 'Delete', onClick: () => setDeleteEmpId(e.EmployeeID), danger: true },
                          ]} />,
                        ])}
                      />
                    )
                  )}

                  {activeTab === 'campaigns' && (
                    selCamps.length === 0 ? (
                      <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.88rem' }}>No campaigns for this company yet.</div>
                    ) : (
                      <Table
                        headers={['Campaign', 'Employee', 'Status', 'Progress', 'Deadline', 'Actions']}
                        rows={selCamps.map(camp => [
                          <strong>{camp.Name}</strong>,
                          `${camp.FirstName || ''} ${camp.LastName || ''}`.trim() || '—',
                          <Badge status={camp.Status === 'in_progress' ? 'active' : camp.Status}>{camp.Status}</Badge>,
                          `${camp.CompletedLinks}/${camp.TotalLinks}`,
                          fmtDeadline(camp),
                          <ActionMenu items={[
                            { label: 'View', href: `/manager/campaigns/${camp.CycleID}` },
                          ]} />,
                        ])}
                      />
                    )
                  )}
                </Card>
              </>
            )}
          </div>
        </div>
      )}

      <Modal open={!!deleteCompanyId} onClose={() => setDeleteCompanyId(null)} title="Delete Company">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure? This will fail if the company has employees assigned to it.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteCompanyId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deletingCompany} onClick={handleDeleteCompany}>Delete</Btn>
        </div>
      </Modal>

      <Modal open={!!deleteEmpId} onClose={() => setDeleteEmpId(null)} title="Delete Employee">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteEmpId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deletingEmp} onClick={handleDeleteEmployee}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}

// ── Employee Overview ───────────────────────────────────────────────────────
export function EmployeeOverview() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState(null);
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [deleteEmpId, setDeleteEmpId] = useState(null);
  const [deletingEmp, setDeletingEmp] = useState(false);

  useEffect(() => {
    Promise.all([
      api.manager.getCompanies().catch(() => []),
      api.manager.getEmployees().catch(() => []),
      api.manager.getCampaigns().catch(() => []),
      api.manager.getReports().catch(() => []),
    ]).then(([comp, emp, camp, rep]) => {
setCompanies(Array.isArray(comp) ? comp : []);
      setEmployees(Array.isArray(emp) ? emp : []);
      setCampaigns(Array.isArray(camp) ? camp : []);
      setReports(Array.isArray(rep) ? rep : []);
    }).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  const filteredEmployees = employees
    .filter(e => selectedCompany === 'all' || String(e.CompanyID) === String(selectedCompany))
    .filter(e => !search || `${e.FirstName} ${e.LastName}`.toLowerCase().includes(search.toLowerCase()));

  const employeeCampaigns = selectedEmployee
    ? campaigns.filter(c => c.Email && selectedEmployee.Email && c.Email.toLowerCase() === selectedEmployee.Email.toLowerCase())
        .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
    : [];

  async function handleDeleteEmployee() {
    setDeletingEmp(true);
    try {
      await api.manager.deleteEmployee(deleteEmpId);
      setEmployees(prev => prev.filter(e => String(e.EmployeeID) !== String(deleteEmpId)));
      setSelectedEmployee(null);
      setDeleteEmpId(null);
    } catch (e) { alert(e.message); }
    finally { setDeletingEmp(false); }
  }

  function handleDownload(r, emp) {
    setDownloading(r.ReportID);
    downloadReportPdf(r.CycleID, r.ReportType, r.ReportID, emp.FirstName, emp.LastName);
    setTimeout(() => setDownloading(null), 2000);
  }

  const LANG_LABELS = { en: 'EN', sr: 'SR', de: 'DE', fr: 'FR', es: 'ES' };

  return (
    <PortalLayout role="admin" navItems={NAV}>
      <PageHeader
        title="Employees"
        subtitle="Employee-centric view of campaigns and reports."
      />
      {loading ? <div style={{ padding: '48px', display: 'flex', justifyContent: 'center' }}><Spinner /></div>
        : error ? <Alert variant="error">{error}</Alert>
        : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {/* ── Left panel ── */}
          <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Company filter */}
            <Card style={{ padding: '16px' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '10px' }}>Company</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[{ id: 'all', name: 'All Companies' }, ...companies.map(c => ({ id: String(c.CompanyID || c.id), name: c.CompanyName || c.name }))].map(({ id, name }) => {
                  const active = selectedCompany === id;
                  return (
                    <button key={id} onClick={() => { setSelectedCompany(id); setSelectedEmployee(null); }} style={{
                      padding: '7px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      background: active ? 'var(--ink)' : 'transparent',
                      color: active ? '#fff' : 'var(--ink-soft)',
                      fontSize: '0.85rem', textAlign: 'left', fontFamily: 'var(--font-body)',
                      transition: 'all 0.15s', fontWeight: active ? 600 : 400,
                    }}>{name}</button>
                  );
                })}
              </div>
            </Card>

            {/* Employee list */}
            <Card style={{ padding: '16px' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '10px' }}>
                Employees{filteredEmployees.length > 0 ? ` (${filteredEmployees.length})` : ''}
              </p>
              <Input
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              {filteredEmployees.length === 0 ? (
                <p style={{ color: 'var(--ink-faint)', fontSize: '0.83rem', padding: '8px 0' }}>No employees found.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', maxHeight: 280, overflowY: 'auto', marginRight: -4 }}>
                  {filteredEmployees.map(emp => {
                    const eId = String(emp.EmployeeID);
                    const active = selectedEmployee && String(selectedEmployee.EmployeeID) === eId;
                    const empCampCount = campaigns.filter(c => c.Email && emp.Email && c.Email.toLowerCase() === emp.Email.toLowerCase()).length;
                    return (
                      <button key={eId} onClick={() => { setSelectedEmployee(emp); setCampaignFilter('all'); }} style={{
                        padding: '9px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: active ? 'rgba(0,0,0,0.06)' : 'transparent',
                        textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                      }}>
                        <div style={{ fontWeight: active ? 600 : 400, fontSize: '0.87rem', color: 'var(--ink)' }}>
                          {emp.FirstName} {emp.LastName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', marginTop: '1px' }}>
                          {emp.JobTitle || '—'} · {empCampCount} campaign{empCampCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </Card>

            <Btn variant="teal" size="sm" onClick={() => navigate('/manager/employees/new', { state: { from: '/manager/people' } })} style={{ width: '100%', justifyContent: 'center' }}>
              + Add Employee
            </Btn>
          </div>

          {/* ── Right panel ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!selectedEmployee ? (
              <Card style={{ padding: '64px 32px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--canvas-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--ink-faint)' }}>
                  <IcPeople />
                </div>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Select an employee to view their profile.</p>
              </Card>
            ) : (
              <>
                {/* Employee header card */}
                <Card style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: 'var(--canvas-warm)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', flexShrink: 0,
                      }}>
                        {(selectedEmployee.FirstName || '')[0]}{(selectedEmployee.LastName || '')[0]}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
                            {selectedEmployee.FirstName} {selectedEmployee.LastName}
                          </h2>
                          {selectedEmployee.Lang && (
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: '999px', border: '1px solid var(--canvas-warm)', color: 'var(--ink-faint)', letterSpacing: '0.06em' }}>
                              {LANG_LABELS[selectedEmployee.Lang] || selectedEmployee.Lang.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--ink-soft)', marginTop: '3px' }}>
                          {[selectedEmployee.JobTitle, selectedEmployee.CompanyName || companies.find(c => String(c.CompanyID || c.id) === String(selectedEmployee.CompanyID))?.CompanyName].filter(Boolean).join(' · ')}
                        </div>
                        {selectedEmployee.Email && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--ink-faint)', marginTop: '2px' }}>{selectedEmployee.Email}</div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <Btn size="sm" variant="secondary" onClick={() => navigate(`/manager/employees/${selectedEmployee.EmployeeID}/edit`)}>Edit</Btn>
                      <Btn size="sm" onClick={() => navigate('/manager/campaigns/new', { state: { companyId: selectedEmployee.CompanyID ? String(selectedEmployee.CompanyID) : '', from: '/manager/people' } })}>New Campaign</Btn>
                      <Btn size="sm" variant="danger" onClick={() => setDeleteEmpId(selectedEmployee.EmployeeID)}>Delete</Btn>
                    </div>
                  </div>

                  {/* Stats row */}
                  {(() => {
                    const statsConfig = [
                      { key: 'all', label: 'All', value: employeeCampaigns.length },
                      { key: 'in_progress', label: 'In Progress', value: employeeCampaigns.filter(c => c.Status === 'in_progress').length },
                      { key: 'completed', label: 'Completed', value: employeeCampaigns.filter(c => c.Status === 'completed').length },
                      { key: 'with_reports', label: 'With Reports', value: reports.filter(r => employeeCampaigns.some(c => String(c.CycleID) === String(r.CycleID))).length },
                    ];
                    return (
                      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--canvas-warm)' }}>
                        {statsConfig.map(({ key, label, value }) => {
                          const active = campaignFilter === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setCampaignFilter(active ? 'all' : key)}
                              style={{
                                flex: 1, textAlign: 'center', padding: '10px 8px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: active ? 'var(--ink)' : 'var(--canvas)',
                                transition: 'all 0.15s',
                              }}
                            >
                              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: active ? '#fff' : 'var(--ink)', lineHeight: 1 }}>{value}</div>
                              <div style={{ fontSize: '0.71rem', color: active ? 'rgba(255,255,255,0.7)' : 'var(--ink-faint)', marginTop: '4px', letterSpacing: '0.02em' }}>{label}</div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </Card>

                {/* Campaigns card */}
                {(() => {
                  const visibleCampaigns = campaignFilter === 'all' ? employeeCampaigns
                    : campaignFilter === 'with_reports' ? employeeCampaigns.filter(c => reports.some(r => String(r.CycleID) === String(c.CycleID)))
                    : employeeCampaigns.filter(c => c.Status === campaignFilter);
                  const filterLabel = campaignFilter === 'all' ? null : campaignFilter === 'with_reports' ? 'With Reports' : campaignFilter === 'in_progress' ? 'In Progress' : 'Completed';
                  return (
                <Card style={{ padding: 0 }}>
                  <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--canvas-warm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>Campaign History</h3>
                      {filterLabel && (
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'var(--ink)', color: '#fff' }}>
                          {filterLabel}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>{visibleCampaigns.length} of {employeeCampaigns.length}</span>
                  </div>
                  {visibleCampaigns.length === 0 ? (
                    <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.88rem' }}>
                      No campaigns match this filter.
                    </div>
                  ) : visibleCampaigns.map((c, i) => {
                    const campReports = reports.filter(r => String(r.CycleID) === String(c.CycleID));
                    const report1 = campReports.find(r => r.ReportType === 'report1');
                    const report2 = campReports.find(r => r.ReportType === 'report2');
                    const pct = c.TotalLinks > 0 ? Math.round((c.CompletedLinks / c.TotalLinks) * 100) : 0;
                    const statusMap = { in_progress: { label: 'In Progress', color: '#2563eb' }, completed: { label: 'Completed', color: '#16a34a' }, archived: { label: 'Archived', color: '#6b7280' } };
                    const { label: statusLabel, color: statusColor } = statusMap[c.Status] || { label: c.Status, color: '#6b7280' };
                    const assessorParts = [
                      c.IncludeSelf && 'Self',
                      c.IncludeManager && 'Manager',
                      c.IncludePeer && 'Peers',
                      c.IncludeDirectReports && 'Direct Reports',
                      c.IncludeExternal && 'External',
                    ].filter(Boolean);

                    return (
                      <div key={c.CycleID} style={{ padding: '18px 24px', borderBottom: i < employeeCampaigns.length - 1 ? '1px solid var(--canvas-warm)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{c.Name}</span>
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: statusColor + '18', color: statusColor }}>
                                {statusLabel}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', marginBottom: '10px' }}>
                              {new Date(c.CreatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              {c.Deadline && ` · Due ${new Date(c.Deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                              {assessorParts.length > 0 && ` · ${assessorParts.join(', ')}`}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ flex: 1, height: 5, borderRadius: '999px', background: 'var(--canvas-warm)', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${pct}%`, borderRadius: '999px', background: 'var(--ink)', transition: 'width 0.3s' }} />
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)', flexShrink: 0 }}>{c.CompletedLinks}/{c.TotalLinks} completed</span>
                            </div>
                          </div>
                          <ActionMenu items={[
                            { label: 'View Campaign', href: `/manager/campaigns/${c.CycleID}` },
                            report1 && { label: 'Download Self Report', onClick: () => handleDownload(report1, selectedEmployee), loading: downloading === report1.ReportID },
                            report2 && { label: 'Download AI Report', onClick: () => handleDownload(report2, selectedEmployee), loading: downloading === report2.ReportID },
                          ].filter(Boolean)} />
                        </div>
                      </div>
                    );
                  })}
                </Card>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}
      <Modal open={!!deleteEmpId} onClose={() => setDeleteEmpId(null)} title="Delete Employee">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteEmpId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deletingEmp} onClick={handleDeleteEmployee}>Delete</Btn>
        </div>
      </Modal>
    </PortalLayout>
  );
}

// ── HB Profiles ────────────────────────────────────────────────────────────
// Parse introText into typed blocks for rendering
function parseIntroText(text = '') {
  if (!text) return [];
  const blocks = [];
  const paragraphs = text.split(/\n\n+/);
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    // Major ALL-CAPS section header (e.g. "CONTENT", "LEVEL 1 – THE PORTRAIT", "FACET REFERENCE – ALL 40 FACETS")
    if (/^[A-Z][A-Z\s\-–—0-9]+$/.test(trimmed) || /^(?:LEVEL|NIVO)\s+\d+/i.test(trimmed)) {
      blocks.push({ type: 'section', text: trimmed });
      continue;
    }
    // Dimension header: "Dimension X — ..."
    if (/^(?:Dimension|Dimenzija)\s+\d+\s*[—–-]/i.test(trimmed)) {
      const lines = trimmed.split('\n');
      blocks.push({ type: 'dimheader', text: lines[0] });
      if (lines.length > 1) blocks.push({ type: 'body', text: lines.slice(1).join('\n') });
      continue;
    }
    // Pillar header: "Pillar X — ..."
    if (/^(?:Pillar|Stub)\s+\d+\s*[—–-]/i.test(trimmed)) {
      const lines = trimmed.split('\n');
      blocks.push({ type: 'pillarheader', text: lines[0] });
      if (lines.length > 1) blocks.push({ type: 'body', text: lines.slice(1).join('\n') });
      continue;
    }
    // Dimension sub-label: "Mindset dimension", "Skills dimension" etc.
    if (/^(Mindset|Skills|Results|Influence)\s+dimension$/.test(trimmed)) {
      blocks.push({ type: 'dimheader', text: trimmed });
      continue;
    }
    // Short lines that are likely sub-headings (bold intro labels under a pillar)
    if (/^Facets:\s/.test(trimmed)) {
      blocks.push({ type: 'facetlabel', text: trimmed });
      continue;
    }
    // HB footer line
    if (trimmed.startsWith('HB Foundation ·')) {
      blocks.push({ type: 'footer', text: trimmed });
      continue;
    }
    // Default: body paragraph (may contain \n within)
    blocks.push({ type: 'body', text: trimmed });
  }
  return blocks;
}

function IntroTextRenderer({ text }) {
  const blocks = parseIntroText(text);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {blocks.map((block, i) => {
        if (block.type === 'section') return (
          <div key={i} style={{
            marginTop: i > 0 ? '40px' : 0, marginBottom: '20px',
            paddingBottom: '10px', borderBottom: '2px solid var(--ink)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '1.05rem',
              fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink)',
            }}>{block.text}</span>
          </div>
        );
        if (block.type === 'dimheader') return (
          <div key={i} style={{ marginTop: '28px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-block', padding: '5px 14px', borderRadius: '4px',
              background: 'var(--ink)', color: '#fff',
              fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em',
            }}>{block.text}</span>
          </div>
        );
        if (block.type === 'pillarheader') return (
          <div key={i} style={{ marginTop: '20px', marginBottom: '6px', paddingLeft: '12px', borderLeft: '3px solid var(--ink)' }}>
            <span style={{
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em',
              color: 'var(--ink)',
            }}>{block.text}</span>
          </div>
        );
        if (block.type === 'facetlabel') return (
          <div key={i} style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
              {block.text}
            </span>
          </div>
        );
        if (block.type === 'footer') return (
          <div key={i} style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid var(--canvas-warm)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', lineHeight: 1.6, margin: 0 }}>{block.text}</p>
          </div>
        );
        // body — handle inline \n as line breaks
        return (
          <p key={i} style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: 1.75, margin: '0 0 12px 0', whiteSpace: 'pre-wrap' }}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function LevelAccordionItem({ label, desc, chunk, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid var(--canvas-warm)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: '16px', padding: '22px 32px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: desc ? '6px' : 0 }}>
            {label}
          </div>
          {desc && (
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
              {desc}
            </p>
          )}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: '2px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--ink-faint)' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: '0 32px 28px' }}>
          <IntroTextRenderer text={chunk} />
        </div>
      )}
    </div>
  );
}

const LANG_LABELS = { en: 'EN', sr: 'SR', de: 'DE', fr: 'FR', es: 'ES' };

export function HBProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [profileLang, setProfileLang] = useState('en');
  const [loading, setLoading] = useState(true);
  const [langLoading, setLangLoading] = useState(false);
  const [facetsLoading, setFacetsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFacets, setExpandedFacets] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const facetsCacheRef = React.useRef({});

  useEffect(() => {
    api.hbProfiles.getAll('en')
      .then(data => {
        const raw = Array.isArray(data) ? data : [];
        console.log('[HBProfiles] all profiles from backend:', raw);
        const seen = new Set();
        const list = raw.filter(p => { const k = p.profileType; if (seen.has(k)) return false; seen.add(k); return true; });
        setProfiles(list);
        if (list.length > 0) {
          setSelected(list[0]);
          setActiveTab(list[0].introText ? 'overview' : 'framework');
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line

  function selectProfile(p) {
    setExpandedFacets({});
    setSelected(p);
    setActiveTab(p.introText ? 'overview' : 'framework');
  }

  function switchLang(lang) {
    if (lang === profileLang) return;
    setLangLoading(true);
    setExpandedFacets({});
    api.hbProfiles.getAll(lang)
      .then(data => {
        const raw = Array.isArray(data) ? data : [];
        const seen2 = new Set();
        const list = raw.filter(p => { const k = p.profileType; if (seen2.has(k)) return false; seen2.add(k); return true; });
        setProfiles(list);
        setProfileLang(lang);
        // Keep same profile selected if possible
        const reSelected = selected
          ? list.find(p => p.profileType === selected.profileType) || list[0]
          : list[0];
        if (reSelected) {
          setSelected(reSelected);
          setActiveTab(reSelected.introText ? 'overview' : 'framework');
        }
      })
      .catch(() => {})
      .finally(() => setLangLoading(false));
  }

  // Lazy-load facets when Facets tab is opened
  useEffect(() => {
    if (!selected || selected.facets?.length) return;
    if (activeTab !== 'framework' && selected.introText) return;
    const cacheKey = `${selected.profileType}-${profileLang}`;
    if (facetsCacheRef.current[cacheKey]) {
      setSelected(prev => prev ? { ...prev, facets: facetsCacheRef.current[cacheKey] } : prev);
      return;
    }
    setFacetsLoading(true);
    api.hbProfiles.getOne(selected.profileType, profileLang)
      .then(full => {
        const facets = full?.facets || [];
        facetsCacheRef.current[cacheKey] = facets;
        setSelected(prev => prev?.profileType === selected.profileType ? { ...prev, facets } : prev);
      })
      .catch(() => {})
      .finally(() => setFacetsLoading(false));
  }, [activeTab, selected?.profileType, profileLang]); // eslint-disable-line

  function toggleFacet(key) {
    setExpandedFacets(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // Group facets by dimension → pillar
  function groupFacets(facets = []) {
    const dims = {};
    facets.forEach(f => {
      if (!dims[f.dimension]) dims[f.dimension] = {};
      if (!dims[f.dimension][f.pillar]) dims[f.dimension][f.pillar] = [];
      dims[f.dimension][f.pillar].push(f);
    });
    return dims;
  }


  return (
    <PortalLayout role="admin" navItems={NAV}>
      <PageHeader title="HB Profiles" subtitle="Competency frameworks for each profile type." />

      {error && <Alert type="error" style={{ marginBottom: 20 }}>{error}</Alert>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><Spinner /></div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

          {/* Left: profile list */}
          <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {profiles.map(p => {
              const active = selected?.profileType === p.profileType;
              return (
                <button
                  key={p.profileType}
                  onClick={() => selectProfile(p)}
                  style={{
                    padding: '11px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: active ? 'var(--ink)' : 'transparent',
                    textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--canvas-warm)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: active ? '#fff' : 'var(--ink)' }}>
                    {p.profileName || p.profileType}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: profile detail */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!selected ? (
              <Card style={{ padding: '64px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--ink-soft)' }}>Select a profile to view its framework.</p>
              </Card>
            ) : (() => {
              const availLangs = selected.availableLangs || selected.available_langs || selected.languages || [];
              console.log('[HBProfiles] selected keys:', JSON.stringify(Object.keys(selected)));
              console.log('[HBProfiles] full object:', JSON.stringify(selected).slice(0, 400));
              const grouped = groupFacets(selected.facets);
              const DIM_ORDER = ['RESULTS', 'MINDSET', 'SKILLS', 'INFLUENCE'];
              const sortedDims = Object.keys(grouped).sort((a, b) => {
                const ai = DIM_ORDER.indexOf(a); const bi = DIM_ORDER.indexOf(b);
                return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
              });
              const hasIntro = !!selected.introText;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Profile title + lang switcher + tab switcher */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '4px' }}>
                        {selected.profileType}
                      </p>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', margin: 0 }}>
                        {selected.profileName || selected.profileType}
                      </h2>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {availLangs.length > 1 && (
                        <div style={{ display: 'flex', gap: '2px', background: 'var(--canvas-warm)', borderRadius: '8px', padding: '3px' }}>
                          {availLangs.map(l => (
                            <button key={l} onClick={() => switchLang(l)} disabled={langLoading} style={{
                              padding: '6px 14px', borderRadius: '6px', border: 'none',
                              cursor: langLoading ? 'default' : 'pointer',
                              fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700,
                              letterSpacing: '0.06em',
                              background: profileLang === l ? '#000' : 'transparent',
                              color: profileLang === l ? '#fff' : 'var(--ink-soft)',
                              boxShadow: profileLang === l ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                              opacity: langLoading && profileLang !== l ? 0.45 : 1,
                              transition: 'all 0.15s',
                            }}>{LANG_LABELS[l] || l.toUpperCase()}</button>
                          ))}
                        </div>
                      )}
                      {hasIntro && (
                        <div style={{ display: 'flex', gap: '2px', background: 'var(--canvas-warm)', borderRadius: '8px', padding: '3px' }}>
                          {[['overview', 'Overview'], ['framework', 'Facets']].map(([key, label]) => (
                            <button key={key} onClick={() => setActiveTab(key)} style={{
                              padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
                              background: activeTab === key ? '#fff' : 'transparent',
                              color: activeTab === key ? 'var(--ink)' : 'var(--ink-soft)',
                              boxShadow: activeTab === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                              transition: 'all 0.15s',
                            }}>{label}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overview tab — 3 accordion items, one per level */}
                  {activeTab === 'overview' && hasIntro && (() => {
                    const ld = selected.levelDescriptions || selected.level_descriptions || {};
                    const levelChunks = (selected.introText || '').split(/(?=(?:LEVEL|NIVO)\s+[123]\s*[—–-])/i).filter(c => c.trim());
                    const levels = [
                      { label: (levelChunks[0] || '').split('\n')[0].trim() || 'Level 1', desc: ld.level1 || ld['1'] || '', chunk: levelChunks[0] || '' },
                      { label: (levelChunks[1] || '').split('\n')[0].trim() || 'Level 2', desc: ld.level2 || ld['2'] || '', chunk: levelChunks[1] || '' },
                      { label: (levelChunks[2] || '').split('\n')[0].trim() || 'Level 3', desc: ld.level3 || ld['3'] || '', chunk: levelChunks[2] || '' },
                    ];
                    return (
                      <Card style={{ padding: '8px 0' }}>
                        {levels.map((lvl, i) => (
                          <LevelAccordionItem
                            key={lvl.label}
                            label={lvl.label}
                            desc={lvl.desc}
                            chunk={lvl.chunk}
                            isLast={i === levels.length - 1}
                          />
                        ))}
                      </Card>
                    );
                  })()}

                  {/* Framework tab — facets */}
                  {(activeTab === 'framework' || !hasIntro) && (
                  facetsLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner /></div>
                  ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {sortedDims.map(dimension => { const pillars = grouped[dimension]; return (
                    <div key={dimension}>
                      {/* Dimension header */}
                      <div style={{
                        padding: '8px 16px', borderRadius: '6px',
                        background: 'var(--ink)', color: '#fff',
                        fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: '12px',
                        display: 'inline-block',
                      }}>
                        {dimension}
                      </div>

                      {Object.entries(pillars).map(([pillar, facets]) => (
                        <div key={pillar} style={{ marginBottom: '16px' }}>
                          {/* Pillar label */}
                          <div style={{
                            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em',
                            color: 'var(--ink)', marginBottom: '10px', marginTop: '4px',
                            paddingLeft: '12px',
                            borderLeft: '3px solid var(--ink)',
                          }}>
                            {pillar}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {facets.map((facet, fi) => {
                              const key = `${dimension}__${pillar}__${fi}`;
                              const open = !!expandedFacets[key];
                              return (
                                <Card key={key} style={{ padding: 0, overflow: 'hidden' }}>
                                  {/* Facet header (clickable) */}
                                  <button
                                    onClick={() => toggleFacet(key)}
                                    style={{
                                      width: '100%', padding: '14px 18px',
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: '12px', textAlign: 'left', fontFamily: 'var(--font-body)',
                                    }}
                                  >
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>
                                        {facet.facet}
                                      </div>
                                      {!open && facet.description && (
                                        <div style={{
                                          fontSize: '0.8rem', color: 'var(--ink-soft)',
                                          marginTop: '3px', overflow: 'hidden',
                                          whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                          maxWidth: '100%',
                                        }}>
                                          {facet.description}
                                        </div>
                                      )}
                                    </div>
                                    <svg
                                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                      style={{ flexShrink: 0, color: 'var(--ink-faint)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                                    >
                                      <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                  </button>

                                  {/* Expanded content */}
                                  {open && (
                                    <div style={{ borderTop: '1px solid var(--canvas-warm)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                      {facet.description && (
                                        <p style={{ fontSize: '0.84rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                                          {facet.description}
                                        </p>
                                      )}
                                      {facet.levels && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                          {Object.entries(facet.levels).map(([level, text]) => {
                                            return (
                                              <div key={level} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                <span style={{
                                                  flexShrink: 0, width: '80px',
                                                  fontSize: '0.68rem', fontWeight: 700,
                                                  textTransform: 'uppercase', letterSpacing: '0.07em',
                                                  color: 'var(--ink-faint)', textAlign: 'center',
                                                }}>
                                                  {level}
                                                </span>
                                                <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                                                  {text}
                                                </p>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ); })}
                </div>
                ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

    
    </PortalLayout>
  );
}

// ── Reports ────────────────────────────────────────────────────────────────
function downloadReportPdf(cycleId, reportType, reportId, firstName, lastName) {
  const token = localStorage.getItem('compass_token_admin');
  const BASE = process.env.REACT_APP_API_URL || 'https://api.hansenbeck.com';
  const url = reportType === 'report2'
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
      a.download = `report_${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    })
    .catch(e => alert(`Download failed: ${e.message}`));
}

// ── Create New Ideal Profile (Coming Soon) ────────────────────────────────
export function CreateIdealProfile() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  // 12 dots on a circle, each with a phase offset
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const x = 50 + 38 * Math.cos(angle);
    const y = 50 + 38 * Math.sin(angle);
    const phase = (tick - i * 2 + 240) % 24;
    const opacity = phase < 12 ? 0.15 + (phase / 12) * 0.85 : 1 - ((phase - 12) / 12) * 0.85;
    const scale = phase < 12 ? 0.5 + (phase / 12) * 0.5 : 1 - ((phase - 12) / 12) * 0.5;
    return { x, y, opacity, scale };
  });

  return (
    <PortalLayout role="admin" navItems={NAV}>
      <div style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '36px',
      }}>
        {/* Animated compass-like spinner */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100" height="100">
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.x} cy={d.y} r={4}
                fill="var(--ink)"
                opacity={d.opacity}
                transform={`scale(${d.scale}) translate(${(1 - d.scale) * 50}, ${(1 - d.scale) * 50})`}
                style={{ transformOrigin: `${d.x}px ${d.y}px`, transform: `scale(${d.scale})` }}
              />
            ))}
            {/* Center dot */}
            <circle cx="50" cy="50" r="3.5" fill="var(--ink)" opacity="0.25" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '14px',
          }}>
            In Development
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
            lineHeight: 1.2, marginBottom: '16px', color: 'var(--ink)',
          }}>
            Coming Soon
          </h1>
          <p style={{
            fontSize: '0.92rem', color: 'var(--ink-soft)',
            lineHeight: 1.7, marginBottom: '32px',
          }}>
            We're building a powerful tool for creating custom ideal profiles.
            It will let you define competency levels across dimensions and facets
            tailored to any role.
          </p>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 20px', borderRadius: 'var(--radius-sm)',
              border: '1.5px solid rgba(0,0,0,0.12)',
              background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--ink-soft)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'var(--ink-soft)'; }}
          >
            ← Go back
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}

// ── Admin Profile Access (super-admin only) ────────────────────────────────
export function AdminProfileAccess() {
  const [admins, setAdmins] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.manager.getAdminProfiles(),
      api.manager.getProfiles(),
    ])
      .then(([adminList, profiles]) => {
        setAdmins(Array.isArray(adminList) ? adminList : []);
        setAllProfiles(Array.isArray(profiles) ? profiles : []);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(admin) {
    setSaving(prev => ({ ...prev, [admin.managerId]: true }));
    setSaved(prev => ({ ...prev, [admin.managerId]: false }));
    try {
      await api.manager.updateAdminProfiles(admin.managerId, { profileIds: admin.profileIds });
      setSaved(prev => ({ ...prev, [admin.managerId]: true }));
      setTimeout(() => setSaved(prev => ({ ...prev, [admin.managerId]: false })), 2000);
    } catch (e) {
      alert(`Failed to save: ${e.message}`);
    } finally {
      setSaving(prev => ({ ...prev, [admin.managerId]: false }));
    }
  }

  function toggleProfile(managerId, profileId) {
    setAdmins(prev => prev.map(a => {
      if (a.managerId !== managerId) return a;
      const has = a.profileIds.includes(profileId);
      return { ...a, profileIds: has ? a.profileIds.filter(id => id !== profileId) : [...a.profileIds, profileId] };
    }));
    setSaved(prev => ({ ...prev, [managerId]: false }));
  }

  return (
    <PortalLayout role="admin" navItems={NAV}>
      <PageHeader title="Profile Access" subtitle="Manage which profiles each administrator can see and use." />
      {error && <Alert type="error" style={{ marginBottom: 20 }}>{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><Spinner /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 800 }}>
          {admins.length === 0 && (
            <Card style={{ padding: '48px 32px', textAlign: 'center' }}>
              <p style={{ color: 'var(--ink-soft)' }}>No administrators found.</p>
            </Card>
          )}
          {admins.map(admin => (
            <Card key={admin.managerId} style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '2px' }}>{admin.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>{admin.username}</div>
                </div>
                <Btn
                  size="sm"
                  variant={saved[admin.managerId] ? 'outline' : 'primary'}
                  onClick={() => handleSave(admin)}
                  disabled={saving[admin.managerId]}
                >
                  {saving[admin.managerId] ? 'Saving…' : saved[admin.managerId] ? '✓ Saved' : 'Save'}
                </Btn>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allProfiles.map(p => {
                  const pid = p.id || p.ProfilID;
                  const checked = admin.profileIds.includes(pid);
                  return (
                    <label key={pid} style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      padding: '7px 13px', borderRadius: '6px', cursor: 'pointer',
                      fontSize: '0.83rem', fontWeight: 500,
                      border: `1.5px solid ${checked ? 'var(--ink)' : '#e0e0e0'}`,
                      background: checked ? 'var(--canvas-warm)' : '#fff',
                      transition: 'all 0.15s',
                    }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleProfile(admin.managerId, pid)}
                        style={{ accentColor: 'var(--ink)' }}
                      />
                      {p.name || p.Name || p.profileType}
                    </label>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PortalLayout>
  );
}


import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { PortalLayout } from '../../components/Layout';
import {
  Btn, Card, Badge, Alert, PageHeader, EmptyState,
  Table, Modal, FormField, Input, Select, Spinner
} from '../../components/UI';

const NAV = [
  { group: 'My Campaigns', href: '/manager/dashboard', icon: '📊', label: 'Active Campaigns' },
  { group: 'My Campaigns', href: '/manager/archived', icon: '🗂️', label: 'Archived Campaigns' },
  { group: 'My Campaigns', href: '/manager/campaigns/new', icon: '➕', label: 'New Campaign' },
  { group: 'Management', href: '/manager/companies', icon: '🏢', label: 'My Companies' },
  { group: 'Support', href: '/faq', icon: '❓', label: 'FAQ' },
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
export function ManagerWelcome() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    api.getMe('admin').then(d => setName(d?.firstName || '')).catch(() => {});
  }, []);

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--ink)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div style={{ position: 'relative', maxWidth: 520 }}>
        <div style={{
          display: 'inline-block', padding: '5px 16px', borderRadius: '2px',
          border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.55)',
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
          marginBottom: '32px', fontFamily: 'var(--font-body)',
        }}>HB Compass</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#fff', lineHeight: 1.1, marginBottom: '16px', fontWeight: 400,
        }}>
          {name ? `Welcome, ${name}` : 'Welcome back'}
        </h1>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '44px', maxWidth: 380, margin: '0 auto 44px' }}>
          Your HB Compass management portal. Review campaigns, manage your team, and track progress.
        </p>
        <button
          onClick={() => navigate('/manager/dashboard')}
          style={{
            padding: '14px 36px', borderRadius: 'var(--radius-sm)',
            background: '#fff', color: '#000', fontWeight: 700, fontSize: '0.88rem',
            letterSpacing: '0.04em', textTransform: 'uppercase', border: 'none',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
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
            <Table
              headers={[ 'Campaign', 'Employee', 'Company', 'Status', 'Progress', 'Started', 'Deadline', 'Actions' ]}
              rows={filtered.map(c => [
                <strong>{c.Name}</strong>,
                <strong>{c.FirstName} {c.LastName}</strong>,
                <span style={{ color: 'var(--ink-soft)', fontSize: '0.84rem' }}>{c.CompanyName || '—'}</span>,
                <Badge status={c.Status === 'in_progress' ? 'active' : c.Status}>{c.Status}</Badge>,
                `${c.CompletedLinks}/${c.TotalLinks}`,
                new Date(c.CreatedAt).toLocaleDateString(),
                fmtDeadline(c),
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <Link to={`/manager/campaigns/${c.CycleID}`}><Btn size="sm" variant="outline">View</Btn></Link>
                  {c.Status === 'in_progress' && (
                    <Link to={`/manager/campaigns/${c.CycleID}/edit`}><Btn size="sm" variant="outline">Edit</Btn></Link>
                  )}
                  {c.Status === 'in_progress' && (
                    <Btn size="sm" variant="outline" loading={actionLoading === c.CycleID + '-complete'} onClick={() => handleComplete(c.CycleID)} style={{ color: '#059669', borderColor: '#059669' }}>Complete</Btn>
                  )}
                  {c.Status === 'completed' && (
                    <Btn size="sm" variant="outline" loading={actionLoading === c.CycleID + '-archive'} onClick={() => handleArchive(c.CycleID)} style={{ color: '#7c3aed', borderColor: '#7c3aed' }}>Archive</Btn>
                  )}
                  <Btn size="sm" variant="outline" onClick={() => setDeleteId(c.CycleID)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</Btn>
                </div>,
              ])}
              emptyMessage="No campaigns yet. Start your first assessment campaign."
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
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link to={`/manager/campaigns/${c.CycleID}`}><Btn size="sm" variant="outline">View</Btn></Link>
                  <Btn size="sm" variant="outline" onClick={() => setDeleteId(c.CycleID)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</Btn>
                </div>,
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
        action={<Link to="/manager/employees/new"><Btn variant="teal">+ Add Employee</Btn></Link>}
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
        <Card><EmptyState icon="👥" title="No employees yet" message="Add your first employee to get started." action={<Link to="/manager/employees/new"><Btn variant="teal">Add Employee</Btn></Link>} /></Card>
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
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Btn size="sm" variant="outline" onClick={() => navigate(`/manager/employees/${e.EmployeeID}/edit`)}>Edit</Btn>
                    <Btn size="sm" variant="danger" onClick={() => setDeleteId(e.EmployeeID)}>Delete</Btn>
                  </div>,
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
  const { id } = useParams();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    jobTitle: '', jobTitleCustom: '',
    lang: 'en',
    managerId: '',
    companyId: '',
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
      api.manager.getEmployees().then(list => setManagerList(list.filter(e => String(e.EmployeeID) !== id))).catch(() => {});
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
      navigate('/manager/employees');
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

          <FormField label="Manager" hint="Select the employee's direct manager (optional)">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Select value={form.managerId} onChange={set('managerId')} style={{ flex: 1 }}>
                <option value="">— No manager —</option>
                {managerList.map(e => (
                  <option key={e.EmployeeID} value={e.EmployeeID}>
                    {e.FirstName} {e.LastName}
                  </option>
                ))}
              </Select>
              <Btn type="button" variant="outline" size="sm" onClick={() => setShowAddManager(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>+ Add New</Btn>
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
            <Btn variant="outline" type="button" onClick={() => navigate('/manager/employees')}>Cancel</Btn>
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
function CampaignForm({ initialData, onSubmit, submitLoading, submitError, lockMode }) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [mode, setMode] = useState(initialData?.mode || 'individual');
  const [form, setForm] = useState({
    name: '', employeeId: '', employeeIds: [], profilId: '',
    includeSelf: false, includeManager: false, includePeer: false,
    includeDirectReports: false, includeExternal: false,
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
  const [filterEmpCompany, setFilterEmpCompany] = useState('');
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
  const [subgroups, setSubgroups] = useState([
    { employeeIds: [], includeSelf: false, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false },
  ]);

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

  // Detect if selected profile is "modern employee" — restricts to self-only
  const selectedProfile = profiles.find(p => String(p.id || p.ProfilID) === String(form.profilId));
  const isEmployeeProfile = (selectedProfile?.name || selectedProfile?.Name || '').toLowerCase().includes('employee');

  // When employee profile is selected, force Self-only
  useEffect(() => {
    if (isEmployeeProfile) {
      setForm(f => ({ ...f, includeSelf: true, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false }));
    }
  }, [isEmployeeProfile]);

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
      ...(mode === 'individual' ? { employeeId: Number(form.employeeId) } : { employeeIds: form.employeeIds }),
      profilId: form.profilId ? Number(form.profilId) : undefined,
      deadline: form.deadline || undefined,
      includeSelf: form.includeSelf, includeManager: form.includeManager,
      includePeer: form.includePeer, includeDirectReports: form.includeDirectReports,
      includeExternal: form.includeExternal,
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

      {/* Deadline */}
      <FormField label="Deadline" hint="Assessors will receive reminder emails at 10, 5, 2 and 1 day(s) before the deadline">
        <Input
          type="date"
          value={form.deadline}
          onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

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

      {/* Employee selection — hidden in edit mode */}
      {!lockMode && (() => {
        const filteredEmps = filterEmpCompany
          ? employees.filter(e => String(e.CompanyID) === filterEmpCompany)
          : employees;
          const isCompanySelected = !!filterEmpCompany;
        const companyFilter = companies.length > 0 ? (
          <div style={{ marginBottom: '8px' }}>
             <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                1. Select Company First
             </label>
             <Select 
  value={filterEmpCompany} 
  onChange={e => {
    setFilterEmpCompany(e.target.value);
    setForm(f => ({ ...f, employeeId: '', employeeIds: [] })); 
  }} 
  style={{ 
    width: '100%', 
    // Koristimo borderColor umesto border da izbegnemo konflikt
    borderColor: !isCompanySelected ? 'var(--teal)' : 'var(--canvas-warm)',
    borderWidth: '1.5px',
    borderStyle: 'solid'
  }}
>
  <option value="">— Choose company to unlock employees —</option>
  {companies.map(c => <option key={c.CompanyID || c.id} value={String(c.CompanyID || c.id)}>{c.CompanyName || c.name}</option>)}
</Select>
          </div>
        ) : null;
        if (mode === 'individual') return (
          <FormField label="Select Company and Employee" required>
            {companyFilter}
            <div style={{ 
              display: 'flex', gap: '8px', alignItems: 'flex-start', 
              opacity: isCompanySelected ? 1 : 0.6,
              transition: 'opacity 0.2s ease'
            }}>
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
              <Btn 
                type="button" 
                variant="outline" 
                size="sm" 
                disabled={!isCompanySelected}
                onClick={() => {
                  setAddEmpForm(prev => ({ ...prev, companyId: filterEmpCompany })); // Automatski dodeljujemo izabranu firmu novom zaposlenom
                  setShowAddEmp(true);
                }} 
                style={{ whiteSpace: 'nowrap', flexShrink: 0, cursor: !isCompanySelected ? 'not-allowed' : 'pointer' }}
              >
                + Add New
              </Btn>
            </div>
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
              {isCompanySelected ? filteredEmps.map(emp => (
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
              )) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
                  List is empty. Please select a company first to see employees.
                </div>
              )}
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
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Assessment Types</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    { key: 'includeSelf', label: 'Self' },
                    { key: 'includeManager', label: 'Manager' },
                    { key: 'includePeer', label: 'Peer' },
                    { key: 'includeDirectReports', label: 'Direct Reports' },
                    { key: 'includeExternal', label: 'External' },
                  ].map(t => (
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
                  ))}
                </div>
              </div>
            ))}
            <Btn type="button" variant="outline" size="sm" onClick={() => setSubgroups(prev => [...prev, { employeeIds: [], includeSelf: false, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false }])}>
              + Add Subgroup
            </Btn>
          </div>
        );

        return (
          <>
            <FormField label="2. Group Configuration">
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
            <FormField label={groupStyle === 'same' ? '3. Select Employees' : '3. Configure Subgroups'} hint={groupStyle === 'same' ? 'Select all employees for this batch campaign' : 'Each subgroup can have different employees and assessment types'} required>
              {companyFilter}
              {groupStyle === 'same' ? employeeListUI : subgroupUI}
            </FormField>
          </>
        );
      })()}

      {/* Profile */}
      {profiles.length > 0 && (
        <FormField label="Assessment Profile" hint="Which question set to use">
          <Select value={form.profilId} onChange={e => setForm(f => ({ ...f, profilId: e.target.value }))}>
            <option value="">— Default profile —</option>
            {profiles.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
          </Select>
        </FormField>
      )}

      {/* Assessment types */}
      {!(mode === 'group' && groupStyle === 'custom') && (
      <FormField label="Assessment Types" required hint={isEmployeeProfile ? 'This profile only supports Self Assessment' : undefined}>
        <div className="grid-2col" style={{ gap: '10px' }}>
          {[
            { key: 'includeSelf', label: 'Self Assessment', desc: 'Employee rates themselves' },
            { key: 'includeManager', label: 'Manager Review', desc: 'Direct manager assessment' },
            { key: 'includePeer', label: 'Peer Review', desc: 'Individual links + shared link' },
            { key: 'includeDirectReports', label: 'Direct Reports', desc: 'Individual links + shared link' },
            { key: 'includeExternal', label: 'External', desc: 'One shared link for external assessors' },
          ].map(t => {
            const lockedOff = isEmployeeProfile && t.key !== 'includeSelf';
            const lockedOn  = isEmployeeProfile && t.key === 'includeSelf';
            return (
            <label key={t.key} style={{
              display: 'flex', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)',
              cursor: (lockedOff || lockedOn) ? 'not-allowed' : 'pointer',
              border: `1.5px solid ${form[t.key] ? 'var(--ink)' : 'var(--canvas-warm)'}`,
              background: lockedOff ? '#f9f9f9' : form[t.key] ? 'var(--canvas-warm)' : 'var(--canvas)',
              opacity: lockedOff ? 0.45 : 1,
              transition: 'all var(--transition)',
            }}>
              <input type="checkbox" checked={form[t.key]} onChange={() => { if (!lockedOff && !lockedOn) toggle(t.key); }} disabled={lockedOff || lockedOn} style={{ accentColor: 'var(--ink)', marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{t.label}</div>
                <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{t.desc}</div>
              </div>
            </label>
            );
          })}
        </div>
      </FormField>
      )}

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
        <Btn variant="outline" type="button" onClick={() => navigate('/manager/dashboard')}>Cancel</Btn>
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
        <FormField label="Manager" hint="Optional — select or add the employee's direct manager">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Select value={addEmpForm.managerId} onChange={e => setAddEmpForm(f => ({ ...f, managerId: e.target.value }))} style={{ flex: 1 }}>
              <option value="">— No manager —</option>
              {employees.map(e => (
                <option key={e.EmployeeID} value={e.EmployeeID}>{e.FirstName} {e.LastName}</option>
              ))}
            </Select>
            <Btn type="button" variant="outline" size="sm" onClick={() => setShowAddEmpManager(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>+ Add New</Btn>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(payload) {
    if (payload.mode === 'individual' && !payload.employeeId) { setError('Please select an employee.'); return; }
    if (payload.mode === 'group' && payload.groupStyle === 'custom') {
      if (!payload.subgroups || payload.subgroups.length === 0) { setError('Add at least one subgroup.'); return; }
      for (let i = 0; i < payload.subgroups.length; i++) {
        const sg = payload.subgroups[i];
        if (!sg.employeeIds || sg.employeeIds.length === 0) { setError(`Subgroup ${i + 1} has no employees selected.`); return; }
        if (!sg.includeSelf && !sg.includeManager && !sg.includePeer && !sg.includeDirectReports && !sg.includeExternal) {
          setError(`Subgroup ${i + 1} has no assessment types selected.`); return;
        }
      }
    } else {
      if (payload.mode === 'group' && (!payload.employeeIds || payload.employeeIds.length < 2)) { setError('Select at least 2 employees for a group campaign.'); return; }
      if (!payload.includeSelf && !payload.includeManager && !payload.includePeer && !payload.includeDirectReports && !payload.includeExternal) {
        setError('Select at least one assessment type.'); return;
      }
    }
    setLoading(true); setError(null);
    try {
      if (payload.mode === 'group') {
        if (payload.groupStyle === 'custom') {
          for (const sg of payload.subgroups) {
            await api.manager.createCampaignBatch({
              name: payload.name,
              employeeIds: sg.employeeIds,
              profilId: payload.profilId,
              deadline: payload.deadline,
              includeSelf: sg.includeSelf,
              includeManager: sg.includeManager,
              includePeer: sg.includePeer,
              includeDirectReports: sg.includeDirectReports,
              includeExternal: sg.includeExternal,
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
        <CampaignForm onSubmit={handleSubmit} submitLoading={loading} submitError={error} />
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

  const selfLink = links.find(l => l.AssessmentType === 'self');
  const managerLink = links.find(l => l.AssessmentType === 'manager');
  const peerLinks = links.filter(l => l.AssessmentType === 'peer');
  const drLinks = links.filter(l => ['directreport', 'direct_report'].includes(l.AssessmentType));
  const otherLinks = links.filter(l => !['self', 'manager', 'peer', 'directreport', 'direct_report'].includes(l.AssessmentType));

  const selfDone = selfLink?.Status === 'completed';
  const managerDone = managerLink?.Status === 'completed';
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
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `AI_Report_${campaign.FirstName}_${campaign.LastName}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
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
      setReportSuccess(type === 1 ? 'Self Assessment Report generated.' : 'HB Compass Development Report generated.');
      setConfirmModal(null);
      fetchReports();
    } catch (e) { setReportError(e.message); }
    finally { setGenerating(null); }
  }

  function LinkRow({ link, label }) {
    const publicUrl = link.Token ? `${window.location.origin}/assess/${link.Token}` : null;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
        <span style={{ fontWeight: 500, fontSize: '0.86rem', textTransform: 'capitalize' }}>{label || link.AssessmentType?.replace('_', ' ')}</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.86rem', minWidth: 140 }}>{label} — shared</span>
            <span style={{ fontSize: '0.79rem', color: 'var(--ink-soft)', fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sharedPublicUrl}</span>
            <Btn size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(sharedPublicUrl)}>Copy</Btn>
            {sharedLink.ResponseCount > 0
              ? <Badge status="completed">{sharedLink.ResponseCount} {sharedLink.ResponseCount === 1 ? 'response' : 'responses'}</Badge>
              : <Badge status="pending">Pending</Badge>
            }
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
              {campaign.Status === 'in_progress' && (
                <Btn size="sm" variant="outline" onClick={() => navigate(`/manager/campaigns/${id}/edit`)}>Edit Campaign</Btn>
              )}
            </div>
          </Card>

          {/* Links */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '16px' }}>Assessment Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selfLink && <LinkRow link={selfLink} label="Self Assessment" />}
              {managerLink && <LinkRow link={managerLink} label="Manager Review" />}
              {peerLinks.length > 0 && <GroupRow links={peerLinks} label="Peer Review" expanded={peersExpanded} onToggle={() => setPeersExpanded(x => !x)} />}
              {drLinks.length > 0 && <GroupRow links={drLinks} label="Direct Reports" expanded={drExpanded} onToggle={() => setDrExpanded(x => !x)} />}
              {otherLinks.map((l, i) => <LinkRow key={i} link={l} />)}
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

            {/* 360 inclusions — in development */}
            <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-soft)', marginBottom: '10px' }}>
                Include in report
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {[
                  { label: 'Manager', done: managerDone },
                  { label: 'Peers', done: peerLinks.some(l => l.Status === 'completed') },
                  { label: 'Direct Reports', done: drLinks.some(l => l.Status === 'completed') },
                  { label: 'External', done: otherLinks.some(l => l.Status === 'completed') },
                ].map(({ label, done }) => (
                  <div key={label} title="Coming soon — multi-assessor reports are currently in development" style={{
                    padding: '5px 12px', borderRadius: 'var(--radius-md)',
                    border: `1px solid ${done ? 'var(--canvas-warm)' : 'var(--canvas-warm)'}`,
                    background: done ? 'var(--canvas-warm)' : 'var(--canvas)',
                    fontSize: '0.78rem', fontWeight: 500,
                    color: done ? 'var(--ink-soft)' : 'var(--ink-faint)',
                    cursor: 'not-allowed', userSelect: 'none',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    {done && <span style={{ color: 'var(--success)', fontSize: '0.7rem' }}>●</span>}
                    {label}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--ink-faint)', lineHeight: 1.5 }}>
                Multi-assessor reports are currently in development. Reports currently use self-assessment data only.
              </p>
            </div>

            {/* Generated reports list */}
            {reports.length > 0 && (
              <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '20px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '12px' }}>Generated</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Btn size="sm" variant="accent" onClick={() => downloadReportPdf(r.CycleID, r.ReportType, r.ReportID, campaign.FirstName, campaign.LastName)}>⬇ Download PDF</Btn>
                        <Btn size="sm" variant="outline" onClick={() => setConfirmDeleteId(r.ReportID)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</Btn>
                      </div>
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
                      <Btn size="sm" variant="outline" onClick={() => { setEditId(cId); setEditName(cName); setActionError(null); }}>Rename</Btn>
                      <Btn size="sm" variant="danger" onClick={() => { setDeleteId(cId); setActionError(null); }}>Delete</Btn>
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

  // Expand state: { [companyId]: 'employees' | 'campaigns' | null }
  const [expanded, setExpanded] = useState({});

  const [actionError, setActionError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      api.manager.getCompanies().catch(() => []),
      api.manager.getEmployees().catch(() => []),
      api.manager.getCampaigns().catch(() => []),
    ]).then(([comps, emps, camps]) => {
      setCompanies(Array.isArray(comps) ? comps : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setCampaigns(Array.isArray(camps) ? camps : []);
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  function toggleExpand(compId, tab) {
    setExpanded(prev => {
      const cur = prev[compId];
      return { ...prev, [compId]: cur === tab ? null : tab };
    });
  }

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
      await api.manager.createCompany({ companyName: newName.trim() });
      setNewName(''); setShowAddCompany(false);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setCreating(false); }
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
    // Try to find company via employee map
    const emp = employees.find(e => e.EmployeeID === c.EmployeeID);
    const key = String(c.CompanyID || emp?.CompanyID || '__none__');
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  return (
    <Layout>
      <PageHeader
        title="My Companies"
        subtitle="Manage your companies and their team members"
        action={
          <Btn variant="teal" onClick={() => setShowAddCompany(v => !v)}>
            {showAddCompany ? 'Cancel' : '+ Add Company'}
          </Btn>
        }
      />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {actionError && <div style={{ marginBottom: '16px' }}><Alert type="error">{actionError}</Alert></div>}

      {showAddCompany && (
        <Card style={{ padding: '20px 24px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '12px' }}>New Company</div>
          <form onSubmit={handleCreateCompany} style={{ display: 'flex', gap: '10px' }}>
            <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Company name..." required autoFocus style={{ flex: 1 }} />
            <Btn type="submit" variant="teal" loading={creating}>Create</Btn>
          </form>
        </Card>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : companies.length === 0 ? (
        <Card><EmptyState icon="🏢" title="No companies yet" message="Add your first company to get started." /></Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {companies.map(c => {
            const cId = c.CompanyID || c.id;
            const cName = c.CompanyName || c.name;
            const compEmps = empsByCompany[String(cId)] || [];
            const compCamps = campsByCompany[String(cId)] || [];
            const expandedTab = expanded[cId] || null;

            return (
              <Card key={cId} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Company row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', flexWrap: 'wrap' }}>
                  {editId === cId ? (
                    <form onSubmit={handleRenameCompany} style={{ display: 'flex', gap: '8px', flex: 1 }}>
                      <Input value={editName} onChange={e => setEditName(e.target.value)} required autoFocus style={{ flex: 1 }} />
                      <Btn type="submit" size="sm" variant="teal" loading={saving}>Save</Btn>
                      <Btn type="button" size="sm" variant="outline" onClick={() => { setEditId(null); setEditName(''); }}>Cancel</Btn>
                    </form>
                  ) : (
                    <>
                      <div style={{ flex: 1, fontWeight: 700, fontSize: '1rem' }}>{cName}</div>

                      {/* Stats — clickable */}
                      <button
                        onClick={() => toggleExpand(cId, 'employees')}
                        style={{
                          background: expandedTab === 'employees' ? 'var(--ink)' : 'var(--canvas-warm)',
                          color: expandedTab === 'employees' ? '#fff' : 'var(--ink-soft)',
                          border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                          padding: '6px 14px', fontSize: '0.82rem', fontWeight: 600,
                          fontFamily: 'var(--font-body)', transition: 'all var(--transition)',
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}
                      >
                        👥 {compEmps.length} employee{compEmps.length !== 1 ? 's' : ''}
                      </button>

                      <button
                        onClick={() => toggleExpand(cId, 'campaigns')}
                        style={{
                          background: expandedTab === 'campaigns' ? 'var(--ink)' : 'var(--canvas-warm)',
                          color: expandedTab === 'campaigns' ? '#fff' : 'var(--ink-soft)',
                          border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                          padding: '6px 14px', fontSize: '0.82rem', fontWeight: 600,
                          fontFamily: 'var(--font-body)', transition: 'all var(--transition)',
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}
                      >
                        📊 {compCamps.length} campaign{compCamps.length !== 1 ? 's' : ''}
                      </button>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Btn size="sm" variant="outline" onClick={() => { setEditId(cId); setEditName(cName); setActionError(null); }}>Rename</Btn>
                        <Btn size="sm" variant="danger" onClick={() => { setDeleteCompanyId(cId); setActionError(null); }}>Delete</Btn>
                      </div>
                    </>
                  )}
                </div>

                {/* Expanded: Employees */}
                {expandedTab === 'employees' && (
                  <div style={{ borderTop: '1px solid var(--canvas-warm)' }}>
                    <div style={{ padding: '10px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)' }}>Employees</span>
                      <Btn size="sm" variant="teal" onClick={() => navigate(`/manager/employees/new?company=${cId}`)}>+ Add Employee</Btn>
                    </div>
                    {compEmps.length === 0 ? (
                      <div style={{ padding: '20px', color: 'var(--ink-faint)', fontSize: '0.88rem', textAlign: 'center' }}>No employees in this company yet.</div>
                    ) : (
                      <Table
                        headers={['Name', 'Email', 'Job Title', 'Language', 'Actions']}
                        rows={compEmps.map(e => [
                          <strong>{e.FirstName} {e.LastName}</strong>,
                          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{e.Email}</span>,
                          e.JobTitle || '—',
                          <Badge status="default">{e.Lang?.toUpperCase() || 'EN'}</Badge>,
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <Btn size="sm" variant="outline" onClick={() => navigate(`/manager/employees/${e.EmployeeID}/edit`)}>Edit</Btn>
                            <Btn size="sm" variant="danger" onClick={() => setDeleteEmpId(e.EmployeeID)}>Delete</Btn>
                          </div>,
                        ])}
                      />
                    )}
                  </div>
                )}

                {/* Expanded: Campaigns */}
                {expandedTab === 'campaigns' && (
                  <div style={{ borderTop: '1px solid var(--canvas-warm)' }}>
                    <div style={{ padding: '10px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)' }}>Campaigns</span>
                      <Link to={`/manager/campaigns/new?company=${cId}`}><Btn size="sm" variant="teal">+ New Campaign</Btn></Link>
                    </div>
                    {compCamps.length === 0 ? (
                      <div style={{ padding: '20px', color: 'var(--ink-faint)', fontSize: '0.88rem', textAlign: 'center' }}>No campaigns for this company yet.</div>
                    ) : (
                      <Table
                        headers={['Campaign', 'Employee', 'Status', 'Progress', 'Deadline', 'Actions']}
                        rows={compCamps.map(camp => [
                          <strong>{camp.Name}</strong>,
                          `${camp.FirstName || ''} ${camp.LastName || ''}`.trim() || '—',
                          <Badge status={camp.Status === 'in_progress' ? 'active' : camp.Status}>{camp.Status}</Badge>,
                          `${camp.CompletedLinks}/${camp.TotalLinks}`,
                          fmtDeadline(camp),
                          <Link to={`/manager/campaigns/${camp.CycleID}`}><Btn size="sm" variant="outline">View</Btn></Link>,
                        ])}
                      />
                    )}
                  </div>
                )}
              </Card>
            );
          })}
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

// ── Reports ────────────────────────────────────────────────────────────────
function downloadReportPdf(cycleId, reportType, reportId, firstName, lastName) {
  const token = localStorage.getItem('compass_token_admin');
  const BASE = process.env.REACT_APP_API_URL || 'https://api.hansenbeck.com';
  const url = reportType === 'report2'
    ? `${BASE}/api/360/manager/reports/${reportId}/ai-pdf`
    : `${BASE}/api/360/manager/cycles/${cycleId}/report/1/pdf`;
  const label = reportType === 'report2' ? 'AI_Report' : 'Self_Assessment_Report';
  const name = `HansenBeck_${label}_${firstName}_${lastName}.pdf`;
  fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.blob(); })
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(e => alert(`Download failed: ${e.message}`));
}


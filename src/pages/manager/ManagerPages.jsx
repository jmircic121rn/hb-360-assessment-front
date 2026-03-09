import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { PortalLayout } from '../../components/Layout';
import {
  Btn, Card, Badge, Alert, PageHeader, EmptyState,
  Table, Modal, FormField, Input, Select, Spinner
} from '../../components/UI';

const NAV = [
  { href: '/manager/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/manager/employees', icon: '👥', label: 'Employees' },
  { href: '/manager/campaigns/new', icon: '🔄', label: 'New Campaign' },
  { href: '/manager/reports', icon: '📄', label: 'Reports' },
];

function Layout({ children }) {
  return <PortalLayout role="manager" navItems={NAV}>{children}</PortalLayout>;
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
    api.getMe('manager').then(d => setName(d?.firstName || '')).catch(() => {});
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
          Your 360° assessment management portal. Review campaigns, manage your team, and track progress.
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.manager.getCampaigns()
      .then(data => setCampaigns(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const active = campaigns.filter(c => c.Status === 'in_progress').length;
  const completed = campaigns.filter(c => c.Status === 'completed').length;

  const stats = [
    { label: 'Active Campaigns', value: loading ? '—' : active },
    { label: 'Completed Campaigns', value: loading ? '—' : completed },
    { label: 'Total Campaigns', value: loading ? '—' : campaigns.length },
  ];

  return (
    <Layout>
      <PageHeader title="Dashboard" subtitle="Overview of your 360° assessment campaigns" />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {stats.map(s => (
              <Card key={s.label} style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginTop: '6px', fontWeight: 500 }}>{s.label}</div>
              </Card>
            ))}
          </div>
          <Card style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Assessment Campaigns</h3>
              <Link to="/manager/campaigns/new"><Btn size="sm" variant="teal">+ New Campaign</Btn></Link>
            </div>
            <Table
              headers={['Employee', 'Status', 'Progress', 'Started', 'Actions']}
              rows={campaigns.map(c => [
                <strong>{c.FirstName} {c.LastName}</strong>,
                <Badge status={c.Status === 'in_progress' ? 'active' : c.Status}>{c.Status}</Badge>,
                `${c.CompletedLinks}/${c.TotalLinks}`,
                new Date(c.CreatedAt).toLocaleDateString(),
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link to={`/manager/campaigns/${c.CycleID}`}><Btn size="sm" variant="outline">View</Btn></Link>
                  {c.Status !== 'completed' && (
                    <Link to={`/manager/campaigns/${c.CycleID}/edit`}><Btn size="sm" variant="outline">Edit</Btn></Link>
                  )}
                </div>,
              ])}
              emptyMessage="No campaigns yet. Start your first assessment campaign."
            />
          </Card>
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

  return (
    <Layout>
      <PageHeader
        title="Employees"
        subtitle="Manage your team members"
        action={<Link to="/manager/employees/new"><Btn variant="teal">+ Add Employee</Btn></Link>}
      />
      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      <Card>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
        ) : employees.length === 0 ? (
          <EmptyState icon="👥" title="No employees yet" message="Add your first employee to get started." action={<Link to="/manager/employees/new"><Btn variant="teal">Add Employee</Btn></Link>} />
        ) : (
          <Table
            headers={['Name', 'Email', 'Job Title', 'Language', 'Actions']}
            rows={employees.map(e => [
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
        )}
      </Card>
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
    lang: 'en', profilId: '',
    managerId: '', managerCustom: '',
  });
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.manager.getManagersList().then(setManagers).catch(() => {});
    if (editMode && id) {
      api.manager.getEmployees().then(list => {
        const emp = list.find(e => String(e.EmployeeID) === id);
        if (emp) {
          const knownTitle = JOB_TITLES.slice(0, -1).includes(emp.JobTitle);
          setForm({
            firstName: emp.FirstName, lastName: emp.LastName, email: emp.Email,
            jobTitle: knownTitle ? emp.JobTitle : (emp.JobTitle ? 'Other' : ''),
            jobTitleCustom: knownTitle ? '' : (emp.JobTitle || ''),
            lang: emp.Lang || 'en', profilId: emp.ProfilId || '',
            managerId: emp.ManagerID ? String(emp.ManagerID) : '',
            managerCustom: '',
          });
        }
      });
    }
  }, [editMode, id]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const payload = {
        firstName: form.firstName, lastName: form.lastName, email: form.email,
        jobTitle: form.jobTitle === 'Other' ? form.jobTitleCustom : form.jobTitle,
        lang: form.lang, profilId: form.profilId,
        managerId: form.managerId === 'custom' ? null : (form.managerId || null),
        managerName: form.managerId === 'custom' ? form.managerCustom : undefined,
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormField label="First Name" required><Input value={form.firstName} onChange={set('firstName')} required /></FormField>
            <FormField label="Last Name" required><Input value={form.lastName} onChange={set('lastName')} required /></FormField>
          </div>
          <FormField label="Email" required><Input type="email" value={form.email} onChange={set('email')} required /></FormField>

          <FormField label="Job Title">
            <Select value={form.jobTitle} onChange={set('jobTitle')}>
              <option value="">— Select job title —</option>
              {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            {form.jobTitle === 'Other' && (
              <Input style={{ marginTop: '8px' }} value={form.jobTitleCustom} onChange={set('jobTitleCustom')} placeholder="Enter job title..." />
            )}
          </FormField>

          <FormField label="Manager" hint="Select the employee's direct manager">
            <Select value={form.managerId} onChange={set('managerId')}>
              <option value="">— Select manager —</option>
              {managers.map(m => (
                <option key={m.ManagerID || m.id} value={m.ManagerID || m.id}>
                  {m.FirstName || m.firstName} {m.LastName || m.lastName}
                </option>
              ))}
              <option value="custom">+ Add new manager (manual entry)</option>
            </Select>
            {form.managerId === 'custom' && (
              <Input style={{ marginTop: '8px' }} value={form.managerCustom} onChange={set('managerCustom')} placeholder="Full name of manager..." />
            )}
          </FormField>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormField label="Language" required>
              <Select value={form.lang} onChange={set('lang')}>
                <option value="en">English</option>
                <option value="sr">Serbian</option>
              </Select>
            </FormField>
            <FormField label="Profile ID" hint="Assessment profile to use">
              <Input type="number" value={form.profilId} onChange={set('profilId')} placeholder="1" />
            </FormField>
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
            <Btn type="submit" variant="teal" loading={loading}>{editMode ? 'Save Changes' : 'Add Employee'}</Btn>
            <Btn variant="outline" type="button" onClick={() => navigate('/manager/employees')}>Cancel</Btn>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

// ── Shared Campaign Form ────────────────────────────────────────────────────
function CampaignForm({ initialData, onSubmit, submitLoading, submitError }) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [mode, setMode] = useState(initialData?.mode || 'individual');
  const [form, setForm] = useState(initialData || {
    employeeId: '', employeeIds: [], profilId: '',
    includeSelf: false, includeManager: false, includePeer: false,
    includeDirectReports: false, includeExternal: false,
  });

  useEffect(() => {
    api.manager.getEmployees().then(setEmployees).catch(() => {});
    api.manager.getProfiles().then(setProfiles).catch(() => {});
  }, []);

  const toggle = key => setForm(f => ({ ...f, [key]: !f[key] }));

  function toggleId(listKey, id) {
    setForm(f => ({
      ...f,
      [listKey]: f[listKey].includes(id) ? f[listKey].filter(x => x !== id) : [...f[listKey], id],
    }));
  }

  const typeConfig = [
    { key: 'includeSelf', label: 'Self Assessment', desc: 'Employee rates themselves' },
    { key: 'includeManager', label: 'Manager Review', desc: 'Direct manager assessment' },
    { key: 'includePeer', label: 'Peer Review', desc: 'Colleague assessments' },
    { key: 'includeDirectReports', label: 'Direct Reports', desc: 'Team members who report to this employee' },
    { key: 'includeExternal', label: 'External', desc: 'One shared link for any external assessors' },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      mode,
      ...(mode === 'individual' ? { employeeId: Number(form.employeeId) } : { employeeIds: form.employeeIds }),
      profilId: form.profilId ? Number(form.profilId) : undefined,
      includeSelf: form.includeSelf, includeManager: form.includeManager,
      includePeer: form.includePeer, includeDirectReports: form.includeDirectReports,
      includeExternal: form.includeExternal,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {submitError && <Alert type="error">{submitError}</Alert>}

      {/* Mode */}
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

      {/* Employee selection */}
      {mode === 'individual' ? (
        <FormField label="Select Employee" required>
          <Select value={form.employeeId} onChange={e => setForm(f => ({ ...f, employeeId: e.target.value }))} required>
            <option value="">— Choose employee —</option>
            {employees.map(emp => <option key={emp.EmployeeID} value={emp.EmployeeID}>{emp.FirstName} {emp.LastName} ({emp.JobTitle || emp.Email})</option>)}
          </Select>
        </FormField>
      ) : (
        <FormField label="Select Employees" hint="Select all employees for this batch campaign" required>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: 220, overflowY: 'auto', border: '1.5px solid var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '6px' }}>
            {employees.map(emp => (
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
          {form.employeeIds.length > 0 && <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '6px' }}>{form.employeeIds.length} selected</div>}
        </FormField>
      )}

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
      <FormField label="Assessment Types" required>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {typeConfig.map(t => (
            <label key={t.key} style={{
              display: 'flex', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
              border: `1.5px solid ${form[t.key] ? 'var(--ink)' : 'var(--canvas-warm)'}`,
              background: form[t.key] ? 'var(--canvas-warm)' : 'var(--canvas)', transition: 'all var(--transition)',
            }}>
              <input type="checkbox" checked={form[t.key]} onChange={() => toggle(t.key)} style={{ accentColor: 'var(--ink)', marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{t.label}</div>
                <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{t.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </FormField>

      {form.includePeer && (
        <div style={{ padding: '14px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>Peer Review link:</strong> One shared link will be generated. Share it with peers — each person will enter their name and email address before starting the assessment.
        </div>
      )}

      {form.includeDirectReports && (
        <div style={{ padding: '14px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>Direct Reports link:</strong> One shared link will be generated. Share it with direct reports — each person will enter their name and email address before starting the assessment.
        </div>
      )}

      {form.includeExternal && (
        <div style={{ padding: '14px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>External link:</strong> One shared link will be generated. Anyone who opens it can complete the assessment — no individual invitation required.
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <Btn type="submit" loading={submitLoading} style={{ minWidth: 160, justifyContent: 'center' }}>Launch Campaign</Btn>
        <Btn variant="outline" type="button" onClick={() => navigate('/manager/dashboard')}>Cancel</Btn>
      </div>
    </form>
  );
}

// ── New Campaign ────────────────────────────────────────────────────────────
export function NewCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(payload) {
    if (payload.mode === 'individual' && !payload.employeeId) { setError('Please select an employee.'); return; }
    if (payload.mode === 'group' && (!payload.employeeIds || payload.employeeIds.length < 2)) { setError('Select at least 2 employees for a group campaign.'); return; }
    if (!payload.includeSelf && !payload.includeManager && !payload.includePeer && !payload.includeDirectReports && !payload.includeExternal) {
      setError('Select at least one assessment type.'); return;
    }
    setLoading(true); setError(null);
    try {
      if (payload.mode === 'group') {
        await api.manager.createCampaignBatch(payload);
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
      <PageHeader title="New Assessment Campaign" subtitle="Configure and launch a 360° campaign" />
      <Card style={{ padding: '32px', maxWidth: 680 }}>
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
          mode: 'individual',
          employeeId: String(cycle.EmployeeID || ''),
          employeeIds: [],
          profilId: String(cycle.ProfilId || ''),
          includeSelf: !!cycle.IncludeSelf,
          includeManager: !!cycle.IncludeManager,
          includePeer: !!cycle.IncludePeer,
          includeDirectReports: !!cycle.IncludeDirectReports,
          includeExternal: !!cycle.IncludeExternal,
          peerEmployeeIds: [], peerExternals: [],
          directReportEmployeeIds: [], directReportExternals: [],
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
          <CampaignForm initialData={initialData} onSubmit={handleSubmit} submitLoading={loading} submitError={error} />
        ) : (
          <Alert type="error">{error || 'Campaign not found.'}</Alert>
        )}
      </Card>
    </Layout>
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

  useEffect(() => {
    api.manager.getCampaign(id)
      .then(setData).catch(e => setError(e.message)).finally(() => setLoading(false));
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
  const selfManagerDone = selfDone && managerDone;
  const completedCount = links.filter(l => l.Status === 'completed').length;

  async function doGenerateReport(type, force = false) {
    if (type === 2 && !force) {
      const incomplete = links.filter(l => l.Status !== 'completed');
      if (incomplete.length > 0) { setConfirmModal({ type, incomplete }); return; }
    }
    setGenerating(type); setReportSuccess(null); setReportError(null);
    try {
      await (type === 1 ? api.manager.generateReport1(id) : api.manager.generateReport2(id));
      setReportSuccess(type === 1 ? 'Self Assessment Report generated.' : '360° Development Report generated.');
      setConfirmModal(null);
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
        <Badge status={link.Status === 'completed' ? 'completed' : 'pending'}>{link.Status}</Badge>
        <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{link.CompletedAt ? new Date(link.CompletedAt).toLocaleString() : '—'}</span>
      </div>
    );
  }

  function GroupRow({ links: groupLinks, label, expanded, onToggle }) {
    const done = groupLinks.filter(l => l.Status === 'completed').length;
    const allDone = done === groupLinks.length;
    return (
      <div>
        <div onClick={onToggle} style={{
          display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center',
          padding: '12px 14px', background: 'var(--canvas-warm)',
          borderRadius: expanded ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
          border: '1px solid var(--canvas-warm)', cursor: 'pointer', userSelect: 'none',
        }}>
          <span style={{ fontWeight: 600, fontSize: '0.86rem' }}>{label}</span>
          <span style={{ fontSize: '0.83rem', color: 'var(--ink-soft)' }}>{done}/{groupLinks.length} completed</span>
          <Badge status={allDone ? 'completed' : 'pending'}>{allDone ? 'done' : 'in progress'}</Badge>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{expanded ? '▲ Hide' : '▼ Show all'}</span>
        </div>
        {expanded && (
          <div style={{ border: '1px solid var(--canvas-warm)', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)', overflow: 'hidden' }}>
            {groupLinks.map((l, i) => {
              const publicUrl = l.Token ? `${window.location.origin}/assess/${l.Token}` : null;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '10px 14px', background: i % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-white)', borderTop: i === 0 ? 'none' : '1px solid var(--canvas-warm)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>#{i + 1}</span>
                  {publicUrl ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.79rem', fontFamily: 'monospace', color: 'var(--ink-soft)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{publicUrl}</span>
                      <Btn size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(publicUrl)}>Copy</Btn>
                    </div>
                  ) : (l.AssessorEmail || <em style={{ color: 'var(--ink-faint)' }}>—</em>)}
                  <Badge status={l.Status === 'completed' ? 'completed' : 'pending'}>{l.Status}</Badge>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{l.CompletedAt ? new Date(l.CompletedAt).toLocaleString() : '—'}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={campaign ? `${campaign.FirstName} ${campaign.LastName}` : 'Campaign Detail'}
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
              {campaign.Status !== 'completed' && (
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
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Generate Reports</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: 1.6 }}>
              Reports are visible to you and the employee.
              {!selfManagerDone && <span style={{ color: 'var(--danger)', marginLeft: '4px' }}>Self and manager assessments must be completed first.</span>}
            </p>
            {reportSuccess && <div style={{ marginBottom: '16px' }}><Alert type="success">{reportSuccess}</Alert></div>}
            {reportError && <div style={{ marginBottom: '16px' }}><Alert type="error">{reportError}</Alert></div>}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Btn variant={selfDone ? 'primary' : 'outline'} loading={generating === 1}
                  disabled={!selfDone || generating !== null} onClick={() => doGenerateReport(1)}
                  style={!selfDone ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                  Self Assessment Report
                </Btn>
                {!selfDone && <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Requires: self complete</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Btn variant={selfManagerDone ? 'teal' : 'outline'} loading={generating === 2}
                  disabled={!selfManagerDone || generating !== null} onClick={() => doGenerateReport(2)}
                  style={!selfManagerDone ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                  360° Development Report
                </Btn>
                {!selfManagerDone && <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Requires: self + manager complete</span>}
              </div>
            </div>
          </Card>
        </div>
      )}

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

// ── Reports ────────────────────────────────────────────────────────────────
function downloadReportPdf(campaignId, reportType) {
  const token = localStorage.getItem('compass_token_manager');
  const typeNum = reportType === 'report1' ? 1 : 2;
  const BASE = process.env.REACT_APP_API_URL || 'https://api.hansenbeck.com';
  fetch(`${BASE}/api/360/manager/cycles/${campaignId}/report/${typeNum}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.blob(); })
    .then(blob => { const url = URL.createObjectURL(blob); window.open(url, '_blank'); })
    .catch(e => alert(`Download failed: ${e.message}`));
}

export function ManagerReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    api.manager.getReports()
      .then(setReports).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  async function handleDelete(reportId) {
    setDeleting(reportId);
    try {
      await api.manager.deleteReport(reportId);
      setReports(prev => prev.filter(r => r.ReportID !== reportId));
      setConfirmDeleteId(null);
    } catch (e) { setError(e.message); }
    finally { setDeleting(null); }
  }

  return (
    <Layout>
      <PageHeader title="Reports" subtitle="Download generated assessment reports" />
      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      <Card>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
        ) : reports.length === 0 ? (
          <EmptyState icon="📄" title="No reports yet" message="Reports will appear here once campaigns are completed and generated." />
        ) : (
          <Table
            headers={['Employee', 'Type', 'Generated', 'Download', '']}
            rows={reports.map(r => [
              <strong>{r.FirstName} {r.LastName}</strong>,
              r.ReportType === 'report1' ? 'Self Assessment Report' : '360° Development Report',
              new Date(r.GeneratedAt).toLocaleDateString(),
              <Btn size="sm" variant="accent" onClick={() => downloadReportPdf(r.CycleID, r.ReportType)}>⬇ Download PDF</Btn>,
              <Btn size="sm" variant="outline" onClick={() => setConfirmDeleteId(r.ReportID)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</Btn>,
            ])}
          />
        )}
      </Card>
      <Modal open={confirmDeleteId !== null} onClose={() => setConfirmDeleteId(null)} title="Delete Report">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Are you sure you want to delete this report? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting !== null} onClick={() => handleDelete(confirmDeleteId)}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}

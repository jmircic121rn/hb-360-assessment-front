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

function useManagerLayout(children) {
  return <PortalLayout role="manager" navItems={NAV}>{children}</PortalLayout>;
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

  return useManagerLayout(
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your 360° assessment campaigns" />

      {error && <Alert type="error">{error}</Alert>}

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div> : (
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
              headers={['Employee', 'Status', 'Progress', 'Started', 'Action']}
              rows={campaigns.map(c => [
                <strong>{c.FirstName} {c.LastName}</strong>,
                <Badge status={c.Status === 'in_progress' ? 'active' : c.Status}>{c.Status}</Badge>,
                `${c.CompletedLinks}/${c.TotalLinks}`,
                new Date(c.CreatedAt).toLocaleDateString(),
                <Link to={`/manager/campaigns/${c.CycleID}`}><Btn size="sm" variant="outline">View</Btn></Link>,
              ])}
              emptyMessage="No campaigns yet. Start your first assessment campaign."
            />
          </Card>
        </>
      )}
    </>
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

  return useManagerLayout(
    <>
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
          <EmptyState icon="👥" title="No employees yet" message="Add your first employee to get started with assessments." action={<Link to="/manager/employees/new"><Btn variant="teal">Add Employee</Btn></Link>} />
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
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
          Are you sure you want to delete this employee? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting} onClick={handleDelete}>Delete</Btn>
        </div>
      </Modal>
    </>
  );
}

// ── Employee Form (New/Edit) ────────────────────────────────────────────────
export function EmployeeForm({ editMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', profilId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editMode && id) {
      api.manager.getEmployees().then(list => {
        const emp = list.find(e => String(e.EmployeeID) === id);
        if (emp) setForm({ firstName: emp.FirstName, lastName: emp.LastName, email: emp.Email, jobTitle: emp.JobTitle || '', lang: emp.Lang || 'en', profilId: emp.ProfilId || '' });
      });
    }
  }, [editMode, id]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (editMode) await api.manager.updateEmployee(id, form);
      else await api.manager.createEmployee(form);
      navigate('/manager/employees');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return useManagerLayout(
    <>
      <PageHeader title={editMode ? 'Edit Employee' : 'Add Employee'} subtitle={editMode ? 'Update employee information' : 'Add a new team member'} />

      <Card style={{ padding: '32px', maxWidth: 560 }}>
        {error && <div style={{ marginBottom: '20px' }}><Alert type="error">{error}</Alert></div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormField label="First Name" required>
              <Input value={form.firstName} onChange={set('firstName')} required />
            </FormField>
            <FormField label="Last Name" required>
              <Input value={form.lastName} onChange={set('lastName')} required />
            </FormField>
          </div>
          <FormField label="Email" required>
            <Input type="email" value={form.email} onChange={set('email')} required />
          </FormField>
          <FormField label="Job Title">
            <Input value={form.jobTitle} onChange={set('jobTitle')} placeholder="e.g. Senior Engineer" />
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
    </>
  );
}

// ── New Campaign ────────────────────────────────────────────────────────────
const emptyPerson = () => ({ firstName: '', lastName: '', email: '' });

export function NewCampaign() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: '',
    includeSelf: false, includeManager: false, includePeer: false, includeOther: false,
    peers: [emptyPerson()],
    others: [emptyPerson()],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.manager.getEmployees().then(setEmployees).catch(() => {});
  }, []);

  const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));

  function updatePerson(list, idx, field, value) {
    return list.map((p, i) => i === idx ? { ...p, [field]: value } : p);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.employeeId) { setError('Please select an employee.'); return; }
    if (!form.includeSelf && !form.includeManager && !form.includePeer && !form.includeOther) {
      setError('Select at least one assessment type.'); return;
    }

    setLoading(true); setError(null);
    try {
      const payload = {
        employeeId: Number(form.employeeId),
        includeSelf: form.includeSelf,
        includeManager: form.includeManager,
        includePeer: form.includePeer,
        includeOther: form.includeOther,
        peers: form.includePeer ? form.peers.filter(p => p.email) : [],
        others: form.includeOther ? form.others.filter(p => p.email) : [],
      };
      const res = await api.manager.createCampaign(payload);
      navigate(`/manager/campaigns/${res.cycleId}`);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  const typeConfig = [
    { key: 'includeSelf', label: 'Self Assessment', desc: 'Employee rates themselves' },
    { key: 'includeManager', label: 'Manager Review', desc: 'Direct manager assessment' },
    { key: 'includePeer', label: 'Peer Review', desc: 'Colleague assessments' },
    { key: 'includeOther', label: 'Other', desc: 'External assessors' },
  ];

  const inputSm = { padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--canvas-warm)', background: 'var(--canvas-white)', fontSize: '0.84rem', outline: 'none', width: '100%', fontFamily: 'var(--font-body)' };

  return useManagerLayout(
    <>
      <PageHeader title="New Assessment Campaign" subtitle="Configure and launch a 360° campaign" />

      <Card style={{ padding: '32px', maxWidth: 640 }}>
        {error && <div style={{ marginBottom: '20px' }}><Alert type="error">{error}</Alert></div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FormField label="Select Employee" required>
            <Select value={form.employeeId} onChange={e => setForm(f => ({ ...f, employeeId: e.target.value }))} required>
              <option value="">— Choose employee —</option>
              {employees.map(emp => (
                <option key={emp.EmployeeID} value={emp.EmployeeID}>{emp.FirstName} {emp.LastName} ({emp.JobTitle || emp.Email})</option>
              ))}
            </Select>
          </FormField>

          <FormField label="Assessment Types" required>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {typeConfig.map(t => (
                <label key={t.key} style={{
                  display: 'flex', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  border: `1.5px solid ${form[t.key] ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                  background: form[t.key] ? 'var(--canvas-warm)' : 'var(--canvas)',
                  transition: 'all var(--transition)',
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
            <FormField label="Peer Assessors">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {form.peers.map((p, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr auto', gap: '6px', alignItems: 'center' }}>
                    <input style={inputSm} placeholder="First name" value={p.firstName} onChange={ev => setForm(f => ({ ...f, peers: updatePerson(f.peers, i, 'firstName', ev.target.value) }))} />
                    <input style={inputSm} placeholder="Last name" value={p.lastName} onChange={ev => setForm(f => ({ ...f, peers: updatePerson(f.peers, i, 'lastName', ev.target.value) }))} />
                    <input style={inputSm} placeholder="email@company.com" type="email" value={p.email} onChange={ev => setForm(f => ({ ...f, peers: updatePerson(f.peers, i, 'email', ev.target.value) }))} />
                    <button type="button" onClick={() => setForm(f => ({ ...f, peers: f.peers.filter((_, j) => j !== i) }))} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '4px' }}>×</button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm(f => ({ ...f, peers: [...f.peers, emptyPerson()] }))} style={{ alignSelf: 'flex-start', fontSize: '0.82rem', color: 'var(--ink-soft)', background: 'none', border: '1px dashed var(--canvas-warm)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  + Add peer
                </button>
              </div>
            </FormField>
          )}

          {form.includeOther && (
            <FormField label="Other Assessors">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {form.others.map((p, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr auto', gap: '6px', alignItems: 'center' }}>
                    <input style={inputSm} placeholder="First name" value={p.firstName} onChange={ev => setForm(f => ({ ...f, others: updatePerson(f.others, i, 'firstName', ev.target.value) }))} />
                    <input style={inputSm} placeholder="Last name" value={p.lastName} onChange={ev => setForm(f => ({ ...f, others: updatePerson(f.others, i, 'lastName', ev.target.value) }))} />
                    <input style={inputSm} placeholder="email@company.com" type="email" value={p.email} onChange={ev => setForm(f => ({ ...f, others: updatePerson(f.others, i, 'email', ev.target.value) }))} />
                    <button type="button" onClick={() => setForm(f => ({ ...f, others: f.others.filter((_, j) => j !== i) }))} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '4px' }}>×</button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm(f => ({ ...f, others: [...f.others, emptyPerson()] }))} style={{ alignSelf: 'flex-start', fontSize: '0.82rem', color: 'var(--ink-soft)', background: 'none', border: '1px dashed var(--canvas-warm)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  + Add assessor
                </button>
              </div>
            </FormField>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <Btn type="submit" loading={loading} style={{ minWidth: 160, justifyContent: 'center' }}>
              Launch Campaign
            </Btn>
            <Btn variant="outline" type="button" onClick={() => navigate('/manager/dashboard')}>Cancel</Btn>
          </div>
        </form>
      </Card>
    </>
  );
}

// ── Campaign Detail ─────────────────────────────────────────────────────────
export function CampaignDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(null);

  useEffect(() => {
    api.manager.getCampaign(id)
      .then(setData).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, [id]);

  async function handleGenerateReport(type) {
    setGenerating(type); setReportSuccess(null); setError(null);
    try {
      await (type === 1 ? api.manager.generateReport1(id) : api.manager.generateReport2(id));
      setReportSuccess(type === 1 ? 'Individual report generated successfully.' : 'Development report generated successfully.');
    } catch (e) { setError(e.message); }
    finally { setGenerating(null); }
  }

  const campaign = data?.cycle;
  const links = data?.links || [];
  const completedCount = links.filter(l => l.Status === 'completed').length;

  return useManagerLayout(
    <>
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
            </div>
          </Card>

          {/* Links table */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '16px' }}>Assessment Links</h3>
            <Table
              headers={['Type', 'Assessor / Link', 'Status', 'Completed At']}
              rows={links.map(l => {
                const publicUrl = l.Token ? `${window.location.origin}/assess/${l.Token}` : null;
                return [
                  <span style={{ textTransform: 'capitalize' }}>{l.AssessmentType}</span>,
                  publicUrl ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontFamily: 'monospace', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {publicUrl}
                      </span>
                      <Btn size="sm" variant="outline" onClick={() => {
                        navigator.clipboard.writeText(publicUrl);
                      }}>
                        Copy
                      </Btn>
                    </div>
                  ) : (
                    l.AssessorEmail || <em style={{ color: 'var(--ink-faint)' }}>—</em>
                  ),
                  <Badge status={l.Status === 'completed' ? 'completed' : 'pending'}>{l.Status}</Badge>,
                  l.CompletedAt ? new Date(l.CompletedAt).toLocaleString() : '—',
                ];
              })}
              emptyMessage="No assessment links in this campaign."
            />
          </Card>

          {/* Generate reports — only for completed campaigns */}
          {campaign.Status === 'completed' && (
            <Card style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '8px' }}>Generate Reports</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px' }}>
                Reports will be visible to both you and the employee.
              </p>
              {reportSuccess && (
                <div style={{ marginBottom: '16px' }}>
                  <Alert type="success">{reportSuccess}</Alert>
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Btn
                  variant="primary"
                  loading={generating === 1}
                  disabled={generating !== null}
                  onClick={() => handleGenerateReport(1)}
                >
                  Generate Individual Report
                </Btn>
                <Btn
                  variant="outline"
                  loading={generating === 2}
                  disabled={generating !== null}
                  onClick={() => handleGenerateReport(2)}
                >
                  Generate Development Report
                </Btn>
              </div>
            </Card>
          )}
        </div>
      )}
    </>
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
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    })
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
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(null);
    }
  }

  return useManagerLayout(
    <>
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
              r.ReportType === 'report1' ? 'Individual Report' : 'Development Report',
              new Date(r.GeneratedAt).toLocaleDateString(),
              <Btn size="sm" variant="accent" onClick={() => downloadReportPdf(r.CycleID, r.ReportType)}>
                ⬇ Download PDF
              </Btn>,
              <Btn size="sm" variant="outline" onClick={() => setConfirmDeleteId(r.ReportID)}
                style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                Delete
              </Btn>,
            ])}
          />
        )}
      </Card>

      <Modal
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete Report"
      >
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Are you sure you want to delete this report? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setConfirmDeleteId(null)}>
            Cancel
          </Btn>
          <Btn
            variant="danger"
            loading={deleting !== null}
            onClick={() => handleDelete(confirmDeleteId)}
          >
            Delete
          </Btn>
        </div>
      </Modal>
    </>
  );
}

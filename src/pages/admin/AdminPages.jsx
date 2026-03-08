import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../utils/api';
import { PortalLayout } from '../../components/Layout';
import { Card, Badge, Alert, PageHeader, Table, Spinner, Btn, Select, FormField, Modal, EmptyState } from '../../components/UI';

const NAV = [
  { href: '/admin/campaigns', icon: '🔄', label: 'All Campaigns' },
  { href: '/admin/group-report', icon: '📊', label: 'Group Report' },
];

function Layout({ children }) {
  return <PortalLayout role="admin" navItems={NAV}>{children}</PortalLayout>;
}

// ── Admin Campaigns ─────────────────────────────────────────────────────────
export function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [generating, setGenerating] = useState({});
  const [success, setSuccess] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.admin.getCampaigns(statusFilter)
      .then(setCampaigns).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(load, [load]);

  async function handleGenerate(campaignId, reportType) {
    const key = `${campaignId}_${reportType}`;
    setGenerating(g => ({ ...g, [key]: true }));
    setSuccess(null); setError(null);
    try {
      const fn = reportType === 1 ? api.admin.generateReport1 : api.admin.generateReport2;
      await fn(campaignId);
      setSuccess(`Report ${reportType} generated successfully for campaign ${campaignId}`);
      load();
    } catch (e) { setError(e.message); }
    finally { setGenerating(g => ({ ...g, [key]: false })); }
  }

  return (
    <Layout>
      <PageHeader title="All Campaigns" subtitle="Manage assessment campaigns and generate reports" />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {success && <div style={{ marginBottom: '16px' }}><Alert type="success">{success}</Alert></div>}

      <Card style={{ padding: '24px' }}>
        {/* Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>Filter by status:</div>
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ maxWidth: 200 }}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
        ) : campaigns.length === 0 ? (
          <EmptyState icon="🔄" title="No campaigns found" message="No assessment campaigns match your filter." />
        ) : (
          <Table
            headers={['Employee', 'Status', 'Progress', 'Started', 'Reports']}
            rows={campaigns.map(c => [
              <div>
                <strong>{c.employeeName}</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{c.employeeEmail}</div>
              </div>,
              <Badge status={c.status}>{c.status}</Badge>,
              <div>
                <div style={{ fontSize: '0.82rem', marginBottom: '4px' }}>{c.completedCount}/{c.totalCount}</div>
                <div style={{ width: 80, height: 4, background: 'var(--canvas-warm)', borderRadius: 2 }}>
                  <div style={{ height: '100%', background: 'var(--teal)', width: `${(c.completedCount / c.totalCount) * 100 || 0}%`, borderRadius: 2 }} />
                </div>
              </div>,
              new Date(c.createdAt).toLocaleDateString(),
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <Btn
                  size="sm"
                  variant={c.report1Generated ? 'outline' : 'accent'}
                  loading={generating[`${c.id}_1`]}
                  disabled={c.status !== 'completed'}
                  onClick={() => handleGenerate(c.id, 1)}
                  title={c.status !== 'completed' ? 'Campaign must be completed first' : ''}
                >
                  {c.report1Generated ? '✓ Report 1' : '⚡ Report 1'}
                </Btn>
                <Btn
                  size="sm"
                  variant={c.report2Generated ? 'outline' : 'teal'}
                  loading={generating[`${c.id}_2`]}
                  disabled={c.status !== 'completed'}
                  onClick={() => handleGenerate(c.id, 2)}
                  title={c.status !== 'completed' ? 'Campaign must be completed first' : ''}
                >
                  {c.report2Generated ? '✓ Report 2' : '⚡ Report 2'}
                </Btn>
              </div>,
            ])}
          />
        )}
      </Card>
    </Layout>
  );
}

// ── Group Report ───────────────────────────────────────────────────────────
export function GroupReport() {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    api.admin.getManagers().then(setManagers).catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedManager) {
      setLoading(true);
      setSelectedEmployees([]);
      // Fetch employees for this manager
      api.manager.getEmployees(selectedManager)
        .then(setEmployees).catch(() => setEmployees([])).finally(() => setLoading(false));
    }
  }, [selectedManager]);

  function toggleEmployee(id) {
    setSelectedEmployees(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  }

  async function handleGenerate() {
    if (!selectedManager) { setError('Select a manager.'); return; }
    if (selectedEmployees.length < 2) { setError('Select at least 2 employees.'); return; }
    setSubmitting(true); setError(null);
    try {
      await api.admin.generateGroupReport({ managerId: selectedManager, employeeIds: selectedEmployees });
      setSuccess('Group report is being generated. Check back shortly for the download link.');
    } catch (e) { setError(e.message); }
    finally { setSubmitting(false); }
  }

  return (
    <Layout>
      <PageHeader title="Group Report" subtitle="Generate a comparative report for multiple employees" />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {success && <div style={{ marginBottom: '16px' }}><Alert type="success">{success}</Alert></div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 640 }}>
        <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormField label="Select Manager" required>
            <Select value={selectedManager} onChange={e => setSelectedManager(e.target.value)}>
              <option value="">— Choose manager —</option>
              {managers.map(m => (
                <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
              ))}
            </Select>
          </FormField>

          {selectedManager && (
            <FormField label="Select Employees" hint="Choose 2 or more employees to include in the group report">
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}><Spinner size={20} /></div>
              ) : employees.length === 0 ? (
                <div style={{ padding: '12px', color: 'var(--ink-soft)', fontSize: '0.85rem' }}>No employees found for this manager.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: 300, overflowY: 'auto', padding: '4px' }}>
                  {employees.map(emp => (
                    <label key={emp.id} style={{
                      display: 'flex', gap: '12px', alignItems: 'center',
                      padding: '10px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      border: `1.5px solid ${selectedEmployees.includes(emp.id) ? 'var(--teal)' : 'var(--canvas-warm)'}`,
                      background: selectedEmployees.includes(emp.id) ? 'var(--teal-pale)' : 'var(--canvas)',
                      transition: 'all var(--transition)',
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp.id)}
                        onChange={() => toggleEmployee(emp.id)}
                        style={{ accentColor: 'var(--teal)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{emp.firstName} {emp.lastName}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--ink-soft)' }}>{emp.position || emp.email}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </FormField>
          )}

          <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginBottom: '12px' }}>
              {selectedEmployees.length} employee{selectedEmployees.length !== 1 ? 's' : ''} selected
            </div>
            <Btn
              variant="primary"
              loading={submitting}
              disabled={!selectedManager || selectedEmployees.length < 2}
              onClick={handleGenerate}
            >
              📊 Generate Group Report
            </Btn>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

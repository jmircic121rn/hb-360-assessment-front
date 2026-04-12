import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, NAV, ActionMenu, IcPeople } from './managerUtils';
import { PortalLayout } from '../../components/Layout';
import {
  PageHeader, Card, Badge, Spinner, Alert, Select, Btn, Modal, Input
} from '../../components/UI';

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

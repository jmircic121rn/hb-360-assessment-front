import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, ActionMenu } from './managerUtils';
import {
  Btn, Card, Badge, Alert, PageHeader, Select, Spinner, Modal
} from '../../components/UI';

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
